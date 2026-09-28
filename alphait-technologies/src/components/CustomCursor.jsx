import { useEffect, useRef } from 'react'

// Elements that turn the cursor into its "hover" state.
const INTERACTIVE = 'a, button, [role="button"], label, select, summary, [data-cursor="hover"]'
// Elements that turn the cursor into a blinking text caret.
const TEXT = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]'

const MAX_TILT = 16 // degrees the logo leans while the pointer moves sideways

const LEG_L = '298,104 366,104 412,180 292,382 202,382 94,468 88,458'
const LEG_R = '424,198 568,455 550,488 482,488 364,275'
const FOOT = '202,382 402,382 232,488 100,488 88,462'

// Transparent vector version of the Alpha IT "A" mark.
function LogoMark() {
  return (
    <svg className="cursor__mark" viewBox="80 96 496 400" aria-hidden="true">
      <defs>
        <linearGradient id="cursor-leg-l" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d6bff" />
          <stop offset="1" stopColor="#0b3fe4" />
        </linearGradient>
        <linearGradient id="cursor-foot" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0a2fc4" />
          <stop offset="1" stopColor="#0b3fe4" />
        </linearGradient>
        <linearGradient id="cursor-leg-r" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d8bff" />
          <stop offset="1" stopColor="#4fd6ff" />
        </linearGradient>
        <linearGradient id="cursor-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="cursor-clip">
          <polygon points={LEG_L} />
          <polygon points={LEG_R} />
          <polygon points={FOOT} />
        </clipPath>
      </defs>
      <polygon points={LEG_L} fill="url(#cursor-leg-l)" />
      <polygon points={LEG_R} fill="url(#cursor-leg-r)" />
      <polygon points={FOOT} fill="url(#cursor-foot)" />
      <g clipPath="url(#cursor-clip)">
        <rect className="cursor__shine" x="0" y="80" width="120" height="440" fill="url(#cursor-shine)" />
      </g>
    </svg>
  )
}

export default function CustomCursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches) return

    const dot = dotRef.current
    const root = document.documentElement

    let lastX = null
    let velocity = 0
    let tilt = 0
    let frame = 0

    const onMove = (e) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      if (lastX !== null) velocity += e.clientX - lastX
      lastX = e.clientX
      // The native arrow is hidden only while the logo cursor is on screen.
      root.classList.add('has-custom-cursor', 'cursor-visible')
    }

    const onOver = (e) => {
      const target = e.target
      if (!(target instanceof Element)) return
      if (target.closest(TEXT)) dot.dataset.state = 'text'
      else if (target.closest(INTERACTIVE)) dot.dataset.state = 'hover'
      else dot.dataset.state = 'default'
    }

    const onDown = () => root.classList.add('cursor-pressed')
    const onUp = () => root.classList.remove('cursor-pressed')
    const onLeave = () => {
      lastX = null
      root.classList.remove('has-custom-cursor', 'cursor-visible')
    }

    // The logo leans into horizontal movement and settles back when still.
    const tick = () => {
      const target = reducedMotion.matches
        ? 0
        : Math.max(-MAX_TILT, Math.min(MAX_TILT, velocity * 0.9))
      tilt += (target - tilt) * 0.18
      velocity *= 0.6
      dot.style.setProperty('--tilt', `${tilt.toFixed(2)}deg`)
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    root.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      root.removeEventListener('mouseleave', onLeave)
      root.classList.remove('has-custom-cursor', 'cursor-visible', 'cursor-pressed')
    }
  }, [])

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor__dot" ref={dotRef} data-state="default">
        <span className="cursor__bg" />
        <LogoMark />
      </div>
    </div>
  )
}
