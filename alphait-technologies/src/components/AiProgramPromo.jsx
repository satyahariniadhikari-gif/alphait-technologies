import { aiProgram, daysUntilBatch, isRegistrationOpen } from '../data/site.js'
import Icon from './Icon.jsx'

export default function AiProgramPromo() {
  const daysLeft = daysUntilBatch()
  const open = isRegistrationOpen()

  return (
    <section className="section promo" id="ai-program" aria-labelledby="ai-program-title">
      <div className="container">
        <div className="promo__card">
          <div className="promo__glow" aria-hidden="true" />

          <div className="promo__main">
            <ul className="promo__flags">
              <li className="promo__flag promo__flag--hot">
                {open ? 'Limited seats' : 'Registration closed'}
              </li>
              <li className="promo__flag">{aiProgram.eligibility.join(' & ')} only</li>
              <li className="promo__flag">{open ? aiProgram.batchLabel : 'Next batch coming soon'}</li>
            </ul>

            <p className="hero__eyebrow">
              {open ? 'Registration is now open' : 'Next batch date will be updated soon'}
            </p>
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
            {open ? (
              <div className="promo__date">
                <span className="promo__date-label">Batch starts</span>
                <strong>{aiProgram.startDateLabel}</strong>
                <span className="promo__countdown">
                  {daysLeft} {daysLeft === 1 ? 'day' : 'days'} to go
                </span>
              </div>
            ) : (
              <div className="promo__date">
                <span className="promo__date-label">{aiProgram.batchLabel}</span>
                <strong>Registration ends on {aiProgram.registrationEndLabel}</strong>
                <p className="promo__date-note">
                  Registration for the {aiProgram.batchLabel} has closed. We&apos;ll update you with
                  the next batch date soon.
                </p>
              </div>
            )}

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
                <span>{open ? 'Limited seats available' : 'Seats open again with the next batch'}</span>
              </li>
              <li>
                <Icon name="mail" size={18} />
                <a href={aiProgram.contactEmailHref}>{aiProgram.contactEmail}</a>
              </li>
            </ul>

            {open ? (
              <a
                className="btn btn--accent promo__cta"
                href={aiProgram.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Register now &amp; reserve your spot
                <Icon name="arrow" size={16} />
              </a>
            ) : (
              <a className="btn btn--accent promo__cta" href={aiProgram.notifyHref}>
                Notify me about the next batch
                <Icon name="arrow" size={16} />
              </a>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
