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
import NotesIcon from '@mui/icons-material/Notes';
import Table from '../../../components/Table/index';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import routes from '../../../helpers/routes';

import useHttp from '../../../hooks/useHttp';
import { getNotes } from '../../../services/Api';
import { CategoryActions } from '../../../store/modules/Category';
import { SnackbarActions } from '../../../store/modules/Snackbar';
import ResponsiveDialog from '../../../components/ResponsiveDialog';
import { useState } from 'react';

function ManageNotes() {
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
      id: 'title',
      numeric: false,
      disablePadding: false,
      label: t('title'),
    },
    {
      id: 'categoryName',
      numeric: false,
      disablePadding: false,
      label: t('category'),
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

  const {
    status: statusGetNotes,
    data: allNotes,
    error: errorGetNotes,
    clearError: clearErrorGetNotes,
    sendRequest: sendRequestGetNotes,
  } = useHttp(getNotes, true);

  const { setCategories } = CategoryActions;
  const { setOpen } = SnackbarActions;
  const { setMessage } = SnackbarActions;
  const { setType } = SnackbarActions;

  useEffect(() => {
    if (statusGetNotes === 'pending') {
      sendRequestGetNotes();
    }

    dispatch(setCurrentPage(t('manageNotes')));
  }, [dispatch, setCurrentPage]);

  const onDeleteHandler = (selected) => {
    setOpenDialog(true);
  };

  const onDeleteConfirmHandler = () => {
    console.log('delete note');
  };

  const onCloseDialogHandler = (e) => {
    setOpenDialog(false);
  };

  const onRenderRow = (row) => {
    return (
      <>
        <TableCell align='left'>{row.title}</TableCell>
        <TableCell align='left'>{row.categoryName}</TableCell>
        <TableCell align='left'>{row.creationDate}</TableCell>
      </>
    );
  };

  if (errorGetNotes) {
    dispatch(setType('error'));
    dispatch(setMessage(t('errorMessages.unexpected')));
    dispatch(setOpen(true));
    clearErrorGetNotes();

    return;
  }

  return (
    <>
      <Typography align='left' variant='h4'>
        {t('manageNotes')}
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
              to={routes.notes.base}
              label={t('menuOptions.notes')}
              icon={<NotesIcon fontSize='small' />}
            />
          </Breadcrumb>
        </Grid>
      </Grid>

      {statusGetNotes === 'pending' && (
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

      {statusGetNotes === 'completed' && (
        <Grid container spacing={2} justifyContent='left' sx={{ p: 1 }}>
          <Grid item xs={12}>
            <Table
              headCells={headCells}
              rows={allNotes}
              includesToolbar={true}
              isDeleteAllowed={true}
              isEditingAllowed={false}
              headTitle={t('notesDetails')}
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
          context={t('wantToDelete')}
          title={t('delete')}
          optionCancel={t('no')}
          optionAgree={t('yes')}
          handleOnAgree={onDeleteConfirmHandler}
        />
      )}
    </>
  );
}

export default ManageNotes;
