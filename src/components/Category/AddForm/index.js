import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import useInput from '../../../hooks/useInput';
import useHttp from '../../../hooks/useHttp';
import { addCategory, updateCategory } from '../../../services/Api';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarActions } from '../../../store/modules/Snackbar';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import routes from '../../../helpers/routes';

function AddCategoryForm(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { sendRequest, status, error, clearError } = useHttp(addCategory);
  const { setType, setMessage, setOpen } = SnackbarActions;

  const {
    sendRequest: sendRequestOnEdit,
    status: statusOnEdit,
    error: errorOnEdit,
    clearError: clearErrorOnEdit,
  } = useHttp(updateCategory);

  const { id: userId } = useSelector((state) => state.Auth.user);
  const { isEditing } = props;

  const { selectedCategory } = useSelector((state) => state.Category);
  const {
    value: categoryNameValue,
    setValue: setCategoryNameValue,
    clearValue: clearCategoryNameValue,
    clearHasBeenTouched: clearCategoryNameHasBeenTouchedValue,
    onChangeValueHandler: onChangeCategoryNameHandler,
    onBlurHandler: onBlurCategoryNameHandler,
    hasBeenTouched: hasCategoryNameBeenTouched,
    isValueValid: isCategoryNameValid,
  } = useInput((val) => val.length > 0);

  useEffect(() => {
    if (status === '') {
      clearCategoryNameHasBeenTouchedValue();
      clearCategoryNameValue();
    }

    if (status === 'completed') {
      dispatch(setType('success'));
      dispatch(setMessage(t('alertMessages.successCategoryAdded')));
      dispatch(setOpen(true));
    }

    if (isEditing) {
      setCategoryNameValue(selectedCategory.name);
    }

    if (statusOnEdit === 'completed' && isEditing) {
      dispatch(setType('success'));
      dispatch(setMessage(t('alertMessages.successCategoryEdit')));
      dispatch(setOpen(true));

      history.push(routes.category.base);
    }
  }, [
    status,
    dispatch,
    setType,
    setMessage,
    setOpen,
    isEditing,
    selectedCategory,
    statusOnEdit,
  ]);

  const isFormValid = isCategoryNameValid;

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (isFormValid && !isEditing) {
      clearCategoryNameValue();
      clearCategoryNameHasBeenTouchedValue();

      sendRequest({
        userId,
        name: categoryNameValue,
        creationDate: new Date().toLocaleDateString('es'),
      });
    } else if (isFormValid && isEditing) {
      sendRequestOnEdit({
        id: selectedCategory.id,
        category: {
          name: categoryNameValue,
          creationDate: selectedCategory.creationDate,
          userId: selectedCategory.userId,
        },
      });
    }
  };

  if (error) {
    dispatch(setType('error'));
    dispatch(setMessage(t('errorMessages.unexpected')));
    dispatch(setOpen());
    clearError();

    return;
  }

  if (errorOnEdit) {
    dispatch(setType('error'));
    dispatch(setMessage(t('errorMessages.unexpected')));
    dispatch(setOpen());
    clearErrorOnEdit();

    return;
  }

  return (
    <>
      <Container maxWidth='md'>
        {(status === 'pending' || statusOnEdit === 'pending') && (
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
          {(status === '' ||
            (status === 'completed' && statusOnEdit !== 'completed')) &&
            (statusOnEdit === '' ||
              (statusOnEdit === 'completed' && status !== 'completed')) && (
              <Box
                component='form'
                sx={{}}
                noValidate
                autoComplete='off'
                onSubmit={onSubmitHandler}
              >
                <Grid
                  container
                  spacing={2}
                  justifyContent='center'
                  sx={{ p: 1 }}
                >
                  <Grid item xs={12}>
                    <TextField
                      value={categoryNameValue}
                      error={!isCategoryNameValid && hasCategoryNameBeenTouched}
                      helperText={t('requiredField')}
                      onChange={onChangeCategoryNameHandler}
                      onBlur={onBlurCategoryNameHandler}
                      sx={{ width: { xs: 1, md: 1 } }}
                      type='email'
                      label={t('categoryName')}
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

export default AddCategoryForm;
