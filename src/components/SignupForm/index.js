import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

import { useTranslation } from 'react-i18next';

import useInput from '../../hooks/useInput';
import { useState } from 'react';

function SignupForm() {
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(false);

  const { t } = useTranslation();

  const {
    value: firstNameValue,
    onChangeValueHandler: onChangeFirstNameHandler,
    onBlurHandler: onBlurFirstNameHandler,
    hasBeenTouched: hasFirstNameBeenTouched,
    isValueValid: isFirstNameValid,
  } = useInput((val) => val.length > 0);

  const {
    value: lastNameValue,
    onChangeValueHandler: onChangeLastNameHandler,
    onBlurHandler: onBlurLastNameHandler,
    hasBeenTouched: hasLastNameBeenTouched,
    isValueValid: isLastNameValid,
  } = useInput((val) => val.length > 0);

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
  } = useInput((val) => val.length > 7);

  const {
    value: confirmPasswordValue,
    onChangeValueHandler: onChangeConfirmPasswordHandler,
    onBlurHandler: onBlurConfirmPasswordHandler,
    hasBeenTouched: hasConfirmPasswordBeenTouched,
    isValueValid: isConfirmPasswordValid,
  } = useInput((val) => val.length > 7);

  const onCustomChangePasswordHandler = (e) => {
    onChangePasswordHandler(e);
    setIsPasswordsMatch(e.target.value === confirmPasswordValue);
  };

  const onCustomChangeConfirmPasswordHandler = (e) => {
    onChangeConfirmPasswordHandler(e);
    setIsPasswordsMatch(e.target.value === passwordValue);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const isFormValid =
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isPasswordsMatch;

  return (
    <>
      <Container maxWidth='md'>
        <Box
          sx={{
            bgcolor: '#cfe8fc',
            flexGrow: 1,
          }}
        >
          <Typography align='center' variant='h2'>
            {t('userRegistration')}
          </Typography>

          <Box
            component='form'
            sx={{}}
            noValidate
            autoComplete='off'
            onSubmit={onSubmitHandler}
          >
            <Grid container spacing={2} justifyContent='center' sx={{ p: 1 }}>
              <Grid item xs={6}>
                <TextField
                  value={firstNameValue}
                  error={!isFirstNameValid && hasFirstNameBeenTouched}
                  helperText={t('requiredField')}
                  onChange={onChangeFirstNameHandler}
                  onBlur={onBlurFirstNameHandler}
                  sx={{ width: { xs: 1, md: 1 } }}
                  type='text'
                  label={t('signupForm.firstName')}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={lastNameValue}
                  error={!isLastNameValid && hasLastNameBeenTouched}
                  helperText={t('requiredField')}
                  onChange={onChangeLastNameHandler}
                  onBlur={onBlurLastNameHandler}
                  sx={{ width: { xs: 1, md: 1 } }}
                  type='text'
                  label={t('signupForm.lastName')}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={emailValue}
                  error={!isEmailValid && hasEmailBeenTouched}
                  helperText={t('validMail')}
                  onChange={onChangeEmailHandler}
                  onBlur={onBlurEmailHandler}
                  sx={{ width: { xs: 1, md: 1 } }}
                  type='email'
                  label={t('signupForm.email')}
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
                  {t('signupForm.createAccount')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SignupForm;
