import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../data/site.js'
import Editable from '../admin/Editable.jsx'
import ButtonLink from '../admin/ButtonLink.jsx'
import { useCompany, useSettings } from '../admin/content-context.js'
import logo from '../assets/alpha-logo.jpeg'
import Icon from './Icon.jsx'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const company = useCompany()
  const settings = useSettings()

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar__inner">
          <Link to="/" className="brand" aria-label={`${company.name} home`}>
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

          {settings.showTopbarContacts ? (
          <ul className="topbar__contacts">
            <li>
              <Icon name="pin" size={20} />
              <span>
                <span className="topbar__label">
                  <Editable id="header.labels.address">Address</Editable>
                </span>
                <span>
                  <Editable id="company.addressLine1">{company.addressLines[0]}</Editable>
                  {', '}
                  <Editable id="company.addressLine2">{company.addressLines[1]}</Editable>
                </span>
              </span>
            </li>
            <li>
              <Icon name="phone" size={20} />
              <span>
                <span className="topbar__label">
                  <Editable id="header.labels.phone">Direct</Editable>
                </span>
                <a href={company.phoneHref}>
                  <Editable id="company.phone">{company.phone}</Editable>
                </a>
              </span>
            </li>
            <li>
              <Icon name="mail" size={20} />
              <span>
                <span className="topbar__label">
                  <Editable id="header.labels.email">Email</Editable>
                </span>
                <a href={company.emailHref}>
                  <Editable id="company.email">{company.email}</Editable>
                </a>
              </span>
            </li>
          </ul>
          ) : null}

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle__bars" aria-hidden="true" />
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <nav className={`mainnav${menuOpen ? ' is-open' : ''}`} id="primary-nav" aria-label="Primary">
        <div className="container mainnav__inner">
          <ul className="mainnav__list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {settings.showHeaderCta ? (
            <ButtonLink
              id="header.cta"
              to="/contact"
              className="btn btn--accent mainnav__cta"
              onClick={closeMenu}
            >
              Request a call back
            </ButtonLink>
          ) : null}
        </div>
      </nav>
    </header>
  )
}
