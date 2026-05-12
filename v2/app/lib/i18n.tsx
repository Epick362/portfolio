import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { sk, type TranslationKey } from './translations/sk'
import { en } from './translations/en'

export type Locale = 'sk' | 'en'

const translations: Record<Locale, typeof sk> = { sk, en }

interface I18nContext {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContext | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  // Default 'sk' on server; hydrate from localStorage on client to avoid mismatch
  const [locale, setLocaleState] = useState<Locale>('sk')

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null
    if (saved === 'sk' || saved === 'en') setLocaleState(saved)
  }, [])

  function setLocale(l: Locale) {
    setLocaleState(l)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('locale', l)
    }
  }

  function t(key: TranslationKey): string {
    return translations[locale][key] ?? translations.sk[key] ?? key
  }

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
