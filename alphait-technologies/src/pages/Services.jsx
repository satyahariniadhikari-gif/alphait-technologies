import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import Icon from '../components/Icon.jsx'
import { company, services } from '../data/site.js'

const process = [
  { step: '01', title: 'Discover', text: 'We listen to the business requirement and agree what success looks like.' },
  { step: '02', title: 'Design', text: 'Architecture, delivery plan and team shape, sized to your budget.' },
  { step: '03', title: 'Deliver', text: 'Iterative build with quality gates baked into every sprint.' },
  { step: '04', title: 'Support', text: 'Hypercare, enhancements and knowledge transfer to your own team.' },
]

export default function Services() {
  return (
    <>
      <PageBanner
        title="Services"
        subtitle="Consulting, training and application development from a partner that understands the pulse of the global market."
      />

      <section className="section">
        <div className="container">
          <header className="section__head">
            <p className="eyebrow">What we offer</p>
            <h2 className="section__title">Three practices, one delivery standard</h2>
            <p className="section__lead">
              {company.name} positions itself as a technology solutions provider that emphasises
              innovation and reliability, enabling organisations of every size to achieve growth
              through information technology.
            </p>
          </header>
          <div className="grid grid--3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} detailed />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <header className="section__head">
            <p className="eyebrow">How we work</p>
            <h2 className="section__title">A delivery process you can plan around</h2>
          </header>
          <ol className="steps">
            {process.map((item) => (
              <li key={item.step}>
                <span className="steps__num">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container cta-band">
          <div>
            <h2>Ready to start a conversation?</h2>
            <p>
              Tell us about the outcome you need. Call {company.phone} or send a note to{' '}
              <a href={company.emailHref}>{company.email}</a>.
            </p>
          </div>
          <Link to="/contact" className="btn btn--accent">
            Request a call back
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
