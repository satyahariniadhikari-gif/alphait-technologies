import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import { company, legal } from '../data/site.js'

export default function TermsOfService() {
  return (
    <>
      <PageBanner
        title="Terms of Service"
        subtitle={`The terms that apply when you use the ${company.name} website and services.`}
      />

      <section className="section">
        <div className="container legal">
          <p className="legal__updated">Last updated: {legal.lastUpdated}</p>

          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of {legal.domain} and the
            services offered by {company.name} (&quot;{company.shortName}&quot;, &quot;we&quot;,
            &quot;us&quot; or &quot;our&quot;). By using our website or submitting a form, you agree
            to these Terms.
          </p>

          <h2>Use of the website</h2>
          <p>
            You agree to use this website only for lawful purposes and not to interfere with its
            operation or security. Information on this website is provided for general purposes and
            may change without notice.
          </p>

          <h2>Services, training and careers</h2>
          <p>
            Descriptions of our consulting services, training programs and job openings are for
            information only and do not form a contract or offer. Training batch dates, seat
            availability and eligibility (for example, USA and Canada candidates only) are set by{' '}
            {company.name} and may change. Registration does not guarantee a seat, job placement or
            employment.
          </p>

          <h2>Text messaging (SMS) terms</h2>
          <p>
            By providing your phone number and opting in, you agree to receive promotional and
            informational text messages from {company.name} about your enquiry, our services,
            training programs and career opportunities.
          </p>
          <ul>
            <li>Message frequency varies.</li>
            <li>Message &amp; data rates may apply.</li>
            <li>
              Reply <strong>STOP</strong> to cancel at any time. You will receive one confirmation
              message and no further messages unless you opt in again.
            </li>
            <li>
              Reply <strong>HELP</strong> for help, or contact us at{' '}
              <a href={company.emailHref}>{company.email}</a> or{' '}
              <a href={company.phoneHref}>{company.phone}</a>.
            </li>
            <li>Carriers are not liable for delayed or undelivered messages.</li>
            <li>Consent to receive text messages is not a condition of any purchase.</li>
          </ul>
          <p>
            See our <Link to="/privacy-policy">Privacy Policy</Link> for how we handle your
            information. No mobile information will be shared with third parties or affiliates for
            marketing or promotional purposes.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The content of this website — including text, graphics, logos and images — belongs to{' '}
            {company.name} or its licensors and may not be copied or reused without permission.
          </p>

          <h2>Third-party links</h2>
          <p>
            Our website may link to other websites, such as registration forms hosted by third
            parties. We are not responsible for the content or practices of those websites.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            This website is provided &quot;as is&quot;. To the fullest extent permitted by law,{' '}
            {company.name} is not liable for any indirect or consequential loss arising from your use
            of the website.
          </p>

          <h2>Governing law</h2>
          <p>These Terms are governed by the laws of the State of New Jersey, United States.</p>

          <h2>Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. The &quot;Last updated&quot; date above
            shows when they were last changed.
          </p>

          <h2>Contact us</h2>
          <address className="legal__contact">
            <strong>{company.name}</strong>
            <br />
            {company.address}
            <br />
            Email: <a href={company.emailHref}>{company.email}</a>
            <br />
            Phone: <a href={company.phoneHref}>{company.phone}</a>
          </address>
        </div>
      </section>
    </>
  )
}
