import Icon from '../components/Icon.jsx'
import { useContent } from './content-context.js'

const ICONS = [
  'consulting',
  'training',
  'development',
  'shield',
  'target',
  'users',
  'spark',
  'check',
  'phone',
  'mail',
  'pin',
  'clock',
]

// An icon the admin can swap for another from the site's icon set.
export default function EditableIcon({ id, fallback, size }) {
  const { content, isAdmin, run } = useContent()
  const name = content[id] || fallback

  if (!isAdmin) return <Icon name={name} size={size} />

  return (
    <span className="editable-icon" title="Change icon">
      <Icon name={name} size={size} />
      <select
        aria-label="Change icon"
        value={name}
        onClick={(event) => event.stopPropagation()}
        onChange={(event) =>
          run({ [id]: event.target.value === fallback ? null : event.target.value })
        }
      >
        {ICONS.map((icon) => (
          <option key={icon} value={icon}>
            {icon}
          </option>
        ))}
      </select>
    </span>
  )
}
