import HeroSlider from '../components/HeroSlider.jsx'
import AiProgramPromo from '../components/AiProgramPromo.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import CallbackForm from '../components/CallbackForm.jsx'
import CareersCarousel from '../components/CareersCarousel.jsx'
import Icon from '../components/Icon.jsx'
import Editable from '../admin/Editable.jsx'
import EditableList from '../admin/EditableList.jsx'
import EditableIcon from '../admin/EditableIcon.jsx'
import EditableImage from '../admin/EditableImage.jsx'
import ButtonLink from '../admin/ButtonLink.jsx'
import PageSections from '../admin/PageSections.jsx'
import { useCompany } from '../admin/content-context.js'
import { industries, services, stats, technologies } from '../data/site.js'
import trainingPhoto from '../assets/training-session.jpg'
import officePhoto from '../assets/office-hq.jpg'
import teamPhoto from '../assets/team-meeting.jpg'

const careerPhotos = [
  { src: trainingPhoto, label: 'Training', alt: 'An Alpha IT trainer leading a classroom session' },
  {
    src: officePhoto,
    label: 'Consulting',
    alt: 'Alpha IT consultants planning a project at the NYC headquarters',
  },
  {
    src: teamPhoto,
    label: 'Placements',
    alt: 'Alpha IT team members collaborating on the rooftop campus',
  },
]

const pillars = [
  {
    icon: 'spark',
    title: 'Innovation',
    text: 'Modern platforms, pragmatic architecture and solutions built to last.',
  },
  {
    icon: 'shield',
    title: 'Reliability',
    text: 'Quality integrated into every business process, not bolted on at the end.',
  },
  {
    icon: 'users',
    title: 'People first',
    text: 'A process-oriented, people-centric culture where good ideas are recognised.',
  },
  {
    icon: 'target',
    title: 'Value',
    text: 'Projects delivered on schedule with a constant eye on budget optimisation.',
  },
]

const servicesBySlug = Object.fromEntries(services.map((service) => [service.slug, service]))

export default function Home() {
  const company = useCompany()

  return (
    <PageSections
      page="home"
      sections={[
        ['hero', 'Hero slider', <HeroSlider key="hero" />],
        ['aiProgram', 'AI program promo', <AiProgramPromo key="aiProgram" />],
        [
          'intro',
          'Welcome',
          <section key="intro" className="section">
            <div className="container intro">
              <div className="intro__copy">
                <p className="eyebrow">
                  <Editable id="home.intro.eyebrow">{`Welcome to ${company.name}`}</Editable>
                </p>
                <h2 className="section__title">
                  <Editable id="home.intro.title">
                    Companies everywhere are looking for innovative solutions — we build them
                  </Editable>
                </h2>
                <p>
                  <Editable id="home.intro.p1">
                    {`Technology has become the go-to tool for organisations that want to grow. At ${company.name} we understand the pulse of the global market and the challenges it pitches every step of the way, and we turn that understanding into information technology that small, medium and large enterprises can actually run their business on.`}
                  </Editable>
                </p>
                <p>
                  <Editable id="home.intro.p2">
                    {`From our office at ${company.address}, our consultants partner with client teams across banking, healthcare, engineering, financial services and telecommunications — planning carefully, preparing thoroughly and predicting what comes next.`}
                  </Editable>
                </p>
                <div className="intro__actions">
                  <ButtonLink id="home.intro.cta" to="/about" className="btn btn--primary">
                    More about us
                  </ButtonLink>
                  <a className="link-arrow" href={company.phoneHref}>
                    <Editable id="company.phone">{company.phone}</Editable>
                    <Icon name="arrow" size={16} />
                  </a>
                </div>
              </div>

              <div>
                <EditableList
                  id="home.pillars"
                  defaults={pillars.map((_, i) => String(i))}
                  as="ul"
                  className="intro__pillars"
                  newItem={{ title: 'New pillar', text: 'Describe this pillar.' }}
                  itemLabel="pillar"
                  addLabel="Add pillar"
                  renderItem={(itemId, key) => {
                    const pillar = pillars[Number(itemId)]
                    return (
                      <li>
                        <EditableIcon id={key('icon')} fallback={pillar?.icon ?? 'spark'} size={26} />
                        <h3>
                          <Editable id={key('title')}>{pillar?.title ?? ''}</Editable>
                        </h3>
                        <p>
                          <Editable id={key('text')}>{pillar?.text ?? ''}</Editable>
                        </p>
                      </li>
                    )
                  }}
                />
              </div>
            </div>
          </section>,
        ],
        [
          'services',
          'Services',
          <section key="services" className="section section--tint">
            <div className="container">
              <header className="section__head">
                <p className="eyebrow">
                  <Editable id="home.services.eyebrow">What we do</Editable>
                </p>
                <h2 className="section__title">
                  <Editable id="home.services.title">
                    Services built around your business outcomes
                  </Editable>
                </h2>
              </header>
              <EditableList
                id="services"
                defaults={services.map((service) => service.slug)}
                className="grid grid--3"
                newItem={{ title: 'New service', summary: 'Describe this service.' }}
                itemLabel="service"
                addLabel="Add service"
                renderItem={(itemId) => (
                  <ServiceCard
                    key={itemId}
                    service={
                      servicesBySlug[itemId] ?? {
                        slug: itemId,
                        title: '',
                        summary: '',
                        points: [],
                        icon: 'spark',
                      }
                    }
                  />
                )}
              />
            </div>
          </section>,
        ],
        [
          'stats',
          'Stats',
          <section key="stats" className="section section--dark">
            <div className="container">
              <EditableList
                id="stats"
                defaults={stats.map((_, i) => String(i))}
                as="ul"
                className="stats"
                newItem={{ value: '0', label: 'New stat' }}
                itemLabel="stat"
                addLabel="Add stat"
                renderItem={(itemId, key) => {
                  const stat = stats[Number(itemId)]
                  return (
                    <li>
                      <strong>
                        <Editable id={key('value')}>{stat?.value ?? ''}</Editable>
                      </strong>
                      <span>
                        <Editable id={key('label')}>{stat?.label ?? ''}</Editable>
                      </span>
                    </li>
                  )
                }}
              />
            </div>
          </section>,
        ],
        [
          'domains',
          'Domains & technology',
          <section key="domains" className="section">
            <div className="container">
              <header className="section__head">
                <p className="eyebrow">
                  <Editable id="home.domains.eyebrow">Domains &amp; technology</Editable>
                </p>
                <h2 className="section__title">
                  <Editable id="home.domains.title">Deep in the domains that matter</Editable>
                </h2>
                <p className="section__lead">
                  <Editable id="home.domains.lead">
                    Banking remains our strongest domain, and our teams work daily across the platforms
                    that modern enterprises depend on.
                  </Editable>
                </p>
              </header>
              <div className="chips-grid">
                <div className="chips-block">
                  <h3>
                    <Editable id="home.domains.industriesTitle">Industries</Editable>
                  </h3>
                  <EditableList
                    id="industries"
                    defaults={industries.map((_, i) => String(i))}
                    as="ul"
                    className="chips"
                    newItem={{ '': 'New industry' }}
                    itemLabel="industry"
                    addLabel="Add industry"
                    renderItem={(itemId, key) => (
                      <li>
                        <Editable id={key()}>{industries[Number(itemId)] ?? ''}</Editable>
                      </li>
                    )}
                  />
                </div>
                <div className="chips-block">
                  <h3>
                    <Editable id="home.domains.technologiesTitle">Technologies</Editable>
                  </h3>
                  <EditableList
                    id="technologies"
                    defaults={technologies.map((_, i) => String(i))}
                    as="ul"
                    className="chips"
                    newItem={{ '': 'New technology' }}
                    itemLabel="technology"
                    addLabel="Add technology"
                    renderItem={(itemId, key) => (
                      <li>
                        <Editable id={key()}>{technologies[Number(itemId)] ?? ''}</Editable>
                      </li>
                    )}
                  />
                </div>
              </div>
            </div>
          </section>,
        ],
        [
          'careers',
          'Careers',
          <section key="careers" className="section section--tint careers-strip">
            <div className="container">
              <header className="section__head section__head--split">
                <div>
                  <h2 className="careers-strip__title">
                    <Editable id="home.careers.title">Careers</Editable>
                  </h2>
                  <p className="careers-strip__lead">
                    <Editable id="home.careers.lead">
                      We are here to accelerate your job and help you find the way.
                    </Editable>
                  </p>
                </div>
                <ButtonLink id="home.careers.cta" to="/career" className="btn btn--primary">
                  Show all jobs
                </ButtonLink>
              </header>
            </div>
            <CareersCarousel photos={careerPhotos} />
          </section>,
        ],
        [
          'callback',
          'Request a call back',
          <section key="callback" className="section" id="callback">
            <div className="container callback-block">
              <div className="callback-block__copy">
                <p className="eyebrow">
                  <Editable id="home.callback.eyebrow">Request a call back</Editable>
                </p>
                <h2 className="section__title">
                  <Editable id="home.callback.title">
                    Would you like to speak to one of our consulting organisers?
                  </Editable>
                </h2>
                <p>
                  <Editable id="home.callback.textBefore">
                    Just submit your contact details and we&apos;ll be in touch shortly. You can also email
                    us at
                  </Editable>{' '}
                  <a href={company.emailHref}>
                    <Editable id="company.email">{company.email}</Editable>
                  </a>{' '}
                  <Editable id="home.callback.textAfter">if you would prefer.</Editable>
                </p>
                <ul className="contact-list">
                  <li>
                    <Icon name="pin" size={20} />
                    <span>
                      <Editable id="company.addressLine1">{company.addressLines[0]}</Editable>
                      {', '}
                      <Editable id="company.addressLine2">{company.addressLines[1]}</Editable>
                    </span>
                  </li>
                  <li>
                    <Icon name="phone" size={20} />
                    <a href={company.phoneHref}>
                      <Editable id="company.phone">{company.phone}</Editable>
                    </a>
                  </li>
                  <li>
                    <Icon name="mail" size={20} />
                    <a href={company.emailHref}>
                      <Editable id="company.email">{company.email}</Editable>
                    </a>
                  </li>
                </ul>
                <EditableImage
                  id="home.callback.photo"
                  className="callback-block__photo"
                  src={officePhoto}
                  alt="Alpha IT consultants meeting with clients at the headquarters"
                  loading="lazy"
                />
              </div>
              <div className="callback-block__form">
                <CallbackForm compact />
              </div>
            </div>
          </section>,
        ],
      ]}
    />
  )
}
