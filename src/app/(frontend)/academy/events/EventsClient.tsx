'use client'

import { useState, useMemo } from 'react'
import { Zap, Monitor, Trophy, Users, Filter, Calendar, Sparkles, MapPin } from 'lucide-react'
import { EventCard } from '@/components/academy/EventCard'
import Link from 'next/link'

const EVENT_TYPES = [
  { value: 'all', label: 'All Events', icon: Filter },
  { value: 'workshop', label: 'Workshops', icon: Zap },
  { value: 'webinar', label: 'Webinars', icon: Monitor },
  { value: 'hackathon', label: 'Hackathons', icon: Trophy },
  { value: 'meetup', label: 'Meetups', icon: Users },
] as const

export function EventsClient({ events }: { events: any[] }) {
  const [activeType, setActiveType] = useState('all')

  const filtered = useMemo(() => {
    if (activeType === 'all') return events
    return events.filter((e) => e.type === activeType)
  }, [events, activeType])

  const now = new Date()
  const upcoming = filtered.filter((e) => new Date(e.date) >= now)
  const past = filtered.filter((e) => new Date(e.date) < now)
  const upcomingCount = events.filter((e) => new Date(e.date) > now).length

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent/20 blur-[100px]" />
        <div className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 h-64 w-64 rounded-full bg-white/5 blur-[80px]" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary-foreground/70">
                <Sparkles className="h-3.5 w-3.5" /> Community Events
              </div>
              <h1 className="mb-6 text-5xl font-black md:text-7xl tracking-tight leading-tight text-white">
                Connect. Build. Grow.
              </h1>
              <p className="text-xl text-primary-foreground/60 leading-relaxed max-w-xl">
                Experience the nexus of innovation. Join our workshops, collaborative hackathons, and expert-led webinars designed for builders.
              </p>
            </div>

            {/* Summary card */}
            <div className="hidden lg:block w-full max-w-sm">
              <div className="glass-card rounded-[2rem] border-white/10 border p-8 shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Calendar className="h-24 w-24 text-white" />
                </div>
                <div className="relative z-10 space-y-6">
                  <div>
                    <p className="text-5xl font-black text-white">{upcomingCount}</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400 mt-1">Upcoming Events</p>
                  </div>
                  <div className="h-px w-12 bg-white/10" />
                  <p className="text-sm text-white/50 leading-relaxed italic">
                    &ldquo;Your network is your net worth. Don&apos;t miss the next session.&rdquo;
                  </p>
                  <Link href="/academy/apply" className="flex items-center justify-center gap-2 w-full rounded-xl bg-white text-primary py-3 text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-all">
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters + Grid ───────────────────────────────────── */}
      <section className="container mx-auto px-4 py-20">
        {/* Type filter */}
        <div className="mb-12 flex flex-wrap gap-3">
          {EVENT_TYPES.map(({ value, label, icon: Icon }) => (
            <button key={value} onClick={() => setActiveType(value)}
              className={`flex items-center gap-2 rounded-2xl border px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeType === value
                ? 'bg-primary text-primary-foreground border-primary shadow-xl -translate-y-0.5'
                : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-muted/30'}`}>
              <Icon className={`h-4 w-4 ${activeType === value ? 'text-yellow-300' : 'text-primary/50'}`} />
              {label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground bg-muted/30 px-5 py-3 rounded-full">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
            {filtered.length} Found
          </div>
        </div>

        {/* Event grids */}
        {upcoming.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Upcoming Events
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div className="opacity-60">
            <h2 className="text-2xl font-black mb-8 text-muted-foreground">Past Events</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-32 flex flex-col items-center text-center max-w-md mx-auto border-t pt-20">
            <div className="h-24 w-24 rounded-[2rem] bg-muted/50 flex items-center justify-center mb-8 rotate-12">
              <Trophy className="h-10 w-10 text-muted-foreground/20" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No events in this category</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">Try a different filter to discover more.</p>
            <button onClick={() => setActiveType('all')}
              className="rounded-full border border-primary text-primary px-10 py-3 font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-all">
              Show All Events
            </button>
          </div>
        )}
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="bg-muted/30 py-24 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">Host Your Own Workshop</h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                Are you an industry expert? Share your knowledge with our high-achieving student community. We provide the platform, the audience, and the infrastructure.
              </p>
              <div className="flex gap-4">
                <Link href="/academy/apply" className="inline-flex items-center gap-2 rounded-2xl bg-primary text-primary-foreground px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all">
                  Apply to Speak
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="relative rounded-[2.5rem] bg-gradient-to-br from-primary to-primary/70 p-12 text-white shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                <div className="relative z-10 text-center">
                  <MapPin className="h-12 w-12 text-white/40 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-2">Visit Our Hub</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Anamnagar, Kathmandu<br />Nepal&apos;s epicenter for tech talent.
                  </p>
                  <hr className="border-white/10 my-6" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Open Mon–Fri · 9AM–6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
