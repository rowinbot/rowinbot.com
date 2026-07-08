import { DraftLine } from './draft-line'

export interface Draft {
  title: string
  pillar: string
}

interface DeskDraftsProps {
  drafts: Draft[]
}

export function DeskDrafts({ drafts }: DeskDraftsProps) {
  return (
    <div className="mt-8">
      <div className="mb-3.5 flex items-baseline gap-2.5">
        <h3 className="m-0 font-display text-base font-extrabold tracking-tight text-ink">
          On the desk
        </h3>
        <span className="font-mono text-meta tracking-[0.04em] text-ink-soft">
          — drafts in progress
        </span>
      </div>
      <ul className="m-0 list-none border-t border-dashed border-rule p-0">
        {drafts.map((draft) => (
          <DraftLine
            key={draft.title}
            title={draft.title}
            pillar={draft.pillar}
          />
        ))}
      </ul>
    </div>
  )
}
