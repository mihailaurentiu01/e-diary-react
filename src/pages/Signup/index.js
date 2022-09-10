import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import SignupForm from '../../components/SignupForm';
import { NavbarActions } from '../../store/modules/Navbar';

function SignUp() {
  const dispatch = useDispatch();
  const { setCurrentPage } = NavbarActions;
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setCurrentPage(t('signup')));
  }, [dispatch, setCurrentPage]);

  return (
    <>
      <SignupForm />
    </>
  );
}

export default SignUp;
