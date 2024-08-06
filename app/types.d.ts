type PropsOf<C extends (...args: any) => any> = Parameters<C>[0]

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
