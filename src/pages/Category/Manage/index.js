import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavbarActions } from '../../../store/modules/Navbar';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
import { getCategories, deleteCategory } from '../../../services/Api';
import { CategoryActions } from '../../../store/modules/Category';
import { SnackbarActions } from '../../../store/modules/Snackbar';
import ResponsiveDialog from '../../../components/ResponsiveDialog';
import { useState } from 'react';

function ManageCategory() {
  const [openDialog, setOpenDialog] = useState(false);

  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

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
  const { setSelectedCategory } = CategoryActions;

  const { selectedCategory } = useSelector((state) => state.Category);
  const { status, data, error, clearError, sendRequest } = useHttp(
    getCategories,
    true
  );

  const {
    onUpdateStatusAwaiting,
    status: statusDelete,
    error: errorDelete,
    clearError: clearErrorDelete,
    sendRequest: sendRequestDelete,
  } = useHttp(deleteCategory);

  const { setCategories } = CategoryActions;
  const { setOpen } = SnackbarActions;
  const { setMessage } = SnackbarActions;
  const { setType } = SnackbarActions;

  useEffect(() => {
    if (status === 'pending') {
      if (statusDelete === '') {
        dispatch(setCurrentPage(t('manageCategory')));
        sendRequest();
        onUpdateStatusAwaiting();
      }
    }

    if (statusDelete === 'completed') {
      sendRequest();
      onUpdateStatusAwaiting();
    }

    if (status === 'completed') {
      dispatch(setCategories(data));
    }
  }, [
    dispatch,
    setCurrentPage,
    sendRequest,
    status,
    setCategories,
    data,
    statusDelete,
    onUpdateStatusAwaiting,
  ]);

  const onEditHandler = (id) => {
    history.push(location.pathname + '/' + id);
  };

  const onDeleteHandler = (selected) => {
    dispatch(setSelectedCategory(selected[0]));
    setOpenDialog(true);
  };

  const onDeleteConfirmHandler = () => {
    sendRequestDelete({
      id: selectedCategory.id,
    });
  };

  const onCloseDialogHandler = (e) => {
    setOpenDialog(false);
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

      {(status === 'pending' ||
        statusDelete === 'pending' ||
        (status === 'pending' && statusDelete === 'await')) && (
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

      {status === 'completed' && statusDelete === 'await' && (
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
      {openDialog && (
        <ResponsiveDialog
          open={openDialog}
          handleClose={onCloseDialogHandler}
          context={t('wantToDelete') + `"${selectedCategory?.name}"?`}
          title={t('delete')}
          optionCancel={t('no')}
          optionAgree={t('yes')}
          handleOnAgree={onDeleteConfirmHandler}
        />
      )}
    </>
  );
}

export default ManageCategory;
