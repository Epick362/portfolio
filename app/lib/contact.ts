import { createServerFn } from '@tanstack/react-start'

const MAX_NAME = 120
const MAX_EMAIL = 254
const MAX_MESSAGE = 4000

interface ContactInput {
  name: string
  email: string
  message: string
  token: string
}

function sanitize(s: string): string {
  return s.replace(/[\r\n\t]/g, ' ').trim()
}

export const submitContact = createServerFn({ method: 'POST' })
  .inputValidator((data: ContactInput) => data)
  .handler(async ({ data }) => {
    const name = sanitize(data.name)
    const email = sanitize(data.email)
    const message = sanitize(data.message)
    const token = data.token

    if (!name || !email || !message || !token) {
      throw new Error('Missing required fields')
    }

    if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
      throw new Error('Input too long')
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email address')
    }

    // Verify Cloudflare Turnstile
    const secretKey = process.env['TURNSTILE_SECRET_KEY']
    if (!secretKey) {
      throw new Error('Server configuration error')
    }

    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: secretKey, response: token }),
    })

    const verify = (await verifyRes.json()) as { success: boolean }
    if (!verify.success) {
      throw new Error('Bot verification failed')
    }

    // Send via Resend REST API
    const resendKey = process.env['RESEND_API_KEY']
    if (!resendKey) {
      throw new Error('Server configuration error')
    }

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: 'Portfolio <noreply@filiphajek.sk>',
        to: 'flp.hajek@gmail.com',
        reply_to: email,
        subject: `Portfolio contact: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    })

    if (!emailRes.ok) {
      throw new Error('Failed to send email')
    }

    return { success: true }
  })
