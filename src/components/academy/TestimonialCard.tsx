import { Star, Quote } from 'lucide-react'
import Image from 'next/image'
import type { Testimonial } from '@/payload-types'

const avatarColors = [
  'from-blue-400 to-indigo-500',
  'from-violet-400 to-purple-500',
  'from-emerald-400 to-teal-500',
  'from-orange-400 to-amber-500',
  'from-rose-400 to-pink-500',
  'from-cyan-400 to-sky-500',
]

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

function getColorIndex(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return Math.abs(hash) % avatarColors.length
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const colorClass = avatarColors[getColorIndex(testimonial.studentName)]
  const initials = getInitials(testimonial.studentName)
  const imageUrl = typeof testimonial.image === 'object' && testimonial.image?.url ? testimonial.image.url : null

  return (
    <article className="group relative flex flex-col rounded-[2.5rem] border border-border bg-card/40 backdrop-blur-md p-8 shadow-sm hover:shadow-[0_32px_64px_-12px_rgba(81,115,255,0.1)] transition-all duration-500 hover:-translate-y-2">
      {/* Decorative quote */}
      <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-all duration-500 pointer-events-none group-hover:scale-110">
        <Quote className="h-12 w-12 rotate-180" />
      </div>

      {/* Stars */}
      <div className="mb-6 flex gap-1 items-center" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'fill-muted/20 text-muted/20'}`} />
          ))}
        </div>
        {testimonial.featured && (
          <span className="ml-4 rounded-lg bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            Hall of Fame
          </span>
        )}
      </div>

      {/* Quote */}
      <blockquote className="mb-8 flex-1 text-base font-bold leading-relaxed text-foreground/80 italic tracking-tight">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 pt-8 border-t border-border/50">
        <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${colorClass} text-base font-black text-white shadow-xl overflow-hidden ring-4 ring-white/5`}>
          {imageUrl ? (
            <Image src={imageUrl} alt={testimonial.studentName} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="56px" />
          ) : (
            <span className="relative z-10">{initials}</span>
          )}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="min-w-0">
          <p className="font-black text-lg text-foreground truncate tracking-tight">{testimonial.studentName}</p>
          <div className="flex flex-col">
            {testimonial.currentPosition && (
              <p className="text-xs font-bold text-primary truncate uppercase tracking-widest">{testimonial.currentPosition}</p>
            )}
            {testimonial.graduationYear && (
              <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] mt-1">
                Alumni Class of {testimonial.graduationYear}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
