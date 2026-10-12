import { aiProgram, daysUntilBatch, isRegistrationOpen } from '../data/site.js'
import Editable from '../admin/Editable.jsx'
import EditableList from '../admin/EditableList.jsx'
import ButtonLink from '../admin/ButtonLink.jsx'
import { useCompany, useText } from '../admin/content-context.js'
import Icon from './Icon.jsx'

export default function AiProgramPromo() {
  const daysLeft = daysUntilBatch()
  const open = isRegistrationOpen()
  const company = useCompany()
  const batchLabel = useText('aiProgram.batchLabel', aiProgram.batchLabel)
  const eligibility = aiProgram.eligibility.join(' & ')
  const eligibilityCandidates = aiProgram.eligibility.map((c) => `${c} candidates`).join(' & ')

  return (
    <section className="section promo" id="ai-program" aria-labelledby="ai-program-title">
      <div className="container">
        <div className="promo__card">
          <div className="promo__glow" aria-hidden="true" />

          <div className="promo__main">
            <ul className="promo__flags">
              <li className="promo__flag promo__flag--hot">
                {open ? (
                  <Editable id="aiProgram.flagOpen">Limited seats</Editable>
                ) : (
                  <Editable id="aiProgram.flagClosed">Registration closed</Editable>
                )}
              </li>
              <li className="promo__flag">
                <Editable id="aiProgram.eligibilityFlag">{`${eligibility} only`}</Editable>
              </li>
              <li className="promo__flag">
                {open ? (
                  <Editable id="aiProgram.batchLabel">{aiProgram.batchLabel}</Editable>
                ) : (
                  <Editable id="aiProgram.nextBatchFlag">Next batch coming soon</Editable>
                )}
              </li>
            </ul>

            <p className="hero__eyebrow">
              {open ? (
                <Editable id="aiProgram.eyebrowOpen">Registration is now open</Editable>
              ) : (
                <Editable id="aiProgram.eyebrowClosed">Next batch date will be updated soon</Editable>
              )}
            </p>
            <h2 className="promo__title" id="ai-program-title">
              <Editable id="aiProgram.title">{aiProgram.title}</Editable>
            </h2>
            <p className="promo__lead">
              <Editable id="aiProgram.summary">{aiProgram.summary}</Editable>
            </p>

            <EditableList
              id="aiProgram.benefits"
              defaults={aiProgram.benefits.map((_, i) => String(i))}
              as="ul"
              className="promo__benefits"
              newItem={{ '': 'New benefit' }}
              itemLabel="benefit"
              addLabel="Add benefit"
              renderItem={(itemId, key) => (
                <li>
                  <Icon name="check" size={18} />
                  <span>
                    <Editable id={key()}>{aiProgram.benefits[Number(itemId)] ?? ''}</Editable>
                  </span>
                </li>
              )}
            />
          </div>

          <aside className="promo__side">
            {open ? (
              <div className="promo__date">
                <span className="promo__date-label">
                  <Editable id="aiProgram.startsLabel">Batch starts</Editable>
                </span>
                <strong>
                  <Editable id="aiProgram.startDateLabel">{aiProgram.startDateLabel}</Editable>
                </strong>
                <span className="promo__countdown">
                  {daysLeft}{' '}
                  {daysLeft === 1 ? (
                    <Editable id="aiProgram.countdownDay">day</Editable>
                  ) : (
                    <Editable id="aiProgram.countdownDays">days</Editable>
                  )}{' '}
                  <Editable id="aiProgram.countdownSuffix">to go</Editable>
                </span>
              </div>
            ) : (
              <div className="promo__date">
                <span className="promo__date-label">
                  <Editable id="aiProgram.batchLabel">{aiProgram.batchLabel}</Editable>
                </span>
                <strong>
                  <Editable id="aiProgram.registrationEnds">
                    {`Registration ends on ${aiProgram.registrationEndLabel}`}
                  </Editable>
                </strong>
                <p className="promo__date-note">
                  <Editable id="aiProgram.closedNote">
                    {`Registration for the ${batchLabel} has closed. We'll update you with the next batch date soon.`}
                  </Editable>
                </p>
              </div>
            )}

            <ul className="promo__facts">
              <li>
                <Icon name="pin" size={18} />
                <span>
                  <Editable id="aiProgram.eligibilityFact">
                    {`Eligibility: ${eligibilityCandidates} only`}
                  </Editable>
                </span>
              </li>
              <li>
                <Icon name="clock" size={18} />
                <span>
                  {open ? (
                    <Editable id="aiProgram.seatsOpen">Limited seats available</Editable>
                  ) : (
                    <Editable id="aiProgram.seatsClosed">Seats open again with the next batch</Editable>
                  )}
                </span>
              </li>
              <li>
                <Icon name="mail" size={18} />
                <a href={company.emailHref}>
                  <Editable id="company.email">{company.email}</Editable>
                </a>
              </li>
            </ul>

            {open ? (
              <ButtonLink
                id="aiProgram.ctaOpen"
                hrefId="aiProgram.registerUrl"
                to={aiProgram.registerUrl}
                className="btn btn--accent promo__cta"
                icon="arrow"
                iconSize={16}
              >
                Register now &amp; reserve your spot
              </ButtonLink>
            ) : (
              <ButtonLink
                id="aiProgram.ctaClosed"
                hrefId="aiProgram.registerUrl"
                to={aiProgram.registerUrl}
                className="btn btn--accent promo__cta"
                icon="arrow"
                iconSize={16}
              >
                Register now
              </ButtonLink>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
