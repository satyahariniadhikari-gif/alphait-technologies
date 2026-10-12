import { Link } from 'react-router-dom'
import { legal, navLinks, services } from '../data/site.js'
import Editable from '../admin/Editable.jsx'
import { useCompany, useList, useSettings } from '../admin/content-context.js'
import logo from '../assets/alpha-logo.jpeg'
import Icon from './Icon.jsx'

export default function Footer() {
  const company = useCompany()
  const settings = useSettings()
  // Same list (and order) the admin manages on the Services page.
  const serviceIds = useList('services', services.map((service) => service.slug)).ids
  const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service]))

  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <Link to="/" className="brand brand--footer">
            <img className="brand__logo" src={settings.logoUrl || logo} alt={`${company.name} logo`} />
            <span className="brand__text">
              <strong>
                <Editable id="brand.name">Alpha IT</Editable>
              </strong>
              <span>
                <Editable id="brand.sub">Technologies</Editable>
              </span>
            </span>
          </Link>
          <p className="footer__about">
            <Editable id="company.tagline">{company.tagline}</Editable>
          </p>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">
            <Editable id="footer.titles.company">Company</Editable>
          </h3>
          <ul className="footer__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/about">Certifications</Link>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">
            <Editable id="footer.titles.services">Services</Editable>
          </h3>
          <ul className="footer__links">
            {serviceIds.map((slug) => (
              <li key={slug}>
                <Link to={slug === 'training' ? '/training' : '/services'}>
                  <Editable id={`services.${slug}.title`}>{serviceBySlug[slug]?.title ?? ''}</Editable>
                </Link>
              </li>
            ))}
            <li>
              <Link to="/career">
                <Editable id="footer.services.staffing">Staffing &amp; Recruitment</Editable>
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">
            <Editable id="footer.titles.legal">Legal &amp; Policy</Editable>
          </h3>
          <ul className="footer__links">
            {legal.links.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">
            <Editable id="footer.titles.contact">Get in touch</Editable>
          </h3>
          <ul className="footer__contact">
            <li>
              <Icon name="pin" size={18} />
              <span>
                {company.addressLines.map((line, i) => (
                  <span key={i} className="footer__addr-line">
                    <Editable id={`company.addressLine${i + 1}`}>{line}</Editable>
                  </span>
                ))}
              </span>
            </li>
            <li>
              <Icon name="phone" size={18} />
              <a href={company.phoneHref}>
                <Editable id="company.phone">{company.phone}</Editable>
              </a>
            </li>
            <li>
              <Icon name="mail" size={18} />
              <a href={company.emailHref}>
                <Editable id="company.email">{company.email}</Editable>
              </a>
            </li>
            <li>
              <Icon name="clock" size={18} />
              <span>
                <Editable id="footer.hours">Mon – Fri · 9:00 AM – 6:00 PM EST</Editable>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>
            © {new Date().getFullYear()} <Editable id="company.name">{company.name}</Editable>.{' '}
            <Editable id="footer.rights">All rights reserved.</Editable>
          </p>
          <p>
            <Editable id="footer.location">Branchburg, New Jersey · United States</Editable>
          </p>
        </div>
      </div>
    </footer>
  )
}
