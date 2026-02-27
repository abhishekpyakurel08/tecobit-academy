import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield, Clock, Users } from 'lucide-react'
import { getCourses, getBatches, getTracks } from '@/utilities/academy-data'
import { ApplyForm } from './ApplyForm'

export const metadata: Metadata = {
  title: 'Apply | Tecobit Academy',
  description: 'Apply to join Tecobit Academy and kickstart your tech career.',
}

type Props = { searchParams: Promise<{ course?: string }> }

export default async function ApplyPage({ searchParams }: Props) {
  const { course } = await searchParams
  const [courses, batches, tracks] = await Promise.all([
    getCourses(), 
    getBatches(),
    getTracks()
  ])

  const perks = [
    { icon: Clock, title: 'Flexible Schedules', desc: 'Weekend and evening batches available to fit your lifestyle.' },
    { icon: Users, title: 'Small Cohorts', desc: 'Max 30 students per batch for personalized attention.' },
    { icon: Shield, title: 'Job Guarantee', desc: 'We support your job search until you land your first tech role.' },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <Link href="/academy" className="mb-6 inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Academy
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">Apply to Tecobit Academy</h1>
          <p className="text-primary-foreground/70 text-lg max-w-xl">
            Take the first step toward your tech career. Fill in the form and our team will reach out within 2–3 business days.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 grid gap-12 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <ApplyForm courses={courses} batches={batches} tracks={tracks} preselectedCourseId={course} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {perks.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-sm mb-1">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-border bg-muted/50 p-5 text-sm text-muted-foreground">
            <p className="font-bold text-foreground mb-2">Questions?</p>
            <p>Email us at <a href="mailto:info@tecobit.academy" className="text-primary underline">info@tecobit.academy</a> or call <a href="tel:+97701423456" className="text-primary underline">+977 (01) 423-4567</a>.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
