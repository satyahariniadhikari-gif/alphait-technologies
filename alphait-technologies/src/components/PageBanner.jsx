import { Link } from 'react-router-dom'
import Editable from '../admin/Editable.jsx'

// `id` namespaces the editable title/subtitle, e.g. id="about.banner".
export default function PageBanner({ id, title, subtitle, breadcrumb }) {
  return (
    <section className="page-banner">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__shape hero__shape--a" />
        <span className="hero__grid" />
      </div>
      <div className="container page-banner__inner">
        <h1>{id ? <Editable id={`${id}.title`}>{title}</Editable> : title}</h1>
        {subtitle ? (
          <p>{id ? <Editable id={`${id}.subtitle`}>{subtitle}</Editable> : subtitle}</p>
        ) : null}
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{breadcrumb || title}</span>
        </nav>
      </div>
    </section>
  )
}
