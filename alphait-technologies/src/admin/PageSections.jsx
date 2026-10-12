import { Fragment, useState } from 'react'
import { parseJson, useContent } from './content-context.js'
import CustomSection from './CustomSection.jsx'
import { SECTION_TYPES } from './section-types.js'

/**
 * The sections of a page, in an order the admin can change. Admins can also hide built-in
 * sections and add/delete their own (see CustomSection).
 *
 *   <PageSections page="home" sections={[
 *     ['hero', 'Hero slider', <HeroSlider />],
 *     ['intro', 'Welcome', <IntroSection />],
 *   ]} />
 *
 * The layout is stored as JSON under `layout.<page>`: [{ id, hidden?, type? }].
 */
export default function PageSections({ page, sections }) {
  const { content, isAdmin, run } = useContent()
  const layoutKey = `layout.${page}`
  const builtins = new Map(sections.map(([id, label, element]) => [id, { label, element }]))

  const saved = parseJson(content[layoutKey], null)
  const entries = (saved ?? []).filter((entry) => builtins.has(entry.id) || SECTION_TYPES[entry.type])
  // Sections added in code after the admin saved a layout go right after the section that
  // precedes them in code (or first), not to the end of the page.
  sections.forEach(([id], index) => {
    if (entries.some((entry) => entry.id === id)) return
    const previous = sections[index - 1]?.[0]
    const at = previous ? entries.findIndex((entry) => entry.id === previous) + 1 : 0
    entries.splice(at, 0, { id })
  })

  const render = (entry) =>
    entry.type ? (
      <CustomSection id={entry.id} type={entry.type} />
    ) : (
      builtins.get(entry.id).element
    )

  if (!isAdmin) {
    return entries
      .filter((entry) => !entry.hidden)
      .map((entry) => <Fragment key={entry.id}>{render(entry)}</Fragment>)
  }

  const saveLayout = (next, extra = {}) => run({ [layoutKey]: JSON.stringify(next), ...extra })

  const move = (index, delta) => {
    const next = [...entries]
    next.splice(index + delta, 0, next.splice(index, 1)[0])
    saveLayout(next)
  }

  const toggle = (index) => {
    const next = entries.map((entry, i) =>
      i === index ? { ...entry, hidden: !entry.hidden || undefined } : entry,
    )
    saveLayout(next)
  }

  const add = (index, type) => {
    const next = [...entries]
    next.splice(index, 0, { id: newSectionId(), type })
    saveLayout(next)
  }

  const remove = (index) => {
    const { id } = entries[index]
    if (!window.confirm('Delete this section and its content? This cannot be undone.')) return
    const extra = {}
    for (const key of Object.keys(content)) {
      if (key.startsWith(`sections.${id}.`)) extra[key] = null
    }
    saveLayout(
      entries.filter((_, i) => i !== index),
      extra,
    )
  }

  return (
    <>
      <AddSection onAdd={(type) => add(0, type)} />
      {entries.map((entry, index) => {
        const label = entry.type ? SECTION_TYPES[entry.type] : builtins.get(entry.id).label
        const bgKey = `sections.${entry.id}.bg`
        const sideKey = `sections.${entry.id}.side`
        return (
          <Fragment key={entry.id}>
            <div className={`section-slot${entry.hidden ? ' is-hidden' : ''}`}>
              <div className="section-tools">
                <strong>
                  {label}
                  {entry.hidden ? ' · hidden' : ''}
                </strong>
                <button type="button" disabled={index === 0} onClick={() => move(index, -1)}>
                  ↑ Up
                </button>
                <button
                  type="button"
                  disabled={index === entries.length - 1}
                  onClick={() => move(index, 1)}
                >
                  ↓ Down
                </button>
                {entry.type ? (
                  <>
                    <select
                      aria-label="Section background"
                      value={content[bgKey] ?? ''}
                      onChange={(event) => run({ [bgKey]: event.target.value || null })}
                    >
                      <option value="">White background</option>
                      <option value="tint">Light background</option>
                      <option value="dark">Dark background</option>
                    </select>
                    {entry.type === 'imageText' ? (
                      <select
                        aria-label="Image side"
                        value={content[sideKey] ?? 'left'}
                        onChange={(event) =>
                          run({ [sideKey]: event.target.value === 'left' ? null : 'right' })
                        }
                      >
                        <option value="left">Image left</option>
                        <option value="right">Image right</option>
                      </select>
                    ) : null}
                    <button type="button" className="danger" onClick={() => remove(index)}>
                      Delete
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={() => toggle(index)}>
                    {entry.hidden ? 'Show' : 'Hide'}
                  </button>
                )}
              </div>
              {render(entry)}
            </div>
            <AddSection onAdd={(type) => add(index + 1, type)} />
          </Fragment>
        )
      })}
    </>
  )
}

function newSectionId() {
  return `c${Date.now().toString(36)}`
}

function AddSection({ onAdd }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="section-add">
      {open ? (
        <div className="section-add__menu">
          {Object.entries(SECTION_TYPES).map(([type, label]) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setOpen(false)
                onAdd(type)
              }}
            >
              {label}
            </button>
          ))}
          <button type="button" className="section-add__cancel" onClick={() => setOpen(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <button type="button" className="section-add__open" onClick={() => setOpen(true)}>
          + Add section here
        </button>
      )}
    </div>
  )
}
