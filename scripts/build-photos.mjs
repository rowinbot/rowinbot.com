import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

import sharp from 'sharp'

const [inputDir, outputDir = 'app/assets/photos'] = process.argv.slice(2)

if (!inputDir) {
  process.stderr.write(
    'usage: node scripts/build-photos.mjs <dir-with-originals> [outDir]\n'
  )
  process.exit(1)
}

const photos = {
  'rowin-2024': { file: 'images/rowin-2024.jpg', widths: [600], fallback: 600 },
  biking: { file: 'images/biking.png', widths: [600], fallback: 600 },
  burger: { file: 'images/burger.png', widths: [600], fallback: 600 },
  family: {
    file: 'images/family.png',
    widths: [640, 1280, 1920],
    fallback: 1280,
  },
  programming: {
    file: 'images/programming.jpg',
    widths: [640, 1280],
    fallback: 1280,
  },
  fanfest: {
    file: 'experience/fanfest.png',
    widths: [640, 1280],
    fallback: 1280,
  },
  'meeting-point': {
    file: 'experience/meeting-point.png',
    widths: [640, 1280],
    fallback: 1280,
  },
  messynger: {
    file: 'experience/messynger.png',
    widths: [640, 1280],
    fallback: 1280,
  },
  voxel: { file: 'experience/voxel.png', widths: [640, 1280], fallback: 1280 },
}

await mkdir(outputDir, { recursive: true })
const manifest = {}

for (const [name, config] of Object.entries(photos)) {
  const input = path.join(inputDir, config.file)
  const meta = await sharp(input).metadata()
  const fallbackWidth = Math.min(config.fallback, meta.width)
  const fallbackHeight = Math.round((meta.height * fallbackWidth) / meta.width)

  for (const width of config.widths) {
    await sharp(input)
      .rotate()
      .resize({ width: Math.min(width, meta.width), withoutEnlargement: true })
      .avif({ quality: 60, effort: 6 })
      .toFile(path.join(outputDir, `${name}-${width}.avif`))
  }

  await sharp(input)
    .rotate()
    .resize({ width: fallbackWidth, withoutEnlargement: true })
    .flatten({ background: '#ffffff' })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(path.join(outputDir, `${name}.jpg`))

  manifest[name] = {
    width: fallbackWidth,
    height: fallbackHeight,
    widths: config.widths,
  }
}

await writeFile(
  path.join(outputDir, 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`
)
