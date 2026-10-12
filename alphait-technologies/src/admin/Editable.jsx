import { Children } from 'react'
import { useContent } from './content-context.js'

/**
 * Text the admin can change from the live site.
 *
 *   <h2><Editable id="home.services.title">Services built around your business</Editable></h2>
 *
 * `children` is the built-in text (plain text only) and is shown until an edit is saved
 * under `id`. Ids are dotted paths: page.section.field. Pass `link={{ id, fallback }}` to
 * also edit a button's destination (see ButtonLink).
 */
export default function Editable({ id, children, link }) {
  const { content, isAdmin, edit } = useContent()
  const fallback = Children.toArray(children).join('')
  const text = content[id] ?? fallback
  const multiline = text.includes('\n')

  if (!isAdmin) {
    return multiline ? <span className="editable-text">{text}</span> : text
  }

  const open = (event) => {
    // Editable text often sits inside links and buttons — edit instead of navigating.
    event.preventDefault()
    event.stopPropagation()
    edit(id, fallback, link)
  }

  const changed = id in content || Boolean(link && link.id in content)

  return (
    <span
      className={`editable${changed ? ' editable--changed' : ''}${multiline ? ' editable-text' : ''}${text ? '' : ' editable--empty'}`}
      role="button"
      tabIndex={0}
      title={`Edit “${id}”`}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') open(event)
      }}
    >
      {text || 'Click to add text'}
    </span>
  )
}
