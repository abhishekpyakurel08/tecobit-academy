import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, BarChart2, Calendar, Users, CheckCircle2, ImageIcon, BookOpen } from 'lucide-react'
import { getCourseBySlug, getBatches, getLecturers } from '@/utilities/academy-data'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const course = await getCourseBySlug(id)
  if (!course) return { title: 'Course Not Found' }
  return {
    title: `${course.title} | Tecobit Academy`,
    description: course.description,
  }
}

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params
  const [course, allBatches, allLecturers] = await Promise.all([
    getCourseBySlug(id),
    getBatches(id),
    getLecturers(),
  ])

  if (!course) return notFound()

  const courseLecturers = allLecturers.filter((l) =>
    Array.isArray(l.courses) && l.courses.some((c: any) => (typeof c === 'object' ? c.id : c) === id),
  )
  const openBatches = allBatches.filter((b) => b.status === 'open')

  const trackName = typeof course.track === 'object' ? course.track?.name : ''
  const imageUrl = typeof course.image === 'object' && course.image?.url ? course.image.url : null

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <Link href="/academy/courses" className="mb-6 inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> All Courses
          </Link>
          {trackName && (
            <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest">
              {trackName}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">{course.title}</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mb-8">{course.description}</p>
          <div className="flex flex-wrap gap-6 text-sm font-semibold text-primary-foreground/60">
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{course.duration}</span>
            <span className="flex items-center gap-2"><BarChart2 className="h-4 w-4" />{course.level}</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{openBatches.length} open batch{openBatches.length !== 1 ? 'es' : ''}</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 grid gap-12 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Course Image */}
          {imageUrl && (
            <div className="overflow-hidden rounded-2xl border border-border aspect-video">
              <img src={imageUrl} alt={course.title} className="h-full w-full object-cover" />
            </div>
          )}

          {/* About */}
          <div>
            <h2 className="text-xl font-black mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              About This Course
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{course.fullDescription}</p>
          </div>

          {/* Syllabus */}
          {Array.isArray(course.syllabus) && course.syllabus.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-black flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Course Syllabus
              </h2>
              <div className="grid gap-6">
                {course.syllabus.map((item: any, i: number) => (
                  <div key={i} className="group rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-primary/20">
                    <div className="bg-muted/30 p-5 flex justify-between items-center group-hover:bg-primary/5 transition-colors">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-1 block">Module {i + 1}</span>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      {Array.isArray(item.lessons) && item.lessons.length > 0 && (
                        <div className="grid gap-2 pt-2">
                          {item.lessons.map((lesson: any, j: number) => (
                            <div key={j} className="flex items-center gap-3 text-sm text-foreground/80">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {lesson.topic}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lecturers */}
          {courseLecturers.length > 0 && (
            <div>
              <h2 className="text-xl font-black mb-6">Your Instructors</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {courseLecturers.map((lecturer) => {
                  const photoUrl = typeof lecturer.photo === 'object' && lecturer.photo?.url ? lecturer.photo.url : null
                  return (
                    <div key={lecturer.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 overflow-hidden">
                        {photoUrl ? (
                          <img src={photoUrl} alt={lecturer.name} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-xl font-black text-primary">
                            {lecturer.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{lecturer.name}</p>
                        <p className="text-xs text-primary font-semibold">{lecturer.role}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{lecturer.experience}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply CTA */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sticky top-4">
            <h3 className="font-black text-lg mb-4">Enroll in This Course</h3>
            {openBatches.length > 0 ? (
              <div className="space-y-3 mb-6">
                {openBatches.map((batch) => (
                  <div key={batch.id} className="rounded-xl border border-border bg-muted/50 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-sm">{batch.name}</p>
                      <span className="text-[10px] font-black uppercase tracking-widest rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5">
                        Open
                      </span>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(batch.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {batch.seatsRemaining} seats left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mb-6">No open batches right now. Check back soon!</p>
            )}
            <Link
              href={`/academy/apply?course=${course.id}`}
              className="block w-full text-center rounded-xl bg-primary text-primary-foreground px-6 py-3.5 font-black uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors shadow-lg"
            >
              Apply Now
            </Link>
          </div>

          {/* Quick facts */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-black text-sm uppercase tracking-widest mb-4 text-muted-foreground">Course Overview</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Duration', value: course.duration },
                { label: 'Level', value: course.level },
                { label: 'Track', value: trackName },
              ].map(({ label, value }) => (
                <li key={label} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <span className="text-muted-foreground font-medium">{label}</span>
                  <span className="font-bold">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
