import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    // Fetch all academy data in parallel
    const [courses, tracks, testimonials, events, lecturers] = await Promise.all([
      payload.find({
        collection: 'courses',
        depth: 2,
        sort: '-createdAt',
      }),
      payload.find({
        collection: 'tracks',
        sort: 'name',
      }),
      payload.find({
        collection: 'testimonials',
        sort: '-createdAt',
      }),
      payload.find({
        collection: 'events',
        sort: 'date',
      }),
      payload.find({
        collection: 'lecturers',
        sort: 'name',
      }),
    ])

    // Get settings
    const settings = await payload.findGlobal({
      slug: 'settings',
    })

    return NextResponse.json({
      courses: courses.docs,
      tracks: tracks.docs,
      testimonials: testimonials.docs,
      events: events.docs,
      lecturers: lecturers.docs,
      settings,
    })
  } catch (error) {
    console.error('Error fetching academy data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch academy data' },
      { status: 500 }
    )
  }
}
