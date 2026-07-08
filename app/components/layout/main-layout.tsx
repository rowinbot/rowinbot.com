import { CookieBanner } from '~/components/cookie-banner'
import { EdgeAccents } from '~/components/cyber-decorations'
import { Footer } from '~/components/layout/footer'
import { Navbar } from '~/components/layout/navbar'

import { MainProgressBar } from './main-progress-bar'

export default function MainLayout(props: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-cyber-bg cyber-grid-bg">
      <EdgeAccents />
      <Navbar />

      <div className="flex-1">{props.children}</div>

      <Footer />

      <MainProgressBar />
      <CookieBanner />
    </div>
  )
}
