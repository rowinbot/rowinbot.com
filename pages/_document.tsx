import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getConciseTheme } from '../components/theme'

class MyDocument extends Document {
  render() {
    return (
      <Html className={getConciseTheme('system-unknown')}>
        <Head>
          <link
            rel="preload"
            href="/fonts/Inter-Regular.woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Inter-Bold.woff2"
            as="font"
            crossOrigin=""
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
