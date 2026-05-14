import { createRootRoute, HeadContent, Link, Outlet, Scripts, useNavigate, useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'
import { I18nProvider, useI18n } from '../lib/i18n'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import appCss from '../styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Filip Hájek' },
      { name: 'description', content: 'Software engineer and founder of FlowCode. Contract developer for companies of all sizes.' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="sk">
      <head>
        <HeadContent />
      </head>
      <body>
        <I18nProvider>
          <AppShell />
        </I18nProvider>
        <Scripts />
      </body>
    </html>
  )
}

function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const navigate = useNavigate()
  const { t } = useI18n()
  const isArticle = pathname !== '/'

  useEffect(() => {
    if (!isArticle) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') navigate({ to: '/' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isArticle, navigate])

  return (
    <div id="wrapper" className={isArticle ? 'article-active' : ''}>
      <Header />
      {isArticle ? (
        <div className="article-panel">
          <Link to="/" className="close-btn" aria-label={t('back')}>
            {t('back')}
          </Link>
          <Outlet />
        </div>
      ) : (
        <Outlet />
      )}
      <Footer />
    </div>
  )
}
