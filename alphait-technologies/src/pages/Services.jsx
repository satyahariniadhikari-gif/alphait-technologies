import Editable from '../admin/Editable.jsx'
import EditableList from '../admin/EditableList.jsx'
import ButtonLink from '../admin/ButtonLink.jsx'
import PageSections from '../admin/PageSections.jsx'
import { useCompany } from '../admin/content-context.js'
import PageBanner from '../components/PageBanner.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { services } from '../data/site.js'

const process = [
  { title: 'Discover', text: 'We listen to the business requirement and agree what success looks like.' },
  { title: 'Design', text: 'Architecture, delivery plan and team shape, sized to your budget.' },
  { title: 'Deliver', text: 'Iterative build with quality gates baked into every sprint.' },
  { title: 'Support', text: 'Hypercare, enhancements and knowledge transfer to your own team.' },
]

const servicesBySlug = Object.fromEntries(services.map((service) => [service.slug, service]))

export default function Services() {
  const company = useCompany()

  return (
    <>
      <PageBanner
        id="services.banner"
        title="Services"
        subtitle="Consulting, training and application development from a partner that understands the pulse of the global market."
      />

      <PageSections
        page="services"
        sections={[
          [
            'offer',
            'Services',
            <section key="offer" className="section">
              <div className="container">
                <header className="section__head">
                  <p className="eyebrow">
                    <Editable id="services.offer.eyebrow">What we offer</Editable>
                  </p>
                  <h2 className="section__title">
                    <Editable id="services.offer.title">Three practices, one delivery standard</Editable>
                  </h2>
                  <p className="section__lead">
                    <Editable id="services.offer.lead">
                      {`${company.name} positions itself as a technology solutions provider that emphasises innovation and reliability, enabling organisations of every size to achieve growth through information technology.`}
                    </Editable>
                  </p>
                </header>
                <EditableList
                  id="services"
                  defaults={services.map((service) => service.slug)}
                  className="grid grid--3"
                  newItem={{ title: 'New service', summary: 'Describe this service.' }}
                  addLabel="Add service"
                  itemLabel="service"
                  renderItem={(itemId) => (
                    <ServiceCard
                      service={
                        servicesBySlug[itemId] ?? {
                          slug: itemId,
                          title: '',
                          summary: '',
                          points: [],
                          icon: 'spark',
                        }
                      }
                      detailed
                    />
                  )}
                />
              </div>
            </section>,
          ],
          [
            'process',
            'How we work',
            <section key="process" className="section section--tint">
              <div className="container">
                <header className="section__head">
                  <p className="eyebrow">
                    <Editable id="services.process.eyebrow">How we work</Editable>
                  </p>
                  <h2 className="section__title">
                    <Editable id="services.process.title">A delivery process you can plan around</Editable>
                  </h2>
                </header>
                <EditableList
                  id="services.process"
                  defaults={process.map((_, i) => String(i))}
                  as="ol"
                  className="steps"
                  newItem={{ title: 'New step', text: 'Describe this step.' }}
                  addLabel="Add step"
                  itemLabel="step"
                  renderItem={(itemId, key, index) => {
                    const item = process[Number(itemId)]
                    return (
                      <li>
                        <span className="steps__num">{String(index + 1).padStart(2, '0')}</span>
                        <h3>
                          <Editable id={key('title')}>{item?.title ?? ''}</Editable>
                        </h3>
                        <p>
                          <Editable id={key('text')}>{item?.text ?? ''}</Editable>
                        </p>
                      </li>
                    )
                  }}
                />
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
                    <Editable id="services.cta.title">Ready to start a conversation?</Editable>
                  </h2>
                  <p>
                    <Editable id="services.cta.textBefore">Tell us about the outcome you need. Call</Editable>{' '}
                    <Editable id="company.phone">{company.phone}</Editable>{' '}
                    <Editable id="services.cta.textAfter">or send a note to</Editable>{' '}
                    <a href={company.emailHref}>
                      <Editable id="company.email">{company.email}</Editable>
                    </a>
                    .
                  </p>
                </div>
                <ButtonLink id="services.cta.button" to="/contact" className="btn btn--accent" icon="arrow">
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
