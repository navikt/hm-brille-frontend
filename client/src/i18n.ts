import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  nn: {
    translation: {
      'Welcome to React': 'Welcome to React and react-i18next',
    },
  },
}

// noinspection JSIgnoredPromiseFromCall
i18n.use(initReactI18next).init({
  resources,
  lng: 'nb',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
