import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getCourses, getTracks } from '@/utilities/academy-data'
import { CoursesClient } from './CoursesClient'

export const metadata: Metadata = {
  title: 'Courses | Tecobit Academy',
  description: 'Browse all courses at Tecobit Academy — AI, ML, Web Development, Data Science, and more.',
}

type Props = { searchParams: Promise<{ track?: string }> }

export default async function CoursesPage({ searchParams }: Props) {
  const { track } = await searchParams
  const activeTrack = track ?? 'all'

  const [courses, tracks] = await Promise.all([
    getCourses(activeTrack !== 'all' ? activeTrack : undefined),
    getTracks(),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Suspense>
        <CoursesClient courses={courses} tracks={tracks} activeTrack={activeTrack} />
      </Suspense>
    </main>
  )
}
