import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getTracks = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'tracks',
    limit: 20,
    pagination: false,
  })
  return result.docs
})

export const getCourses = cache(async (trackId?: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'courses',
    limit: 100,
    pagination: false,
    where: trackId ? { track: { equals: trackId } } : undefined,
    depth: 2,
  })
  return result.docs
})

export const getCourseBySlug = cache(async (id: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'courses',
    limit: 1,
    where: { id: { equals: id } },
    depth: 2,
  })
  return result.docs?.[0] ?? null
})

export const getBatches = cache(async (courseId?: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'batches',
    limit: 50,
    pagination: false,
    where: courseId ? { course: { equals: courseId } } : undefined,
    depth: 1,
  })
  return result.docs
})

export const getLecturers = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'lecturers',
    limit: 20,
    pagination: false,
    depth: 1,
  })
  return result.docs
})

export const getEvents = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'events',
    limit: 50,
    pagination: false,
    sort: 'date',
    depth: 1,
  })
  return result.docs
})

export const getTestimonials = cache(async (featured?: boolean) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'testimonials',
    limit: 50,
    pagination: false,
    where: featured ? { featured: { equals: true } } : undefined,
    depth: 1,
  })
  return result.docs
})

export const getFeaturedCourses = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'courses',
    limit: 6,
    pagination: false,
    where: { featured: { equals: true } },
    depth: 2,
  })
  return result.docs
})

export const getSettings = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({
    slug: 'settings',
  })
})

export const getHeader = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({
    slug: 'header',
  })
})

export const getFooter = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({
    slug: 'footer',
  })
})
