interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ title, subtitle, align = 'center', className = '' }: SectionHeadingProps) {
  const textAlign = align === 'left' ? 'items-start text-left' : 'items-center text-center'
  return (
    <div className={`flex flex-col gap-3 ${textAlign} ${className}`}>
      <h2 className="font-bold text-3xl md:text-4xl text-foreground tracking-tight">{title}</h2>
      {subtitle && (
        <p className={`text-base text-muted-foreground leading-relaxed max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-1 h-1 w-14 rounded-full bg-gradient-to-r from-primary to-primary/40 ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  )
}
