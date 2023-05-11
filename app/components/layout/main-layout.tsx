import { Footer } from '~/components/layout/footer'
import { Navbar } from '~/components/layout/navbar'
import { MainProgressBar } from './main-progress-bar'

export default function MainLayout(props: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col app-bg dotted-pattern">
      <Navbar />

      <div className="flex-1">{props.children}</div>

      <Footer />

      <MainProgressBar />
    </div>
  )
}
