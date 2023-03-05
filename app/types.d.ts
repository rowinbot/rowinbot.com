type PropsOf<C extends (...args: any) => any> = Parameters<C>[0]

interface JournalEntryMeta {
  title: string
  description: string
  date: string
  imageSrc: string
  imageAlt: string
  imageCredit: string
}
