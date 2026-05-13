import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { I18nProvider } from '../lib/i18n'
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
          <Outlet />
        </I18nProvider>
        <Scripts />
      </body>
    </html>
  )
}
