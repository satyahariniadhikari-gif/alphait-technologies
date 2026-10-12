import { contentApi } from '../data/site.js'

const CACHE_KEY = 'alphait-content'
const TOKEN_KEY = 'alphait-admin-token'

export const isConfigured = () => Boolean(contentApi.url)

// Apps Script only answers CORS "simple" requests, so POST bodies go as text/plain.
async function post(payload) {
  const response = await fetch(contentApi.url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`Server error (${response.status})`)
  return response.json()
}

export async function fetchContent() {
  const response = await fetch(contentApi.url)
  if (!response.ok) throw new Error(`Server error (${response.status})`)
  const data = await response.json()
  if (!data.ok) throw new Error(data.error || 'Could not load content')
  safeStorage(() => localStorage.setItem(CACHE_KEY, JSON.stringify(data.content)))
  return data.content
}

// Last content seen by this browser, so edited text shows without waiting on the network.
export function cachedContent() {
  return safeStorage(() => JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')) || {}
}

export async function login(username, password) {
  const data = await post({ action: 'login', username, password })
  if (!data.ok) throw new Error(data.error || 'Login failed')
  safeStorage(() => sessionStorage.setItem(TOKEN_KEY, data.token))
  return data.token
}

export function storedToken() {
  const token = safeStorage(() => sessionStorage.getItem(TOKEN_KEY))
  if (!token || Number(token.split('.')[0]) < Date.now()) return null
  return token
}

export function logout() {
  safeStorage(() => sessionStorage.removeItem(TOKEN_KEY))
}

// changes: { key: value }. A null value resets that key to the site's built-in default.
export async function saveContent(token, changes) {
  check(await post({ action: 'saveMany', token, changes }), 'Save failed')
}

// Uploads an image to the admin's Google Drive and resolves to its public URL.
export async function uploadImage(token, file) {
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1])
    reader.onerror = () => reject(new Error('Could not read the file'))
    reader.readAsDataURL(file)
  })
  const result = await post({ action: 'upload', token, name: file.name, mimeType: file.type, data })
  check(result, 'Upload failed')
  return result.url
}

function check(data, fallbackMessage) {
  if (data.ok) return
  const error = new Error(data.error || fallbackMessage)
  error.auth = data.auth === false
  throw error
}

function safeStorage(fn) {
  try {
    return fn()
  } catch {
    return null
  }
}
