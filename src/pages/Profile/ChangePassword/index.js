import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ChangePasswordForm from '../../../components/Profile/ChangePasswordForm';
import { NavbarActions } from '../../../store/modules/Navbar';

function ChangePassword() {
  const dispatch = useDispatch();
  const { setCurrentPage } = NavbarActions;
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setCurrentPage(t('menuOptions.changePassword')));
  }, [dispatch, setCurrentPage]);

  return (
    <>
      <ChangePasswordForm />
    </>
  );
}

export default ChangePassword;
