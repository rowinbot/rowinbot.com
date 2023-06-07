type PropsOf<C extends (...args: any) => any> = Parameters<C>[0]

type StateSetFunctionArg<S> = S | ((currentState: S) => S)

interface JournalEntryMeta {
  title: string
  description: string
  date: string
  imageSrc?: string
  imageAlt?: string
  imageCredit?: string
  tags: string[]
}

type JournalEntry = JournalEntryMeta & {
  imageBlurData?: string
  formattedDate: string
}
