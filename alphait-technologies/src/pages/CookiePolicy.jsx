import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import Editable from '../admin/Editable.jsx'
import EditableList from '../admin/EditableList.jsx'
import PageSections from '../admin/PageSections.jsx'
import { useCompany } from '../admin/content-context.js'
import { legal } from '../data/site.js'

const cookieTypes = [
  {
    label: 'Strictly necessary',
    text: '— used by our website and hosting provider to deliver pages securely and reliably. These cannot be switched off.',
  },
  {
    label: 'Analytics (if added in future)',
    text: '— would help us understand which pages are visited so we can improve the website. We will update this policy before introducing them.',
  },
]

export default function CookiePolicy() {
  const company = useCompany()

  const policy = (
    <section className="section">
      <div className="container legal">
        <p className="legal__updated">
          <Editable id="cookies.updatedLabel">Last updated:</Editable>{' '}
          <Editable id="legal.lastUpdated">{legal.lastUpdated}</Editable>
        </p>

        <h2>
          <Editable id="cookies.s1.title">What are cookies?</Editable>
        </h2>
        <p>
          <Editable id="cookies.s1.p1">
            Cookies are small text files that a website stores on your device. They help websites
            work properly, remember your preferences and understand how visitors use them. Similar
            technologies include local storage and pixels.
          </Editable>
        </p>

        <h2>
          <Editable id="cookies.s2.title">How we use cookies</Editable>
        </h2>
        <p>
          <Editable id="cookies.s2.p1">
            Our website currently uses only what is strictly necessary for it to load and work
            securely. We do not use advertising cookies, and we do not use cookies to track you
            across other websites.
          </Editable>
        </p>
        <EditableList
          id="cookies.s2.list"
          defaults={cookieTypes.map((_, i) => String(i))}
          as="ul"
          itemLabel="cookie type"
          addLabel="Add cookie type"
          newItem={{ label: 'New cookie type', text: '— describe what it is used for.' }}
          renderItem={(itemId, key) => (
            <li>
              <strong>
                <Editable id={key('label')}>{cookieTypes[Number(itemId)]?.label ?? ''}</Editable>
              </strong>{' '}
              <Editable id={key('text')}>{cookieTypes[Number(itemId)]?.text ?? ''}</Editable>
            </li>
          )}
        />

        <h2>
          <Editable id="cookies.s3.title">Third-party websites</Editable>
        </h2>
        <p>
          <Editable id="cookies.s3.p1">
            Some links on our website, such as training registration forms, take you to websites
            run by other companies. Those websites may set their own cookies, which are covered by
            their own policies.
          </Editable>
        </p>

        <h2>
          <Editable id="cookies.s4.title">Managing cookies</Editable>
        </h2>
        <p>
          <Editable id="cookies.s4.p1">
            You can block or delete cookies in your browser settings. Blocking strictly necessary
            cookies may stop parts of the website from working correctly.
          </Editable>
        </p>

        <h2>
          <Editable id="cookies.s5.title">Changes to this policy</Editable>
        </h2>
        <p>
          <Editable id="cookies.s5.p1.a">
            We may update this Cookie Policy from time to time. See our
          </Editable>{' '}
          <Link to={legal.privacyPath}>
            <Editable id="cookies.s5.p1.link">Privacy Policy</Editable>
          </Link>{' '}
          <Editable id="cookies.s5.p1.b">for more on how we handle your information.</Editable>
        </p>

        <h2>
          <Editable id="cookies.s6.title">Contact us</Editable>
        </h2>
        <p>
          <Editable id="cookies.s6.p1.a">Questions about this policy? Email</Editable>{' '}
          <a href={company.emailHref}>
            <Editable id="company.email">{company.email}</Editable>
          </a>{' '}
          <Editable id="cookies.s6.p1.b">or call</Editable>{' '}
          <a href={company.phoneHref}>
            <Editable id="company.phone">{company.phone}</Editable>
          </a>
          .
        </p>
      </div>
    </section>
  )

  return (
    <>
      <PageBanner
        id="cookies.banner"
        title="Cookie Policy"
        subtitle={`How ${company.name} uses cookies and similar technologies on ${legal.domain}.`}
      />

      <PageSections page="cookies" sections={[['policy', 'Cookie policy', policy]]} />
    </>
  )
}
