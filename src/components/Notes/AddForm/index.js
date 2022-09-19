import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import useInput from '../../../hooks/useInput';
import useHttp from '../../../hooks/useHttp';
import { getCategories } from '../../../services/Api';
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
  const history = useHistory();

  const {
    sendRequest: sendRequestGetCategories,
    status: statusGetCategories,
    data: dataCategories,
    error: errorGetCategories,
    clearError: clearErrorGetCategories,
  } = useHttp(getCategories);

  const { setType, setMessage, setOpen } = SnackbarActions;

  const {
    value: categoryValue,

    clearValue: clearCategoryNameValue,
    clearHasBeenTouched: clearCategoryNameHasBeenTouchedValue,
    onChangeValueHandler: onChangeCategoryNameHandler,
    onBlurHandler: onBlurCategoryNameHandler,
    hasBeenTouched: hasCategoryNameBeenTouched,
    isValueValid: isCategoryNameValid,
  } = useInput((val) => val.length > 0);

  useEffect(() => {
    sendRequestGetCategories();
  }, [sendRequestGetCategories]);

  const isFormValid = isCategoryNameValid;

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (isFormValid) {
      console.log(categoryValue);
    }
  };

  return (
    <>
      <Container maxWidth='md'>
        {statusGetCategories === 'pending' && (
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
          {statusGetCategories === '' ||
            (statusGetCategories === 'completed' && (
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
                    <InputLabel id='select-category'>
                      {t('category')}
                    </InputLabel>
                    <Select
                      labelId='select-category'
                      id='select-note-category'
                      value={categoryValue}
                      label={t('category')}
                      onChange={onChangeCategoryNameHandler}
                    >
                      {dataCategories.map((category, index) => {
                        return (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
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
            ))}
        </Box>
      </Container>
    </>
  );
}

export default AddNoteForm;
