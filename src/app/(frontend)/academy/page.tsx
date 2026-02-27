import type { Metadata } from 'next'
import { getCourses, getTracks, getTestimonials, getEvents, getLecturers, getSettings } from '@/utilities/academy-data'
import { AcademyPageContent } from '@/components/AcademyPageContent'

export const metadata: Metadata = {
  title: 'Tecobit Academy | Engineering Programs',
  description: 'Explore our engineering programs and master the most in-demand tech skills.',
}

export default async function AcademyPage() {
  const [courses, tracks, testimonials, events, lecturers, settings] = await Promise.all([
    getCourses(),
    getTracks(),
    getTestimonials(true),
    getEvents(),
    getLecturers(),
    getSettings(),
  ])

  return (
    <AcademyPageContent 
      courses={courses} 
      tracks={tracks} 
      testimonials={testimonials} 
      events={events} 
      lecturers={lecturers}
      settings={settings}
    />
  )
}
