import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import { useContent } from '../admin/content-context.js'
import { isConfigured } from '../admin/api.js'

export default function Admin() {
  const { isAdmin, login, logout } = useContent()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await login(username.trim(), password)
      navigate('/')
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  return (
    <>
      <PageBanner title="Admin" subtitle="Edit the website content without a redeploy." />

      <section className="section">
        <div className="container admin-login">
          {isAdmin ? (
            <div className="side-card">
              <h2>You are signed in</h2>
              <p>
                Browse the site and click any outlined text to change it. Edits are saved to the
                content sheet and go live for every visitor on their next page load.
              </p>
              <Link to="/" className="btn btn--primary">
                Start editing
              </Link>
              <button type="button" className="admin-login__logout" onClick={logout}>
                Sign out
              </button>
            </div>
          ) : (
            <form className="side-card admin-login__form" onSubmit={submit}>
              <h2>Admin sign in</h2>
              {isConfigured() ? null : (
                <p className="admin-login__error" role="alert">
                  The content API is not configured yet. Set VITE_CONTENT_API_URL as described in
                  ADMIN-SETUP.md.
                </p>
              )}
              <label className="field">
                <span>Username</span>
                <input
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </label>
              <label className="field">
                <span>Password</span>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
              {error ? (
                <p className="admin-login__error" role="alert">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                className="btn btn--accent"
                disabled={status === 'sending' || !isConfigured()}
              >
                {status === 'sending' ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
