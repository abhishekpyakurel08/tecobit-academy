import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import type { Event } from '@/payload-types'

const typeConfig: Record<string, { label: string; className: string }> = {
  workshop: { label: 'Workshop', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  webinar: { label: 'Webinar', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  hackathon: { label: 'Hackathon', className: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' },
  meetup: { label: 'Meetup', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
}

export function EventCard({ event }: { event: Event }) {
  const imageUrl = typeof event.image === 'object' && event.image?.url ? event.image.url : null
  const typeInfo = typeConfig[event.type ?? ''] ?? null
  const isUpcoming = new Date(event.date) > new Date()
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

  return (
    <article className="group flex flex-col rounded-[2rem] border border-border bg-card/60 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500">
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {imageUrl ? (
          <Image src={imageUrl} alt={event.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 text-primary/20">
            <div className="h-12 w-12 mb-3 opacity-30 animate-pulse bg-primary/20 rounded-lg" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Tecobit Academy Event</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {typeInfo && (
          <span className={`absolute left-4 top-4 z-10 rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md ${typeInfo.className}`}>
            {typeInfo.label}
          </span>
        )}
        {isUpcoming && (
          <span className="absolute right-4 top-4 z-10 flex h-7 items-center rounded-xl bg-emerald-500 px-4 text-[10px] font-black uppercase tracking-widest text-white shadow-xl animate-pulse">
            Upcoming
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-8">
        <div className="mb-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
          <Calendar className="h-4 w-4" />
          {formattedDate}
          {event.time && <span className="opacity-40">· {event.time}</span>}
        </div>
        <h3 className="font-black text-xl text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2 mb-4 tracking-tight">
          {event.title}
        </h3>
        <p className="text-sm font-bold text-muted-foreground/80 line-clamp-3 mb-8 flex-1 leading-relaxed">{event.description}</p>
        <div className="flex items-center justify-between pt-6 border-t border-border/50 gap-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground truncate">
            <MapPin className="h-4 w-4 shrink-0 text-primary/40" />
            <span className="truncate">{event.location}</span>
          </div>
          {event.link && (
            <a href={event.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors shrink-0 group/link">
              Details <ExternalLink className="h-4 w-4 transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
