import { useEffect, useRef, useState } from 'react'

export default function ImageDialog({ id, current, edited, onSave, onUpload, onClose }) {
  const [url, setUrl] = useState(edited ? current : '')
  const [status, setStatus] = useState('idle') // idle | busy | error
  const [error, setError] = useState('')
  const dialogRef = useRef(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const run = async (task) => {
    setStatus('busy')
    setError('')
    try {
      await task()
    } catch (err) {
      setStatus('error')
      setError(err.message)
      return
    }
    setStatus('idle')
  }

  const pick = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setStatus('error')
      setError('Please choose an image under 5 MB.')
      return
    }
    run(async () => setUrl(await onUpload(file)))
  }

  const save = (event) => {
    event.preventDefault()
    const next = url.trim()
    if (!/^(https?:\/\/|\/)/.test(next)) {
      setStatus('error')
      setError('Upload an image or paste an image address starting with https://')
      return
    }
    run(async () => {
      await onSave(id, next)
      onClose()
    })
  }

  const busy = status === 'busy'
  const preview = url.trim() || current

  return (
    <dialog ref={dialogRef} className="editor" onClose={onClose} aria-labelledby="image-title">
      <form className="editor__form" onSubmit={save}>
        <header className="editor__head">
          <h2 id="image-title">Change image</h2>
          <code>{id}</code>
        </header>

        {preview ? <img className="editor__preview" src={preview} alt="" /> : null}

        <label className="btn btn--ghost-dark editor__upload">
          {busy ? 'Uploading…' : 'Upload from computer'}
          <input type="file" accept="image/*" onChange={pick} disabled={busy} hidden />
        </label>

        <label className="editor__field">
          <span>…or paste an image address</span>
          <input
            className="editor__input"
            value={url}
            placeholder="https://"
            onChange={(event) => setUrl(event.target.value)}
          />
        </label>

        {error ? (
          <p className="editor__error" role="alert">
            {error}
          </p>
        ) : null}

        <footer className="editor__actions">
          {edited ? (
            <button
              type="button"
              className="editor__reset"
              disabled={busy}
              onClick={() =>
                run(async () => {
                  await onSave(id, null)
                  onClose()
                })
              }
            >
              Restore original
            </button>
          ) : null}
          <span className="editor__spacer" />
          <button type="button" className="btn btn--ghost-dark" disabled={busy} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary" disabled={busy || !url.trim()}>
            Save
          </button>
        </footer>
        <p className="editor__hint">Uploads are stored in your Google Drive · max 5 MB</p>
      </form>
    </dialog>
  )
}
