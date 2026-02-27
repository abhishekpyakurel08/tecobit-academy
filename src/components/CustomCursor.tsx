'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Production-ready smooth custom cursor.
 *
 * Architecture:
 *  • DOT  – 8px filled circle, updates synchronously with mousemove → zero lag
 *  • RING – 36px outline circle, follows the DOT with lerp(0.13) via rAF → silky trail
 *
 * ALL style mutations go via direct DOM writes inside the rAF loop to avoid
 * React re-renders on every frame. Only hover/click STATE triggers React.
 *
 * Hover detection uses a single mouseover listener that walks up the DOM to find
 * the nearest interactive ancestor, preventing false positives.
 *
 * Only activates on `(pointer: fine)` devices (mouse/trackpad). Zero effect on touch.
 */
export const CustomCursor = () => {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)

  // rAF refs — never cause React renders
  const mouse    = useRef({ x: -200, y: -200 })
  const follower = useRef({ x: -200, y: -200 })
  const rafId    = useRef(0)
  const visible  = useRef(false)
  const hovering = useRef(false)  // mirrors isHover but usable inside rAF closure

  // React state — only for size/colour transitions (CSS)
  const [isHover, setIsHover] = useState(false)
  const [isClick, setIsClick] = useState(false)
  const [active,  setActive]  = useState(false)   // device supports fine pointer

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setActive(true)

    const LERP = 0.13

    /* ─ rAF loop ──────────────────────────────────────────────────────────── */
    const tick = () => {
      // Exponential smoothing toward raw mouse position
      follower.current.x += (mouse.current.x - follower.current.x) * LERP
      follower.current.y += (mouse.current.y - follower.current.y) * LERP

      const dot  = dotRef.current
      const ring = ringRef.current

      if (dot) {
        // DOT is 8px — centre it by subtracting half (4px)
        dot.style.transform = `translate(${mouse.current.x - 4}px,${mouse.current.y - 4}px)`
      }
      if (ring) {
        // RING width/height changes with hover; keep centred via CSS margin trick
        ring.style.transform = `translate(${follower.current.x}px,${follower.current.y}px)`
      }

      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    /* ─ Helpers ────────────────────────────────────────────────────────────── */
    const isInteractive = (el: HTMLElement | null): boolean => {
      if (!el || el === document.body) return false
      const tag = el.tagName
      if (
        tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' ||
        tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'LABEL' ||
        el.getAttribute('role') === 'button' ||
        el.getAttribute('role') === 'link' ||
        el.getAttribute('tabindex') !== null ||
        el.classList.contains('cursor-pointer')
      ) return true
      return isInteractive(el.parentElement)
    }

    /* ─ Listeners ──────────────────────────────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (!visible.current) {
        visible.current = true
        follower.current = { x: e.clientX, y: e.clientY }
        dotRef.current?.classList.remove('opacity-0')
        ringRef.current?.classList.remove('opacity-0')
      }
    }

    const onLeave = () => {
      visible.current = false
      dotRef.current?.classList.add('opacity-0')
      ringRef.current?.classList.add('opacity-0')
    }

    const onOver = (e: MouseEvent) => {
      const val = isInteractive(e.target as HTMLElement)
      if (val !== hovering.current) {
        hovering.current = val
        setIsHover(val)
      }
    }

    const onDown = () => setIsClick(true)
    const onUp   = () => setIsClick(false)

    window.addEventListener('mousemove',   onMove,  { passive: true })
    window.addEventListener('mouseover',   onOver,  { passive: true })
    window.addEventListener('mousedown',   onDown)
    window.addEventListener('mouseup',     onUp)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('mousemove',   onMove)
      window.removeEventListener('mouseover',   onOver)
      window.removeEventListener('mousedown',   onDown)
      window.removeEventListener('mouseup',     onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  if (!active) return null

  // Dimensions driven by state so CSS transitions run on them
  const dotSize  = isClick ? 5  : isHover ? 10 : 8
  const ringSize = isClick ? 28 : isHover ? 52 : 38

  return (
    <>
      {/* ── DOT ─────────────────────────────────────────────────────────────── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="opacity-0 pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
      >
        <div
          style={{
            width:  dotSize,
            height: dotSize,
            borderRadius: '50%',
            background: '#5173ff',
            transition: 'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        />
      </div>

      {/* ── RING ────────────────────────────────────────────────────────────── */}
      {/* translate() is applied by rAF; we centre it here with negative margin */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="opacity-0 pointer-events-none fixed top-0 left-0 z-[9998] will-change-transform"
        style={{
          // Negative margin centres the ring on its translate origin
          marginLeft: -(ringSize / 2),
          marginTop:  -(ringSize / 2),
          transition: 'margin 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        <div
          style={{
            width:  ringSize,
            height: ringSize,
            borderRadius: '50%',
            border: `1.5px solid rgba(81,115,255,${isHover ? 0.65 : 0.3})`,
            background: isHover ? 'rgba(81,115,255,0.06)' : 'transparent',
            transition: [
              'width   0.3s cubic-bezier(0.34,1.56,0.64,1)',
              'height  0.3s cubic-bezier(0.34,1.56,0.64,1)',
              'border-color 0.25s ease',
              'background   0.25s ease',
            ].join(', '),
          }}
        />
      </div>
    </>
  )
}
