import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import nb from './resources/nb_translation.json'
import nn from './resources/nn_translation.json'

// noinspection JSIgnoredPromiseFromCall
i18n.use(initReactI18next).init({
  debug: process.env.NODE_ENV === 'development',
  resources: {
    nb: {
      translation: nb,
    },
    nn: {
      translation: nn,
    },
  },
  lng: 'nb',
  fallbackLng: false,
  supportedLngs: ['nb', 'nn'],
  fallbackNS: 'App',
  keySeparator: false,
  nsSeparator: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
