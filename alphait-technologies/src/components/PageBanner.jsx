import { Link } from 'react-router-dom'
import Editable from '../admin/Editable.jsx'
import { useContent } from '../admin/content-context.js'

// `id` namespaces the editable title/subtitle, e.g. id="about.banner". With `image`, the
// banner is laid out like the home hero: the photo under the theme's blue overlay, text on
// the left and `aside` (e.g. glass cards) on the right. The admin can replace the photo.
export default function PageBanner({ id, title, subtitle, breadcrumb, image, aside }) {
  const { content, isAdmin, editImage } = useContent()
  const imageKey = `${id}.image`
  const photo = image ? content[imageKey] || image : null

  const text = (
    <>
      <h1>{id ? <Editable id={`${id}.title`}>{title}</Editable> : title}</h1>
      {subtitle ? (
        <p>{id ? <Editable id={`${id}.subtitle`}>{subtitle}</Editable> : subtitle}</p>
      ) : null}
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{breadcrumb || title}</span>
      </nav>
    </>
  )

  if (!photo) {
    return (
      <section className="page-banner">
        <div className="hero__bg" aria-hidden="true">
          <span className="hero__shape hero__shape--a" />
          <span className="hero__grid" />
        </div>
        <div className="container page-banner__inner">{text}</div>
      </section>
    )
  }

  return (
    <section className="page-banner page-banner--photo">
      <div className="hero__bg" aria-hidden="true">
        <span className="page-banner__photo" style={{ backgroundImage: `url(${photo})` }} />
        <span className="hero__overlay" />
        <span className="hero__shape hero__shape--a" />
        <span className="hero__grid" />
      </div>
      <div className={`container page-banner__inner${aside ? ' page-banner__inner--split' : ''}`}>
        <div className="page-banner__text">{text}</div>
        {aside ? <div className="page-banner__aside">{aside}</div> : null}
      </div>
      {isAdmin ? (
        <div className="section-tools page-banner__tools">
          <button type="button" onClick={() => editImage(imageKey, image)}>
            Change background image
          </button>
        </div>
      ) : null}
    </section>
  )
}
