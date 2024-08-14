import path from 'path'
import sharp from 'sharp'

const BLUR_SIZE = 10

export class UnableToFindModuleError extends Error {}

export function getPathFromProjectRoot(...pathRelativeToRoot: string[]) {
  try {
    const concisePath = path.join(module.path, '..', ...pathRelativeToRoot)

    path.resolve(concisePath)

    return concisePath
  } catch (e) {
    if (e instanceof Error && 'code' in e && e.code === 'MODULE_NOT_FOUND')
      throw new UnableToFindModuleError()

    throw e
  }
}

export function getPathFromPublic(...pathRelativeToPublic: string[]) {
  return getPathFromProjectRoot('public', ...pathRelativeToPublic)
}

export async function getBlurDataUrlFromImagePath(filePath: string) {
  const pipeline = sharp(filePath).resize(BLUR_SIZE, BLUR_SIZE, {
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
