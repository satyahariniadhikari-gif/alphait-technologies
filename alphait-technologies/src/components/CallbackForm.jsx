import { useState } from 'react'
import { Link } from 'react-router-dom'
import { company, legal, web3forms } from '../data/site.js'

const EMPTY = { name: '', email: '', phone: '', subject: 'Consulting', message: '', consent: false }

export default function CallbackForm({ compact = false }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  function update(event) {
    const { name, value, type, checked } = event.target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function validate() {
    const next = {}
    if (!values.name.trim()) next.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = 'Please enter a valid email address.'
    if (values.message.trim().length < 10)
      next.message = 'Please add a little more detail (10+ characters).'
    if (values.phone.trim() && !/^[+()\-.\s\d]{7,}$/.test(values.phone.trim()))
      next.phone = 'Please enter a valid phone number.'
    if (!values.consent) next.consent = 'Please agree to the terms to send your message.'
    return next
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // Hidden honeypot field: real visitors never tick it, bots often do.
    const botcheck = event.currentTarget.elements.botcheck?.checked ?? false

    setStatus('sending')
    try {
      const response = await fetch(web3forms.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3forms.accessKey,
          subject: `Call back request — ${values.subject}`,
          from_name: `${company.name} website`,
          botcheck,
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim() || 'Not provided',
          interested_in: values.subject,
          message: values.message.trim(),
          consent: 'Agreed to calls, emails and texts, Privacy Policy and Terms of Service',
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.success) throw new Error(result.message || 'Request failed')

      setStatus('sent')
      setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className={`callback${compact ? ' callback--compact' : ''}`} onSubmit={handleSubmit} noValidate>
      <div className="callback__row">
        <label className="field">
          <span>Your name</span>
          <input
            name="name"
            value={values.name}
            onChange={update}
            aria-invalid={Boolean(errors.name)}
            placeholder="Jane Doe"
          />
          {errors.name ? <em className="field__error">{errors.name}</em> : null}
        </label>

        <label className="field">
          <span>Email address</span>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={update}
            aria-invalid={Boolean(errors.email)}
            placeholder="jane@company.com"
          />
          {errors.email ? <em className="field__error">{errors.email}</em> : null}
        </label>
      </div>

      <label className="field">
        <span>Phone number (optional)</span>
        <input
          name="phone"
          type="tel"
          value={values.phone}
          onChange={update}
          aria-invalid={Boolean(errors.phone)}
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone ? <em className="field__error">{errors.phone}</em> : null}
      </label>

      <label className="field">
        <span>I&apos;m interested in</span>
        <select name="subject" value={values.subject} onChange={update}>
          <option>Consulting</option>
          <option>Training</option>
          <option>Application Development</option>
          <option>Careers</option>
          <option>Something else</option>
        </select>
      </label>

      <label className="field">
        <span>How can we help?</span>
        <textarea
          name="message"
          rows={compact ? 3 : 5}
          value={values.message}
          onChange={update}
          aria-invalid={Boolean(errors.message)}
          placeholder="Tell us about your project, timeline and team."
        />
        {errors.message ? <em className="field__error">{errors.message}</em> : null}
      </label>

      <div className="consent">
        <label className="consent__label">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={update}
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            By submitting this form and providing your phone number, you agree to receive calls,
            emails and text messages from <strong>{company.name}</strong> about your enquiry, our
            consulting services, training programs and career opportunities. Message &amp; data rates
            may apply. Message frequency varies. Reply STOP to opt out or HELP for help. We do not
            sell, share or lease your personal data to any third parties. See our{' '}
            <Link to={legal.privacyPath} target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link to={legal.termsPath} target="_blank" rel="noopener noreferrer">
              Terms of Service
            </Link>
            .{' '}
            <abbr className="consent__required" title="required">
              *
            </abbr>
          </span>
        </label>
        {errors.consent ? <em className="field__error">{errors.consent}</em> : null}
      </div>

      <input
        type="checkbox"
        name="botcheck"
        className="callback__botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="callback__foot">
        <button type="submit" className="btn btn--accent" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send response'}
        </button>
        <p className="callback__note">
          Or call us directly on <a href={company.phoneHref}>{company.phone}</a>
        </p>
      </div>

      <p
        className={`callback__status${status === 'error' ? ' callback__status--error' : ''}`}
        role="status"
      >
        {status === 'sent' &&
          'Thanks! Your request has been sent — we reply within one business day.'}
        {status === 'error' && (
          <>
            Sorry, something went wrong. Please try again or email us at{' '}
            <a href={company.emailHref}>{company.email}</a>.
          </>
        )}
      </p>
    </form>
  )
}
