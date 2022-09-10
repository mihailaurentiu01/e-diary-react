import './App.css';

import { useSelector } from 'react-redux';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

import en from './lang/en';
import es from './lang/es';

import Button from '@mui/material/Button';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  const msg = useSelector((state) => state.Auth.sample);
  const { t } = useTranslation();

  return <Button variant='outlined'>{t('download')}</Button>;
}

export default App;
