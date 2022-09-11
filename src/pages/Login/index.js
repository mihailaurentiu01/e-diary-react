import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import LoginForm from '../../components/LoginForm';
import { NavbarActions } from '../../store/modules/Navbar';

function Login() {
  const dispatch = useDispatch();

  const { setCurrentPage } = NavbarActions;
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setCurrentPage(t('login')));
  }, [setCurrentPage, dispatch]);

  return (
    <>
      <LoginForm />
    </>
  );
}

export default Login;
