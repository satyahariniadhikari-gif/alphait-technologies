import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import CallbackForm from '../components/CallbackForm.jsx'
import Icon from '../components/Icon.jsx'
import { company, industries, jobs, services, stats, technologies } from '../data/site.js'

export default function Home() {
  return (
    <>
      <HeroSlider />

      <section className="section">
        <div className="container intro">
          <div className="intro__copy">
            <p className="eyebrow">Welcome to {company.name}</p>
            <h2 className="section__title">
              Companies everywhere are looking for innovative solutions — we build them
            </h2>
            <p>
              Technology has become the go-to tool for organisations that want to grow. At{' '}
              {company.name} we understand the pulse of the global market and the challenges it
              pitches every step of the way, and we turn that understanding into information
              technology that small, medium and large enterprises can actually run their business on.
            </p>
            <p>
              From our office at {company.address}, our consultants partner with client teams across
              banking, healthcare, engineering, financial services and telecommunications — planning
              carefully, preparing thoroughly and predicting what comes next.
            </p>
            <div className="intro__actions">
              <Link to="/about" className="btn btn--primary">
                More about us
              </Link>
              <a className="link-arrow" href={company.phoneHref}>
                {company.phone}
                <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>

          <ul className="intro__pillars">
            <li>
              <Icon name="spark" size={26} />
              <h3>Innovation</h3>
              <p>Modern platforms, pragmatic architecture and solutions built to last.</p>
            </li>
            <li>
              <Icon name="shield" size={26} />
              <h3>Reliability</h3>
              <p>Quality integrated into every business process, not bolted on at the end.</p>
            </li>
            <li>
              <Icon name="users" size={26} />
              <h3>People first</h3>
              <p>A process-oriented, people-centric culture where good ideas are recognised.</p>
            </li>
            <li>
              <Icon name="target" size={26} />
              <h3>Value</h3>
              <p>Projects delivered on schedule with a constant eye on budget optimisation.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <header className="section__head">
            <p className="eyebrow">What we do</p>
            <h2 className="section__title">Services built around your business outcomes</h2>
          </header>
          <div className="grid grid--3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
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
            <p className="eyebrow">Domains &amp; technology</p>
            <h2 className="section__title">Deep in the domains that matter</h2>
            <p className="section__lead">
              Banking remains our strongest domain, and our teams work daily across the platforms
              that modern enterprises depend on.
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

      <section className="section section--tint">
        <div className="container">
          <header className="section__head section__head--split">
            <div>
              <p className="eyebrow">Careers</p>
              <h2 className="section__title">
                We are here to accelerate your job and help you find the way
              </h2>
            </div>
            <Link to="/career" className="btn btn--primary">
              Show all jobs
            </Link>
          </header>
          <div className="grid grid--3">
            {jobs.slice(0, 3).map((job) => (
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
                <Link className="link-arrow" to="/career">
                  View role
                  <Icon name="arrow" size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="callback">
        <div className="container callback-block">
          <div className="callback-block__copy">
            <p className="eyebrow">Request a call back</p>
            <h2 className="section__title">
              Would you like to speak to one of our consulting organisers?
            </h2>
            <p>
              Just submit your contact details and we&apos;ll be in touch shortly. You can also email
              us at <a href={company.emailHref}>{company.email}</a> if you would prefer.
            </p>
            <ul className="contact-list">
              <li>
                <Icon name="pin" size={20} />
                <span>{company.address}</span>
              </li>
              <li>
                <Icon name="phone" size={20} />
                <a href={company.phoneHref}>{company.phone}</a>
              </li>
              <li>
                <Icon name="mail" size={20} />
                <a href={company.emailHref}>{company.email}</a>
              </li>
            </ul>
          </div>
          <div className="callback-block__form">
            <CallbackForm compact />
          </div>
        </div>
      </section>
    </>
  )
}
