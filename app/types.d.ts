type PropsOf<C extends (...args: any) => any> = Parameters<C>[0]

interface JournalEntryMeta {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}
