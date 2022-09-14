import React from 'react';
import { useEffect } from 'react';
import { NavbarActions } from '../../store/modules/Navbar';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const dispatch = useDispatch();
  const { setCurrentPage } = NavbarActions;
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setCurrentPage(t('menuOptions.dashboard')));
  }, [dispatch, setCurrentPage]);

  return <>Dashboard</>;
}

export default Dashboard;
