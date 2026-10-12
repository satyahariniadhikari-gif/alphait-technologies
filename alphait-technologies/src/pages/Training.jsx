import Editable from '../admin/Editable.jsx'
import EditableImage from '../admin/EditableImage.jsx'
import EditableList from '../admin/EditableList.jsx'
import ButtonLink from '../admin/ButtonLink.jsx'
import PageSections from '../admin/PageSections.jsx'
import { useCompany } from '../admin/content-context.js'
import PageBanner from '../components/PageBanner.jsx'
import Icon from '../components/Icon.jsx'
import trainingPhoto from '../assets/training-session.jpg'
import { services, stats, technologies } from '../data/site.js'

// Everything here comes from the site's existing Training service, technologies and stats;
// the ids are shared so an edit made on one page shows on the others.
const training = services.find((service) => service.slug === 'training')
const trainedIndex = stats.findIndex((stat) => /trained/i.test(stat.label))
const trained = stats[trainedIndex]

export default function Training() {
  const company = useCompany()

  return (
    <>
      <PageBanner id="training.banner" title="Training" subtitle={training.summary} />

      <PageSections
        page="training"
        sections={[
          [
            'offer',
            'What we offer',
            <section key="offer" className="section">
              <div className="container two-col">
                <div>
                  <p className="eyebrow">
                    <Editable id="training.offer.eyebrow">What we offer</Editable>
                  </p>
                  <h2 className="section__title">
                    <Editable id="services.training.title">{training.title}</Editable>
                  </h2>
                  <p>
                    <Editable id="services.training.summary">{training.summary}</Editable>
                  </p>
                  <EditableList
                    id="services.training.points"
                    defaults={training.points.map((_, i) => String(i))}
                    as="ul"
                    className="ticks"
                    newItem={{ '': 'New point' }}
                    addLabel="Add point"
                    itemLabel="point"
                    renderItem={(itemId, key) => (
                      <li>
                        <Icon name="check" size={18} />
                        <span>
                          <Editable id={key()}>{training.points[Number(itemId)] ?? ''}</Editable>
                        </span>
                      </li>
                    )}
                  />
                  <div className="intro__actions">
                    <ButtonLink id="training.offer.cta" to="/contact" className="btn btn--primary">
                      Request a call back
                    </ButtonLink>
                  </div>
                </div>
                <figure className="photo">
                  <EditableImage
                    id="training.offer.photo"
                    src={trainingPhoto}
                    alt="An Alpha IT trainer leading a classroom session"
                    loading="lazy"
                  />
                </figure>
              </div>
            </section>,
          ],
          [
            'technologies',
            'Technologies',
            <section key="technologies" className="section section--tint">
              <div className="container">
                <header className="section__head">
                  <p className="eyebrow">
                    <Editable id="training.technologies.eyebrow">Technologies</Editable>
                  </p>
                  <h2 className="section__title">
                    <Editable id="training.technologies.title">
                      Training across a wide range of software technologies
                    </Editable>
                  </h2>
                </header>
                <EditableList
                  id="technologies"
                  defaults={technologies.map((_, i) => String(i))}
                  as="ul"
                  className="chips"
                  newItem={{ '': 'New technology' }}
                  addLabel="Add technology"
                  itemLabel="technology"
                  renderItem={(itemId, key) => (
                    <li>
                      <Editable id={key()}>{technologies[Number(itemId)] ?? ''}</Editable>
                    </li>
                  )}
                />
              </div>
            </section>,
          ],
          [
            'stat',
            'Trained and placed',
            <section key="stat" className="section section--dark">
              <div className="container">
                <ul className="stats stats--single">
                  <li>
                    <strong>
                      <Editable id={`stats.${trainedIndex}.value`}>{trained.value}</Editable>
                    </strong>
                    <span>
                      <Editable id={`stats.${trainedIndex}.label`}>{trained.label}</Editable>
                    </span>
                  </li>
                </ul>
              </div>
            </section>,
          ],
          [
            'cta',
            'Call to action',
            <section key="cta" className="section">
              <div className="container cta-band">
                <div>
                  <h2>
                    <Editable id="training.cta.title">Ready to start a conversation?</Editable>
                  </h2>
                  <p>
                    <Editable id="training.cta.textBefore">Call</Editable>{' '}
                    <Editable id="company.phone">{company.phone}</Editable>{' '}
                    <Editable id="training.cta.textAfter">or send a note to</Editable>{' '}
                    <a href={company.emailHref}>
                      <Editable id="company.email">{company.email}</Editable>
                    </a>
                    .
                  </p>
                </div>
                <ButtonLink id="training.cta.button" to="/contact" className="btn btn--accent" icon="arrow">
                  Request a call back
                </ButtonLink>
              </div>
            </section>,
          ],
        ]}
      />
    </>
  )
}
