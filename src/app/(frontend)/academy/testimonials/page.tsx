import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getTestimonials } from '@/utilities/academy-data'
import { TestimonialCard } from '@/components/academy/TestimonialCard'
import { SectionHeading } from '@/components/academy/SectionHeading'

export const metadata: Metadata = {
  title: 'Student Testimonials | Tecobit Academy',
  description: 'Read what our graduates say about their experience at Tecobit Academy.',
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <Link href="/academy" className="mb-6 inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Academy
          </Link>
          <SectionHeading
            title="Student Success Stories"
            subtitle="Hear directly from graduates who transformed their careers with Tecobit Academy."
            align="left"
            className="[&_div]:bg-white/40 [&_h2]:text-white [&_p]:text-primary-foreground/70"
          />
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {testimonials.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-2xl font-bold text-muted-foreground">No testimonials yet</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
