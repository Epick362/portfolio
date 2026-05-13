import { useI18n } from '../lib/i18n'
import { ContactForm } from './ContactForm'
import type { ArticleId } from '../lib/types'

interface Props {
  article: ArticleId | null
  isActive: boolean
  onClose: () => void
}

export function ArticleModal({ article, isActive, onClose }: Props) {
  const { t } = useI18n()

  return (
    <div className={`article-overlay${isActive ? ' active' : ''}`} role="dialog" aria-modal="true">
      <div className="article-backdrop" onClick={onClose} aria-hidden="true" />

      <div className="article-panel">
        {article && (
          <>
            <button className="close-btn" onClick={onClose} aria-label={t('close')}>
              {t('close')}
            </button>

            <h2>{t(`${article}_title` as Parameters<typeof t>[0])}</h2>

            {article === 'about' && (
              <>
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
            )}

            {article === 'work' && (
              <>
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
            )}

            {article === 'contact' && <ContactForm />}
          </>
        )}
      </div>
    </div>
  )
}
