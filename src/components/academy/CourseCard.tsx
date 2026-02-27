import Link from 'next/link'
import Image from 'next/image'
import { Clock, Star, ArrowRight } from 'lucide-react'
import type { Course } from '@/payload-types'

const levelStyles: Record<string, string> = {
  beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  advanced: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
}

export function CourseCard({ course }: { course: Course }) {
  const levelKey = (course.level ?? '').toLowerCase()
  const levelClass = levelStyles[levelKey] ?? 'bg-muted text-muted-foreground'
  const imageUrl =
    typeof course.image === 'object' && course.image?.url ? course.image.url : null
  const trackName =
    typeof course.track === 'object' ? course.track?.name : course.trackName ?? ''

  return (
    <Link
      href={`/academy/courses/${course.id}`}
      className="group flex flex-col rounded-[2rem] border border-border bg-card/60 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 text-primary/30">
            <div className="h-12 w-12 mb-2 opacity-20 bg-primary/20 rounded-lg" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Tecobit Academy</span>
          </div>
        )}
        
        {/* Glass Badge - Track */}
        {trackName && (
          <div className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-white drop-shadow-md">
              {trackName}
            </span>
          </div>
        )}

        {/* Featured Pulse Badge */}
        {course.featured && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-amber-400 text-amber-950 px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-xl animate-pulse">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </div>
        )}

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col p-8 bg-gradient-to-b from-transparent to-primary/5 transition-colors group-hover:to-primary/10">
        <div className="flex items-center gap-4 mb-4">
          <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${levelClass}`}>
            {course.level}
          </div>
          <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-wider">{course.duration}</span>
          </div>
        </div>

        <h3 className="font-black text-xl text-foreground group-hover:text-primary transition-colors leading-tight mb-4 min-h-[3rem] line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-2 mb-8 flex-1 font-medium">
          {course.description}
        </p>

        {/* Dynamic Action Button */}
        <div className="flex items-center justify-between group/btn">
          <div className="h-12 w-full rounded-2xl bg-muted group-hover:bg-primary transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden relative">
            <span className="font-black text-xs uppercase tracking-widest text-foreground/60 group-hover:text-primary-foreground group-hover:translate-x-0 transition-all duration-500">
              Start Learning
            </span>
            <ArrowRight className="h-4 w-4 text-primary group-hover:text-primary-foreground transform group-hover:translate-x-1 transition-all duration-500" />
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </div>
        </div>
      </div>
    </Link>
  )
}
