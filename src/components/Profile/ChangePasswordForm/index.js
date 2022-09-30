import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useTranslation } from 'react-i18next';

import useInput from '../../../hooks/useInput';
import { useEffect, useState } from 'react';

import { updateUserPassword } from '../../../services/Api';
import useHttp from '../../../hooks/useHttp';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarActions } from '../../../store/modules/Snackbar';

function ChangePasswordForm() {
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(false);
  const [isCurrentPasswordMatch, setIsCurrentPasswordMatch] = useState(false);

  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { sendRequest, status, error, clearError } =
    useHttp(updateUserPassword);

  const { setOpen } = SnackbarActions;
  const { setMessage } = SnackbarActions;
  const { setType } = SnackbarActions;

  const onHandleOpen = (e) => {
    dispatch(setOpen());
  };

  useEffect(() => {
    if (status === 'completed') {
      dispatch(setType('success'));
      dispatch(setMessage(t('alertMessages.successPasswordChanged')));
      dispatch(setOpen(true));
    }
  }, [status, dispatch, setType, setMessage, setOpen]);

  const { user } = useSelector((state) => state.Auth);

  const {
    value: passwordValue,
    clearValue: onClearPasswordValue,
    onChangeValueHandler: onChangePasswordHandler,
    onBlurHandler: onBlurPasswordHandler,
    hasBeenTouched: hasPasswordBeenTouched,
    isValueValid: isPasswordValid,
  } = useInput((val) => val.length > 7);

  const {
    value: currentPasswordvalue,
    clearValue: onClearCurrentPasswordValue,
    onChangeValueHandler: onChangeCurrrentPasswordHandler,
    onBlurHandler: onBlurCurrrentPasswordHandler,
    hasBeenTouched: hasCurrrentPasswordBeenTouched,
    isValueValid: isCurrrentPasswordValid,
  } = useInput((val) => val.length > 7);

  const {
    value: confirmPasswordValue,
    clearValue: onClearConfirmPasswordValue,
    onChangeValueHandler: onChangeConfirmPasswordHandler,
    onBlurHandler: onBlurConfirmPasswordHandler,
    hasBeenTouched: hasConfirmPasswordBeenTouched,
    isValueValid: isConfirmPasswordValid,
  } = useInput((val) => val.length > 7);

  const onCustomChangePasswordHandler = (e) => {
    onChangePasswordHandler(e);
    setIsPasswordsMatch(e.target.value === confirmPasswordValue);
  };

  const onCompareCurrentPasswordHandler = (e) => {
    onChangeCurrrentPasswordHandler(e);
    setIsCurrentPasswordMatch(e.target.value === user.password);
  };

  const onCustomChangeConfirmPasswordHandler = (e) => {
    onChangeConfirmPasswordHandler(e);
    setIsPasswordsMatch(e.target.value === passwordValue);
  };

  const isFormValid =
    isPasswordValid &&
    isConfirmPasswordValid &&
    isPasswordsMatch &&
    isCurrrentPasswordValid &&
    isCurrentPasswordMatch;

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (isFormValid) {
      sendRequest({
        id: user.id,
        user: {
          ...user,
          password: confirmPasswordValue,
        },
      });

      onClearCurrentPasswordValue();
      onClearPasswordValue();
      onClearConfirmPasswordValue();
    }
  };

  if (error) {
    dispatch(setType('error'));
    dispatch(setMessage(t('errorMessages.unexpected')));
    onHandleOpen(null);
    clearError();

    return;
  }

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
              {t('menuOptions.changePassword')}
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
                    value={currentPasswordvalue}
                    error={
                      (!isCurrrentPasswordValid &&
                        hasCurrrentPasswordBeenTouched) ||
                      (!isCurrentPasswordMatch &&
                        hasCurrrentPasswordBeenTouched)
                    }
                    helperText={t('currentPassword')}
                    onChange={onCompareCurrentPasswordHandler}
                    onBlur={onBlurCurrrentPasswordHandler}
                    sx={{ width: { xs: 1, md: 1 } }}
                    type='password'
                    label={t('currentPassword')}
                    variant='outlined'
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    value={passwordValue}
                    error={
                      (!isPasswordValid || !isPasswordsMatch) &&
                      hasPasswordBeenTouched
                    }
                    helperText={t('passwordValid')}
                    onChange={onCustomChangePasswordHandler}
                    onBlur={onBlurPasswordHandler}
                    sx={{ width: { xs: 1, md: 1 } }}
                    type='password'
                    label={t('signupForm.password')}
                    variant='outlined'
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    value={confirmPasswordValue}
                    error={
                      (!isConfirmPasswordValid || !isPasswordsMatch) &&
                      hasConfirmPasswordBeenTouched
                    }
                    onChange={onCustomChangeConfirmPasswordHandler}
                    onBlur={onBlurConfirmPasswordHandler}
                    sx={{ width: { xs: 1, md: 1 } }}
                    type='password'
                    label={t('signupForm.confirmPassword')}
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
                    {t('menuOptions.changePassword')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
}

export default ChangePasswordForm;
