import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useTranslation } from 'react-i18next';

import useInput from '../../hooks/useInput';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../helpers/routes';

import { useHistory } from 'react-router-dom';

import { signUpUser } from '../../services/Api';
import useHttp from '../../hooks/useHttp';

function LoginForm() {
  const { t } = useTranslation();

  const { sendRequest, status, error, clearError } = useHttp(null);

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

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
