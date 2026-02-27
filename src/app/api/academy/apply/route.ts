import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, email, phone, educationLevel, college, courseId, batchId } = body

    if (!fullName || !email || !phone || !educationLevel || !courseId) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'applications',
      data: {
        fullName,
        email,
        phone,
        educationLevel,
        college: college || undefined,
        course: courseId,
        batch: batchId || undefined,
        status: 'pending',
      },
    })

    return NextResponse.json({ message: 'Application submitted successfully.' }, { status: 201 })
  } catch (err: any) {
    console.error('[apply API]', err)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
