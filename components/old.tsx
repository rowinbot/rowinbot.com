import homeBgGradient from '../assets/decoration/home-bg-gradient.png'
import Image from 'next/image'

export function WavyContainer() {
  return (
    <>
      <div className="relative left-[calc((100vw-100%)/2*-1+9px)] w-[100vw] flex -mx-2 home-gradient -mb-1">
        <Image priority src={homeBgGradient} alt="" />
      </div>
      <section className="relative left-[calc((100vw-100%)/2*-1+9px)] w-[100vw] bg-blue-500 py-20 -mx-2">
        <p>Lorem ipsum</p>
      </section>
    </>
  )
}
