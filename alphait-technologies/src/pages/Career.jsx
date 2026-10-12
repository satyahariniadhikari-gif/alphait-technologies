import { useState } from 'react'
import Editable from '../admin/Editable.jsx'
import EditableImage from '../admin/EditableImage.jsx'
import EditableList from '../admin/EditableList.jsx'
import PageSections from '../admin/PageSections.jsx'
import { useCompany, useContent, useList } from '../admin/content-context.js'
import PageBanner from '../components/PageBanner.jsx'
import Icon from '../components/Icon.jsx'
import teamPhoto from '../assets/team-meeting.jpg'
import careersPhoto from '../assets/careers-office.jpg'
import { jobs } from '../data/site.js'

const FILTERS = ['All', 'Full Time', 'Part Time', 'Contract']

const jobsById = Object.fromEntries(jobs.map((job) => [job.id, job]))
const jobIds = jobs.map((job) => job.id)

const normalize = (text) => String(text).trim().toLowerCase()

const perks = [
  'Competitive compensation with performance bonuses',
  'Medical, dental and vision coverage',
  'Paid certification and continuous training',
  'H1B / green card sponsorship for eligible candidates',
]

export default function Career() {
  const company = useCompany()
  const { content } = useContent()
  const jobList = useList('jobs', jobIds)
  const [filter, setFilter] = useState('All')

  const matches = (itemId) => {
    if (filter === 'All') return true
    const type = content[jobList.keyOf(itemId, 'type')] ?? jobsById[itemId]?.type ?? ''
    return normalize(type) === normalize(filter)
  }
  const visibleCount = jobList.ids.filter(matches).length

  return (
    <>
      <PageBanner
        id="career.banner"
        title="Careers"
        subtitle="We are here to accelerate your job and help you find the way."
        image={careersPhoto}
        aside={
          <>
            <div className="hero__panel-card">
              <Icon name="users" size={28} />
              <h2>{jobList.ids.length}</h2>
              <p>
                <Editable id="career.open.eyebrow">Open positions</Editable>
              </p>
            </div>
            <div className="hero__panel-card">
              <Icon name="shield" size={28} />
              <h2>
                <Editable id="career.life.ticks.3">{perks[3]}</Editable>
              </h2>
              <p>
                <Editable id="career.life.ticks.2">{perks[2]}</Editable>
              </p>
            </div>
          </>
        }
      />

      <PageSections
        page="career"
        sections={[
          [
            'jobs',
            'Open positions',
            <section key="jobs" className="section">
              <div className="container">
                <header className="section__head section__head--split">
                  <div>
                    <p className="eyebrow">
                      <Editable id="career.open.eyebrow">Open positions</Editable>
                    </p>
                    <h2 className="section__title">
                      <Editable id="career.open.title">{`Grow with ${company.name}`}</Editable>
                    </h2>
                  </div>
                  <div className="filters" role="group" aria-label="Filter roles by type">
                    {FILTERS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={option === filter ? 'is-active' : undefined}
                        onClick={() => setFilter(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </header>

                {visibleCount === 0 ? (
                  <p className="empty">
                    No {filter.toLowerCase()}{' '}
                    <Editable id="career.empty.text">
                      roles are open right now. Send your resume to
                    </Editable>{' '}
                    <a href={company.emailHref}>
                      <Editable id="company.email">{company.email}</Editable>
                    </a>{' '}
                    <Editable id="career.empty.after">and we&apos;ll keep it on file.</Editable>
                  </p>
                ) : null}
                <EditableList
                  id="jobs"
                  defaults={jobIds}
                  className="grid grid--3"
                  itemLabel="job"
                  addLabel="Add job opening"
                  newItem={{
                    title: 'New role',
                    type: 'Full Time',
                    location: 'Branchburg, NJ',
                    experience: '2+ years',
                    summary: 'Describe the role and what the candidate will do.',
                  }}
                  renderItem={(itemId, key) => {
                    const job = jobsById[itemId]
                    const type = content[key('type')] ?? job?.type ?? ''
                    if (filter !== 'All' && normalize(type) !== normalize(filter)) return null
                    const title = content[key('title')] ?? job?.title ?? ''
                    return (
                      <article className="job-card">
                        <span className="tag">
                          <Editable id={key('type')}>{job?.type ?? ''}</Editable>
                        </span>
                        <h3>
                          <Editable id={key('title')}>{job?.title ?? ''}</Editable>
                        </h3>
                        <p>
                          <Editable id={key('summary')}>{job?.summary ?? ''}</Editable>
                        </p>
                        <ul className="job-card__meta">
                          <li>
                            <Icon name="pin" size={16} />{' '}
                            <Editable id={key('location')}>{job?.location ?? ''}</Editable>
                          </li>
                          <li>
                            <Icon name="clock" size={16} />{' '}
                            <Editable id={key('experience')}>{job?.experience ?? ''}</Editable>
                          </li>
                        </ul>
                        <a
                          className="link-arrow"
                          href={`${company.emailHref}?subject=${encodeURIComponent(
                            `Application — ${title} (${itemId})`,
                          )}`}
                        >
                          <Editable id="career.jobs.apply">Apply now</Editable>
                          <Icon name="arrow" size={16} />
                        </a>
                      </article>
                    )
                  }}
                />
              </div>
            </section>,
          ],
          [
            'life',
            'Life at Alpha IT',
            <section key="life" className="section section--tint">
              <figure className="container photo photo--banner">
                <EditableImage
                  id="career.life.photo"
                  src={teamPhoto}
                  alt="Alpha IT team members collaborating on laptops around a table on the rooftop campus"
                  width="1407"
                  height="768"
                  loading="lazy"
                />
              </figure>
              <div className="container two-col">
                <div>
                  <p className="eyebrow">
                    <Editable id="career.life.eyebrow">Life at Alpha IT</Editable>
                  </p>
                  <h2 className="section__title">
                    <Editable id="career.life.title">
                      A people-centric place to build a career
                    </Editable>
                  </h2>
                  <p>
                    <Editable id="career.life.text">
                      We are process-oriented but people-centric. Brainstorming is encouraged,
                      contribution is recognised, and consultants are supported with training so
                      they can move into the technologies our clients are investing in.
                    </Editable>
                  </p>
                  <EditableList
                    id="career.life.ticks"
                    defaults={perks.map((_, i) => String(i))}
                    as="ul"
                    className="ticks"
                    itemLabel="perk"
                    addLabel="Add perk"
                    newItem={{ '': 'New perk' }}
                    renderItem={(itemId, key) => (
                      <li>
                        <Icon name="check" size={18} />
                        <span>
                          <Editable id={key()}>{perks[Number(itemId)] ?? ''}</Editable>
                        </span>
                      </li>
                    )}
                  />
                </div>

                <aside className="side-card">
                  <h3>
                    <Editable id="career.side.title">Didn&apos;t find your role?</Editable>
                  </h3>
                  <p>
                    <Editable id="career.side.text">
                      Send your resume with the role you are targeting and our recruitment team
                      will reach out when a matching position opens.
                    </Editable>
                  </p>
                  <ul className="contact-list">
                    <li>
                      <Icon name="mail" size={20} />
                      <a href={company.emailHref}>
                        <Editable id="company.email">{company.email}</Editable>
                      </a>
                    </li>
                    <li>
                      <Icon name="phone" size={20} />
                      <a href={company.phoneHref}>
                        <Editable id="company.phone">{company.phone}</Editable>
                      </a>
                    </li>
                    <li>
                      <Icon name="pin" size={20} />
                      <span>
                        <Editable id="company.addressLine1">{company.addressLines[0]}</Editable>
                        ,{' '}
                        <Editable id="company.addressLine2">{company.addressLines[1]}</Editable>
                      </span>
                    </li>
                  </ul>
                  <a className="btn btn--accent" href={company.emailHref}>
                    <Editable id="career.side.button">Email your resume</Editable>
                  </a>
                </aside>
              </div>
            </section>,
          ],
        ]}
      />
    </>
  )
}
