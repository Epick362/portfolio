import { Link } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'

export function Header() {
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
        <div className="header-line" />
        <div className="header-card">
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
                <Link to="/about" className="nav-btn">
                  {t('nav_about')}
                </Link>
              </li>
              <li>
                <Link to="/work" className="nav-btn">
                  {t('nav_work')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-btn">
                  {t('nav_contact')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
