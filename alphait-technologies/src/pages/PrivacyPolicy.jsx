import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import Editable from '../admin/Editable.jsx'
import EditableList from '../admin/EditableList.jsx'
import PageSections from '../admin/PageSections.jsx'
import { useCompany } from '../admin/content-context.js'
import { legal } from '../data/site.js'

const s1List = [
  {
    label: 'Information you give us',
    text: '— your name, email address, phone number, area of interest and any message you send through our contact, call-back or registration forms, and any resume or career details you share with us.',
  },
  {
    label: 'Information collected automatically',
    text: '— basic technical data such as your browser type, device, pages visited and the date and time of your visit, which helps us keep the website secure and working well.',
  },
]

const s2List = [
  'To respond to your enquiries and call-back requests.',
  'To provide information about our consulting services, training programs and career opportunities.',
  'To process training program registrations and job applications.',
  'To send account updates, reminders and other service-related messages.',
  'To improve our website, services and customer experience.',
  'To meet our legal and regulatory obligations.',
]

const s7List = [
  'Opt out of text messages at any time by replying STOP.',
  'Unsubscribe from emails using the link in the email or by contacting us.',
  'Ask us to access, correct or delete the personal information we hold about you.',
]

function BulletList({ id, items }) {
  return (
    <EditableList
      id={id}
      defaults={items.map((_, i) => String(i))}
      as="ul"
      itemLabel="item"
      addLabel="Add item"
      newItem={{ '': 'New item' }}
      renderItem={(itemId, key) => (
        <li>
          <Editable id={key()}>{items[Number(itemId)] ?? ''}</Editable>
        </li>
      )}
    />
  )
}

export default function PrivacyPolicy() {
  const company = useCompany()

  const policy = (
    <section className="section">
      <div className="container legal">
        <p className="legal__updated">
          <Editable id="privacy.updatedLabel">Last updated:</Editable>{' '}
          <Editable id="legal.lastUpdated">{legal.lastUpdated}</Editable>
        </p>

        <p>
          <Editable id="privacy.intro">
            {`${company.name} ("${company.shortName}", "we", "us" or "our") operates the website ${legal.domain}. This Privacy Policy explains what information we collect when you visit our website, contact us, apply for a role or register for a training program, and how we use and protect it.`}
          </Editable>
        </p>

        <h2>
          <Editable id="privacy.s1.title">Information we collect</Editable>
        </h2>
        <EditableList
          id="privacy.s1.list"
          defaults={s1List.map((_, i) => String(i))}
          as="ul"
          itemLabel="item"
          addLabel="Add item"
          newItem={{ label: 'New item', text: '— describe this item.' }}
          renderItem={(itemId, key) => (
            <li>
              <strong>
                <Editable id={key('label')}>{s1List[Number(itemId)]?.label ?? ''}</Editable>
              </strong>{' '}
              <Editable id={key('text')}>{s1List[Number(itemId)]?.text ?? ''}</Editable>
            </li>
          )}
        />

        <h2>
          <Editable id="privacy.s2.title">How we use your information</Editable>
        </h2>
        <BulletList id="privacy.s2.list" items={s2List} />

        <h2>
          <Editable id="privacy.s3.title">Text messages (SMS)</Editable>
        </h2>
        <p>
          <Editable id="privacy.s3.p1.a">
            {`If you provide your phone number and agree to receive text messages, ${company.name} may send you promotional and informational messages about your enquiry, our services, training programs and career opportunities. Message frequency varies. Message & data rates may apply. Reply`}
          </Editable>{' '}
          <strong>
            <Editable id="privacy.s3.p1.stop">STOP</Editable>
          </strong>{' '}
          <Editable id="privacy.s3.p1.b">at any time to opt out, or</Editable>{' '}
          <strong>
            <Editable id="privacy.s3.p1.help">HELP</Editable>
          </strong>{' '}
          <Editable id="privacy.s3.p1.c">for help. You can also contact us at</Editable>{' '}
          <a href={company.emailHref}>
            <Editable id="company.email">{company.email}</Editable>
          </a>
          .
        </p>
        <p>
          <strong>
            <Editable id="privacy.s3.p2.a">
              No mobile information will be shared with third parties or affiliates for marketing
              or promotional purposes.
            </Editable>
          </strong>{' '}
          <Editable id="privacy.s3.p2.b">
            Text messaging opt-in data and consent are not shared with any third parties.
          </Editable>
        </p>

        <h2>
          <Editable id="privacy.s4.title">How we share information</Editable>
        </h2>
        <p>
          <Editable id="privacy.s4.p1">
            We do not sell, share or lease your personal data to third parties. We may share
            information only with trusted service providers who help us run our website and
            services (for example, hosting and email providers), and only as needed for them to do
            that work, or where required by law.
          </Editable>
        </p>

        <h2>
          <Editable id="privacy.s5.title">How we protect your information</Editable>
        </h2>
        <p>
          <Editable id="privacy.s5.p1">
            We use reasonable administrative, technical and physical safeguards to protect your
            information. No method of transmission over the internet is completely secure, so we
            cannot guarantee absolute security.
          </Editable>
        </p>

        <h2>
          <Editable id="privacy.s6.title">How long we keep information</Editable>
        </h2>
        <p>
          <Editable id="privacy.s6.p1">
            We keep personal information only as long as needed for the purposes described in this
            policy, or as required by law.
          </Editable>
        </p>

        <h2>
          <Editable id="privacy.s7.title">Your choices</Editable>
        </h2>
        <BulletList id="privacy.s7.list" items={s7List} />

        <h2>
          <Editable id="privacy.s8.title">Children&apos;s privacy</Editable>
        </h2>
        <p>
          <Editable id="privacy.s8.p1">
            Our website and services are not directed at children under 13, and we do not knowingly
            collect their personal information.
          </Editable>
        </p>

        <h2>
          <Editable id="privacy.s9.title">Changes to this policy</Editable>
        </h2>
        <p>
          <Editable id="privacy.s9.p1">
            We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date
            above shows when it was last changed. See also our
          </Editable>{' '}
          <Link to="/terms-of-service">
            <Editable id="privacy.s9.p1.link">Terms of Service</Editable>
          </Link>
          .
        </p>

        <h2>
          <Editable id="privacy.s10.title">Contact us</Editable>
        </h2>
        <address className="legal__contact">
          <strong>
            <Editable id="company.name">{company.name}</Editable>
          </strong>
          <br />
          <Editable id="company.addressLine1">{company.addressLines[0]}</Editable>,{' '}
          <Editable id="company.addressLine2">{company.addressLines[1]}</Editable>
          <br />
          <Editable id="privacy.contact.emailLabel">Email:</Editable>{' '}
          <a href={company.emailHref}>
            <Editable id="company.email">{company.email}</Editable>
          </a>
          <br />
          <Editable id="privacy.contact.phoneLabel">Phone:</Editable>{' '}
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
        id="privacy.banner"
        title="Privacy Policy"
        subtitle={`How ${company.name} collects, uses and protects your information.`}
      />

      <PageSections page="privacy" sections={[['policy', 'Privacy policy', policy]]} />
    </>
  )
}
