type PropsOf<C extends React.JSXElementConstructor<never>> =
  React.ComponentProps<C>

type StateSetFunctionArg<S> = S | ((currentState: S) => S)

interface JournalEntryMeta {
  title: string
  description: string
  date: string
  imageSrc?: string
  imageBlurUri?: string
  imageAlt?: string
  formattedDate?: string
  imageCredit?: string
  tags: string[]
}

interface JournalIndexEntry extends JournalEntryMeta {
  id: string
}
