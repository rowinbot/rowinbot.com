import { Link } from 'react-router';

import { BlurrableImage } from '../image'

interface JournalEntryButtonProps {
  id: string
  entry: JournalEntryMeta
}
export function JournalEntryButton(props: JournalEntryButtonProps) {
  return (
    <Link
      to={`/journal/${props.id}`}
      className="text-sm cursor-pointer space-y-6 group bg-cyber-surface border border-cyber-border hover:border-cyber-cyan/40 transition-all duration-300 p-4 hover:glow-cyan cyber-corners"
    >
      <div className="aspect-[6/7] rounded-sm overflow-hidden relative group/image bg-black">
        {props.entry.imageBlurUri &&
          props.entry.imageSrc &&
          props.entry.imageAlt && (
            <BlurrableImage
              className="absolute inset-0 h-full w-full object-cover transition-all ease-in-out group-hover:duration-300 duration-75"
              blurDataUrl={props.entry.imageBlurUri}
              src={props.entry.imageSrc}
              width={400}
              height={400}
              alt={props.entry.imageAlt}
            />
          )}
      </div>

      <div className="space-y-3">
        {props.entry.date && (
          <p className="font-mono text-xs text-cyber-cyan/60">{props.entry.date}</p>
        )}
        <p className="text-lg font-medium text-cyber-text">{props.entry.title}</p>
        <p className="text-sm text-cyber-text-dim">{props.entry.description}</p>

        <p>
          <span className="font-mono text-sm text-cyber-cyan after:transition-all after:duration-200 after:ease-in-out after:h-px after:bg-cyber-cyan after:absolute after:left-0 relative after:-bottom-1 after:right-[100%] group-hover:after:right-0">
            {'>'} read_more
          </span>
        </p>
      </div>
    </Link>
  )
}
