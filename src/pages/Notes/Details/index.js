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
import SearchIcon from '@mui/icons-material/Search';

import routes from '../../../helpers/routes';
import { NoteActions } from '../../../store/modules/Note';

import useHttp from '../../../hooks/useHttp';
import { getNotes, deleteNote } from '../../../services/Api';
import { CategoryActions } from '../../../store/modules/Category';
import { SnackbarActions } from '../../../store/modules/Snackbar';

import ResponsiveDialog from '../../../components/ResponsiveDialog';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function NoteDetails() {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

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
    {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: t('noteDescription'),
    },
  ];

  const dispatch = useDispatch();
  const { setCurrentPage } = NavbarActions;

  const { setCategories } = CategoryActions;
  const { setOpen } = SnackbarActions;
  const { setMessage } = SnackbarActions;
  const { setType } = SnackbarActions;
  const { setSelectedNote } = NoteActions;

  const { selectedNote } = useSelector((state) => state.Note);
  const { id } = params;

  const noteData = [{ ...selectedNote }];
  useEffect(() => {
    dispatch(setCurrentPage(t('noteDetails')));
  }, [dispatch, setCurrentPage]);

  const onDeleteHandler = (selected) => {
    console.log('on delete handler');
  };

  const onViewDetailsHandler = (selected) => {
    console.log('view', selected);
  };

  const onRenderRow = (row) => {
    return (
      <>
        <TableCell align='left'>{row.title}</TableCell>
        <TableCell align='left'>{row.categoryName}</TableCell>
        <TableCell align='left'>{row.creationDate}</TableCell>
        <TableCell align='left'>{row.description}</TableCell>
      </>
    );
  };

  return (
    <>
      <Typography align='left' variant='h4'>
        {t('noteDetails')}
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
            <BreadcrumbStyled
              component='p'
              to={routes.notes.base}
              label={t('noteDetails')}
              icon={<SearchIcon fontSize='small' />}
            />
          </Breadcrumb>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent='left' sx={{ p: 1 }}>
        <Grid item xs={12}>
          <Table
            headCells={headCells}
            rows={noteData}
            includesToolbar={false}
            isDeleteAllowed={false}
            isEditingAllowed={false}
            isViewDetailsAllowed={false}
            headTitle={t('notesDetails')}
            onRenderRow={onRenderRow}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default NoteDetails;
