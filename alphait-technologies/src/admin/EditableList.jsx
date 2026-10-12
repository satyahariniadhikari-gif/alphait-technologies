import { Children, cloneElement } from 'react'
import { useContent, useList } from './content-context.js'

/**
 * A list of cards/chips/rows the admin can add to, delete from and reorder.
 *
 *   <EditableList
 *     id="industries"
 *     defaults={industries.map((_, i) => String(i))}
 *     as="ul"
 *     className="chips"
 *     newItem={{ '': 'New industry' }}
 *     addLabel="Add industry"
 *     renderItem={(itemId, key) => (
 *       <li><Editable id={key()}>{industries[itemId] ?? ''}</Editable></li>
 *     )}
 *   />
 *
 * renderItem(itemId, key, index) returns ONE element; `key(field)` gives the content id for
 * that item's field (`key()` for one-field items). Built-in items fall back to their
 * default text; new items start from `newItem`.
 */
export default function EditableList({
  id,
  defaults,
  as: Tag = 'div',
  className,
  renderItem,
  newItem,
  addLabel = 'Add item',
  itemLabel = 'item',
}) {
  const { isAdmin } = useContent()
  const list = useList(id, defaults)

  const items = list.ids.map((itemId, index) => {
    const element = renderItem(itemId, (field) => list.keyOf(itemId, field), index)
    if (!element) return null
    if (!isAdmin) return cloneElement(element, { key: itemId })
    return cloneElement(
      element,
      { key: itemId, 'data-list-item': '' },
      ...Children.toArray(element.props.children),
      <span className="item-controls" key="__controls" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          title={`Move ${itemLabel} earlier`}
          disabled={index === 0}
          onClick={(event) => {
            event.preventDefault()
            list.move(itemId, -1)
          }}
        >
          ↑
        </button>
        <button
          type="button"
          title={`Move ${itemLabel} later`}
          disabled={index === list.ids.length - 1}
          onClick={(event) => {
            event.preventDefault()
            list.move(itemId, 1)
          }}
        >
          ↓
        </button>
        <button
          type="button"
          className="item-controls__delete"
          title={`Delete ${itemLabel}`}
          onClick={(event) => {
            event.preventDefault()
            if (window.confirm(`Delete this ${itemLabel}? It disappears for all visitors.`)) {
              list.remove(itemId)
            }
          }}
        >
          ✕
        </button>
      </span>,
    )
  })

  return (
    <>
      <Tag className={className}>{items}</Tag>
      {isAdmin ? (
        <button
          type="button"
          className="list-add"
          onClick={() => list.add(typeof newItem === 'function' ? newItem() : newItem)}
        >
          + {addLabel}
        </button>
      ) : null}
    </>
  )
}
