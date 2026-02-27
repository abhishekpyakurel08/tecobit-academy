import Link from 'next/link'
import { GraduationCap, Mail, Phone, MapPin, ArrowRight, ExternalLink } from 'lucide-react'
import type { Footer, Setting, Track } from '@/payload-types'
import { CMSLink } from './Link'

interface AcademyFooterProps {
  data: Footer
  settings?: Setting
  tracks?: Track[]
}

export function AcademyFooter({ data, settings, tracks }: AcademyFooterProps) {
  const admissionButton = data?.admissionButton

  return (
    <footer className="bg-[#5173ff] text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4 border-b border-white/10 pb-24">
          {/* Brand Section */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-xl border border-white/10">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-black tracking-tight leading-none uppercase">
                  {settings?.siteName?.split(' ')[0] || 'Tecobit'}
                </h3>
                <span className="text-xs font-black tracking-[0.4em] text-[#00f3ff] uppercase leading-none mt-2">
                  {settings?.siteName?.split(' ')[1] || 'Academy'}
                </span>
              </div>
            </div>
            <p className="text-base text-white/70 leading-relaxed font-bold max-w-sm">
              {data?.slogan || 'Empowering the next generation of tech leaders through industry-focused training in AI, Data Science, and Modern Engineering.'}
            </p>
          </div>

          {/* Tracks Section */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00f3ff] mb-12 opacity-80">Academy Specializations</h4>
            <div className="flex flex-col gap-6">
              {tracks && tracks.length > 0 ? (
                tracks.slice(0, 5).map((track) => (
                  <Link key={track.id} href={`/academy/courses?track=${track.id}`} className="flex items-center gap-4 group cursor-pointer w-fit">
                    <div className="h-2 w-2 rounded-full bg-[#00f3ff] group-hover:scale-150 group-hover:shadow-[0_0_15px_#00f3ff] transition-all duration-500" />
                    <span className="text-sm font-black text-white/60 group-hover:text-white transition-all duration-500 uppercase tracking-widest">{track.name}</span>
                  </Link>
                ))
              ) : (
                ['AI & ML', 'Full-Stack', 'Data Science', 'Mobile', 'DevOps'].map((track) => (
                  <div key={track} className="flex items-center gap-4 group cursor-pointer w-fit">
                    <div className="h-2 w-2 rounded-full bg-[#00f3ff] group-hover:scale-150 group-hover:shadow-[0_0_15px_#00f3ff] transition-all duration-500" />
                    <span className="text-sm font-black text-white/60 group-hover:text-white transition-all duration-500 uppercase tracking-widest">{track}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00f3ff] mb-12 opacity-80">Connect Network</h4>
            <div className="flex flex-col gap-6 text-sm font-bold text-white/90">
              <div className="flex items-center gap-5 group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail className="h-4 w-4 text-[#00f3ff]" />
                </div>
                <span className="group-hover:text-[#00f3ff] transition-colors">{data?.email || 'info@tecobit.academy'}</span>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Phone className="h-4 w-4 text-[#00f3ff]" />
                </div>
                <span className="group-hover:text-[#00f3ff] transition-colors">{data?.phone || '+977 (01) 4567-890'}</span>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors text-center">
                  <MapPin className="h-4 w-4 text-[#00f3ff]" />
                </div>
                <span className="leading-snug group-hover:text-[#00f3ff] transition-colors">{data?.address || 'Anamnagar-32, Kathmandu\nBagmati, Nepal'}</span>
              </div>
              
              <CMSLink 
                {...(admissionButton?.link || {})} 
                className="mt-6 bg-white text-[#5173ff] hover:bg-white/95 border-none font-black uppercase tracking-widest text-[11px] h-14 rounded-2xl group flex items-center justify-center shadow-xl shadow-black/10"
              >
                {admissionButton?.label || 'Portal Admission'} 
                <ExternalLink className="h-4 w-4 ml-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </CMSLink>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00f3ff] mb-12 opacity-80">Join Insight Circle</h4>
            <div className="flex flex-col gap-8">
              <p className="text-sm font-bold text-white/60 leading-relaxed uppercase tracking-wider">
                Stay updated on upcoming engineering workshops and tech career tips.
              </p>
              <div className="relative group">
                <input 
                  placeholder="Your professional email" 
                  className="w-full h-14 bg-white/10 border border-white/10 rounded-2xl px-6 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00f3ff]/50 transition-all font-bold"
                />
                <button className="absolute right-2 top-2 h-10 w-10 bg-white text-[#5173ff] rounded-xl flex items-center justify-center hover:bg-[#00f3ff] hover:text-white transition-all shadow-lg">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em]">* No spam. Professional updates only.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-white/30">
            <span>&copy; {new Date().getFullYear()} {settings?.siteName || 'Tecobit Academy'} (PVT) Ltd.</span>
            <Link href="#" className="hover:text-[#00f3ff] transition-colors">Privacy Ethics</Link>
            <Link href="#" className="hover:text-[#00f3ff] transition-colors">Trust & Service</Link>
            <Link href="#" className="hover:text-[#00f3ff] transition-colors">Network Map</Link>
          </div>
          <div className="flex items-center gap-3 py-2 px-5 rounded-full bg-white/5 border border-white/5 whitespace-nowrap">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">Powered by</span>
            <span className="text-xs font-black text-[#00f3ff] uppercase tracking-[0.2em] leading-none">Engineering Core</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
