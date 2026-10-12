import { useEffect, useRef, useState } from 'react'

// `link` ({ id, fallback, value }) adds a URL field for buttons and links.
export default function EditorDialog({ id, value, fallback, link, edited, onSave, onClose }) {
  const [draft, setDraft] = useState(value)
  const [href, setHref] = useState(link?.value ?? '')
  const [status, setStatus] = useState('idle') // idle | saving | error
  const [error, setError] = useState('')
  const dialogRef = useRef(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const run = async (changes) => {
    setStatus('saving')
    setError('')
    try {
      await onSave(changes)
      onClose()
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  const fail = (message) => {
    setStatus('error')
    setError(message)
  }

  const submit = (event) => {
    event.preventDefault()
    const next = draft.trim()
    if (!next) return fail('Text cannot be empty. Use “Restore original” to go back to the default.')
    const changes = { [id]: next === fallback ? null : next }
    if (link) {
      const url = href.trim()
      if (!url) return fail('Link cannot be empty.')
      if (!/^(\/|#|https?:\/\/|mailto:|tel:)/.test(url)) {
        return fail('Links must start with /, #, https://, mailto: or tel:')
      }
      changes[link.id] = url === link.fallback ? null : url
    }
    run(changes)
  }

  const restore = () => run(link ? { [id]: null, [link.id]: null } : { [id]: null })
  const saving = status === 'saving'

  return (
    <dialog ref={dialogRef} className="editor" onClose={onClose} aria-labelledby="editor-title">
      <form className="editor__form" onSubmit={submit}>
        <header className="editor__head">
          <h2 id="editor-title">{link ? 'Edit button' : 'Edit text'}</h2>
          <code>{id}</code>
        </header>

        <label className="editor__field">
          {link ? <span>Label</span> : null}
          <textarea
            className="editor__input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={link ? 2 : Math.min(12, Math.max(3, Math.ceil(draft.length / 60)))}
            autoFocus
            onKeyDown={(event) => {
              if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) submit(event)
            }}
          />
        </label>

        {link ? (
          <label className="editor__field">
            <span>Link — a page like /contact, or a full https:// address</span>
            <input
              className="editor__input"
              value={href}
              onChange={(event) => setHref(event.target.value)}
              list="editor-pages"
            />
            <datalist id="editor-pages">
              {['/', '/about', '/services', '/training', '/career', '/contact', '/#callback'].map((path) => (
                <option key={path} value={path} />
              ))}
            </datalist>
          </label>
        ) : null}

        {edited && fallback ? (
          <p className="editor__original">
            <span>Original:</span> {fallback}
            {link ? ` → ${link.fallback}` : null}
          </p>
        ) : null}

        {error ? (
          <p className="editor__error" role="alert">
            {error}
          </p>
        ) : null}

        <footer className="editor__actions">
          {edited ? (
            <button type="button" className="editor__reset" disabled={saving} onClick={restore}>
              Restore original
            </button>
          ) : null}
          <span className="editor__spacer" />
          <button type="button" className="btn btn--ghost-dark" disabled={saving} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </footer>
        <p className="editor__hint">Ctrl + Enter to save · changes go live for all visitors</p>
      </form>
    </dialog>
  )
}
