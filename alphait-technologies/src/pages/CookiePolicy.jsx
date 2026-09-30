import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import { company, legal } from '../data/site.js'

export default function CookiePolicy() {
  return (
    <>
      <PageBanner
        title="Cookie Policy"
        subtitle={`How ${company.name} uses cookies and similar technologies on ${legal.domain}.`}
      />

      <section className="section">
        <div className="container legal">
          <p className="legal__updated">Last updated: {legal.lastUpdated}</p>

          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files that a website stores on your device. They help websites
            work properly, remember your preferences and understand how visitors use them. Similar
            technologies include local storage and pixels.
          </p>

          <h2>How we use cookies</h2>
          <p>
            Our website currently uses only what is strictly necessary for it to load and work
            securely. We do not use advertising cookies, and we do not use cookies to track you
            across other websites.
          </p>
          <ul>
            <li>
              <strong>Strictly necessary</strong> — used by our website and hosting provider to
              deliver pages securely and reliably. These cannot be switched off.
            </li>
            <li>
              <strong>Analytics (if added in future)</strong> — would help us understand which pages
              are visited so we can improve the website. We will update this policy before
              introducing them.
            </li>
          </ul>

          <h2>Third-party websites</h2>
          <p>
            Some links on our website, such as training registration forms, take you to websites
            run by other companies. Those websites may set their own cookies, which are covered by
            their own policies.
          </p>

          <h2>Managing cookies</h2>
          <p>
            You can block or delete cookies in your browser settings. Blocking strictly necessary
            cookies may stop parts of the website from working correctly.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this Cookie Policy from time to time. See our{' '}
            <Link to={legal.privacyPath}>Privacy Policy</Link> for more on how we handle your
            information.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about this policy? Email <a href={company.emailHref}>{company.email}</a> or
            call <a href={company.phoneHref}>{company.phone}</a>.
          </p>
        </div>
      </section>
    </>
  )
}
