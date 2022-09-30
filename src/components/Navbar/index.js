import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import NotesIcon from '@mui/icons-material/Notes';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import { useDispatch, useSelector } from 'react-redux';
import { NavbarActions } from '../../store/modules/Navbar';
import { AuthActions } from '../../store/modules/Auth';

import { DRAWER_WIDTH as drawerWidth } from '../../helpers/constants';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import styles from './Navbar.module.css';
import routes from '../../helpers/routes';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();

  const [openCollapsedMenuCategory, setOpenCollapsedMenuCategory] =
    useState(false);
  const [openCollapsedMenuNotes, setOpenCollapsedMenuNotes] = useState(false);

  const { t } = useTranslation();

  const open = useSelector((state) => state.Navbar.isDrawerOpen);
  const currentPage = useSelector((state) => state.Navbar.currentPage);
  const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);

  const handleDrawerOpen = () => {
    dispatch(NavbarActions.setDrawerIsOpen(true));
  };

  const handleDrawerClose = () => {
    dispatch(NavbarActions.setDrawerIsOpen(false));
  };

  const onOpenCollapsedMenuCategoryHandler = (e) => {
    setOpenCollapsedMenuCategory((prevState) => {
      return !prevState;
    });
  };

  const onLogoutHandler = (e) => {
    dispatch(AuthActions.setIsLoggedIn(false));
    history.replace(routes.login);
  };

  const onOpenCollapsedMenuNotesHandler = (e) => {
    setOpenCollapsedMenuNotes((prevState) => {
      return !prevState;
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            {currentPage}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {!isLoggedIn && (
          <List>
            <ListItem disablePadding>
              <NavLink to={routes.login}>
                <ListItemButton>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('login')} />
                </ListItemButton>
              </NavLink>
            </ListItem>
            <ListItem disablePadding>
              <NavLink to={routes.signup}>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>

                  <ListItemText primary={t('signup')} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          </List>
        )}

        {isLoggedIn && (
          <List>
            <ListItem disablePadding>
              <NavLink to={routes.dashboard}>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>

                  <ListItemText primary={t('menuOptions.dashboard')} />
                </ListItemButton>
              </NavLink>
            </ListItem>

            <ListItemButton onClick={onOpenCollapsedMenuCategoryHandler}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={t('menuOptions.category')} />
              {openCollapsedMenuCategory ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse
              in={openCollapsedMenuCategory}
              timeout='auto'
              unmountOnExit
            >
              <List component='div' disablePadding>
                <NavLink to={routes.category.add}>
                  <ListItemButton sx={{ pl: 9 }}>
                    <ListItemText primary={t('menuOptions.add')} />
                  </ListItemButton>
                </NavLink>

                <NavLink to={routes.category.base}>
                  <ListItemButton sx={{ pl: 9 }}>
                    <ListItemText primary={t('menuOptions.manage')} />
                  </ListItemButton>
                </NavLink>
              </List>
            </Collapse>

            <ListItemButton onClick={onOpenCollapsedMenuNotesHandler}>
              <ListItemIcon>
                <NotesIcon />
              </ListItemIcon>
              <ListItemText primary={t('menuOptions.notes')} />
              {openCollapsedMenuNotes ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openCollapsedMenuNotes} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <NavLink to={routes.notes.add}>
                  <ListItemButton sx={{ pl: 9 }}>
                    <ListItemText primary={t('menuOptions.add')} />
                  </ListItemButton>
                </NavLink>

                <NavLink to={routes.notes.base}>
                  <ListItemButton sx={{ pl: 9 }}>
                    <ListItemText primary={t('menuOptions.manage')} />
                  </ListItemButton>
                </NavLink>
              </List>
            </Collapse>

            <Divider />

            <ListItem disablePadding>
              <NavLink to={routes.profile.changePassword}>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>

                  <ListItemText primary={t('menuOptions.changePassword')} />
                </ListItemButton>
              </NavLink>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={onLogoutHandler}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>

                <ListItemText primary={t('menuOptions.logout')} />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </Drawer>
    </Box>
  );
}
