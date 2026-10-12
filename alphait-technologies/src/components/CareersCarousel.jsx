import Editable from '../admin/Editable.jsx'
import EditableImage from '../admin/EditableImage.jsx'
import { useContent, useList } from '../admin/content-context.js'

// Continuously scrolling strip of photo cards. The list is repeated so one
// "set" is wider than the screen, then the set is rendered twice and the track
// slides left by exactly one set, which makes the loop seamless.
const REPEAT = 3

export default function CareersCarousel({ photos }) {
  const { content, isAdmin } = useContent()
  const list = useList(
    'careersCarousel',
    photos.map((_, i) => String(i)),
  )

  const items = list.ids.map((id, position) => {
    const builtin = /^\d+$/.test(id) ? photos[Number(id)] : undefined
    return {
      id,
      src: builtin?.src ?? photos[position % photos.length]?.src,
      alt: builtin?.alt ?? '',
      label: builtin?.label ?? '',
    }
  })
  const count = items.length
  const set = Array.from({ length: REPEAT }, () => items).flat()

  return (
    <>
      <div
        className="careers-carousel"
        aria-label="Life at Alpha IT"
        style={isAdmin ? { overflowX: 'auto' } : undefined}
      >
        <div
          className="careers-carousel__track"
          style={isAdmin ? { animation: 'none', paddingTop: 14 } : undefined}
        >
          {[...set, ...set].map((item, i) => {
            const first = i < count
            const imageKey = `careersCarousel.${item.id}.image`
            const labelKey = `careersCarousel.${item.id}.label`
            const showLabel = Boolean(content[labelKey] ?? item.label) || isAdmin
            const controls = isAdmin && first
            return (
              <figure
                key={`${item.id}-${i}`}
                className="careers-carousel__card"
                aria-hidden={!first}
                {...(controls ? { 'data-list-item': '' } : {})}
              >
                {first ? (
                  <EditableImage id={imageKey} src={item.src} alt={item.alt} loading="lazy" />
                ) : (
                  <img src={content[imageKey] || item.src} alt="" loading="lazy" />
                )}
                {showLabel && (
                  <figcaption className="careers-carousel__label">
                    <Editable id={labelKey}>{item.label}</Editable>
                  </figcaption>
                )}
                {controls ? (
                  <span className="item-controls" style={{ top: 6, right: 6 }}>
                    <button
                      type="button"
                      title="Move photo earlier"
                      disabled={i === 0}
                      onClick={() => list.move(item.id, -1)}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      title="Move photo later"
                      disabled={i === count - 1}
                      onClick={() => list.move(item.id, 1)}
                    >
                      →
                    </button>
                    <button
                      type="button"
                      className="item-controls__delete"
                      title="Delete photo"
                      onClick={() => {
                        if (window.confirm('Delete this photo? It disappears for all visitors.')) {
                          list.remove(item.id)
                        }
                      }}
                    >
                      ✕
                    </button>
                  </span>
                ) : null}
              </figure>
            )
          })}
        </div>
      </div>
      {isAdmin ? (
        <div className="container">
          <button type="button" className="list-add" onClick={() => list.add({ label: 'New photo' })}>
            + Add photo
          </button>
        </div>
      ) : null}
    </>
  )
}
