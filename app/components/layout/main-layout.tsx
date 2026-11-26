import { MotionConfig } from 'framer-motion'

import { CookieBanner } from '~/components/cookie-banner'
import { Footer } from '~/components/layout/footer'
import { Navbar } from '~/components/layout/navbar'
import { DotGrid, GrainOverlay, SketchDefs, SkipLink } from '~/components/ui'

export default function MainLayout(props: React.PropsWithChildren) {
  return (
    <MotionConfig reducedMotion="user">
      <SkipLink targetId="main">Skip to content</SkipLink>
      <SketchDefs />
      <DotGrid />
      <GrainOverlay />

      <div className="relative z-[2] flex min-h-screen flex-col">
        <Navbar />

        <div className="flex-1">{props.children}</div>

        <Footer />

        <CookieBanner />
      </div>
    </MotionConfig>
  )
}
