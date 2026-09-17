import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { company, navLinks } from '../data/site.js'
import logo from '../assets/alpha-logo.jpeg'
import Icon from './Icon.jsx'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar__inner">
          <Link to="/" className="brand" aria-label={`${company.name} home`}>
            <img className="brand__logo" src={logo} alt={`${company.name} logo`} />
            <span className="brand__text">
              <strong>AlphaIT</strong>
              <span>Technologies</span>
            </span>
          </Link>

          <ul className="topbar__contacts">
            <li>
              <Icon name="pin" size={20} />
              <span>
                <span className="topbar__label">Address</span>
                {company.address}
              </span>
            </li>
            <li>
              <Icon name="phone" size={20} />
              <span>
                <span className="topbar__label">Direct</span>
                <a href={company.phoneHref}>{company.phone}</a>
              </span>
            </li>
            <li>
              <Icon name="mail" size={20} />
              <span>
                <span className="topbar__label">Email</span>
                <a href={company.emailHref}>{company.email}</a>
              </span>
            </li>
          </ul>

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
          <Link to="/contact" className="btn btn--accent mainnav__cta" onClick={closeMenu}>
            Request a call back
          </Link>
        </div>
      </nav>
    </header>
  )
}
