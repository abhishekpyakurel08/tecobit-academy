'use client'

import { useState, useMemo } from 'react'
import { Star, Quote, CheckCircle } from 'lucide-react'
import { TestimonialCard } from '@/components/academy/TestimonialCard'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const RATINGS = [0, 5, 4, 3]

export function TestimonialsClient({ testimonials }: { testimonials: any[] }) {
  const [minRating, setMinRating] = useState(0)

  const filtered = useMemo(() => {
    const sorted = [...testimonials].sort(
      (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating,
    )
    return minRating > 0 ? sorted.filter((t) => t.rating >= minRating) : sorted
  }, [testimonials, minRating])

  const avgRating =
    testimonials.length > 0
      ? (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)
      : null
  const fiveStars = testimonials.filter((t) => t.rating === 5).length

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="pointer-events-none absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-accent/10 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 border-white/10 bg-white/10 text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest gap-1.5">
            <Star className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" /> Success Stories
          </Badge>
          <h1 className="mb-8 text-5xl font-black md:text-7xl tracking-tight leading-tight text-white">
            Careers<br />Transformed
          </h1>
          <p className="mx-auto mb-16 text-xl text-primary-foreground/70 leading-relaxed max-w-2xl">
            Transformation stories from engineers who redefined their careers through our industry-focused programs.
          </p>

          {/* Aggregate stats */}
          {avgRating && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 lg:p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex flex-col items-center justify-center p-4">
                <div className="flex items-center gap-2 text-4xl font-black text-white mb-2">
                  {avgRating} <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Avg Rating</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border-l border-white/10">
                <div className="text-4xl font-black text-white mb-2">{testimonials.length}+</div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Verified Reviews</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border-t lg:border-t-0 lg:border-l border-white/10">
                <div className="text-4xl font-black text-white mb-2">{fiveStars}</div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">5-Star Reviews</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border-t lg:border-t-0 lg:border-l border-white/10">
                <div className="text-4xl font-black text-emerald-400 mb-2">95%</div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Placement Rate</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Grid + Filters ───────────────────────────────────── */}
      <section className="container mx-auto px-4 py-24">
        {/* Rating filter */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-border pb-10">
          <div className="flex flex-wrap gap-3">
            {RATINGS.map((r) => (
              <button key={r} onClick={() => setMinRating(r)}
                className={`flex items-center gap-2 rounded-xl border px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${minRating === r
                  ? 'bg-primary border-primary text-primary-foreground shadow-lg -translate-y-0.5'
                  : 'border-border text-muted-foreground hover:bg-muted/50'}`}>
                {r === 0 ? 'All Stories' : (
                  <><Star className={`h-4 w-4 ${minRating === r ? 'fill-yellow-300 text-yellow-300' : 'fill-muted-foreground text-muted-foreground'}`} /> {r}+ Stars</>
                )}
              </button>
            ))}
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground" aria-live="polite">
            {filtered.length} Stor{filtered.length !== 1 ? 'ies' : 'y'}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 flex flex-col items-center text-center max-w-lg mx-auto bg-muted/30 rounded-[3rem] border border-border p-12">
            <div className="h-20 w-20 rounded-full bg-card flex items-center justify-center mb-6 shadow-sm">
              <Quote className="h-8 w-8 text-muted-foreground/30 rotate-180" />
            </div>
            <p className="text-2xl font-bold mb-3">No matching reviews</p>
            <p className="text-muted-foreground mb-8">Try a lower rating threshold.</p>
            <button onClick={() => setMinRating(0)} className="rounded-xl bg-primary text-primary-foreground px-8 py-3 font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
          </div>
        )}
      </section>

      {/* ── Bottom proof section ──────────────────────────────── */}
      <section className="bg-primary py-24 text-white border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-black md:text-5xl mb-12 tracking-tight">
            Built for the <span className="text-yellow-400">Industry</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {['Rigorous Code Reviews', 'Algorithm Whiteboarding', 'System Architecture', 'Agile SDLC Simulation', 'Production CI/CD', 'Mock Tech Interviews'].map((b) => (
              <div key={b} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-5 py-3 backdrop-blur">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-sm">{b}</span>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Link href="/academy/apply" className="inline-flex items-center gap-2 rounded-xl bg-white text-primary px-12 py-4 text-sm font-black uppercase tracking-widest shadow-2xl hover:-translate-y-1 hover:bg-white/90 transition-all">
              Apply for Next Intake
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
