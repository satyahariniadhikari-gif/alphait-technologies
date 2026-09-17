import { Link } from 'react-router-dom'

export default function PageBanner({ title, subtitle, breadcrumb }) {
  return (
    <section className="page-banner">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__shape hero__shape--a" />
        <span className="hero__grid" />
      </div>
      <div className="container page-banner__inner">
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{breadcrumb || title}</span>
        </nav>
      </div>
    </section>
  )
}
