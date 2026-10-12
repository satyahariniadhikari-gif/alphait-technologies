import { Link } from 'react-router-dom'
import { trainingCourses } from '../data/site.js'
import Editable from '../admin/Editable.jsx'
import { useContent, useList, useSettings } from '../admin/content-context.js'

// Scrolls the course titles from the Trainings page; edits and new courses made there show
// up here too. Titles are edited on the Trainings page, only the badge is edited here.
export default function AnnouncementBar() {
  const { content } = useContent()
  const { showAnnouncement } = useSettings()
  const courses = useList(
    'training.courses',
    trainingCourses.map((_, i) => String(i)),
  )
  if (!showAnnouncement) return null

  const titles = courses.ids
    .map((id) => content[courses.keyOf(id, 'title')] ?? trainingCourses[Number(id)]?.title ?? '')
    .filter(Boolean)
  if (!titles.length) return null

  // Two identical copies side by side: the track slides left by one copy, then repeats.
  const copy = (hidden) => (
    <ul className="announce__list" aria-hidden={hidden || undefined}>
      {titles.map((title, i) => (
        <li key={i}>
          <Link to="/training" tabIndex={hidden ? -1 : undefined}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="announce" role="region" aria-label="Trainings">
      <div className="container announce__inner">
        <span className="announce__badge">
          <Editable id="announce.badge">Live Trainings</Editable>
        </span>
        <div className="announce__marquee">
          <div className="announce__track" style={{ '--marquee-duration': `${titles.length * 5}s` }}>
            {copy(false)}
            {copy(true)}
          </div>
        </div>
      </div>
    </div>
  )
}
