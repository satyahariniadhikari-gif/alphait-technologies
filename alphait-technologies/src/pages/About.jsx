import Editable from '../admin/Editable.jsx'
import EditableIcon from '../admin/EditableIcon.jsx'
import EditableList from '../admin/EditableList.jsx'
import ButtonLink from '../admin/ButtonLink.jsx'
import PageSections from '../admin/PageSections.jsx'
import { useCompany, useContent } from '../admin/content-context.js'
import PageBanner from '../components/PageBanner.jsx'
import Icon from '../components/Icon.jsx'
import { industries, stats, technologies } from '../data/site.js'

const pillars = [
  {
    title: 'Planning',
    text: 'We map the business requirement before a line of code is written, so the solution fits the organisation and not the other way around.',
  },
  {
    title: 'Preparation',
    text: 'Environments, data, people and process are readied in advance — the reason our releases rarely slip.',
  },
  {
    title: 'Prediction',
    text: 'We look for the long-term benefit of every decision and flag the risk before it becomes an escalation.',
  },
]

const attributes = [
  'Proficiency in delivering enterprise-scale projects end to end',
  'Timely project completion with continuous budget optimisation',
  'Emphasis on employee brainstorming and team recognition',
  'A process-oriented and people-centric organisational culture',
  'Transparent communication with client stakeholders at every stage',
  'Cost-effective engagement models, onsite, offshore and hybrid',
]

export default function About() {
  const company = useCompany()
  const { content } = useContent()

  const statements = {
    vision: {
      icon: 'target',
      title: 'Our Vision',
      text: `${company.shortName} strives to be a well-known organisation across the globe in the field of Information Technology — a solutions provider of top quality, cost-effective for all, with its values intact.`,
    },
    mission: {
      icon: 'shield',
      title: 'Our Mission',
      text: `${company.shortName} believes in ethics and values for all those who are directly, indirectly, moderately or minutely a part of — or affected by — our organisation.`,
    },
  }

  return (
    <>
      <PageBanner
        id="about.banner"
        title="About Us"
        subtitle={`${company.name} — an IT services firm headquartered in Branchburg, New Jersey.`}
      />

      <PageSections
        page="about"
        sections={[
          [
            'who',
            'Who we are',
            <section key="who" className="section">
              <div className="container two-col">
                <div>
                  <p className="eyebrow">
                    <Editable id="about.who.eyebrow">Who we are</Editable>
                  </p>
                  <h2 className="section__title">
                    <Editable id="about.who.title">Quality integrated into every business process</Editable>
                  </h2>
                  <p>
                    <Editable id="about.who.text.0">
                      {`${company.name} is an information technology services firm with its headquarters at ${company.address}. We work with enterprises that need a partner who pays attention to the detail of their business requirement and to the long-term strategic benefit of the solutions we put in place.`}
                    </Editable>
                  </p>
                  <p>
                    <Editable id="about.who.text.1">
                      Quality is not a stage at the end of our delivery — it is integrated into every
                      business process we run. Day to day, our teams manage work through what we call the
                      3P&apos;s: Planning, Preparation and Prediction.
                    </Editable>
                  </p>
                  <div className="intro__actions">
                    <ButtonLink id="about.who.ctaPrimary" to="/services" className="btn btn--primary">
                      Our services
                    </ButtonLink>
                    <ButtonLink
                      id="about.who.ctaSecondary"
                      to="/contact"
                      className="link-arrow"
                      icon="arrow"
                      iconSize={16}
                    >
                      Contact the team
                    </ButtonLink>
                  </div>
                </div>

                <EditableList
                  id="about.pillars"
                  defaults={pillars.map((_, i) => String(i))}
                  as="ul"
                  className="pillar-list"
                  newItem={{ title: 'New pillar', text: 'Describe this pillar.' }}
                  addLabel="Add pillar"
                  itemLabel="pillar"
                  renderItem={(itemId, key) => {
                    const pillar = pillars[Number(itemId)]
                    const title = content[key('title')] ?? pillar?.title ?? ''
                    return (
                      <li>
                        <span className="pillar-list__mark">{title.trim()[0] ?? ''}</span>
                        <div>
                          <h3>
                            <Editable id={key('title')}>{pillar?.title ?? ''}</Editable>
                          </h3>
                          <p>
                            <Editable id={key('text')}>{pillar?.text ?? ''}</Editable>
                          </p>
                        </div>
                      </li>
                    )
                  }}
                />
              </div>
            </section>,
          ],
          [
            'vision',
            'Vision & mission',
            <section key="vision" className="section section--tint">
              <EditableList
                id="about"
                defaults={Object.keys(statements)}
                className="container grid grid--2"
                newItem={{ title: 'New statement', text: 'Describe this statement.' }}
                addLabel="Add statement"
                itemLabel="card"
                renderItem={(itemId, key) => {
                  const statement = statements[itemId]
                  return (
                    <article className="statement-card">
                      <span className="service-card__icon">
                        <EditableIcon id={key('icon')} fallback={statement?.icon ?? 'spark'} size={28} />
                      </span>
                      <h2>
                        <Editable id={key('title')}>{statement?.title ?? ''}</Editable>
                      </h2>
                      <p>
                        <Editable id={key('text')}>{statement?.text ?? ''}</Editable>
                      </p>
                    </article>
                  )
                }}
              />
            </section>,
          ],
          [
            'where',
            'Industries & technologies',
            <section key="where" className="section">
              <div className="container">
                <header className="section__head">
                  <p className="eyebrow">
                    <Editable id="about.where.eyebrow">Where we work</Editable>
                  </p>
                  <h2 className="section__title">
                    <Editable id="about.where.title">Industries and technologies</Editable>
                  </h2>
                  <p className="section__lead">
                    <Editable id="about.where.lead">
                      We serve banking, healthcare, engineering, financial services and telecommunications,
                      with banking as our strongest domain.
                    </Editable>
                  </p>
                </header>
                <div className="chips-grid">
                  <div className="chips-block">
                    <h3>
                      <Editable id="about.where.industriesTitle">Industries</Editable>
                    </h3>
                    <EditableList
                      id="industries"
                      defaults={industries.map((_, i) => String(i))}
                      as="ul"
                      className="chips"
                      newItem={{ '': 'New industry' }}
                      addLabel="Add industry"
                      itemLabel="industry"
                      renderItem={(itemId, key) => (
                        <li>
                          <Editable id={key()}>{industries[Number(itemId)] ?? ''}</Editable>
                        </li>
                      )}
                    />
                  </div>
                  <div className="chips-block">
                    <h3>
                      <Editable id="about.where.technologiesTitle">Technologies</Editable>
                    </h3>
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
                </div>
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
                  addLabel="Add stat"
                  itemLabel="stat"
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
            'attributes',
            'Key business attributes',
            <section key="attributes" className="section">
              <div className="container">
                <header className="section__head">
                  <p className="eyebrow">
                    <Editable id="about.attributes.eyebrow">Why clients stay</Editable>
                  </p>
                  <h2 className="section__title">
                    <Editable id="about.attributes.title">Key business attributes</Editable>
                  </h2>
                </header>
                <EditableList
                  id="about.attributes.ticks"
                  defaults={attributes.map((_, i) => String(i))}
                  as="ul"
                  className="ticks ticks--grid"
                  newItem={{ '': 'New attribute' }}
                  addLabel="Add attribute"
                  itemLabel="attribute"
                  renderItem={(itemId, key) => (
                    <li>
                      <Icon name="check" size={18} />
                      <span>
                        <Editable id={key()}>{attributes[Number(itemId)] ?? ''}</Editable>
                      </span>
                    </li>
                  )}
                />
              </div>
            </section>,
          ],
        ]}
      />
    </>
  )
}
