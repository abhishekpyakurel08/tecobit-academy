import type { Metadata } from 'next'
import { getEvents } from '@/utilities/academy-data'
import { EventsClient } from './EventsClient'

export const metadata: Metadata = {
  title: 'Events | Tecobit Academy',
  description: 'Workshops, webinars, hackathons and meetups at Tecobit Academy.',
}

export default async function EventsPage() {
  const events = await getEvents()
  return (
    <main className="min-h-screen bg-background">
      <EventsClient events={events} />
    </main>
  )
}
