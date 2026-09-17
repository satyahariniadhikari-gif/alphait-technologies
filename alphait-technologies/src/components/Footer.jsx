import { Link } from 'react-router-dom'
import { company, navLinks, services } from '../data/site.js'
import logo from '../assets/alpha-logo.jpeg'
import Icon from './Icon.jsx'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <Link to="/" className="brand brand--footer">
            <img className="brand__logo" src={logo} alt={`${company.name} logo`} />
            <span className="brand__text">
              <strong>AlphaIT</strong>
              <span>Technologies</span>
            </span>
          </Link>
          <p className="footer__about">{company.tagline}</p>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Company</h3>
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
          <h3 className="footer__title">Services</h3>
          <ul className="footer__links">
            {services.map((service) => (
              <li key={service.slug}>
                <Link to="/services">{service.title}</Link>
              </li>
            ))}
            <li>
              <Link to="/career">Staffing &amp; Recruitment</Link>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Get in touch</h3>
          <ul className="footer__contact">
            <li>
              <Icon name="pin" size={18} />
              <span>
                {company.addressLines.map((line) => (
                  <span key={line} className="footer__addr-line">
                    {line}
                  </span>
                ))}
              </span>
            </li>
            <li>
              <Icon name="phone" size={18} />
              <a href={company.phoneHref}>{company.phone}</a>
            </li>
            <li>
              <Icon name="mail" size={18} />
              <a href={company.emailHref}>{company.email}</a>
            </li>
            <li>
              <Icon name="clock" size={18} />
              <span>Mon – Fri · 9:00 AM – 6:00 PM EST</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>Branchburg, New Jersey · United States</p>
        </div>
      </div>
    </footer>
  )
}
