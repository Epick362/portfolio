import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'

export const Route = createFileRoute('/work')({
  head: () => ({
    meta: [
      { title: 'Práca | Filip Hájek' },
      { name: 'description', content: 'React, TypeScript, AWS, React Native — softvérový vývoj na mieru cez FlowCode.' },
    ],
  }),
  component: WorkPage,
})

function WorkPage() {
  const { t } = useI18n()
  return (
    <>
      <h2>{t('work_title')}</h2>
      <img src="/images/work.jpg" alt="" className="article-image" />
      <p>{t('work_body')}</p>
      <a
        href="https://flowcode.sk"
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        {t('work_cta')}
      </a>
    </>
  )
}
