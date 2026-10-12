import Editable from '../admin/Editable.jsx'
import PageSections from '../admin/PageSections.jsx'
import { useCompany } from '../admin/content-context.js'
import PageBanner from '../components/PageBanner.jsx'
import CallbackForm from '../components/CallbackForm.jsx'
import Icon from '../components/Icon.jsx'
import contactPhoto from '../assets/contact-office.jpg'

export default function Contact() {
  const company = useCompany()
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    company.address,
  )}&z=15&output=embed`

  const details = (
    <section className="section">
      <div className="container contact-grid">
        <div className="contact-grid__info">
          <p className="eyebrow">
            <Editable id="contact.info.eyebrow">Our office</Editable>
          </p>
          <h2 className="section__title">
            <Editable id="company.name">{company.name}</Editable>
          </h2>
          <ul className="contact-list contact-list--lg">
            <li>
              <Icon name="pin" size={22} />
              <span>
                <strong>
                  <Editable id="contact.info.addressLabel">Address</Editable>
                </strong>
                {company.addressLines.map((line, i) => (
                  <span key={line} className="footer__addr-line">
                    <Editable id={`company.addressLine${i + 1}`}>{line}</Editable>
                  </span>
                ))}
              </span>
            </li>
            <li>
              <Icon name="phone" size={22} />
              <span>
                <strong>
                  <Editable id="contact.info.phoneLabel">Direct</Editable>
                </strong>
                <a href={company.phoneHref}>
                  <Editable id="company.phone">{company.phone}</Editable>
                </a>
              </span>
            </li>
            <li>
              <Icon name="mail" size={22} />
              <span>
                <strong>
                  <Editable id="contact.info.emailLabel">Email</Editable>
                </strong>
                <a href={company.emailHref}>
                  <Editable id="company.email">{company.email}</Editable>
                </a>
              </span>
            </li>
            <li>
              <Icon name="clock" size={22} />
              <span>
                <strong>
                  <Editable id="contact.info.hoursLabel">Office hours</Editable>
                </strong>
                <Editable id="contact.info.hours">Monday – Friday · 9:00 AM – 6:00 PM EST</Editable>
              </span>
            </li>
          </ul>
        </div>

        <div className="contact-grid__form">
          <h2>
            <Editable id="contact.form.title">Request a call back</Editable>
          </h2>
          <p className="section__lead">
            <Editable id="contact.form.lead">
              Tell us a little about what you need and the right person will get back to you within
              one business day.
            </Editable>
          </p>
          <CallbackForm />
        </div>
      </div>
    </section>
  )

  const map = (
    <section className="map">
      <iframe
        title={`Map showing ${company.name} at ${company.address}`}
        src={mapSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  )

  return (
    <>
      <PageBanner
        id="contact.banner"
        title="Contact Us"
        subtitle="Would you like to speak to one of our consulting organisers? Just submit your contact details and we'll be in touch shortly."
        image={contactPhoto}
        aside={
          <>
            <div className="hero__panel-card">
              <Icon name="phone" size={28} />
              <h2>
                <a href={company.phoneHref}>
                  <Editable id="company.phone">{company.phone}</Editable>
                </a>
              </h2>
              <p>
                <Editable id="header.labels.phone">Direct</Editable>
              </p>
            </div>
            <div className="hero__panel-card">
              <Icon name="mail" size={28} />
              <h2>
                <a href={company.emailHref}>
                  <Editable id="company.email">{company.email}</Editable>
                </a>
              </h2>
              <p>
                <Editable id="header.labels.email">Email</Editable>
              </p>
            </div>
          </>
        }
      />

      <PageSections
        page="contact"
        sections={[
          ['details', 'Office details & call back', details],
          ['map', 'Map', map],
        ]}
      />
    </>
  )
}
