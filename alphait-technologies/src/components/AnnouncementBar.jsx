import { aiProgram, isRegistrationOpen } from '../data/site.js'
import Editable from '../admin/Editable.jsx'
import ButtonLink from '../admin/ButtonLink.jsx'
import { useSettings, useText } from '../admin/content-context.js'

export default function AnnouncementBar() {
  const open = isRegistrationOpen()
  const batchLabel = useText('aiProgram.batchLabel', aiProgram.batchLabel)
  const { showAnnouncement } = useSettings()
  if (!showAnnouncement) return null

  return (
    <div className="announce" role="region" aria-label="Announcement">
      <div className="container announce__inner">
        <span className="announce__badge">
          {open ? (
            <Editable id="announce.badgeOpen">New</Editable>
          ) : (
            <Editable id="announce.badgeClosed">Update</Editable>
          )}
        </span>
        <p className="announce__text">
          <strong>
            <Editable id="aiProgram.title">{aiProgram.title}</Editable>
          </strong>
          <span>
            {open ? (
              <Editable id="announce.textOpen">
                {`${batchLabel} · Limited seats · ${aiProgram.eligibility.join(' & ')} only`}
              </Editable>
            ) : (
              <Editable id="announce.textClosed">
                {`Registration ends on ${aiProgram.registrationEndLabel} · Next batch date will be updated soon`}
              </Editable>
            )}
          </span>
        </p>
        <ButtonLink
          id="announce.cta"
          hrefId="aiProgram.registerUrl"
          to={aiProgram.registerUrl}
          className="announce__cta"
          icon="arrow"
          iconSize={16}
        >
          Register now
        </ButtonLink>
      </div>
    </div>
  )
}
