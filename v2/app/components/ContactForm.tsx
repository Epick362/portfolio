import { Turnstile } from '@marsidev/react-turnstile'
import { useState } from 'react'
import { submitContact } from '../lib/contact'
import { useI18n } from '../lib/i18n'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const { t } = useI18n()
  const [status, setStatus] = useState<Status>('idle')
  const [token, setToken] = useState<string>('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token || status === 'loading') return

    setStatus('loading')
    try {
      await submitContact({ data: { name, email, message, token } })
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
      setToken('')
    } catch {
      setStatus('error')
    }
  }

  function handleReset() {
    setStatus('idle')
    setName('')
    setEmail('')
    setMessage('')
  }

  if (status === 'success') {
    return <p className="form-success">{t('contact_success')}</p>
  }

  const siteKey = import.meta.env['VITE_TURNSTILE_SITE_KEY'] ?? '1x00000000000000000000AA'

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-fields">
        <div className="form-field-half">
          <label htmlFor="contact-name">{t('contact_name')}</label>
          <input
            id="contact-name"
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
        <div className="form-field-half">
          <label htmlFor="contact-email">{t('contact_email')}</label>
          <input
            id="contact-email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="form-field">
          <label htmlFor="contact-message">{t('contact_message')}</label>
          <textarea
            id="contact-message"
            className="form-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
          />
        </div>
      </div>

      <div className="turnstile-wrap">
        <Turnstile
          siteKey={siteKey}
          onSuccess={(t) => setToken(t)}
          onExpire={() => setToken('')}
          onError={() => setToken('')}
        />
      </div>

      {status === 'error' && <p className="form-error">{t('contact_error')}</p>}

      <ul className="form-actions">
        <li>
          <button
            type="submit"
            className="btn-primary"
            disabled={!token || status === 'loading'}
          >
            {status === 'loading' ? t('contact_verifying') : t('contact_send')}
          </button>
        </li>
        <li>
          <button type="button" className="btn-secondary" onClick={handleReset}>
            {t('contact_reset')}
          </button>
        </li>
      </ul>
    </form>
  )
}
