'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Search, GraduationCap,
  Users, BookOpen, Award, Globe,
  Clock, Star, MapPin, Calendar,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Course, Track, Testimonial, Event, Lecturer, Setting } from '@/payload-types'

interface Props {
  courses: Course[]
  tracks: Track[]
  testimonials: Testimonial[]
  events: Event[]
  lecturers: Lecturer[]
  settings?: Setting
}

// ── Tiny helpers ──────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#5173ff] mb-4">
      {children}
    </p>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight leading-tight">
      {children}
    </h2>
  )
}

function Divider() {
  return <div className="h-px w-full bg-border my-16 md:my-24" />
}

// ── Level pill colours ────────────────────────────────────────────────────────
const levelColor: Record<string, string> = {
  beginner:     'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
  intermediate: 'bg-blue-50   text-blue-600    dark:bg-blue-950/40    dark:text-blue-400',
  advanced:     'bg-violet-50 text-violet-600  dark:bg-violet-950/40  dark:text-violet-400',
}

// ═════════════════════════════════════════════════════════════════════════════
export function HomePageContent({ courses, tracks, testimonials, events, settings }: Props) {
  const [query, setQuery] = useState('')
  const featuredCourses   = courses.filter(c => c.featured).slice(0, 6)
  const upcomingEvents    = events.slice(0, 3)
  const topTestimonials   = testimonials.slice(0, 3)

  const stats = [
    { Icon: Users,    value: '2,500+', label: 'Graduates' },
    { Icon: BookOpen, value: String(courses.length || '40+'), label: 'Courses' },
    { Icon: Award,    value: '95%',    label: 'Hired' },
    { Icon: Globe,    value: '50+',    label: 'Partners' },
  ]

  return (
    <div className="bg-background text-foreground">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#5173ff] overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(255,255,255,0.12),transparent)] pointer-events-none" />

        <div className="container mx-auto px-4 pt-20 pb-24 md:pt-28 md:pb-32 relative">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-black uppercase tracking-[0.2em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00f3ff] animate-pulse" />
              Spring 2026 Admissions Open
            </span>
          </div>

          <h1 className="text-center text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.0] mb-6 max-w-4xl mx-auto">
            {/* @ts-expect-error - heroTitle missing in generated types */}
            {settings?.heroTitle || 'Level Up Your\nTech Career'}
          </h1>

          <p className="text-center text-white/65 text-lg md:text-xl font-medium max-w-xl mx-auto mb-10 leading-relaxed">
            {/* @ts-expect-error - heroSubtitle missing in generated types */}
            {settings?.heroSubtitle || 'Industry-led programs designed to get you hired — fast.'}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Button
              asChild
              className="h-12 px-8 rounded-2xl bg-white text-[#5173ff] hover:bg-white/90 text-sm font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              <Link href="/academy/courses">Browse Courses <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button
              asChild
              className="h-12 px-8 rounded-2xl bg-transparent border border-white/25 text-white hover:bg-white/10 text-sm font-black uppercase tracking-widest transition-all"
            >
              <Link href="/academy/apply">Apply Now</Link>
            </Button>
          </div>

          {/* Search bar */}
          <form
            onSubmit={e => { e.preventDefault(); if (query.trim()) window.location.href = `/academy/courses?q=${encodeURIComponent(query)}` }}
            className="max-w-xl mx-auto"
          >
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-5 py-3">
              <Search className="h-4 w-4 text-white/40 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search courses, tracks…"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 outline-none font-medium"
              />
              {query && (
                <button
                  type="submit"
                  className="shrink-0 text-[10px] font-black uppercase tracking-widest text-[#00f3ff] hover:text-white transition-colors"
                >
                  Search
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Wave bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-background" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </section>

      {/* ══ STATS BAR ═════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-4 pt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {stats.map(({ Icon, value, label }) => (
            <div key={label} className="bg-background flex flex-col items-center justify-center py-10 gap-2 group hover:bg-[#5173ff]/5 transition-colors">
              <Icon className="h-5 w-5 text-[#5173ff] mb-1" />
              <p className="text-3xl font-black text-foreground tracking-tight">{value}</p>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4">
        <Divider />

        {/* ══ LEARNING TRACKS ═══════════════════════════════════════════════ */}
        {tracks.length > 0 && (
          <>
            <div className="flex items-end justify-between mb-10">
              <div>
                <SectionLabel>Tracks</SectionLabel>
                <SectionHeading>Choose Your Path</SectionHeading>
              </div>
              <Link
                href="/academy/courses"
                className="hidden md:flex items-center gap-1 text-xs font-black uppercase tracking-widest text-[#5173ff] hover:gap-2 transition-all"
              >
                All courses <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tracks.map((track) => (
                <Link
                  key={track.id}
                  href={`/academy/courses?track=${track.id}`}
                  className="group flex flex-col gap-3 p-6 rounded-2xl border border-border bg-card hover:border-[#5173ff]/30 hover:shadow-lg hover:shadow-[#5173ff]/5 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icon placeholder */}
                  <div className="h-10 w-10 rounded-xl bg-[#5173ff]/10 flex items-center justify-center group-hover:bg-[#5173ff]/20 transition-colors">
                    <BookOpen className="h-5 w-5 text-[#5173ff]" />
                  </div>
                  <div>
                    <h3 className="font-black text-foreground text-base leading-tight mb-1">{track.name}</h3>
                    {track.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{track.description}</p>
                    )}
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#5173ff] opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>

            <Divider />
          </>
        )}

        {/* ══ FEATURED COURSES ══════════════════════════════════════════════ */}
        {featuredCourses.length > 0 && (
          <>
            <div className="flex items-end justify-between mb-10">
              <div>
                <SectionLabel>Featured</SectionLabel>
                <SectionHeading>Top Courses</SectionHeading>
              </div>
              <Link
                href="/academy/courses"
                className="hidden md:flex items-center gap-1 text-xs font-black uppercase tracking-widest text-[#5173ff] hover:gap-2 transition-all"
              >
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredCourses.map((course) => {
                const imageUrl = typeof course.image === 'object' && course.image?.url ? course.image.url : null
                const trackName = typeof course.track === 'object' ? course.track?.name : ''
                const lvl = (course.level ?? '').toLowerCase()
                const lvlClass = levelColor[lvl] ?? 'bg-muted text-muted-foreground'
                return (
                  <Link
                    key={course.id}
                    href={`/academy/courses/${course.id}`}
                    className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-[#5173ff]/30 hover:shadow-xl hover:shadow-[#5173ff]/5 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/9] bg-gradient-to-br from-[#5173ff]/10 to-[#c048ff]/10 overflow-hidden">
                      {imageUrl ? (
                        <img src={imageUrl} alt={course.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <GraduationCap className="h-10 w-10 text-[#5173ff]/20" />
                        </div>
                      )}
                      {trackName && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-black/40 backdrop-blur-sm text-white border border-white/10">
                          {trackName}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-5 gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${lvlClass}`}>
                          {course.level}
                        </span>
                        {course.duration && (
                          <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-bold">
                            <Clock className="h-3 w-3" /> {course.duration}
                          </span>
                        )}
                      </div>
                      <h3 className="font-black text-base text-foreground leading-snug line-clamp-2 group-hover:text-[#5173ff] transition-colors">
                        {course.title}
                      </h3>
                      {course.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                          {course.description}
                        </p>
                      )}
                      <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#5173ff] mt-2">
                        Learn more <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Mobile "See all" */}
            <div className="flex justify-center mt-8 md:hidden">
              <Button asChild variant="outline" className="rounded-2xl font-black uppercase tracking-widest text-xs h-11 px-8">
                <Link href="/academy/courses">All Courses <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            <Divider />
          </>
        )}

        {/* ══ UPCOMING EVENTS ═══════════════════════════════════════════════ */}
        {upcomingEvents.length > 0 && (
          <>
            <div className="flex items-end justify-between mb-10">
              <div>
                <SectionLabel>Events</SectionLabel>
                <SectionHeading>Upcoming Sessions</SectionHeading>
              </div>
              <Link
                href="/academy/events"
                className="hidden md:flex items-center gap-1 text-xs font-black uppercase tracking-widest text-[#5173ff] hover:gap-2 transition-all"
              >
                All events <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {upcomingEvents.map((event) => {
                const date = event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null
                return (
                  <Link
                    key={event.id}
                    href={`/academy/events`}
                    className="group flex flex-col sm:flex-row gap-5 items-start sm:items-center p-5 rounded-2xl border border-border bg-card hover:border-[#5173ff]/30 hover:shadow-md transition-all duration-300"
                  >
                    {/* Date badge */}
                    <div className="shrink-0 h-16 w-16 rounded-2xl bg-[#5173ff]/10 flex flex-col items-center justify-center border border-[#5173ff]/15 group-hover:bg-[#5173ff] group-hover:text-white transition-colors">
                      <Calendar className="h-5 w-5 text-[#5173ff] group-hover:text-white transition-colors" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        {/* @ts-expect-error - eventType missing in generated types */}
                        {event.eventType && (
                          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-[#5173ff]/10 text-[#5173ff]">
                            {/* @ts-expect-error */}
                            {event.eventType}
                          </span>
                        )}
                        {date && (
                          <span className="text-[11px] text-muted-foreground font-bold">{date}</span>
                        )}
                      </div>
                      <h3 className="font-black text-foreground text-base leading-snug line-clamp-1 group-hover:text-[#5173ff] transition-colors">
                        {event.title}
                      </h3>
                      {event.location && (
                        <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1 font-medium">
                          <MapPin className="h-3 w-3 shrink-0" /> {event.location}
                        </p>
                      )}
                    </div>

                    <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-[#5173ff] group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                )
              })}
            </div>

            <Divider />
          </>
        )}

        {/* ══ TESTIMONIALS ══════════════════════════════════════════════════ */}
        {topTestimonials.length > 0 && (
          <>
            <div className="mb-10">
              <SectionLabel>Students</SectionLabel>
              <SectionHeading>What Our Alumni Say</SectionHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {topTestimonials.map((t) => {
                const imageUrl = typeof t.image === 'object' && t.image?.url ? t.image.url : null
                const initials = typeof t.studentName === 'string' ? t.studentName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : '?'
                return (
                  <div
                    key={t.id}
                    className="flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card hover:border-[#5173ff]/20 transition-colors"
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < (t.rating ?? 5) ? 'fill-amber-400 text-amber-400' : 'text-muted/20 fill-muted/20'}`} />
                      ))}
                    </div>
                    {/* Quote */}
                    <blockquote className="text-sm text-foreground/80 leading-relaxed flex-1 font-medium italic">
                      &ldquo;{t.content}&rdquo;
                    </blockquote>
                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                      <div className="h-9 w-9 rounded-xl bg-[#5173ff]/10 flex items-center justify-center text-[11px] font-black text-[#5173ff] overflow-hidden shrink-0">
                        {imageUrl ? (
                          <img src={imageUrl} alt={t.studentName} className="h-full w-full object-cover" />
                        ) : initials}
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-sm text-foreground truncate">{t.studentName}</p>
                        {t.currentPosition && (
                          <p className="text-[10px] font-bold text-[#5173ff] uppercase tracking-widest truncate">{t.currentPosition}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <Divider />
          </>
        )}

        {/* ══ FINAL CTA ═════════════════════════════════════════════════════ */}
        <section className="rounded-3xl bg-[#5173ff] relative overflow-hidden mb-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-20%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
          <div className="relative px-8 py-16 md:py-20 text-center">
            <div className="inline-flex h-14 w-14 rounded-2xl bg-white/10 items-center justify-center mb-6 mx-auto">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Ready to start your journey?
            </h2>
            <p className="text-white/65 text-base font-medium max-w-md mx-auto mb-8">
              Talk to an advisor and find the program that fits your goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                asChild
                className="h-12 px-8 rounded-2xl bg-white text-[#5173ff] hover:bg-white/90 font-black uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                <Link href="/academy/apply">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button
                asChild
                className="h-12 px-8 rounded-2xl bg-transparent border border-white/25 text-white hover:bg-white/10 font-black uppercase tracking-widest text-sm transition-all"
              >
                <Link href="/academy/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
