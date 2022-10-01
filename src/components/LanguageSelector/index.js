import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

import styles from './LanguageSelector.module.css';
import { useState } from 'react';

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    setSelectedLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel className={styles['input-white']} id='select-language'>
          {t('language')}
        </InputLabel>
        <Select
          className={styles['input-white']}
          labelId='select-language'
          id='demo-simple-select'
          value={selectedLanguage}
          label={t('language')}
          onChange={handleChange}
        >
          <MenuItem value={'en'}>{t('english')}</MenuItem>
          <MenuItem value={'es'}>{t('spanish')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
