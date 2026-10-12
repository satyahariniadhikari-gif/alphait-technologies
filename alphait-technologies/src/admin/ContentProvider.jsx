import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ContentContext } from './content-context.js'
import * as api from './api.js'
import EditorDialog from './EditorDialog.jsx'
import ImageDialog from './ImageDialog.jsx'
import ThemeApplier from './ThemeApplier.jsx'

export default function ContentProvider({ children }) {
  const [content, setContent] = useState(api.cachedContent)
  const [token, setToken] = useState(api.storedToken)
  const [editing, setEditing] = useState(null) // { kind: 'text' | 'image', ... }
  const [pending, setPending] = useState(0)
  const [notice, setNotice] = useState('')
  const contentRef = useRef(content)

  useLayoutEffect(() => {
    contentRef.current = content
  }, [content])

  useEffect(() => {
    if (!api.isConfigured()) return
    api.fetchContent().then(setContent, (error) => console.warn('Content API:', error.message))
  }, [])

  const login = useCallback(async (username, password) => {
    setToken(await api.login(username, password))
  }, [])

  const logout = useCallback(() => {
    api.logout()
    setToken(null)
    setEditing(null)
  }, [])

  // Applies changes on screen immediately, then saves; rolls back if the save fails.
  const saveMany = useCallback(
    async (changes) => {
      const before = contentRef.current
      const next = { ...before }
      contentRef.current = next
      for (const [key, value] of Object.entries(changes)) {
        if (value === null) delete next[key]
        else next[key] = value
      }
      setContent(next)
      setPending((n) => n + 1)
      try {
        await api.saveContent(token, changes)
      } catch (error) {
        setContent((current) => {
          const restored = { ...current }
          for (const key of Object.keys(changes)) {
            if (key in before) restored[key] = before[key]
            else delete restored[key]
          }
          return restored
        })
        setNotice(`Not saved: ${error.message}`)
        if (error.auth) logout()
        throw error
      } finally {
        setPending((n) => n - 1)
      }
    },
    [token, logout],
  )

  const save = useCallback((id, value) => saveMany({ [id]: value }), [saveMany])

  // For fire-and-forget actions (list/section buttons): failures surface via `notice`.
  const run = useCallback(
    (changes) => {
      saveMany(changes).catch(() => {})
    },
    [saveMany],
  )

  const upload = useCallback((file) => api.uploadImage(token, file), [token])

  const clearNotice = useCallback(() => setNotice(''), [])

  const value = useMemo(
    () => ({
      content,
      isAdmin: Boolean(token),
      pending,
      notice,
      clearNotice,
      login,
      logout,
      save,
      saveMany,
      run,
      upload,
      edit: (id, fallback, link) =>
        setEditing({
          kind: 'text',
          id,
          fallback,
          value: content[id] ?? fallback,
          link: link && { ...link, value: content[link.id] ?? link.fallback },
        }),
      editImage: (id, fallback) => setEditing({ kind: 'image', id, fallback }),
    }),
    [content, token, pending, notice, clearNotice, login, logout, save, saveMany, run, upload],
  )

  const close = () => setEditing(null)

  return (
    <ContentContext.Provider value={value}>
      <ThemeApplier />
      {children}
      {editing?.kind === 'text' && token ? (
        <EditorDialog
          key={editing.id}
          {...editing}
          edited={editing.id in content || Boolean(editing.link && editing.link.id in content)}
          onSave={saveMany}
          onClose={close}
        />
      ) : null}
      {editing?.kind === 'image' && token ? (
        <ImageDialog
          key={editing.id}
          id={editing.id}
          current={content[editing.id] ?? editing.fallback}
          edited={editing.id in content}
          onSave={save}
          onUpload={upload}
          onClose={close}
        />
      ) : null}
    </ContentContext.Provider>
  )
}
