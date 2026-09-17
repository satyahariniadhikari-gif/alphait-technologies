import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'

export default function NotFound() {
  return (
    <>
      <PageBanner title="Page not found" breadcrumb="404" />
      <section className="section">
        <div className="container">
          <p className="empty">
            The page you were looking for isn&apos;t here. <Link to="/">Return to the homepage</Link>{' '}
            or <Link to="/contact">get in touch</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
