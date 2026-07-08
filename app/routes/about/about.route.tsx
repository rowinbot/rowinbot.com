import * as bikingImage from '~/../public/images/biking.png'
import * as eatingImage from '~/../public/images/burger.png'
import * as familyImage from '~/../public/images/family.png'
import * as programmingImage from '~/../public/images/programming.jpg'

import { KalebtecBridge } from '~/components/bridge'
import { BlurrableImage } from '~/components/image'
import { Annotation, InkLink, SectionHeader, TapedPhoto } from '~/components/ui'

import { FactAboutMe } from './fact-about-me'
import { PersonalRoles } from './personal-roles'

import type { Route } from './+types/about.route'

export async function loader(_: Route.LoaderArgs) {
  return {
    bikingImage,
    programmingImage,
    eatingImage,
    familyImage,
  }
}

const facts = [
  {
    title: "I'm dedicated",
    description:
      'Whenever I put my mind on to something, I find it extremely difficult to let go — which can be a double-edged sword sometimes.',
  },
  {
    title: 'I love to learn',
    description:
      "Whether I'm working on a project or having fun at 1am, I always try to learn something new — especially when it makes me more effective.",
  },
  {
    title: "I'm not *only* a dog person",
    description:
      'Over the years I have had four dogs — the last was Lucky, a Cocker Spaniel. These days home belongs to Mila the cat, and I am firmly her staff.',
  },
  {
    title: "I'm a team-player",
    description:
      "I love working in teams and I'm always looking for ways to improve the dynamic. I'm a big believer in the power of collaboration.",
  },
]

const galleryPhotos = [
  {
    key: 'programming',
    alt: 'Rowin at the keyboard',
    caption: 'at the keyboard — where most of it happens',
  },
  {
    key: 'eating',
    alt: 'Rowin eating a burger',
    caption: 'burgers, obviously',
  },
] as const

export default function AboutRoute({ loaderData }: Route.ComponentProps) {
  const galleryImages = {
    programming: loaderData.programmingImage,
    eating: loaderData.eatingImage,
  }

  return (
    <main id="main" className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
      <section
        aria-labelledby="about-title"
        className="pt-[clamp(2.125rem,5vw,4rem)]"
      >
        <div className="grid items-center gap-[clamp(1.75rem,5vw,4.5rem)] md:grid-cols-[1fr_300px]">
          <div>
            <p className="mb-3 font-mono text-meta uppercase tracking-[0.2em] text-mark">
              About
            </p>
            <h1
              id="about-title"
              className="m-0 mb-[18px] font-display text-d1 font-black tracking-[-0.02em] text-ink"
            >
              About me
            </h1>
            <p className="m-0 mb-6 max-w-[40ch] font-display text-[clamp(1.0625rem,2.1vw,1.375rem)] font-bold leading-snug text-ink">
              Software engineer from Venezuela, living in{' '}
              <span className="ink-highlight">Vigo, Galicia</span>. Building for
              the web since 2010, and still enjoying it.
            </p>
            <PersonalRoles />
          </div>

          <TapedPhoto
            src={loaderData.bikingImage.imageUri}
            alt="Rowin out on the bike"
            caption="on the bike — Chafiras, Tenerife"
            captionHover="cyclist*, allegedly"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section
        aria-labelledby="bio-heading"
        className="pt-[clamp(3.5rem,8vw,6.5rem)]"
      >
        <SectionHeader title="The short version" id="bio-heading" />

        <div className="grid gap-[clamp(1.5rem,5vw,3.5rem)] md:grid-cols-[1.6fr_0.9fr] md:items-start">
          <div className="max-w-[62ch] space-y-4 text-ink [&_p]:leading-[1.75]">
            <p>
              I grew up in Venezuela and now work from{' '}
              <strong>Vigo, in Galicia</strong>. I have been building for the web
              since 2010, coding professionally since 2015, and working remotely
              since 2016.
            </p>
            <p>
              I came up through Ruby on Rails — I learned it back in 2011 — then
              ventured into mobile with Android, React Native and Flutter. The
              web kept pulling me back, so I settled there: TypeScript and
              JavaScript, with <strong>React and Vue</strong> as my day-to-day
              tools and <strong>Node</strong> on the server.
            </p>
            <p>
              Since 2020 I have been increasingly drawn to accessibility and to
              removing the barriers that keep people off the web. I took the
              W3C{' '}
              <InkLink
                href="https://courses.edx.org/certificates/e7d6d1981b974b16b6594ae8225d6a51"
                variant="underline"
              >
                Introduction to Web Accessibility
              </InkLink>{' '}
              course, follow the{' '}
              <InkLink
                href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                variant="underline"
              >
                WCAG
              </InkLink>{' '}
              guidelines in my projects, and have advocated for a11y at work ever
              since.
            </p>
          </div>

          <aside className="relative rounded-sm border border-dashed border-mark/50 bg-surface/60 p-5">
            <Annotation className="not-italic">
              <span className="font-semibold uppercase tracking-[0.14em]">
                Margin note —
              </span>
            </Annotation>
            <Annotation className="mt-2">
              Venezuela → Tenerife → Vigo. Most of the photos here are from the
              Tenerife years, before the move north to Galicia.
            </Annotation>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="desk-heading"
        className="pt-[clamp(3.5rem,8vw,6.5rem)]"
      >
        <SectionHeader title="From the desk" id="desk-heading" />

        <div className="grid gap-5 sm:grid-cols-2">
          {galleryPhotos.map((photo) => {
            const image = galleryImages[photo.key]

            return (
              <figure key={photo.key} className="m-0">
                <div className="overflow-hidden rounded-sm border border-rule bg-mount shadow-[3px_5px_0_rgba(43,42,40,0.07)]">
                  <BlurrableImage
                    blurDataUrl={image.blurDataUri}
                    src={image.imageUri}
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full object-cover"
                    alt={photo.alt}
                  />
                </div>
                <figcaption className="mt-2.5 font-mono text-meta italic leading-relaxed text-ink-soft">
                  {photo.caption}
                </figcaption>
              </figure>
            )
          })}
        </div>

        <figure className="m-0 mt-5">
          <div className="overflow-hidden rounded-sm border border-rule bg-mount shadow-[3px_5px_0_rgba(43,42,40,0.07)]">
            <BlurrableImage
              blurDataUrl={loaderData.familyImage.blurDataUri}
              src={loaderData.familyImage.imageUri}
              width={1920}
              height={1080}
              className="aspect-[16/9] w-full object-cover"
              alt="Rowin with family"
            />
          </div>
          <figcaption className="mt-2.5 font-mono text-meta italic leading-relaxed text-ink-soft">
            the reason for the remote-first life
          </figcaption>
        </figure>
      </section>

      <section
        aria-labelledby="facts-heading"
        className="pt-[clamp(3.5rem,8vw,6.5rem)]"
      >
        <SectionHeader title="Facts about me" id="facts-heading" />
        <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-2">
          {facts.map((fact, i) => (
            <FactAboutMe
              key={fact.title}
              index={i}
              title={fact.title}
              description={fact.description}
            />
          ))}
        </ul>
      </section>

      <KalebtecBridge />
    </main>
  )
}
