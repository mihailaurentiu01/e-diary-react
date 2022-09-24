import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import useInput from '../../../hooks/useInput';
import useHttp from '../../../hooks/useHttp';
import { getCategories, addNote } from '../../../services/Api';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarActions } from '../../../store/modules/Snackbar';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import routes from '../../../helpers/routes';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AddNoteForm(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    sendRequest: sendRequestAddNote,
    status: statusAddNote,
    error: errorAddNote,
    clearError: clearErrorAddNote,
  } = useHttp(addNote);

  const {
    sendRequest: sendRequestGetCategories,
    status: statusGetCategories,
    data: dataCategories,
    error: errorGetCategories,
    clearError: clearErrorGetCategories,
  } = useHttp(getCategories, true);

  const { setType, setMessage, setOpen } = SnackbarActions;

  const { id: userId } = useSelector((state) => state.Auth.user);

  const {
    value: categoryValue,
    clearValue: clearCategoryNameValue,
    clearHasBeenTouched: clearCategoryNameHasBeenTouchedValue,
    onChangeValueHandler: onChangeCategoryNameHandler,
    onBlurHandler: onBlurCategoryNameHandler,
    hasBeenTouched: hasCategoryNameBeenTouched,
    isValueValid: isCategoryNameValid,
  } = useInput((val) => val.length > 0);

  const {
    value: noteTitleValue,
    clearValue: clearNoteTitleValue,
    clearHasBeenTouched: clearNoteTitleHasBeenTochedHandler,
    onChangeValueHandler: onChangeNoteTitleHandler,
    onBlurHandler: onBlurNoteTitleHandler,
    hasBeenTouched: hasNoteTitleBeenTouched,
    isValueValid: isNoteTitleValid,
  } = useInput((val) => val.length > 0);

  const {
    value: noteDescriptionValue,
    clearValue: clearNoteDescriptionValue,
    clearHasBeenTouched: clearNoteDescriptionHasBeenTouchHandler,
    onChangeValueHandler: onChangeNoteDescriptionHandler,
    onBlurHandler: onBlurNoteDescriptionHandler,
    hasBeenTouched: hasNoteDescriptionBeenTouched,
    isValueValid: isNoteDescriptionValid,
  } = useInput((val) => val.length > 0);

  useEffect(() => {
    if (statusGetCategories === 'pending') {
      sendRequestGetCategories();
    }

    if (statusAddNote === 'completed') {
      dispatch(setType('success'));
      dispatch(setMessage(t('alertMessages.successNoteAdded')));
      dispatch(setOpen(true));
    }
  }, [
    sendRequestGetCategories,
    statusGetCategories,
    statusAddNote,
    dispatch,
    setType,
    setMessage,
    setOpen,
  ]);

  const isFormValid =
    isCategoryNameValid && isNoteTitleValid && isNoteDescriptionValid;

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (isFormValid) {
      sendRequestAddNote({
        userId,
        categoryId: categoryValue,
        categoryName: dataCategories.find(
          (category) => category.id === categoryValue
        ).name,
        title: noteTitleValue,
        description: noteDescriptionValue,
        creationDate: new Date().toLocaleDateString('es'),
      });

      clearCategoryNameValue();
      clearCategoryNameHasBeenTouchedValue();
      clearNoteTitleValue();
      clearNoteTitleHasBeenTochedHandler();
      clearNoteDescriptionValue();
      clearNoteDescriptionHasBeenTouchHandler();
    }
  };

  if (errorGetCategories) {
    dispatch(setType('error'));
    dispatch(setMessage(t('errorMessages.unexpected')));
    dispatch(setOpen());
    clearErrorGetCategories();

    return;
  }

  if (errorAddNote) {
    dispatch(setType('error'));
    dispatch(setMessage(t('errorMessages.unexpected')));
    dispatch(setOpen());
    clearErrorAddNote();

    return;
  }

  return (
    <>
      <Container maxWidth='md'>
        {(statusGetCategories === 'pending' || statusAddNote === 'pending') && (
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

        <Box
          sx={{
            bgcolor: '#cfe8fc',
            flexGrow: 1,
          }}
        >
          {statusAddNote !== 'pending' && statusGetCategories !== 'pending' && (
            <Box
              component='form'
              sx={{}}
              noValidate
              autoComplete='off'
              onSubmit={onSubmitHandler}
            >
              <Grid container spacing={2} justifyContent='center' sx={{ p: 1 }}>
                <Grid item xs={12}>
                  <InputLabel id='select-category'>{t('category')}</InputLabel>
                  <Select
                    labelId='select-category'
                    id='select-note-category'
                    value={categoryValue}
                    sx={{ minWidth: '100%' }}
                    label={t('category')}
                    onChange={onChangeCategoryNameHandler}
                  >
                    {dataCategories?.map((category, index) => {
                      return (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    value={noteTitleValue}
                    error={!isNoteTitleValid && hasNoteTitleBeenTouched}
                    helperText={t('requiredField')}
                    onChange={onChangeNoteTitleHandler}
                    onBlur={onBlurNoteTitleHandler}
                    sx={{ width: { xs: 1, md: 1 } }}
                    type='text'
                    label={t('noteTitle')}
                    variant='outlined'
                    required
                  />
                </Grid>

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
          )}
        </Box>
      </Container>
    </>
  );
}

export default AddNoteForm;
