import PageBanner from '../components/PageBanner.jsx'
import CallbackForm from '../components/CallbackForm.jsx'
import Icon from '../components/Icon.jsx'
import { company } from '../data/site.js'

const MAP_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(
  company.address,
)}&z=15&output=embed`

export default function Contact() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Would you like to speak to one of our consulting organisers? Just submit your contact details and we'll be in touch shortly."
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-grid__info">
            <p className="eyebrow">Our office</p>
            <h2 className="section__title">{company.name}</h2>
            <ul className="contact-list contact-list--lg">
              <li>
                <Icon name="pin" size={22} />
                <span>
                  <strong>Address</strong>
                  {company.addressLines.map((line) => (
                    <span key={line} className="footer__addr-line">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <Icon name="phone" size={22} />
                <span>
                  <strong>Direct</strong>
                  <a href={company.phoneHref}>{company.phone}</a>
                </span>
              </li>
              <li>
                <Icon name="mail" size={22} />
                <span>
                  <strong>Email</strong>
                  <a href={company.emailHref}>{company.email}</a>
                </span>
              </li>
              <li>
                <Icon name="clock" size={22} />
                <span>
                  <strong>Office hours</strong>
                  Monday – Friday · 9:00 AM – 6:00 PM EST
                </span>
              </li>
            </ul>
          </div>

          <div className="contact-grid__form">
            <h2>Request a call back</h2>
            <p className="section__lead">
              Tell us a little about what you need and the right person will get back to you within
              one business day.
            </p>
            <CallbackForm />
          </div>
        </div>
      </section>

      <section className="map">
        <iframe
          title={`Map showing ${company.name} at ${company.address}`}
          src={MAP_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  )
}
