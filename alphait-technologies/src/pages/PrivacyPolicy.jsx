import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import { company, legal } from '../data/site.js'

export default function PrivacyPolicy() {
  return (
    <>
      <PageBanner
        title="Privacy Policy"
        subtitle={`How ${company.name} collects, uses and protects your information.`}
      />

      <section className="section">
        <div className="container legal">
          <p className="legal__updated">Last updated: {legal.lastUpdated}</p>

          <p>
            {company.name} (&quot;{company.shortName}&quot;, &quot;we&quot;, &quot;us&quot; or
            &quot;our&quot;) operates the website {legal.domain}. This Privacy Policy explains what
            information we collect when you visit our website, contact us, apply for a role or
            register for a training program, and how we use and protect it.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Information you give us</strong> — your name, email address, phone number,
              area of interest and any message you send through our contact, call-back or
              registration forms, and any resume or career details you share with us.
            </li>
            <li>
              <strong>Information collected automatically</strong> — basic technical data such as
              your browser type, device, pages visited and the date and time of your visit, which
              helps us keep the website secure and working well.
            </li>
          </ul>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to your enquiries and call-back requests.</li>
            <li>To provide information about our consulting services, training programs and career opportunities.</li>
            <li>To process training program registrations and job applications.</li>
            <li>To send account updates, reminders and other service-related messages.</li>
            <li>To improve our website, services and customer experience.</li>
            <li>To meet our legal and regulatory obligations.</li>
          </ul>

          <h2>Text messages (SMS)</h2>
          <p>
            If you provide your phone number and agree to receive text messages, {company.name}{' '}
            may send you promotional and informational messages about your enquiry, our services,
            training programs and career opportunities. Message frequency varies. Message &amp; data
            rates may apply. Reply <strong>STOP</strong> at any time to opt out, or{' '}
            <strong>HELP</strong> for help. You can also contact us at{' '}
            <a href={company.emailHref}>{company.email}</a>.
          </p>
          <p>
            <strong>
              No mobile information will be shared with third parties or affiliates for marketing
              or promotional purposes.
            </strong>{' '}
            Text messaging opt-in data and consent are not shared with any third parties.
          </p>

          <h2>How we share information</h2>
          <p>
            We do not sell, share or lease your personal data to third parties. We may share
            information only with trusted service providers who help us run our website and
            services (for example, hosting and email providers), and only as needed for them to do
            that work, or where required by law.
          </p>

          <h2>How we protect your information</h2>
          <p>
            We use reasonable administrative, technical and physical safeguards to protect your
            information. No method of transmission over the internet is completely secure, so we
            cannot guarantee absolute security.
          </p>

          <h2>How long we keep information</h2>
          <p>
            We keep personal information only as long as needed for the purposes described in this
            policy, or as required by law.
          </p>

          <h2>Your choices</h2>
          <ul>
            <li>Opt out of text messages at any time by replying STOP.</li>
            <li>Unsubscribe from emails using the link in the email or by contacting us.</li>
            <li>Ask us to access, correct or delete the personal information we hold about you.</li>
          </ul>

          <h2>Children&apos;s privacy</h2>
          <p>
            Our website and services are not directed at children under 13, and we do not knowingly
            collect their personal information.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date
            above shows when it was last changed. See also our{' '}
            <Link to="/terms-of-service">Terms of Service</Link>.
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
