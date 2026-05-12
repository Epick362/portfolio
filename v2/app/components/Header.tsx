import { useI18n } from '../lib/i18n'
import type { ArticleId } from '../lib/types'

interface Props {
  onOpenArticle: (id: ArticleId) => void
}

export function Header({ onOpenArticle }: Props) {
  const { t, locale, setLocale } = useI18n()

  return (
    <>
      <button
        className="lang-toggle"
        onClick={() => setLocale(locale === 'sk' ? 'en' : 'sk')}
        aria-label="Toggle language"
      >
        {t('lang_toggle')}
      </button>

      <header id="header">
        <img
          src="/images/profile_picture.jpg"
          alt="Filip Hájek"
          className="profile-pic"
          width={120}
          height={120}
        />
        <h1>{t('name')}</h1>
        <p className="header-role">
          {t('role')},{' '}
          <a href="https://flowcode.sk" target="_blank" rel="noopener noreferrer">
            {t('at_flowcode')}
          </a>
        </p>
        <p className="header-tagline">{t('tagline')}</p>
        <nav aria-label="Main navigation">
          <ul>
            <li>
              <button className="nav-btn" onClick={() => onOpenArticle('about')}>
                {t('nav_about')}
              </button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => onOpenArticle('work')}>
                {t('nav_work')}
              </button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => onOpenArticle('contact')}>
                {t('nav_contact')}
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
