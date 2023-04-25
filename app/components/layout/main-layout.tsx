import { Footer } from '~/components/layout/footer'
import { Navbar } from '~/components/layout/navbar'

export default function MainLayout(props: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col dotted-pattern">
      <Navbar />

      {props.children}

      <div
        /** Outlet above should fill-up the screen in most cases with its intrinsic height (text, images...) so this should only matter when screen is half empty to push the footer downwards.*/
        className="flex-1"
      />

      <Footer />
    </div>
  )
}
