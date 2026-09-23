import { aiProgram } from '../data/site.js'
import Icon from './Icon.jsx'

function daysUntil(isoDate) {
  const start = new Date(`${isoDate}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((start - today) / 86400000)
}

export default function AiProgramPromo() {
  const daysLeft = daysUntil(aiProgram.startDate)

  return (
    <section className="section promo" id="ai-program" aria-labelledby="ai-program-title">
      <div className="container">
        <div className="promo__card">
          <div className="promo__glow" aria-hidden="true" />

          <div className="promo__main">
            <ul className="promo__flags">
              <li className="promo__flag promo__flag--hot">Limited seats</li>
              <li className="promo__flag">{aiProgram.eligibility.join(' & ')} only</li>
              <li className="promo__flag">{aiProgram.batchLabel}</li>
            </ul>

            <p className="hero__eyebrow">Registration is now open</p>
            <h2 className="promo__title" id="ai-program-title">
              {aiProgram.title}
            </h2>
            <p className="promo__lead">{aiProgram.summary}</p>

            <ul className="promo__benefits">
              {aiProgram.benefits.map((benefit) => (
                <li key={benefit}>
                  <Icon name="check" size={18} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="promo__side">
            <div className="promo__date">
              <span className="promo__date-label">Batch starts</span>
              <strong>{aiProgram.startDateLabel}</strong>
              {daysLeft > 0 && (
                <span className="promo__countdown">
                  {daysLeft} {daysLeft === 1 ? 'day' : 'days'} to go
                </span>
              )}
            </div>

            <ul className="promo__facts">
              <li>
                <Icon name="pin" size={18} />
                <span>
                  Eligibility: {aiProgram.eligibility.map((c) => `${c} candidates`).join(' & ')}{' '}
                  only
                </span>
              </li>
              <li>
                <Icon name="clock" size={18} />
                <span>Limited seats available</span>
              </li>
              <li>
                <Icon name="mail" size={18} />
                <a href={aiProgram.contactEmailHref}>{aiProgram.contactEmail}</a>
              </li>
            </ul>

            <a
              className="btn btn--accent promo__cta"
              href={aiProgram.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register now &amp; reserve your spot
              <Icon name="arrow" size={16} />
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}
