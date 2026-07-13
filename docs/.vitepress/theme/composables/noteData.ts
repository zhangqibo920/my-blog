// Auto-scan note files at build time
// import.meta.glob resolves relative to THIS file's location
const noteModules = import.meta.glob('../../../notes/*.md', { eager: true })

export function getNoteDates(): Record<string, number> {
  const dates: Record<string, number> = {}
  for (const path of Object.keys(noteModules)) {
    const match = path.match(/(\d{4}-\d{2}-\d{2})\.md$/)
    if (match) {
      const date = match[1]
      dates[date] = (dates[date] || 0) + 1
    }
  }
  return dates
}
