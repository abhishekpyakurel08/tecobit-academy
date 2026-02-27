'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  GraduationCap, Menu, X,
  Mail, Phone, MapPin,
  Facebook, Linkedin, Instagram, Youtube, Twitter,
  ChevronUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import type { Header, Setting } from '@/payload-types'
import { CMSLink } from './Link'

interface AcademyNavProps {
  data: Header
  settings?: Setting
}

export function AcademyNav({ data, settings }: AcademyNavProps) {
  const [isMenuOpen,   setIsMenuOpen]   = useState(false)
  const [scrolled,     setScrolled]     = useState(false)   // past threshold
  const [hidden,       setHidden]       = useState(false)   // scrolling down fast
  const [atTop,        setAtTop]        = useState(true)    // at very top of page
  const lastScrollY    = useRef(0)
  const ticking        = useRef(false)
  const pathname       = usePathname()
  const navItems       = data?.navItems || []
  const topBar         = data?.topBar

  const socialIconMap: Record<string, React.ElementType> = {
    facebook: Facebook,
    linkedin: Linkedin,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
  }

  // ── Scroll behaviour ───────────────────────────────────────────────────────
  useEffect(() => {
    const SCROLL_THRESHOLD   = 60   // px before nav "shrinks"
    const HIDE_THRESHOLD     = 200  // px before nav hides on scroll-down
    const SCROLL_DELTA       = 12   // minimum px movement to trigger hide/show

    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY

        setAtTop(currentY < 10)
        setScrolled(currentY > SCROLL_THRESHOLD)

        // Only hide if we've scrolled past threshold AND delta is significant
        if (currentY > HIDE_THRESHOLD) {
          if (currentY > lastScrollY.current + SCROLL_DELTA) {
            setHidden(true)   // scrolling DOWN → hide
          } else if (currentY < lastScrollY.current - SCROLL_DELTA) {
            setHidden(false)  // scrolling UP → show
          }
        } else {
          setHidden(false)    // near top → always show
        }

        lastScrollY.current = currentY
        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once on mount to set correct initial state
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  return (
    <>
      {/* ── Fixed outer wrapper ────────────────────────────────────────────── */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-[100]',
          'transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
          hidden && !isMenuOpen ? '-translate-y-full' : 'translate-y-0',
        ].join(' ')}
      >
        {/* ── Top Info Bar ────────────────────────────────────────────────── */}
        <div
          className={[
            'bg-[#5173ff] text-white border-b border-white/10 hidden lg:block',
            'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden',
            scrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-12 py-2 opacity-100',
          ].join(' ')}
        >
          <div className="container mx-auto px-4 flex justify-between items-center text-[11px] font-bold tracking-wider uppercase">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 border border-white/20 p-0.5 rounded-sm" />
                <span>{topBar?.email || 'info@tecobit.academy'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 border border-white/20 p-0.5 rounded-sm" />
                <span>{topBar?.phone || '+977 (01) 423-4567'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 border border-white/20 p-0.5 rounded-sm" />
                <span>{topBar?.address || 'Kathmandu, Nepal'}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {settings?.socialLinks?.map((social, i) => {
                const Icon = socialIconMap[social.platform as string]
                return Icon ? (
                  <a
                    key={i}
                    href={social.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00f3ff] transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : null
              })}
            </div>
          </div>
        </div>

        {/* ── Main Navigation ─────────────────────────────────────────────── */}
        <nav
          className={[
            'text-white w-full',
            'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
            // Scrolled: glassmorphic compact bar
            scrolled
              ? 'bg-[#5173ff]/80 backdrop-blur-2xl shadow-2xl shadow-black/20 border-b border-white/10'
              : 'bg-[#5173ff] shadow-lg',
          ].join(' ')}
        >
          <div className="container mx-auto px-4">
            <div
              className={[
                'flex justify-between items-center',
                'transition-all duration-500',
                scrolled ? 'h-16' : 'h-20',   // compact on scroll
              ].join(' ')}
            >
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group shrink-0">
                <div
                  className={[
                    'bg-white/10 rounded-xl border border-white/5',
                    'group-hover:bg-white/20 transition-all duration-300',
                    scrolled ? 'p-2' : 'p-2.5',
                  ].join(' ')}
                >
                  <GraduationCap
                    className={[
                      'text-white transition-all duration-500',
                      scrolled ? 'h-6 w-6' : 'h-7 w-7',
                    ].join(' ')}
                  />
                </div>
                <div className="flex flex-col">
                  <span
                    className={[
                      'font-black tracking-tight leading-none text-white',
                      'transition-all duration-500',
                      scrolled ? 'text-lg' : 'text-xl',
                    ].join(' ')}
                  >
                    {settings?.siteName?.split(' ')[0] || 'Tecobit'}
                  </span>
                  <span className="text-xs font-black tracking-[0.2em] text-[#00f3ff] uppercase leading-none mt-1">
                    {settings?.siteName?.split(' ')[1] || 'Academy'}
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-8">
                <div className="flex items-center gap-8 font-bold text-[13px] tracking-widest uppercase">
                  {navItems.map(({ link }, i) => {
                    const href = link.type === 'custom' ? link.url : '/#'
                    const isActive =
                      pathname === href ||
                      (href !== '/' && pathname?.startsWith(href as string))
                    return (
                      <CMSLink
                        key={i}
                        {...link}
                        className={[
                          'relative group py-2 transition-all duration-200',
                          'hover:text-[#00f3ff]',
                          isActive ? 'text-[#00f3ff]' : 'text-white',
                        ].join(' ')}
                      >
                        <span
                          className={[
                            'absolute bottom-0 left-0 h-0.5 bg-[#00f3ff]',
                            'transition-all duration-300 rounded-full',
                            isActive ? 'w-full' : 'w-0 group-hover:w-full',
                          ].join(' ')}
                        />
                      </CMSLink>
                    )
                  })}
                </div>

                <div className="flex items-center gap-3 ml-4 pl-6 border-l border-white/10">
                  <Button
                    asChild
                    className={[
                      'relative group overflow-hidden rounded-2xl',
                      'bg-[#00d1e0] hover:bg-[#00f3ff] text-[#00383d]',
                      'font-black uppercase tracking-[0.15em]',
                      'shadow-xl shadow-black/20 border border-white/10',
                      'transition-all duration-300 hover:scale-105 active:scale-95',
                      scrolled ? 'h-10 px-6 text-xs' : 'h-12 px-8 text-[13px]',
                    ].join(' ')}
                  >
                    <Link href="/academy/apply">
                      <span className="relative z-10">Apply Now</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    </Link>
                  </Button>
                  <ThemeToggle />
                </div>
              </div>

              {/* Mobile Hamburger */}
              <button
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/15 transition-colors text-white"
                onClick={() => setIsMenuOpen(prev => !prev)}
              >
                <div className="relative h-6 w-6 flex items-center justify-center">
                  <Menu
                    className={[
                      'absolute h-6 w-6 transition-all duration-300',
                      isMenuOpen ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0',
                    ].join(' ')}
                  />
                  <X
                    className={[
                      'absolute h-6 w-6 transition-all duration-300',
                      isMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90',
                    ].join(' ')}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* ── Mobile Drawer Menu ─────────────────────────────────────────── */}
          <div
            className={[
              'lg:hidden overflow-hidden',
              'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
              isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
            ].join(' ')}
          >
            <div className="bg-[#3d5ce8] border-t border-white/10">
              <div className="container mx-auto px-4 py-8 flex flex-col gap-1">
                {navItems.map(({ link }, i) => {
                  const href = link.type === 'custom' ? link.url : '/#'
                  const isActive =
                    pathname === href ||
                    (href !== '/' && pathname?.startsWith(href as string))
                  return (
                    <CMSLink
                      key={i}
                      {...link}
                      className={[
                        'flex items-center py-3 px-4 rounded-xl font-black tracking-widest uppercase',
                        'text-base transition-all duration-200',
                        isActive
                          ? 'bg-white/10 text-[#00f3ff]'
                          : 'text-white/80 hover:bg-white/5 hover:text-white',
                      ].join(' ')}
                      onClick={() => setIsMenuOpen(false)}
                    />
                  )
                })}

                <div className="h-px bg-white/10 my-4" />

                <div className="flex items-center justify-between gap-4">
                  <Button
                    asChild
                    className="flex-1 h-14 rounded-2xl bg-[#00d1e0] text-[#00383d] font-black uppercase tracking-widest text-sm"
                  >
                    <Link href="/academy/apply">Enroll Now</Link>
                  </Button>
                  <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Spacer to prevent content jumping under fixed header ──────────── */}
      {/* Height matches the tallest possible header (top bar + nav) */}
      <div className="h-[calc(4.5rem+2.5rem)] lg:h-[calc(5rem+2.5rem)] w-full shrink-0" aria-hidden="true" />

      {/* ── Scroll-to-top button ───────────────────────────────────────────── */}
      <button
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={[
          'fixed bottom-8 right-8 z-[90]',
          'h-12 w-12 rounded-2xl',
          'bg-[#5173ff] text-white',
          'shadow-2xl shadow-[#5173ff]/40',
          'flex items-center justify-center',
          'transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          !atTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-75 pointer-events-none',
          'hover:bg-[#6384ff] hover:scale-110 active:scale-95',
        ].join(' ')}
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </>
  )
}
