import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    const { docs } = await payload.find({
      collection: 'lecturers',
      sort: 'name',
    })

    return NextResponse.json(docs)
  } catch (error) {
    console.error('Error fetching lecturers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lecturers' },
      { status: 500 }
    )
  }
}
