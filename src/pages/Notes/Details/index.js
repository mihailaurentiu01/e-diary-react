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

import SearchIcon from '@mui/icons-material/Search';

import routes from '../../../helpers/routes';
import { Button } from '@mui/material';

import { useParams } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NoteDetailsTable from '../../../components/Notes/Details';

function NoteDetails() {
  const { t } = useTranslation();
  const location = useLocation();
  const match = useRouteMatch();

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

  const { selectedNote } = useSelector((state) => state.Note);
  const { id } = params;

  const noteData = [{ ...selectedNote }];
  useEffect(() => {
    dispatch(setCurrentPage(t('noteDetails')));
  }, [dispatch, setCurrentPage]);

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
      <Grid container spacing={2} justifyContent='center' sx={{ p: 1 }}>
        <Grid item xs={2}>
          <Route path={match.path} exact>
            <Link to={`${location.pathname}/details`}>
              <Button sx={{ width: 1 }} variant='contained'>
                {t('noteDetails')}
              </Button>
            </Link>
          </Route>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent='left' sx={{ p: 1 }}>
        <Route path={match.path + '/details'}>
          <NoteDetailsTable />
        </Route>
      </Grid>
    </>
  );
}

export default NoteDetails;
