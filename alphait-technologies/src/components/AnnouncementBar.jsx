import { aiProgram, isRegistrationOpen } from '../data/site.js'
import Icon from './Icon.jsx'

export default function AnnouncementBar() {
  const open = isRegistrationOpen()

  return (
    <div className="announce" role="region" aria-label="Announcement">
      <div className="container announce__inner">
        <span className="announce__badge">{open ? 'New' : 'Update'}</span>
        <p className="announce__text">
          <strong>{aiProgram.title}</strong>
          <span>
            {open
              ? `${aiProgram.batchLabel} · Limited seats · ${aiProgram.eligibility.join(' & ')} only`
              : `Registration ends on ${aiProgram.registrationEndLabel} · Next batch date will be updated soon`}
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
