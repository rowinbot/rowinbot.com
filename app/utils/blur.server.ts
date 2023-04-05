import path from 'path'
import sharp from 'sharp'

export async function getBlurDataUrlFromPublicImagePath(file: string) {
  const size = 10
  const filePath = path.join(module.path, '../public', file)

  const pipeline = sharp(filePath).resize(size, size, {
    fit: 'inside',
  })

  const buffer = await pipeline
    .clone()
    .normalise()
    .modulate({ saturation: 1.2, brightness: 1 })
    .removeAlpha()
    .toBuffer({ resolveWithObject: true })

  const dataUrl = `data:image/${
    buffer.info.format
  };base64,${buffer.data.toString('base64')}`

  return dataUrl
}
