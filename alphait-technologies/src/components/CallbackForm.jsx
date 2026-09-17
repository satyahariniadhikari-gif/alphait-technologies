import { useState } from 'react'
import { company } from '../data/site.js'

const EMPTY = { name: '', email: '', phone: '', subject: 'Consulting', message: '' }

export default function CallbackForm({ compact = false }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function validate() {
    const next = {}
    if (!values.name.trim()) next.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = 'Please enter a valid email address.'
    if (!values.phone.trim()) next.phone = 'A phone number helps us call you back.'
    if (values.message.trim().length < 10)
      next.message = 'Please add a little more detail (10+ characters).'
    return next
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // No backend is wired up yet — hand the enquiry to the visitor's mail client.
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Interested in: ${values.subject}`,
      '',
      values.message,
    ].join('\n')

    window.location.href = `${company.emailHref}?subject=${encodeURIComponent(
      `Call back request — ${values.subject}`,
    )}&body=${encodeURIComponent(body)}`

    setSent(true)
    setValues(EMPTY)
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

      <div className="callback__row">
        <label className="field">
          <span>Phone number</span>
          <input
            name="phone"
            type="tel"
            value={values.phone}
            onChange={update}
            aria-invalid={Boolean(errors.phone)}
            placeholder="+1 (___) ___-____"
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
      </div>

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

      <div className="callback__foot">
        <button type="submit" className="btn btn--accent">
          Request a call back
        </button>
        <p className="callback__note">
          Or call us directly on <a href={company.phoneHref}>{company.phone}</a>
        </p>
      </div>

      <p className="callback__status" role="status">
        {sent ? 'Thanks! Your email client should open with the details — we reply within one business day.' : ''}
      </p>
    </form>
  )
}
