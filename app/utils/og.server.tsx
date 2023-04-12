// This file handles PUBLIC images meant for Open Graph meta tags.

import fs from 'node:fs/promises'
import path from 'node:path'
import type { SatoriOptions } from 'satori'
import { renderAsync } from '@resvg/resvg-js'
import { type EmojiType, getIconCode, loadEmoji } from './other/emoji'
import { cachified, dbCache, defaultStaleWhileRevalidate } from './cache.server'
import { websiteUrl } from './misc'

const satoriImport = import('satori')

// This is required so that `satori` can parse the `tw` prop from the "dom" elements to get the styles (flavoured with a TailwindCSS-inspired API).
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    tw?: string
  }
}

interface MetaImageProps {
  title: string
  imageSrc?: string
  tags?: string[]
  url: string
}
function MetaImage({
  url = new URL(websiteUrl).host,
  ...props
}: MetaImageProps) {
  return (
    //     <div tw="flex flex-row h-full w-full bg-slate-800 text-white p-8">
    //   <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAAB6CAMAAAAF6AYEAAAAA1BMVEX9/f14eMwIAAAAMUlEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzwBn5AABC4mrUwAAAABJRU5ErkJggg==" width="275" height="275" tw="absolute right-8 my-15 rounded-3xl"/>

    //   <div tw="flex flex-col justify-between max-w-110">
    //     <ul tw="flex flex-row">
    //       <li tw="opacity-75 mr-2">
    //         <span tw="bg-blue-300 rounded-md w-2 h-2 inline-block mr-2 mt-2.5"/>
    //         <span tw="text-lg">React</span>
    //       </li>

    //       <li tw="opacity-75">
    //         <span tw="bg-blue-300 rounded-md w-2 h-2 inline-block mr-2 mt-2.5"/>
    //         <span tw="text-lg">React</span>
    //       </li>
    //     </ul>
    //     <p tw="text-3xl leading-tight m-0 mb-2 font-bold" style={
    //       {
    //         textShadow: '0px 0px 5px #0F172A'
    //       }
    //     }>
    //       Level-up your composition skills with React: The Compound Component pattern
    //     </p>

    //     <div tw="flex flex-col">
    //       <p tw="text-2xl leading-tight m-0 mb-2 font-bold">
    //         Rowin Hernandez
    //       </p>
    //       <p tw="leading-tight mt-0 font-medium text-xl">
    //         rowinbot.com
    //       </p>
    //     </div>
    //   </div>
    // </div>

    <div tw="flex flex-row h-full w-full bg-slate-800 text-white p-8">
      {props.imageSrc && (
        <img
          src={props.imageSrc}
          width="275"
          height="275"
          alt={props.title}
          tw="absolute right-8 my-15 rounded-3xl"
        />
      )}

      <div tw="flex flex-col justify-between max-w-100">
        {props.tags && (
          <ul tw="flex flex-row">
            {props.tags.map((tag) => (
              <li tw="opacity-75 mr-2" key={tag}>
                <span tw="bg-blue-300 rounded-md w-2 h-2 inline-block mr-2 mt-2.5" />
                <span tw="text-lg">{tag}</span>
              </li>
            ))}
          </ul>
        )}

        <p
          tw="text-3xl leading-tight m-0 mb-2 font-bold"
          style={{
            textShadow: '0px 0px 5px #0F172A',
          }}
        >
          {props.title}
        </p>

        <div tw="flex flex-col">
          <p tw="text-2xl leading-tight m-0 mb-2 font-bold">Rowin Hernandez</p>
          <p tw="leading-tight mt-0 font-medium text-xl">{url}</p>
        </div>
      </div>
    </div>
  )
}

const fontsPath = path.join(process.cwd(), 'public', 'fonts')
const fallbackFont = fs.readFile(path.resolve(fontsPath, 'Inter-Regular.ttf'))

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
  key: string,
  meta: MetaImageProps,
  options: ImageResponseOptions = {}
) {
  const element = (
    <MetaImage
      title={meta.title}
      imageSrc={meta.imageSrc}
      url={meta.url}
      tags={meta.tags}
    />
  )

  const extendedOptions = Object.assign(
    {
      width: 800,
      height: 400,
      debug: false,
    },
    options
  )

  const fontData = await fallbackFont
  const { default: satori } = await satoriImport
  const svg = await satori(element, {
    width: extendedOptions.width,
    height: extendedOptions.height,
    debug: extendedOptions.debug,
    fonts: extendedOptions.fonts || [
      {
        name: 'sans serif',
        data: fontData,
        weight: 800,
        style: 'normal',
      },
    ],
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

export function getCachifiedMetaImage(
  key: string,
  meta: MetaImageProps,
  options: ImageResponseOptions = {}
): Promise<Buffer | { type: 'Buffer'; data: number[] }> {
  return cachified({
    key,
    cache: dbCache,
    ttl: 1000 * 60 * 60 * 24 * 60,
    staleWhileRevalidate: defaultStaleWhileRevalidate,
    getFreshValue: async () => {
      return await getMetaImage(key, meta, options)
    },
  })
}
