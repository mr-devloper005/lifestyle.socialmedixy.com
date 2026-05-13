import { TaskListPage } from '@/components/tasks/task-list-page'
import { buildTaskMetadata } from '@/lib/seo'

export const revalidate = 3
export const generateMetadata = () => buildTaskMetadata('mediaDistribution')

export default async function UpdatesPage({ searchParams }: { searchParams?: Promise<{ category?: string; window?: string }> }) {
  const p = (await searchParams) || {}
  return <TaskListPage task="mediaDistribution" category={p.category} window={p.window} />
}
