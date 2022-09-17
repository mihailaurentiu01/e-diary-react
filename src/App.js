import './App.css';

import { useSelector } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { styled } from '@mui/material/styles';

import en from './lang/en';
import es from './lang/es';
import Layout from './components/Layout';

import { DRAWER_WIDTH as drawerWidth } from './helpers/constants';
import { Route, Switch } from 'react-router-dom';
import Welcome from './pages/Welcome';
import SignUp from './pages/Signup';

import routes from './helpers/routes';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddCategory from './pages/Category/Add';
import ManageCategory from './pages/Category/Manage';

import { Redirect } from 'react-router-dom';

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

function PrivateRoute({ component: Component, ...rest }) {
  const { isLoggedIn } = useSelector((state) => state.Auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: routes.welcome,
            }}
          />
        )
      }
    />
  );
}

function App() {
  const open = useSelector((state) => state.Navbar.isDrawerOpen);

  return (
    <Layout>
      <Main open={open}>
        <DrawerHeader />
        <Switch>
          <Route path={routes.welcome} exact>
            <Welcome />
          </Route>
          <Route path={routes.signup}>
            <SignUp />
          </Route>
          <Route path={routes.login}>
            <Login />
          </Route>
          <PrivateRoute path={routes.dashboard} exact component={Dashboard} />
          <PrivateRoute
            path={routes.category.add}
            exact
            component={AddCategory}
          />
          <PrivateRoute
            path={routes.category.base}
            exact
            component={ManageCategory}
          />
          <PrivateRoute path={routes.category.edit} component={AddCategory} />
        </Switch>
      </Main>
    </Layout>
  );
}

export default App;
