import './App.css';

import { useSelector } from 'react-redux';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import { styled, useTheme } from '@mui/material/styles';

import en from './lang/en';
import es from './lang/es';
import Layout from './components/Layout';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import { DRAWER_WIDTH as drawerWidth } from './helpers/constants';
import { Route, Switch } from 'react-router-dom';
import Welcome from './pages/Welcome';

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `0px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  })
);

function App() {
  const open = useSelector((state) => state.Navbar.isDrawerOpen);

  return (
    <Layout>
      <Main open={open}>
        <DrawerHeader />
        <Switch>
          <Route path='/' exact>
            <Welcome />
          </Route>
        </Switch>
      </Main>
    </Layout>
  );
}

export default App;
