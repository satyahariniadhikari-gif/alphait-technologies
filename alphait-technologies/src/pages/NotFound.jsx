import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import Editable from '../admin/Editable.jsx'

export default function NotFound() {
  return (
    <>
      <PageBanner id="notFound.banner" title="Page not found" breadcrumb="404" />
      <section className="section">
        <div className="container">
          <p className="empty">
            <Editable id="notFound.text">The page you were looking for isn&apos;t here.</Editable>{' '}
            <Link to="/">
              <Editable id="notFound.homeLink">Return to the homepage</Editable>
            </Link>{' '}
            <Editable id="notFound.or">or</Editable>{' '}
            <Link to="/contact">
              <Editable id="notFound.contactLink">get in touch</Editable>
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
