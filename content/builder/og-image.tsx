// This file handles PUBLIC images meant for Open Graph meta tags.

import fs from 'node:fs/promises'
import path from 'node:path'

import { renderAsync } from '@resvg/resvg-js'

import { type EmojiType, getIconCode, loadEmoji } from './other/emoji'
import { websiteUrl } from '../../app/utils/misc'

import type { SatoriOptions } from 'satori'

const satoriImport = import('satori')

// This is required so that `satori` can parse the `tw` prop from the "dom" elements to get the styles (flavoured with a TailwindCSS-inspired API).
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    tw?: string
  }
}

const PAPER = '#F3EFE6'
const INK = '#2B2A28'
const INK_SOFT = '#5A574F'
const MARK = '#B23B2E'
const RULE = '#D3CCBD'

// The R monogram tile as a PNG data-URI so Satori needs no network/file fetch
// and renders it reliably (SVG <img> support in Satori is limited).
const markPngPromise = fs
  .readFile(path.join(process.cwd(), 'public', 'icon-192.png'))
  .then((buf) => `data:image/png;base64,${buf.toString('base64')}`)

interface MetaImageProps {
  title: string
  subtitle?: string
  kicker?: string
  imageSrc?: string
  tags?: string[]
  url: string
  mark: string
}

const DISPLAY = 'Cabinet Grotesk'
const MONO = 'IBM Plex Mono'

// A tiled dot-grid so the card reads as notebook paper, embedded as a data-URI
// background (Satori renders backgroundImage from an SVG url reliably).
const DOT_GRID =
  'url("data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="2" cy="2" r="1.5" fill="${RULE}"/></svg>`
  ) +
  '")'

function MetaImage({ url = new URL(websiteUrl).host, ...props }: MetaImageProps) {
  return (
    <div
      tw="flex h-full w-full"
      style={{
        backgroundColor: PAPER,
        backgroundImage: DOT_GRID,
        fontFamily: DISPLAY,
      }}
    >
      {/* the notebook margin rule */}
      <div style={{ width: 12, backgroundColor: MARK }} />
      <div style={{ width: 1, backgroundColor: RULE }} />

      <div tw="flex flex-col justify-between w-full" style={{ padding: 66 }}>
        <div tw="flex items-center">
          <img src={props.mark} width={80} height={80} alt="" />
          <div tw="flex flex-col" style={{ marginLeft: 22 }}>
            <span style={{ color: INK, fontSize: 30, fontWeight: 800 }}>
              Rowin Hernandez
            </span>
            <span
              style={{
                color: INK_SOFT,
                fontSize: 21,
                marginTop: 4,
                fontFamily: MONO,
              }}
            >
              rowinbot.com
            </span>
          </div>
        </div>

        <div tw="flex flex-col">
          {props.kicker && (
            <span
              style={{
                color: INK_SOFT,
                fontSize: 23,
                fontWeight: 500,
                letterSpacing: 3,
                marginBottom: 18,
                fontFamily: MONO,
              }}
            >
              {props.kicker.toUpperCase()}
            </span>
          )}
          <span
            style={{
              color: INK,
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: -1.2,
            }}
          >
            {props.title}
          </span>
          {props.subtitle && (
            <span
              style={{
                color: INK_SOFT,
                fontSize: 29,
                fontWeight: 500,
                marginTop: 22,
                lineHeight: 1.35,
              }}
            >
              {props.subtitle}
            </span>
          )}
        </div>

        <div tw="flex items-center" style={{ height: 34 }}>
          {props.tags && props.tags.length > 0 ? (
            props.tags.map((tag) => (
              <div tw="flex items-center" key={tag} style={{ marginRight: 30 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: MARK,
                    marginRight: 10,
                  }}
                />
                <span
                  style={{ color: INK_SOFT, fontSize: 21, fontFamily: MONO }}
                >
                  {tag}
                </span>
              </div>
            ))
          ) : (
            <span style={{ color: INK_SOFT, fontSize: 21, fontFamily: MONO }}>
              {url}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

const ogFontsPath = path.join(process.cwd(), 'content', 'builder', 'fonts')
const readOgFont = (file: string) => fs.readFile(path.join(ogFontsPath, file))

// The site's own type: Cabinet Grotesk for display, IBM Plex Mono for the
// field-note labels — each real weight registered so Satori renders true bold
// instead of faux-weighting a single regular face.
const ogFontsPromise = Promise.all([
  readOgFont('cabinet-extrabold.ttf'),
  readOgFont('cabinet-medium.ttf'),
  readOgFont('plex-mono-medium.ttf'),
  readOgFont('plex-mono-semibold.ttf'),
]).then(([cabinetExtrabold, cabinetMedium, plexMedium, plexSemibold]) => [
  { name: 'Cabinet Grotesk', data: cabinetExtrabold, weight: 800 as const, style: 'normal' as const },
  { name: 'Cabinet Grotesk', data: cabinetMedium, weight: 500 as const, style: 'normal' as const },
  { name: 'IBM Plex Mono', data: plexMedium, weight: 500 as const, style: 'normal' as const },
  { name: 'IBM Plex Mono', data: plexSemibold, weight: 600 as const, style: 'normal' as const },
])

const languageFontMap = {
  'ja-JP': 'Noto+Sans+JP',
  'ko-KR': 'Noto+Sans+KR',
  'zh-CN': 'Noto+Sans+SC',
  'zh-TW': 'Noto+Sans+TC',
  'zh-HK': 'Noto+Sans+HK',
  'th-TH': 'Noto+Sans+Thai',
  'bn-IN': 'Noto+Sans+Bengali',
  'ar-AR': 'Noto+Sans+Arabic',
  'ta-IN': 'Noto+Sans+Tamil',
  'ml-IN': 'Noto+Sans+Malayalam',
  'he-IL': 'Noto+Sans+Hebrew',
  'te-IN': 'Noto+Sans+Telugu',
  devanagari: 'Noto+Sans+Devanagari',
  kannada: 'Noto+Sans+Kannada',
  symbol: ['Noto+Sans+Symbols', 'Noto+Sans+Symbols+2'],
  math: 'Noto+Sans+Math',
  unknown: 'Noto+Sans',
}

async function loadGoogleFont(fontFamily: string | string[], text: string) {
  if (!fontFamily || !text) {
    return
  }

  const API = `https://fonts.googleapis.com/css2?family=${fontFamily}&text=${encodeURIComponent(
    text
  )}`
  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)
  if (!resource) {
    throw new Error('Failed to load font')
  }

  return fetch(resource[1]).then((res) => res.arrayBuffer())
}

const assetCache = new Map()
const loadDynamicAsset = (emojiType: EmojiType = 'twemoji') => {
  const fn = async (languageCode: string, text: string) => {
    if (languageCode === 'emoji') {
      // It's an emoji, load the image.
      return (
        'data:image/svg+xml;base64,' +
        Buffer.from(
          await (await loadEmoji(getIconCode(text), emojiType)).text(),
          'base64'
        )
      )
    }

    // Try to load from Google Fonts.
    if (!Object.prototype.hasOwnProperty.call(languageFontMap, languageCode)) {
      languageCode = 'unknown'
    }
    try {
      const fontData = await loadGoogleFont(
        languageFontMap[languageCode as keyof typeof languageFontMap],
        text
      )
      if (fontData) {
        return {
          name: `satori_${languageCode}_fallback_${text}`,
          data: fontData,
          weight: 400,
          style: 'normal',
        }
      }
    } catch (error) {
      console.error('Failed to load dynamic font for', text, '. Error:', error)
    }
  }
  return async (...args: Parameters<typeof fn>) => {
    const cacheKey = JSON.stringify({ ...args, emojiType })
    const cachedFont = assetCache.get(cacheKey)
    if (cachedFont) {
      return cachedFont
    }

    const font = await fn(...args)
    assetCache.set(cacheKey, font)
    return font
  }
}

export declare type ImageResponseOptions = {
  /**
   * The width of the image.
   *
   * @type {number}
   * @default 1200
   */
  width?: number
  /**
   * The height of the image.
   *
   * @type {number}
   * @default 630
   */
  height?: number
  /**
   * Display debug information on the image.
   *
   * @type {boolean}
   * @default false
   */
  debug?: boolean
  /**
   * A list of fonts to use.
   *
   * @type {{ data: ArrayBuffer; name: string; weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900; style?: 'normal' | 'italic' }[]}
   * @default Noto Sans Latin Regular.
   */
  fonts?: SatoriOptions['fonts']
  /**
   * Using a specific Emoji style. Defaults to `twemoji`.
   *
   * @link https://github.com/vercel/og#emoji
   * @type {EmojiType}
   * @default 'twemoji'
   */
  emoji?: EmojiType
}

export async function getMetaImage(
  meta: Omit<MetaImageProps, 'mark'>,
  options: ImageResponseOptions = {}
) {
  const mark = await markPngPromise
  const element = (
    <MetaImage
      title={meta.title}
      subtitle={meta.subtitle}
      kicker={meta.kicker}
      imageSrc={meta.imageSrc}
      url={meta.url}
      tags={meta.tags}
      mark={mark}
    />
  )

  const extendedOptions = Object.assign(
    {
      width: 1200,
      height: 630,
      debug: false,
    },
    options
  )

  const ogFonts = await ogFontsPromise
  const { default: satori } = await satoriImport
  const svg = await satori(element, {
    width: extendedOptions.width,
    height: extendedOptions.height,
    debug: extendedOptions.debug,
    fonts: extendedOptions.fonts || ogFonts,
    loadAdditionalAsset: loadDynamicAsset(extendedOptions.emoji),
  })
  const image = await renderAsync(svg, {
    fitTo: {
      mode: 'width',
      value: extendedOptions.width,
    },
  })
  return image.asPng()
}

/** The default site-wide OG image used by every non-journal page. */
export async function getSiteMetaImage() {
  return getMetaImage({
    kicker: 'Product engineer · tech lead',
    title: 'Shipping complex product surfaces, end to end.',
    subtitle: 'Senior engineering with judgment. Co-founder of Kalebtec.',
    // A committed static asset — the canonical host, never the build-time env.
    url: 'rowinbot.com',
  })
}
