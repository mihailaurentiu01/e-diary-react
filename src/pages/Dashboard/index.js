import { useEffect } from 'react';
import { NavbarActions } from '../../store/modules/Navbar';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { getCategories } from '../../services/Api';
import useHttp from '../../hooks/useHttp';
import { SnackbarActions } from '../../store/modules/Snackbar';
import { getNotes } from '../../services/Api';
import { Link } from 'react-router-dom';
import routes from '../../helpers/routes';

function Dashboard() {
  const dispatch = useDispatch();
  const { setCurrentPage } = NavbarActions;
  const { t } = useTranslation();

  const { setType, setMessage, setOpen } = SnackbarActions;

  const {
    sendRequest: sendRequestGetCategories,
    status: statusGetCategories,
    data: categories,
    error: errorGetCategories,
    clearError: clearErrorGetCategories,
  } = useHttp(getCategories);

  const {
    sendRequest: sendRequestGetNotes,
    status: statusGetNotes,
    data: notes,
    error: errorGetNotes,
    clearError: clearErrorGetNotes,
  } = useHttp(getNotes);

  useEffect(() => {
    dispatch(setCurrentPage(t('menuOptions.dashboard')));

    sendRequestGetCategories();
    sendRequestGetNotes();
  }, [dispatch, setCurrentPage, sendRequestGetCategories, sendRequestGetNotes]);

  if (errorGetCategories) {
    dispatch(setType('error'));
    dispatch(setMessage(t('errorMessages.unexpected')));
    dispatch(setOpen());
    clearErrorGetCategories();

    return;
  }

  if (errorGetNotes) {
    dispatch(setType('error'));
    dispatch(setMessage(t('errorMessages.unexpected')));
    dispatch(setOpen());
    clearErrorGetNotes();

    return;
  }

  return (
    <>
      <Container maxWidth='md'>
        {(statusGetCategories === 'pending' ||
          statusGetNotes === 'pending') && (
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

        {(statusGetCategories === '' ||
          (statusGetCategories === 'completed' &&
            (statusGetNotes === '' || statusGetNotes === 'completed'))) && (
          <Box>
            <Typography align='center' variant='h2'>
              {t('menuOptions.dashboard')}
            </Typography>

            <Stack spacing={4} alignItems='center'>
              <Stack direction='row' spacing={4}>
                <Link to={routes.category.base}>
                  <Chip
                    label={
                      t('menuOptions.category') + ': ' + categories?.length
                    }
                    size='medium'
                    clickable={true}
                    color='primary'
                  />
                </Link>
                <Link to={routes.notes.base}>
                  <Chip
                    label={t('menuOptions.notes') + ': ' + notes?.length}
                    size='medium'
                    clickable={true}
                    color='success'
                  />
                </Link>
              </Stack>
            </Stack>
          </Box>
        )}
      </Container>
    </>
  );
}

export default Dashboard;
