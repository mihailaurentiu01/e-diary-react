import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavbarActions } from '../../../store/modules/Navbar';
import { useEffect } from 'react';

import Breadcrumb from '../../../components/Breadcrumb';
import BreadcrumbStyled from '../../../components/Breadcrumb/Styled';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import Table from '../../../components/Table/index';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import routes from '../../../helpers/routes';

import useHttp from '../../../hooks/useHttp';
import { getCategories } from '../../../services/Api';
import { CategoryActions } from '../../../store/modules/Category';
import { SnackbarActions } from '../../../store/modules/Snackbar';

function ManageCategory() {
  const { t } = useTranslation();

  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: '#',
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: t('menuOptions.category'),
    },
    {
      id: 'creationDate',
      numeric: false,
      disablePadding: false,
      label: t('creationDate'),
    },
  ];

  const dispatch = useDispatch();
  const { setCurrentPage } = NavbarActions;

  const { status, data, error, clearError, sendRequest } = useHttp(
    getCategories,
    true
  );

  const { setCategories } = CategoryActions;
  const { setOpen } = SnackbarActions;
  const { setMessage } = SnackbarActions;
  const { setType } = SnackbarActions;

  useEffect(() => {
    if (status === 'pending') {
      dispatch(setCurrentPage(t('manageCategory')));
      sendRequest();
    }

    if (status === 'completed') {
      dispatch(setCategories(data));
    }
  }, [dispatch, setCurrentPage, sendRequest, status, setCategories, data]);

  const onEditHandler = (selected) => {
    console.log('edit', selected);
  };

  const onDeleteHandler = (selected) => {
    console.log('delete', selected);
  };

  const onRenderRow = (row) => {
    return (
      <>
        <TableCell align='left'>{row.name}</TableCell>
        <TableCell align='left'>{row.creationDate}</TableCell>
      </>
    );
  };

  if (error) {
    dispatch(setType('error'));
    dispatch(setMessage(t('errorMessages.unexpected')));
    dispatch(setOpen(true));
    clearError();

    return;
  }

  return (
    <>
      <Typography align='left' variant='h4'>
        {t('manageCategory')}
      </Typography>
      <Grid container spacing={2} justifyContent='left' sx={{ p: 0, mb: 2 }}>
        <Grid item xs={12}>
          <Breadcrumb>
            <BreadcrumbStyled
              component='p'
              to={routes.dashboard}
              label={t('menuOptions.dashboard')}
              icon={<DashboardIcon fontSize='small' />}
            />
            <BreadcrumbStyled
              component='p'
              to={routes.category.base}
              label={t('menuOptions.category')}
              icon={<CategoryIcon fontSize='small' />}
            />
          </Breadcrumb>
        </Grid>
      </Grid>

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
        <Grid container spacing={2} justifyContent='left' sx={{ p: 1 }}>
          <Grid item xs={12}>
            <Table
              headCells={headCells}
              rows={data}
              includesToolbar={true}
              isDeleteAllowed={true}
              isEditingAllowed={true}
              headTitle={t('categoryDetails')}
              onEdit={onEditHandler}
              onDelete={onDeleteHandler}
              onRenderRow={onRenderRow}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default ManageCategory;
