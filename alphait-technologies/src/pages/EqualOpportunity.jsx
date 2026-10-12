import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import Editable from '../admin/Editable.jsx'
import PageSections from '../admin/PageSections.jsx'
import { useCompany } from '../admin/content-context.js'
import { legal } from '../data/site.js'

export default function EqualOpportunity() {
  const company = useCompany()

  const policy = (
    <section className="section">
      <div className="container legal">
        <p className="legal__updated">
          <Editable id="eeo.updatedLabel">Last updated:</Editable>{' '}
          <Editable id="legal.lastUpdated">{legal.lastUpdated}</Editable>
        </p>

        <h2>
          <Editable id="eeo.s1.title">Our commitment</Editable>
        </h2>
        <p>
          <Editable id="eeo.s1.p1">
            {`${company.name} is committed to equal employment opportunity. We recruit, hire, train, promote and compensate people based on their skills, qualifications and performance.`}
          </Editable>
        </p>
        <p>
          <Editable id="eeo.s1.p2">
            We do not discriminate on the basis of race, color, religion, sex, pregnancy, sexual
            orientation, gender identity or expression, national origin, age, disability, genetic
            information, marital status, veteran or military status, or any other characteristic
            protected by federal, state or local law.
          </Editable>
        </p>

        <h2>
          <Editable id="eeo.s2.title">Where it applies</Editable>
        </h2>
        <p>
          <Editable id="eeo.s2.p1">
            This commitment covers every part of employment and our training programs, including
            recruitment, hiring, placement, training, compensation, benefits, promotion, transfer
            and termination.
          </Editable>
        </p>

        <h2>
          <Editable id="eeo.s3.title">Reasonable accommodation</Editable>
        </h2>
        <p>
          <Editable id="eeo.s3.p1.a">
            We provide reasonable accommodation to qualified applicants and employees with
            disabilities and for sincerely held religious beliefs. If you need an accommodation
            during the application or interview process, contact us at
          </Editable>{' '}
          <a href={company.emailHref}>
            <Editable id="company.email">{company.email}</Editable>
          </a>{' '}
          <Editable id="eeo.s3.p1.b">or</Editable>{' '}
          <a href={company.phoneHref}>
            <Editable id="company.phone">{company.phone}</Editable>
          </a>
          .
        </p>

        <h2>
          <Editable id="eeo.s4.title">A respectful workplace</Editable>
        </h2>
        <p>
          <Editable id="eeo.s4.p1">
            We are process-oriented but people-centric. Harassment or retaliation of any kind is not
            tolerated, and anyone can raise a concern without fear of reprisal.
          </Editable>
        </p>

        <h2>
          <Editable id="eeo.s5.title">Explore opportunities</Editable>
        </h2>
        <p>
          <Editable id="eeo.s5.p1.a">See our current openings on the</Editable>{' '}
          <Link to="/career">
            <Editable id="eeo.s5.p1.link">Careers</Editable>
          </Link>{' '}
          <Editable id="eeo.s5.p1.b">page.</Editable>
        </p>
      </div>
    </section>
  )

  return (
    <>
      <PageBanner
        id="eeo.banner"
        title="Equal Opportunity Statement"
        subtitle={`${company.name} is an equal opportunity employer.`}
        breadcrumb="Equal Opportunity"
      />

      <PageSections page="eeo" sections={[['policy', 'Equal opportunity statement', policy]]} />
    </>
  )
}
