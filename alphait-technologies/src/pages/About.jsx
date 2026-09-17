import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import Icon from '../components/Icon.jsx'
import { company, industries, stats, technologies } from '../data/site.js'

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

export default function About() {
  return (
    <>
      <PageBanner
        title="About Us"
        subtitle={`${company.name} — an IT services firm headquartered in Branchburg, New Jersey.`}
      />

      <section className="section">
        <div className="container two-col">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 className="section__title">Quality integrated into every business process</h2>
            <p>
              {company.name} is an information technology services firm with its headquarters at{' '}
              {company.address}. We work with enterprises that need a partner who pays attention to
              the detail of their business requirement and to the long-term strategic benefit of the
              solutions we put in place.
            </p>
            <p>
              Quality is not a stage at the end of our delivery — it is integrated into every
              business process we run. Day to day, our teams manage work through what we call the
              3P&apos;s: Planning, Preparation and Prediction.
            </p>
            <div className="intro__actions">
              <Link to="/services" className="btn btn--primary">
                Our services
              </Link>
              <Link to="/contact" className="link-arrow">
                Contact the team
                <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>

          <ul className="pillar-list">
            {pillars.map((pillar) => (
              <li key={pillar.title}>
                <span className="pillar-list__mark">{pillar.title[0]}</span>
                <div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container grid grid--2">
          <article className="statement-card">
            <span className="service-card__icon">
              <Icon name="target" size={28} />
            </span>
            <h2>Our Vision</h2>
            <p>
              {company.shortName} strives to be a well-known organisation across the globe in the
              field of Information Technology — a solutions provider of top quality, cost-effective
              for all, with its values intact.
            </p>
          </article>
          <article className="statement-card">
            <span className="service-card__icon">
              <Icon name="shield" size={28} />
            </span>
            <h2>Our Mission</h2>
            <p>
              {company.shortName} believes in ethics and values for all those who are directly,
              indirectly, moderately or minutely a part of — or affected by — our organisation.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section__head">
            <p className="eyebrow">Where we work</p>
            <h2 className="section__title">Industries and technologies</h2>
            <p className="section__lead">
              We serve banking, healthcare, engineering, financial services and telecommunications,
              with banking as our strongest domain.
            </p>
          </header>
          <div className="chips-grid">
            <div className="chips-block">
              <h3>Industries</h3>
              <ul className="chips">
                {industries.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="chips-block">
              <h3>Technologies</h3>
              <ul className="chips">
                {technologies.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <ul className="stats">
            {stats.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section__head">
            <p className="eyebrow">Why clients stay</p>
            <h2 className="section__title">Key business attributes</h2>
          </header>
          <ul className="ticks ticks--grid">
            <li>
              <Icon name="check" size={18} />
              <span>Proficiency in delivering enterprise-scale projects end to end</span>
            </li>
            <li>
              <Icon name="check" size={18} />
              <span>Timely project completion with continuous budget optimisation</span>
            </li>
            <li>
              <Icon name="check" size={18} />
              <span>Emphasis on employee brainstorming and team recognition</span>
            </li>
            <li>
              <Icon name="check" size={18} />
              <span>A process-oriented and people-centric organisational culture</span>
            </li>
            <li>
              <Icon name="check" size={18} />
              <span>Transparent communication with client stakeholders at every stage</span>
            </li>
            <li>
              <Icon name="check" size={18} />
              <span>Cost-effective engagement models, onsite, offshore and hybrid</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
