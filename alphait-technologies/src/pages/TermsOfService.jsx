import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import Editable from '../admin/Editable.jsx'
import EditableList from '../admin/EditableList.jsx'
import PageSections from '../admin/PageSections.jsx'
import { useCompany } from '../admin/content-context.js'
import { legal } from '../data/site.js'

// Items 2 and 3 have their own markup (bold keyword, contact links) in renderItem.
const smsTerms = [
  'Message frequency varies.',
  'Message & data rates may apply.',
  '',
  '',
  'Carriers are not liable for delayed or undelivered messages.',
  'Consent to receive text messages is not a condition of any purchase.',
]

export default function TermsOfService() {
  const company = useCompany()

  const policy = (
    <section className="section">
      <div className="container legal">
        <p className="legal__updated">
          <Editable id="terms.updatedLabel">Last updated:</Editable>{' '}
          <Editable id="legal.lastUpdated">{legal.lastUpdated}</Editable>
        </p>

        <p>
          <Editable id="terms.intro">
            {`These Terms of Service ("Terms") govern your use of ${legal.domain} and the services offered by ${company.name} ("${company.shortName}", "we", "us" or "our"). By using our website or submitting a form, you agree to these Terms.`}
          </Editable>
        </p>

        <h2>
          <Editable id="terms.s1.title">Use of the website</Editable>
        </h2>
        <p>
          <Editable id="terms.s1.p1">
            You agree to use this website only for lawful purposes and not to interfere with its
            operation or security. Information on this website is provided for general purposes and
            may change without notice.
          </Editable>
        </p>

        <h2>
          <Editable id="terms.s2.title">Services, training and careers</Editable>
        </h2>
        <p>
          <Editable id="terms.s2.p1">
            {`Descriptions of our consulting services, training programs and job openings are for information only and do not form a contract or offer. Training batch dates, seat availability and eligibility (for example, USA and Canada candidates only) are set by ${company.name} and may change. Registration does not guarantee a seat, job placement or employment.`}
          </Editable>
        </p>

        <h2>
          <Editable id="terms.s3.title">Text messaging (SMS) terms</Editable>
        </h2>
        <p>
          <Editable id="terms.s3.p1">
            {`By providing your phone number and opting in, you agree to receive promotional and informational text messages from ${company.name} about your enquiry, our services, training programs and career opportunities.`}
          </Editable>
        </p>
        <EditableList
          id="terms.s3.list"
          defaults={smsTerms.map((_, i) => String(i))}
          as="ul"
          itemLabel="item"
          addLabel="Add item"
          newItem={{ '': 'New item' }}
          renderItem={(itemId, key) => {
            if (itemId === '2') {
              return (
                <li>
                  <Editable id={key('a')}>Reply</Editable>{' '}
                  <strong>
                    <Editable id={key('stop')}>STOP</Editable>
                  </strong>{' '}
                  <Editable id={key('b')}>
                    to cancel at any time. You will receive one confirmation message and no
                    further messages unless you opt in again.
                  </Editable>
                </li>
              )
            }
            if (itemId === '3') {
              return (
                <li>
                  <Editable id={key('a')}>Reply</Editable>{' '}
                  <strong>
                    <Editable id={key('help')}>HELP</Editable>
                  </strong>{' '}
                  <Editable id={key('b')}>for help, or contact us at</Editable>{' '}
                  <a href={company.emailHref}>
                    <Editable id="company.email">{company.email}</Editable>
                  </a>{' '}
                  <Editable id={key('c')}>or</Editable>{' '}
                  <a href={company.phoneHref}>
                    <Editable id="company.phone">{company.phone}</Editable>
                  </a>
                  .
                </li>
              )
            }
            return (
              <li>
                <Editable id={key()}>{smsTerms[Number(itemId)] ?? ''}</Editable>
              </li>
            )
          }}
        />
        <p>
          <Editable id="terms.s3.p2.a">See our</Editable>{' '}
          <Link to="/privacy-policy">
            <Editable id="terms.s3.p2.link">Privacy Policy</Editable>
          </Link>{' '}
          <Editable id="terms.s3.p2.b">
            for how we handle your information. No mobile information will be shared with third
            parties or affiliates for marketing or promotional purposes.
          </Editable>
        </p>

        <h2>
          <Editable id="terms.s4.title">Intellectual property</Editable>
        </h2>
        <p>
          <Editable id="terms.s4.p1">
            {`The content of this website — including text, graphics, logos and images — belongs to ${company.name} or its licensors and may not be copied or reused without permission.`}
          </Editable>
        </p>

        <h2>
          <Editable id="terms.s5.title">Third-party links</Editable>
        </h2>
        <p>
          <Editable id="terms.s5.p1">
            Our website may link to other websites, such as registration forms hosted by third
            parties. We are not responsible for the content or practices of those websites.
          </Editable>
        </p>

        <h2>
          <Editable id="terms.s6.title">Limitation of liability</Editable>
        </h2>
        <p>
          <Editable id="terms.s6.p1">
            {`This website is provided "as is". To the fullest extent permitted by law, ${company.name} is not liable for any indirect or consequential loss arising from your use of the website.`}
          </Editable>
        </p>

        <h2>
          <Editable id="terms.s7.title">Governing law</Editable>
        </h2>
        <p>
          <Editable id="terms.s7.p1">
            These Terms are governed by the laws of the State of New Jersey, United States.
          </Editable>
        </p>

        <h2>
          <Editable id="terms.s8.title">Changes to these Terms</Editable>
        </h2>
        <p>
          <Editable id="terms.s8.p1">
            We may update these Terms from time to time. The &quot;Last updated&quot; date above
            shows when they were last changed.
          </Editable>
        </p>

        <h2>
          <Editable id="terms.s9.title">Contact us</Editable>
        </h2>
        <address className="legal__contact">
          <strong>
            <Editable id="company.name">{company.name}</Editable>
          </strong>
          <br />
          <Editable id="company.addressLine1">{company.addressLines[0]}</Editable>,{' '}
          <Editable id="company.addressLine2">{company.addressLines[1]}</Editable>
          <br />
          <Editable id="terms.contact.emailLabel">Email:</Editable>{' '}
          <a href={company.emailHref}>
            <Editable id="company.email">{company.email}</Editable>
          </a>
          <br />
          <Editable id="terms.contact.phoneLabel">Phone:</Editable>{' '}
          <a href={company.phoneHref}>
            <Editable id="company.phone">{company.phone}</Editable>
          </a>
        </address>
      </div>
    </section>
  )

  return (
    <>
      <PageBanner
        id="terms.banner"
        title="Terms of Service"
        subtitle={`The terms that apply when you use the ${company.name} website and services.`}
      />

      <PageSections page="terms" sections={[['policy', 'Terms of service', policy]]} />
    </>
  )
}
