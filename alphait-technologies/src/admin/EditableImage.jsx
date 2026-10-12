import { useContent } from './content-context.js'

/**
 * An <img> the admin can replace (upload to Google Drive or paste a URL).
 * Accepts the usual <img> props; `src` is the built-in image.
 */
export default function EditableImage({ id, src, className, ...props }) {
  const { content, isAdmin, editImage } = useContent()
  const current = content[id] || src

  if (!isAdmin) return <img src={current} className={className} {...props} />

  return (
    <img
      src={current}
      className={`${className ?? ''} editable-image${id in content ? ' editable--changed' : ''}`}
      title={`Change image “${id}”`}
      role="button"
      tabIndex={0}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        editImage(id, src)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') editImage(id, src)
      }}
      {...props}
    />
  )
}
