'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Loader2, ArrowRight, ChevronDown } from 'lucide-react'

interface ApplyFormProps {
  courses: any[]
  batches: any[]
  tracks: any[]
  preselectedCourseId?: string
}

export function ApplyForm({ courses, batches, tracks, preselectedCourseId }: ApplyFormProps) {
  const router = useRouter()
  const [selectedCourse, setSelectedCourse] = useState(preselectedCourseId ?? '')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const courseBatches = batches.filter((b) => {
    const batchCourseId = typeof b.course === 'object' ? b.course?.id : b.course
    return batchCourseId === selectedCourse
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/academy/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message ?? 'Something went wrong. Please try again.')
      }

      setStatus('success')
      form.reset()
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-scale-in">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/10 text-success mb-8 shadow-xl shadow-success/10">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h2 className="text-3xl font-black text-foreground mb-4">Application Success!</h2>
        <p className="text-muted-foreground max-w-sm text-lg leading-relaxed">
          We&apos;ve received your application. Our team will review your profile and contact you within 48 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-10 rounded-full bg-secondary text-secondary-foreground px-8 py-3 font-bold hover:bg-secondary/80 transition-all shadow-theme"
        >
          Submit another application
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Personal Info */}
      <fieldset className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1.5 bg-primary rounded-full" />
          <legend className="text-xl font-black tracking-tight text-foreground">Personal Details</legend>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-bold text-muted-foreground ml-1">Full Name</label>
            <input id="fullName" name="fullName" type="text" required placeholder="John Doe"
              className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm hover:border-primary/30" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-muted-foreground ml-1">Email Address</label>
            <input id="email" name="email" type="email" required placeholder="john@example.com"
              className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm hover:border-primary/30" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-bold text-muted-foreground ml-1">Phone Number</label>
          <input id="phone" name="phone" type="tel" required placeholder="+977 98XXXXXXXX"
            className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm hover:border-primary/30" />
        </div>
      </fieldset>

      {/* Educational Background */}
      <fieldset className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1.5 bg-blue-500 rounded-full" />
          <legend className="text-xl font-black tracking-tight text-foreground">Educational Background</legend>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2 group">
            <label htmlFor="educationLevel" className="text-sm font-bold text-muted-foreground ml-1">Highest Qualification</label>
            <div className="relative">
              <select id="educationLevel" name="educationLevel" required
                className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer shadow-sm hover:border-primary/30">
                <option value="">Select level…</option>
                <option value="high-school">High School / +2</option>
                <option value="bachelor">Bachelor&apos;s Degree</option>
                <option value="master">Master&apos;s Degree</option>
                <option value="other">Other Professional Cert</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="college" className="text-sm font-bold text-muted-foreground ml-1">Institution Name</label>
            <input id="college" name="college" type="text" placeholder="e.g. Tribhuvan University"
              className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm hover:border-primary/30" />
          </div>
        </div>
      </fieldset>

      {/* Course Selection */}
      <fieldset className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1.5 bg-accent rounded-full" />
          <legend className="text-xl font-black tracking-tight text-foreground">Academic Interest</legend>
        </div>
        <div className="space-y-2 group">
          <label htmlFor="courseId" className="text-sm font-bold text-muted-foreground ml-1">Available Programs</label>
          <div className="relative">
            <select id="courseId" name="courseId" required value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer shadow-sm hover:border-primary/30">
              <option value="">Select a program…</option>
              {tracks.map(track => (
                <optgroup key={track.id} label={track.name}>
                  {courses.filter(c => (typeof c.track === 'object' ? c.track?.id : c.track) === track.id).map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
          </div>
        </div>

        {selectedCourse && courseBatches.length > 0 && (
          <div className="space-y-2 animate-fade-in group">
            <label htmlFor="batchId" className="text-sm font-bold text-muted-foreground ml-1">Preferred Batch</label>
            <div className="relative">
              <select id="batchId" name="batchId"
                className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-base outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer shadow-sm hover:border-primary/30">
                <option value="">No preference (Next available)</option>
                {courseBatches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} — starts {new Date(b.startDate).toLocaleDateString()}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
            </div>
          </div>
        )}
      </fieldset>

      {status === 'error' && (
        <div className="p-4 rounded-2xl bg-error/10 border border-error/20 text-error text-sm font-bold animate-shake">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="group relative w-full h-16 flex items-center justify-center gap-3 rounded-2xl bg-primary text-primary-foreground text-lg font-black shadow-xl shadow-primary/20 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-1 active:scale-95 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
        {status === 'loading' ? (
          <><Loader2 className="h-6 w-6 animate-spin" /> Processing…</>
        ) : (
          <>Apply Now <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" /></>
        )}
      </button>
    </form>
  )
}
