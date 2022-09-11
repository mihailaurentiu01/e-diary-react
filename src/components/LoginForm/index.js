import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useTranslation } from 'react-i18next';

import useInput from '../../hooks/useInput';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../helpers/routes';

import { useHistory } from 'react-router-dom';

import { getAllUsers } from '../../services/Api';
import useHttp from '../../hooks/useHttp';
import { SnackbarActions } from '../../store/modules/Snackbar';
import { AuthActions } from '../../store/modules/Auth';

import { useDispatch } from 'react-redux';

function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { sendRequest, status, error, clearError, data } = useHttp(
    getAllUsers,
    true
  );

  const { setOpen } = SnackbarActions;
  const { setMessage } = SnackbarActions;
  const { setType } = SnackbarActions;
  const { setUser } = AuthActions;
  const { setIsLoggedIn } = AuthActions;

  const {
    value: emailValue,
    onChangeValueHandler: onChangeEmailHandler,
    onBlurHandler: onBlurEmailHandler,
    hasBeenTouched: hasEmailBeenTouched,
    isValueValid: isEmailValid,
  } = useInput((val) =>
    val
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  );

  const {
    value: passwordValue,
    onChangeValueHandler: onChangePasswordHandler,
    onBlurHandler: onBlurPasswordHandler,
    hasBeenTouched: hasPasswordBeenTouched,
    isValueValid: isPasswordValid,
  } = useInput((val) => val.length > 0);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (isFormValid) {
      if (data) {
        const foundEmailIndex = data.findIndex(
          (item) => item.email === emailValue
        );

        if (foundEmailIndex > -1) {
          const doPasswordsMatch =
            data[foundEmailIndex].password === passwordValue;

          if (doPasswordsMatch) {
            // Login
            dispatch(setUser(data[foundEmailIndex]));
            dispatch(setIsLoggedIn(true));

            history.replace(routes.dashboard);
          } else {
            dispatch(setType('error'));
            dispatch(setMessage(t('errorMessages.unmatchedData')));
            dispatch(setOpen(true));
          }
        } else {
          dispatch(setType('error'));
          dispatch(setMessage(t('errorMessages.emailDoesntExist')));
          dispatch(setOpen(true));
        }
      }
    }
  };

  if (error) {
    dispatch(setType('error'));
    dispatch(setMessage(t('errorMessages.unexpected')));
    dispatch(setOpen(true));
    clearError();

    return;
  }

  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <>
      <Container maxWidth='md'>
        {status === 'pending' && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {(status === '' || status === 'completed') && (
          <Box
            sx={{
              bgcolor: '#cfe8fc',
              flexGrow: 1,
            }}
          >
            <Typography align='center' variant='h2'>
              {t('login')}
            </Typography>

            <Box
              component='form'
              sx={{}}
              noValidate
              autoComplete='off'
              onSubmit={onSubmitHandler}
            >
              <Grid container spacing={2} justifyContent='center' sx={{ p: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    value={emailValue}
                    error={!isEmailValid && hasEmailBeenTouched}
                    onChange={onChangeEmailHandler}
                    onBlur={onBlurEmailHandler}
                    sx={{ width: { xs: 1, md: 1 } }}
                    type='email'
                    label={t('signupForm.email')}
                    variant='outlined'
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={passwordValue}
                    error={!isPasswordValid && hasPasswordBeenTouched}
                    onChange={onChangePasswordHandler}
                    onBlur={onBlurPasswordHandler}
                    sx={{ width: { xs: 1, md: 1 } }}
                    type='password'
                    label={t('signupForm.password')}
                    variant='outlined'
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={!isFormValid}
                    type='submit'
                    sx={{ width: 1 }}
                    variant='contained'
                  >
                    {t('login')}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Link to={routes.signup}>
                    <Button sx={{ width: 1 }} variant='outlined'>
                      {t('goToSignup')}
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
}

export default LoginForm;
