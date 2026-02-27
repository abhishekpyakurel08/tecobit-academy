import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import { ArrowRight } from 'lucide-react'

import type { Track } from '@/payload-types'

export function TrackCard({ track }: { track: Track }) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[track.icon || 'Code'] || LucideIcons.Code

  return (
    <div className="flex flex-col items-center p-10 rounded-[2.5rem] border border-border bg-card/40 backdrop-blur-md text-center transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(81,115,255,0.15)] hover:-translate-y-2 group h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-12 translate-x-12 group-hover:bg-primary/10 transition-colors" />
      
      <div className="mb-10 p-7 rounded-[2rem] bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl shadow-primary/20">
        <Icon className="h-12 w-12" />
      </div>
      
      <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors">
        {track.name}
      </h3>
      
      <p className="text-base font-bold leading-relaxed text-muted-foreground mb-10 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
        {track.description}
      </p>
      
      <Link
        href={`/academy/courses?track=${track.id}`}
        className="mt-auto inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-500 text-xs font-black uppercase tracking-widest"
      >
        <span>{track.courseCount || 0} Specialties</span>
        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  )
}
