import manifest from '~/assets/photos/manifest.json'

export interface PhotoSource {
  type: string
  srcSet: string
}

export interface Photo {
  src: string
  blurDataUri: string
  width: number
  height: number
  sources: PhotoSource[]
}

export type PhotoName = keyof typeof manifest

const avifUrls = import.meta.glob<string>('../assets/photos/*.avif', {
  eager: true,
  import: 'default',
  query: '?url',
})

const fallbacks = import.meta.glob<{ imageUri: string; blurDataUri: string }>(
  '../assets/photos/*.jpg',
  { eager: true }
)

export function getPhoto(name: PhotoName): Photo {
  const entry = manifest[name]
  const fallback = fallbacks[`../assets/photos/${name}.jpg`]

  const srcSet = entry.widths
    .map(
      (width) =>
        `${avifUrls[`../assets/photos/${name}-${width}.avif`]} ${width}w`
    )
    .join(', ')

  return {
    src: fallback.imageUri,
    blurDataUri: fallback.blurDataUri,
    width: entry.width,
    height: entry.height,
    sources: [{ type: 'image/avif', srcSet }],
  }
}
