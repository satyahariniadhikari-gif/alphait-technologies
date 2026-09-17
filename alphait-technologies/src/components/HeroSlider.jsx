import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { slides } from '../data/site.js'
import Icon from './Icon.jsx'

const INTERVAL = 6500

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback((next) => {
    setIndex((next + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (paused) return undefined
    const timer = window.setInterval(() => go(index + 1), INTERVAL)
    return () => window.clearInterval(timer)
  }, [index, paused, go])

  const active = slides[index]

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__shape hero__shape--a" />
        <span className="hero__shape hero__shape--b" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content" key={index}>
          <p className="hero__eyebrow">{active.eyebrow}</p>
          <h1 className="hero__title">{active.title}</h1>
          <p className="hero__text">{active.text}</p>
          <div className="hero__actions">
            <Link to={active.cta.to} className="btn btn--accent">
              {active.cta.label}
              <Icon name="arrow" size={18} />
            </Link>
            <Link to="/about" className="btn btn--ghost">
              About AlphaIT
            </Link>
          </div>
        </div>

        <div className="hero__panel" aria-hidden="true">
          <div className="hero__panel-card">
            <Icon name="shield" size={28} />
            <h2>Quality first</h2>
            <p>The 3P&apos;s — Planning, Preparation and Prediction — guide every engagement.</p>
          </div>
          <div className="hero__panel-card">
            <Icon name="target" size={28} />
            <h2>Outcome driven</h2>
            <p>Delivery measured against your business goals, not just story points.</p>
          </div>
        </div>
      </div>

      <div className="container hero__controls">
        <button type="button" className="hero__arrow" onClick={() => go(index - 1)}>
          <span aria-hidden="true">‹</span>
          <span className="sr-only">Previous slide</span>
        </button>
        <div className="hero__dots" role="tablist" aria-label="Choose slide">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={slide.title}
              className={i === index ? 'is-active' : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button type="button" className="hero__arrow" onClick={() => go(index + 1)}>
          <span aria-hidden="true">›</span>
          <span className="sr-only">Next slide</span>
        </button>
      </div>
    </section>
  )
}
