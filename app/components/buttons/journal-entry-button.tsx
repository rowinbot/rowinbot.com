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
      className="text-sm app-text cursor-pointer space-y-8 group"
    >
      <div className="aspect-[6/7] rounded-xl group-hover:ring-4 transition-all duration-300 ease-in-out ring-offset-4 ring-offset-white dark:ring-offset-slate-900 ring-[#144fff] overflow-hidden relative group/image bg-black">
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

      <div className="space-y-4">
        <p className="text-xl font-medium">{props.entry.title}</p>
        <p className="text-base">{props.entry.description}</p>

        <p>
          <span className="font-medium text-lg after:transition-all after:duration-200 after:ease-in-out after:h-1 after:bg-black dark:after:bg-white after:absolute after:left-0 relative after:-bottom-2 after:right-[100%] group-hover:after:right-0">
            Read more
          </span>
        </p>
      </div>
    </Link>
  )
}
