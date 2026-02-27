'use client'

import { useState, useMemo } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, Filter, BookOpen, X, ArrowRight, GraduationCap } from 'lucide-react'
import { CourseCard } from '@/components/academy/CourseCard'

const LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']

export function CoursesClient({ courses, tracks, activeTrack }: {
  courses: any[]
  tracks: any[]
  activeTrack: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [search, setSearch] = useState(initialQuery)
  const [activeLevel, setActiveLevel] = useState('All Levels')

  function setTrack(trackId: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (trackId === 'all') params.delete('track')
    else params.set('track', trackId)
    // Keep the search query if it exists
    if (!search && params.has('q')) params.delete('q')
    router.push(`${pathname}?${params.toString()}`)
  }

  const filtered = useMemo(() => {
    let result = courses
    const query = (search || initialQuery).toLowerCase().trim()
    
    if (query) {
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description?.toLowerCase().includes(query) ||
          (typeof c.track === 'object' ? c.track?.name : '').toLowerCase().includes(query),
      )
    }
    
    if (activeLevel !== 'All Levels') {
      result = result.filter((c) => c.level === activeLevel)
    }
    return result
  }, [courses, search, initialQuery, activeLevel])

  const hasActiveFilters = activeTrack !== 'all' || activeLevel !== 'All Levels' || search.trim()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary-foreground/70">
              <GraduationCap className="h-3.5 w-3.5" /> Academy Tracks
            </div>
            <h1 className="mb-6 text-5xl font-black md:text-6xl tracking-tight leading-tight text-white">
              Master Your<br />Engineering Craft
            </h1>
            <p className="mb-10 text-xl text-primary-foreground/70 leading-relaxed max-w-2xl">
              Join Nepal&apos;s most rigorous tech training programs. From foundational principles to advanced enterprise architecture.
            </p>
            {/* Search */}
            <div className="relative max-w-2xl group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 blur opacity-40 group-focus-within:opacity-80 transition-opacity" />
              <div className="relative flex items-center bg-white/8 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden h-16">
                <Search className="ml-6 h-5 w-5 text-white/40 shrink-0" />
                <input
                  type="search"
                  placeholder="Search by course, track, or skill…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none text-white placeholder:text-white/30 h-full focus:outline-none text-base px-4"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="mr-4 text-white/40 hover:text-white transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters + Grid ───────────────────────────────────── */}
      <section className="container mx-auto px-4 py-16">
        {/* Filter bar */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 border-b border-border pb-10 mb-10">
          {/* Track pills */}
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <Filter className="h-3 w-3" /> Filter by Track
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setTrack('all')}
                className={`rounded-xl border px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${activeTrack === 'all' ? 'bg-primary text-primary-foreground border-primary shadow-lg' : 'border-border text-muted-foreground hover:border-primary/40 hover:text-primary'}`}>
                All Specialties
              </button>
              {tracks.map((t) => (
                <button key={t.id} onClick={() => setTrack(t.id)}
                  className={`rounded-xl border px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${activeTrack === t.id ? 'bg-primary text-primary-foreground border-primary shadow-lg' : 'border-border text-muted-foreground hover:border-primary/40 hover:text-primary'}`}>
                  {t.name}
                </button>
              ))}
            </div>
          </div>
          {/* Level pills */}
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <BookOpen className="h-3 w-3" /> Proficiency Level
            </p>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((lvl) => (
                <button key={lvl} onClick={() => setActiveLevel(lvl)}
                  className={`rounded-xl border px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${activeLevel === lvl ? 'bg-secondary text-secondary-foreground border-secondary shadow-md' : 'border-border text-muted-foreground hover:bg-muted'}`}>
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results meta */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-7 w-1 rounded-full bg-primary" />
            <p className="text-sm font-bold uppercase tracking-widest" aria-live="polite">
              {filtered.length} Program{filtered.length !== 1 ? 's' : ''} Found
            </p>
          </div>
          {hasActiveFilters && (
            <button onClick={() => { setSearch(''); setActiveLevel('All Levels'); setTrack('all') }}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10 rounded-lg px-3 py-1.5 transition-colors">
              Reset All <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Course grid */}
        {filtered.length === 0 ? (
          <div className="py-32 flex flex-col items-center text-center max-w-md mx-auto">
            <div className="h-20 w-20 rounded-3xl bg-muted flex items-center justify-center mb-6">
              <Search className="h-8 w-8 text-muted-foreground/30" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No courses found</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">Try a broader search or different filter combination.</p>
            <button onClick={() => { setSearch(''); setActiveLevel('All Levels'); setTrack('all') }}
              className="rounded-full bg-primary text-primary-foreground px-10 py-3 font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        )}
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="bg-muted/30 py-24 border-t">
        <div className="container mx-auto px-4">
          <div className="rounded-[2.5rem] bg-primary p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 bg-accent/20 blur-[100px]" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <GraduationCap className="h-12 w-12 text-white/40 mx-auto mb-8" />
              <h2 className="text-3xl font-black text-white md:text-4xl mb-6 tracking-tight">
                Can&apos;t find the right course?
              </h2>
              <p className="text-primary-foreground/60 text-base mb-10 leading-relaxed">
                Our curriculum evolves with the industry. Connect with our academic advisors to find a track tailored to your background.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/academy/apply" className="inline-flex items-center gap-2 rounded-2xl bg-white text-primary px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-all">
                  Speak with an Advisor <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/academy/events" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                  Join Local Meetups
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
