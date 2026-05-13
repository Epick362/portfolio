import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'
import { ContactForm } from '../components/ContactForm'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Kontakt | Filip Hájek' },
      { name: 'description', content: 'Kontaktujte ma priamo — odpoviem čo najskôr.' },
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  const { t } = useI18n()
  return (
    <>
      <h2>{t('contact_title')}</h2>
      <ContactForm />
    </>
  )
}
