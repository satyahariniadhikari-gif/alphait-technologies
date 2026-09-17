import { useMemo, useState } from 'react'
import PageBanner from '../components/PageBanner.jsx'
import Icon from '../components/Icon.jsx'
import { company, jobs } from '../data/site.js'

const FILTERS = ['All', 'Full Time', 'Part Time', 'Contract']

export default function Career() {
  const [filter, setFilter] = useState('All')

  const visible = useMemo(
    () => (filter === 'All' ? jobs : jobs.filter((job) => job.type === filter)),
    [filter],
  )

  return (
    <>
      <PageBanner
        title="Career"
        subtitle="We are here to accelerate your job and help you find the way."
      />

      <section className="section">
        <div className="container">
          <header className="section__head section__head--split">
            <div>
              <p className="eyebrow">Open positions</p>
              <h2 className="section__title">Grow with {company.name}</h2>
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

          {visible.length === 0 ? (
            <p className="empty">
              No {filter.toLowerCase()} roles are open right now. Send your resume to{' '}
              <a href={company.emailHref}>{company.email}</a> and we&apos;ll keep it on file.
            </p>
          ) : (
            <div className="grid grid--3">
              {visible.map((job) => (
                <article key={job.id} className="job-card">
                  <span className="tag">{job.type}</span>
                  <h3>{job.title}</h3>
                  <p>{job.summary}</p>
                  <ul className="job-card__meta">
                    <li>
                      <Icon name="pin" size={16} /> {job.location}
                    </li>
                    <li>
                      <Icon name="clock" size={16} /> {job.experience}
                    </li>
                  </ul>
                  <a
                    className="link-arrow"
                    href={`${company.emailHref}?subject=${encodeURIComponent(
                      `Application — ${job.title} (${job.id})`,
                    )}`}
                  >
                    Apply now
                    <Icon name="arrow" size={16} />
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section--tint">
        <div className="container two-col">
          <div>
            <p className="eyebrow">Life at AlphaIT</p>
            <h2 className="section__title">A people-centric place to build a career</h2>
            <p>
              We are process-oriented but people-centric. Brainstorming is encouraged, contribution
              is recognised, and consultants are supported with training so they can move into the
              technologies our clients are investing in.
            </p>
            <ul className="ticks">
              <li>
                <Icon name="check" size={18} />
                <span>Competitive compensation with performance bonuses</span>
              </li>
              <li>
                <Icon name="check" size={18} />
                <span>Medical, dental and vision coverage</span>
              </li>
              <li>
                <Icon name="check" size={18} />
                <span>Paid certification and continuous training</span>
              </li>
              <li>
                <Icon name="check" size={18} />
                <span>H1B / green card sponsorship for eligible candidates</span>
              </li>
            </ul>
          </div>

          <aside className="side-card">
            <h3>Didn&apos;t find your role?</h3>
            <p>
              Send your resume with the role you are targeting and our recruitment team will reach
              out when a matching position opens.
            </p>
            <ul className="contact-list">
              <li>
                <Icon name="mail" size={20} />
                <a href={company.emailHref}>{company.email}</a>
              </li>
              <li>
                <Icon name="phone" size={20} />
                <a href={company.phoneHref}>{company.phone}</a>
              </li>
              <li>
                <Icon name="pin" size={20} />
                <span>{company.address}</span>
              </li>
            </ul>
            <a className="btn btn--accent" href={company.emailHref}>
              Email your resume
            </a>
          </aside>
        </div>
      </section>
    </>
  )
}
