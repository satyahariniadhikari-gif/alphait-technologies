import { useEffect, useRef, useState } from 'react'
import { useContent, useSettings } from './content-context.js'
import { DEFAULT_SETTINGS, THEME_PRESETS } from './theme.js'

export default function SettingsDialog({ onClose }) {
  const { saveMany, upload } = useContent()
  const saved = useSettings()
  const [draft, setDraft] = useState(saved)
  const [status, setStatus] = useState('idle') // idle | busy | error
  const [error, setError] = useState('')
  const dialogRef = useRef(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const set = (field, value) => setDraft((current) => ({ ...current, [field]: value }))

  const run = async (task) => {
    setStatus('busy')
    setError('')
    try {
      await task()
      setStatus('idle')
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  const save = (event) => {
    event.preventDefault()
    // Store only what differs from the defaults, so future default changes still apply.
    const changed = Object.fromEntries(
      Object.entries(draft).filter(([field, value]) => DEFAULT_SETTINGS[field] !== value),
    )
    const value = Object.keys(changed).length ? JSON.stringify(changed) : null
    run(async () => {
      await saveMany({ 'site.settings': value })
      onClose()
    })
  }

  const uploadLogo = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) run(async () => set('logoUrl', await upload(file)))
  }

  const busy = status === 'busy'

  const choice = (field, options) => (
    <div className="settings__choices" role="radiogroup">
      {Object.entries(options).map(([value, label]) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={draft[field] === value}
          className={draft[field] === value ? 'is-active' : undefined}
          onClick={() => set(field, value)}
        >
          {label}
        </button>
      ))}
    </div>
  )

  const toggle = (field, label) => (
    <label className="settings__toggle">
      <input
        type="checkbox"
        checked={draft[field]}
        onChange={(event) => set(field, event.target.checked)}
      />
      <span>{label}</span>
    </label>
  )

  return (
    <dialog
      ref={dialogRef}
      className="editor settings"
      onClose={onClose}
      aria-labelledby="settings-title"
    >
      <form className="editor__form" onSubmit={save}>
        <header className="editor__head">
          <h2 id="settings-title">Site settings</h2>
          <code>Colours, layout and header options for every page</code>
        </header>

        <fieldset className="settings__group">
          <legend>Colour theme</legend>
          <div className="settings__swatches">
            {Object.entries(THEME_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                type="button"
                className={`settings__swatch${draft.theme === key ? ' is-active' : ''}`}
                onClick={() => set('theme', key)}
              >
                <span
                  style={{
                    background: `linear-gradient(135deg, ${preset.primary}, ${preset.accent})`,
                  }}
                />
                {preset.label}
              </button>
            ))}
            <button
              type="button"
              className={`settings__swatch${draft.theme === 'custom' ? ' is-active' : ''}`}
              onClick={() => set('theme', 'custom')}
            >
              <span
                style={{ background: `linear-gradient(135deg, ${draft.primary}, ${draft.accent})` }}
              />
              Custom
            </button>
          </div>
          {draft.theme === 'custom' ? (
            <div className="settings__colors">
              <label>
                <input
                  type="color"
                  value={draft.primary}
                  onChange={(event) => set('primary', event.target.value)}
                />
                Main colour
              </label>
              <label>
                <input
                  type="color"
                  value={draft.accent}
                  onChange={(event) => set('accent', event.target.value)}
                />
                Accent colour
              </label>
            </div>
          ) : null}
        </fieldset>

        <fieldset className="settings__group">
          <legend>Shapes</legend>
          <span className="settings__label">Card corners</span>
          {choice('corners', { rounded: 'Rounded', soft: 'Soft', sharp: 'Sharp' })}
          <span className="settings__label">Buttons</span>
          {choice('buttons', { pill: 'Pill', rounded: 'Rounded', square: 'Square' })}
        </fieldset>

        <fieldset className="settings__group">
          <legend>Header &amp; logo</legend>
          <span className="settings__label">Logo position</span>
          {choice('logoPosition', { left: 'Left', center: 'Centered' })}
          <label className="settings__range">
            <span className="settings__label">Logo size · {draft.logoSize}px</span>
            <input
              type="range"
              min="40"
              max="120"
              value={draft.logoSize}
              onChange={(event) => set('logoSize', Number(event.target.value))}
            />
          </label>
          <div className="settings__logo">
            {draft.logoUrl ? <img src={draft.logoUrl} alt="" /> : <span>Built-in logo</span>}
            <label className="btn btn--ghost-dark">
              {busy ? 'Uploading…' : 'Upload new logo'}
              <input type="file" accept="image/*" hidden disabled={busy} onChange={uploadLogo} />
            </label>
            {draft.logoUrl ? (
              <button type="button" className="editor__reset" onClick={() => set('logoUrl', '')}>
                Use built-in logo
              </button>
            ) : null}
          </div>
          {toggle('showAnnouncement', 'Show the announcement bar at the top')}
          {toggle('showTopbarContacts', 'Show address, phone and email in the header')}
          {toggle('showHeaderCta', 'Show the “Request a call back” button in the menu bar')}
          {toggle('customCursor', 'Use the animated logo cursor')}
        </fieldset>

        <fieldset className="settings__group">
          <legend>Home page hero</legend>
          <span className="settings__label">Text alignment</span>
          {choice('heroAlign', { left: 'Left', center: 'Centered' })}
        </fieldset>

        {error ? (
          <p className="editor__error" role="alert">
            {error}
          </p>
        ) : null}

        <footer className="editor__actions">
          <button
            type="button"
            className="editor__reset"
            disabled={busy}
            onClick={() => setDraft(DEFAULT_SETTINGS)}
          >
            Reset all to default
          </button>
          <span className="editor__spacer" />
          <button type="button" className="btn btn--ghost-dark" disabled={busy} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary" disabled={busy}>
            {busy ? 'Saving…' : 'Save settings'}
          </button>
        </footer>
      </form>
    </dialog>
  )
}
