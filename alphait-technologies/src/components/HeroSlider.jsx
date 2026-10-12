import { useEffect, useState } from 'react'
import { slides } from '../data/site.js'
import Icon from './Icon.jsx'
import Editable from '../admin/Editable.jsx'
import ButtonLink from '../admin/ButtonLink.jsx'
import { useContent, useList } from '../admin/content-context.js'
import trainingPhoto from '../assets/training-session.jpg'
import officePhoto from '../assets/office-hq.jpg'
import teamPhoto from '../assets/team-meeting.jpg'

const PHOTOS = [trainingPhoto, officePhoto, teamPhoto]

const INTERVAL = 6500

const builtinIndex = (id) => (/^\d+$/.test(id) && slides[Number(id)] ? Number(id) : -1)

export default function HeroSlider() {
  const { content, isAdmin, editImage } = useContent()
  const list = useList('slides', ['0', '1', '2'])
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const count = list.ids.length
  const current = Math.min(index, Math.max(count - 1, 0))
  const activeId = list.ids[current]
  const active = slides[builtinIndex(activeId)]

  const go = (next) => setIndex((next + count) % count)

  useEffect(() => {
    if (paused || isAdmin || count < 2) return undefined
    const timer = window.setInterval(() => setIndex((current + 1) % count), INTERVAL)
    return () => window.clearInterval(timer)
  }, [current, count, paused, isAdmin])

  const fallbackPhoto = (id, position) => {
    const i = builtinIndex(id)
    return PHOTOS[(i >= 0 ? i : position) % PHOTOS.length]
  }

  const addSlide = () => {
    list.add(
      {
        eyebrow: 'New slide',
        title: 'New slide title',
        text: 'Slide description.',
        cta: 'Learn more',
      },
      current + 1,
    )
    setIndex(current + 1)
  }

  const moveSlide = (delta) => {
    list.move(activeId, delta)
    setIndex(current + delta)
  }

  const deleteSlide = () => {
    if (count <= 1) return
    if (!window.confirm('Delete this slide? It disappears for all visitors.')) return
    list.remove(activeId)
    if (current === count - 1) setIndex(current - 1)
  }

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
        {list.ids.map((id, i) => (
          <span
            key={id}
            className={`hero__photo${i === current ? ' is-active' : ''}`}
            style={{
              backgroundImage: `url(${content[`slides.${id}.image`] || fallbackPhoto(id, i)})`,
            }}
          />
        ))}
        <span className="hero__overlay" />
        <span className="hero__shape hero__shape--a" />
        <span className="hero__shape hero__shape--b" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__inner">
        {activeId ? (
          <div className="hero__content" key={activeId}>
            <p className="hero__eyebrow">
              <Editable id={`slides.${activeId}.eyebrow`}>{active?.eyebrow ?? ''}</Editable>
            </p>
            <h1 className="hero__title">
              <Editable id={`slides.${activeId}.title`}>{active?.title ?? ''}</Editable>
            </h1>
            <p className="hero__text">
              <Editable id={`slides.${activeId}.text`}>{active?.text ?? ''}</Editable>
            </p>
            <div className="hero__actions">
              <ButtonLink
                id={`slides.${activeId}.cta`}
                to={active?.cta.to ?? '/contact'}
                className="btn btn--accent"
                icon="arrow"
                iconSize={18}
              >
                {active?.cta.label ?? ''}
              </ButtonLink>
              <ButtonLink id="hero.aboutCta" to="/about" className="btn btn--ghost">
                About Alpha IT
              </ButtonLink>
            </div>
          </div>
        ) : (
          <div className="hero__content" />
        )}

        <div className="hero__panel" aria-hidden="true">
          <div className="hero__panel-card">
            <Icon name="shield" size={28} />
            <h2>
              <Editable id="hero.panel.0.title">Quality first</Editable>
            </h2>
            <p>
              <Editable id="hero.panel.0.text">
                The 3P&apos;s — Planning, Preparation and Prediction — guide every engagement.
              </Editable>
            </p>
          </div>
          <div className="hero__panel-card">
            <Icon name="target" size={28} />
            <h2>
              <Editable id="hero.panel.1.title">Outcome driven</Editable>
            </h2>
            <p>
              <Editable id="hero.panel.1.text">
                Delivery measured against your business goals, not just story points.
              </Editable>
            </p>
          </div>
        </div>
      </div>

      <div className="container hero__controls">
        <button type="button" className="hero__arrow" onClick={() => go(current - 1)}>
          <span aria-hidden="true">‹</span>
          <span className="sr-only">Previous slide</span>
        </button>
        <div className="hero__dots" role="tablist" aria-label="Choose slide">
          {list.ids.map((id, i) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={content[`slides.${id}.title`] ?? slides[builtinIndex(id)]?.title ?? ''}
              className={i === current ? 'is-active' : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button type="button" className="hero__arrow" onClick={() => go(current + 1)}>
          <span aria-hidden="true">›</span>
          <span className="sr-only">Next slide</span>
        </button>
        {isAdmin && activeId ? (
          <div className="section-tools" style={{ position: 'static', transform: 'none' }}>
            <strong>
              Slide {current + 1} of {count}
            </strong>
            <button type="button" onClick={addSlide}>
              + Add slide
            </button>
            <button type="button" disabled={current === 0} onClick={() => moveSlide(-1)}>
              Move ←
            </button>
            <button type="button" disabled={current === count - 1} onClick={() => moveSlide(1)}>
              Move →
            </button>
            <button
              type="button"
              onClick={() => editImage(`slides.${activeId}.image`, fallbackPhoto(activeId, current))}
            >
              Change image
            </button>
            <button type="button" className="danger" disabled={count <= 1} onClick={deleteSlide}>
              Delete slide
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
