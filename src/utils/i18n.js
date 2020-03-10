// Initialisation du moteur de traduction
// Détecte la langue du navigateur
import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      // order and from where user language should be detected
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],

      // keys or params to lookup language from
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',

      // cache user language on
      caches: ['localStorage', 'cookie'],
      excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

      // optional htmlTag with lang attribute, the default is:
      htmlTag: document.documentElement,
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true
    },
  })

export default i18n