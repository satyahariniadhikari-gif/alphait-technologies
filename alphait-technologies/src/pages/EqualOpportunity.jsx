import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import { company, legal } from '../data/site.js'

export default function EqualOpportunity() {
  return (
    <>
      <PageBanner
        title="Equal Opportunity Statement"
        subtitle={`${company.name} is an equal opportunity employer.`}
        breadcrumb="Equal Opportunity"
      />

      <section className="section">
        <div className="container legal">
          <p className="legal__updated">Last updated: {legal.lastUpdated}</p>

          <h2>Our commitment</h2>
          <p>
            {company.name} is committed to equal employment opportunity. We recruit, hire, train,
            promote and compensate people based on their skills, qualifications and performance.
          </p>
          <p>
            We do not discriminate on the basis of race, color, religion, sex, pregnancy, sexual
            orientation, gender identity or expression, national origin, age, disability, genetic
            information, marital status, veteran or military status, or any other characteristic
            protected by federal, state or local law.
          </p>

          <h2>Where it applies</h2>
          <p>
            This commitment covers every part of employment and our training programs, including
            recruitment, hiring, placement, training, compensation, benefits, promotion, transfer
            and termination.
          </p>

          <h2>Reasonable accommodation</h2>
          <p>
            We provide reasonable accommodation to qualified applicants and employees with
            disabilities and for sincerely held religious beliefs. If you need an accommodation
            during the application or interview process, contact us at{' '}
            <a href={company.emailHref}>{company.email}</a> or{' '}
            <a href={company.phoneHref}>{company.phone}</a>.
          </p>

          <h2>A respectful workplace</h2>
          <p>
            We are process-oriented but people-centric. Harassment or retaliation of any kind is not
            tolerated, and anyone can raise a concern without fear of reprisal.
          </p>

          <h2>Explore opportunities</h2>
          <p>
            See our current openings on the <Link to="/career">Career</Link> page.
          </p>
        </div>
      </section>
    </>
  )
}
