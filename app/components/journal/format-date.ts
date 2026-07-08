const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

/** Frontmatter dates are stored DD/MM/YYYY; render them as "10 Oct 2024". */
export function formatJournalDate(date: string): string {
  const [day, month, year] = date.split('/')
  const monthIndex = Number(month) - 1

  if (!day || !year || Number.isNaN(monthIndex) || !MONTHS[monthIndex]) {
    return date
  }

  return `${Number(day)} ${MONTHS[monthIndex]} ${year}`
}
