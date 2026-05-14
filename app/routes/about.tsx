import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'O mne | Filip Hájek' },
      { name: 'description', content: 'Softvérový inžinier a zakladateľ FlowCode, kontraktný vývojár pre spoločnosti od startupov až po nadnárodné korporácie.' },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  const { t } = useI18n()
  return (
    <>
      <h2>{t('about_title')}</h2>
      <img src="/images/about.jpg" alt="" className="article-image" />
      <p>{t('about_body')}</p>
      <a
        href="https://flowcode.sk"
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        {t('visit_flowcode')}
      </a>
    </>
  )
}
