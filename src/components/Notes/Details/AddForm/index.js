import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { SnackbarActions } from '../../../../store/modules/Snackbar';

import useInput from '../../../../hooks/useInput';
import useHttp from '../../../../hooks/useHttp';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import { addNoteDetails } from '../../../../services/Api';

function AddNoteDetailsForm(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { onNewNoteAdded } = props;

  const {
    value: noteDescriptionValue,
    clearValue: clearNoteDescriptionValue,
    clearHasBeenTouched: clearNoteDescriptionHasBeenTouchHandler,
    onChangeValueHandler: onChangeNoteDescriptionHandler,
    onBlurHandler: onBlurNoteDescriptionHandler,
    hasBeenTouched: hasNoteDescriptionBeenTouched,
    isValueValid: isNoteDescriptionValid,
  } = useInput((val) => val.length > 0);

  const isFormValid = isNoteDescriptionValid;

  const { selectedNote } = useSelector((state) => state.Note);

  const { status, error, clearError, sendRequest } = useHttp(addNoteDetails);
  const { setType, setMessage, setOpen } = SnackbarActions;

  useEffect(() => {
    if (status === 'completed') {
      dispatch(setType('success'));
      dispatch(setMessage(t('alertMessages.successNoteDetailsAdded')));
      dispatch(setOpen(true));
      onNewNoteAdded();
    }
  }, [status, onNewNoteAdded]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (isFormValid) {
      sendRequest({
        noteId: selectedNote.id,
        creationDate: new Date().toLocaleDateString('es'),
        noteDetails: noteDescriptionValue,
        userId: selectedNote.userId,
      });

      clearNoteDescriptionValue();
      clearNoteDescriptionHasBeenTouchHandler();
    }
  };

  if (error) {
    dispatch(setType('error'));
    dispatch(setMessage(t('errorMessages.unexpected')));
    dispatch(setOpen());
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
              flexGrow: 1,
            }}
          >
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
                    value={noteDescriptionValue}
                    error={
                      !isNoteDescriptionValid && hasNoteDescriptionBeenTouched
                    }
                    helperText={t('requiredField')}
                    onChange={onChangeNoteDescriptionHandler}
                    onBlur={onBlurNoteDescriptionHandler}
                    sx={{ width: { xs: 1, md: 1 } }}
                    type='text'
                    rows={3}
                    multiline
                    label={t('noteDescription')}
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
                    {t('submit')}
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

export default AddNoteDetailsForm;
