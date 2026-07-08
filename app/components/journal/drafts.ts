import { type Draft } from './desk-drafts'

/** The "on the desk" queue — essays 1–4 from docs/journal-plan.md, no dates. */
export const journalDrafts: Draft[] = [
  {
    title: "Re-architecting a live platform while it's live",
    pillar: 'FanFest',
  },
  {
    title: "A bad first plan: McDonald's Theory at a replatform kickoff",
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
