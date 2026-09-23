import { aiProgram } from '../data/site.js'
import Icon from './Icon.jsx'

export default function AnnouncementBar() {
  return (
    <div className="announce" role="region" aria-label="Announcement">
      <div className="container announce__inner">
        <span className="announce__badge">New</span>
        <p className="announce__text">
          <strong>{aiProgram.title}</strong>
          <span>
            {aiProgram.batchLabel} · Limited seats · {aiProgram.eligibility.join(' & ')} only
          </span>
        </p>
        <a
          className="announce__cta"
          href={aiProgram.registerUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Register now
          <Icon name="arrow" size={16} />
        </a>
      </div>
    </div>
  )
}
