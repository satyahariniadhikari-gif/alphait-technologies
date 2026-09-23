import { useEffect, useRef } from 'react'

// Elements that turn the cursor into its "hover" state.
const INTERACTIVE = 'a, button, [role="button"], label, select, summary, [data-cursor="hover"]'
// Elements that turn the cursor into a blinking text caret.
const TEXT = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]'

const BIT_SPACING = 46 // px travelled between emitted binary bits
const MAX_BITS = 14

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const bitsRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const bitsLayer = bitsRef.current
    const root = document.documentElement

    const mouse = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    let travelled = 0
    let last = null
    let frame = 0
    let visible = false

    root.classList.add('has-custom-cursor')

    const setState = (state) => {
      ring.dataset.state = state
      dot.dataset.state = state
    }

    const emitBit = (x, y) => {
      if (reducedMotion.matches || bitsLayer.childElementCount >= MAX_BITS) return
      const bit = document.createElement('span')
      bit.className = 'cursor-bit'
      bit.textContent = Math.random() < 0.5 ? '0' : '1'
      bit.style.left = `${x}px`
      bit.style.top = `${y}px`
      bit.style.setProperty('--drift', `${(Math.random() - 0.5) * 30}px`)
      bitsLayer.appendChild(bit)
      bit.addEventListener('animationend', () => bit.remove(), { once: true })
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`

      if (!visible) {
        visible = true
        ringPos.x = mouse.x
        ringPos.y = mouse.y
        root.classList.add('cursor-visible')
      }

      if (last) {
        travelled += Math.hypot(mouse.x - last.x, mouse.y - last.y)
        if (travelled > BIT_SPACING) {
          travelled = 0
          emitBit(mouse.x, mouse.y)
        }
      }
      last = { x: mouse.x, y: mouse.y }
    }

    const onOver = (e) => {
      const target = e.target
      if (!(target instanceof Element)) return
      if (target.closest(TEXT)) setState('text')
      else if (target.closest(INTERACTIVE)) setState('hover')
      else setState('default')
    }

    const onDown = () => root.classList.add('cursor-pressed')
    const onUp = () => root.classList.remove('cursor-pressed')
    const onLeave = () => {
      visible = false
      root.classList.remove('cursor-visible')
    }

    const tick = () => {
      // The ring eases toward the pointer, giving it a soft trailing feel.
      const ease = reducedMotion.matches ? 1 : 0.2
      ringPos.x += (mouse.x - ringPos.x) * ease
      ringPos.y += (mouse.y - ringPos.y) * ease
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      root.classList.remove('has-custom-cursor', 'cursor-visible', 'cursor-pressed')
      bitsLayer.replaceChildren()
    }
  }, [])

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor__bits" ref={bitsRef} />
      <div className="cursor__ring" ref={ringRef} data-state="default">
        <span className="cursor__orbit" />
        <span className="cursor__glyph">&lt;/&gt;</span>
      </div>
      <div className="cursor__dot" ref={dotRef} data-state="default" />
    </div>
  )
}
