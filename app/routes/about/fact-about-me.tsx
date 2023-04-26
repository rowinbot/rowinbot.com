export function FactAboutMe(props: { title: string; description: string }) {
  return (
    <li className="p-8 rounded-xl bg-blue-50 dark:bg-black border-[1px] border-blue-900 dark:border-slate-800 space-y-6">
      <h3 className="text items-start leading-tight font-bold uppercase">
        {props.title}
      </h3>

      <p className="text-lg font-medium leading-loose dark:text-slate-100 text-slate-700">
        {props.description}
      </p>
    </li>
  )
}
