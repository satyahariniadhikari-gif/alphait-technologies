import { useEffect, useState } from 'react'
import { useContent } from './content-context.js'
import SettingsDialog from './SettingsDialog.jsx'

export default function AdminBar() {
  const { isAdmin, logout, pending, notice, clearNotice } = useContent()
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(clearNotice, 6000)
    return () => window.clearTimeout(timer)
  }, [notice, clearNotice])

  if (!isAdmin) return null

  return (
    <>
      {notice ? (
        <p className="admin-notice" role="alert">
          {notice}
        </p>
      ) : null}
      <div className="admin-bar" role="region" aria-label="Admin editing">
        <span className={`admin-bar__dot${pending ? ' is-saving' : ''}`} aria-hidden="true" />
        <p title="Click outlined text or images to edit · use the green section bars and card buttons to rearrange">
          <strong>{pending ? 'Saving…' : 'Edit mode'}</strong>
        </p>
        <button type="button" onClick={() => setSettingsOpen(true)}>
          Site settings
        </button>
        <button type="button" onClick={logout}>
          Sign out
        </button>
      </div>
      {settingsOpen ? <SettingsDialog onClose={() => setSettingsOpen(false)} /> : null}
    </>
  )
}
