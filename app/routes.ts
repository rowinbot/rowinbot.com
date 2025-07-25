import { route, type RouteConfig, index } from '@react-router/dev/routes'

export const Routes = {
  home: '/',
  about: '/about',
  myExperience: '/my-experience',
  journal: '/journal',
  journalEntry: '/journal/:entryId',
  link: '/ln/:code',
  theme: '/resources/theme',
} as const

export const routes = [
  index('./routes/home.route.tsx'),
  route(Routes.about, './routes/about/about.route.tsx'),
  route(Routes.myExperience, './routes/experience/my-experience.route.tsx'),
  route(Routes.journal, './routes/journal.route.tsx'),
  route(Routes.journalEntry, './routes/journal-entry.route.tsx'),
  route(Routes.link, './routes/link.route.tsx'),
  route(Routes.theme, './routes/theme.route.ts'),
] satisfies RouteConfig

export type Routes = (typeof Routes)[keyof typeof Routes]

export default routes
