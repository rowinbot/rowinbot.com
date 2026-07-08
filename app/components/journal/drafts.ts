import { type Draft } from './desk-drafts'

/** The "on the desk" queue — essays 1–4 from docs/journal-plan.md, no dates. */
export const journalDrafts: Draft[] = [
  {
    title: 'Re-architecting a live platform without taking it offline',
    pillar: 'FanFest',
  },
  {
    title: 'Kicking off a replatform with a deliberately bad plan',
    pillar: 'Leadership',
  },
  {
    title: 'Deterministic replay for AI agents',
    pillar: 'Agents',
  },
  {
    title: 'MCP-native browser control: typed, capability-gated tool contracts',
    pillar: 'browxai',
  },
]
