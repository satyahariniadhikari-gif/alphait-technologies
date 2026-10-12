import { createContext, useContext } from 'react'
import { company as defaults } from '../data/site.js'
import { DEFAULT_SETTINGS } from './theme.js'

export const ContentContext = createContext(null)

export function useContent() {
  return useContext(ContentContext)
}

// Edited text for `id`, or `fallback` when the admin hasn't changed it.
export function useText(id, fallback) {
  const { content } = useContent()
  return content[id] ?? fallback
}

export function parseJson(text, fallback) {
  if (text == null) return fallback
  try {
    return JSON.parse(text)
  } catch {
    return fallback
  }
}

// Site-wide design settings (theme, header layout, …) merged over the defaults.
export function useSettings() {
  const { content } = useContent()
  return { ...DEFAULT_SETTINGS, ...parseJson(content['site.settings'], {}) }
}

/**
 * An admin-editable list: the order of item ids is stored under `${id}.order`, and each
 * item's text under `${id}.${itemId}.${field}` (or `${id}.${itemId}` for one-field items).
 * `defaultIds` are the built-in items; new items get generated ids.
 */
export function useList(id, defaultIds) {
  const { content, run } = useContent()
  const orderKey = `${id}.order`
  const ids = parseJson(content[orderKey], null) ?? defaultIds
  const keyOf = (itemId, field) => (field ? `${id}.${itemId}.${field}` : `${id}.${itemId}`)
  const saveOrder = (next, extra = {}) => run({ [orderKey]: JSON.stringify(next), ...extra })

  return {
    ids,
    keyOf,
    // fields: { field: initialText } — use '' as the field name for one-field items.
    add(fields, at = ids.length) {
      const itemId = `n${Date.now().toString(36)}`
      const extra = {}
      for (const [field, text] of Object.entries(fields)) extra[keyOf(itemId, field)] = text
      const next = [...ids]
      next.splice(at, 0, itemId)
      saveOrder(next, extra)
      return itemId
    },
    remove(itemId) {
      const prefix = keyOf(itemId)
      const extra = {}
      for (const key of Object.keys(content)) {
        if (key === prefix || key.startsWith(`${prefix}.`)) extra[key] = null
      }
      saveOrder(
        ids.filter((x) => x !== itemId),
        extra,
      )
    },
    move(itemId, delta) {
      const from = ids.indexOf(itemId)
      const to = from + delta
      if (from < 0 || to < 0 || to >= ids.length) return
      const next = [...ids]
      next.splice(to, 0, next.splice(from, 1)[0])
      saveOrder(next)
    },
  }
}

// Company details with admin edits applied. Use the same ids with <Editable> to edit them.
export function useCompany() {
  const { content } = useContent()
  const pick = (field, fallback) => content[`company.${field}`] ?? fallback
  const addressLines = [
    pick('addressLine1', defaults.addressLines[0]),
    pick('addressLine2', defaults.addressLines[1]),
  ]
  const phone = pick('phone', defaults.phone)
  const email = pick('email', defaults.email)
  return {
    ...defaults,
    name: pick('name', defaults.name),
    shortName: pick('shortName', defaults.shortName),
    tagline: pick('tagline', defaults.tagline),
    addressLines,
    address: addressLines.join(', '),
    phone,
    phoneHref: `tel:${phone.replace(/[^\d+]/g, '')}`,
    email,
    emailHref: `mailto:${email}`,
  }
}
