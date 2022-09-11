import Navbar from './Navbar';

import SnackbarCustom from './SnackbarCustom';
import { useSelector, useDispatch } from 'react-redux';
import { SnackbarActions } from '../store/modules/Snackbar';

const Layout = ({ children }) => {
  const { open, message, type } = useSelector((state) => state.Snackbar);
  const dispatch = useDispatch();

  const onHandleClose = (e, reason) => {
    dispatch(SnackbarActions.setClose(reason));
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <SnackbarCustom
        open={open}
        handleClose={onHandleClose}
        type={type}
        msg={message}
      />
    </>
  );
};

export default Layout;
