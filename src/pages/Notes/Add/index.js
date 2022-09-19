import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavbarActions } from '../../../store/modules/Navbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddNoteForm from '../../../components/Notes/AddForm';

import Breadcrumb from '../../../components/Breadcrumb';
import BreadcrumbStyled from '../../../components/Breadcrumb/Styled';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotesIcon from '@mui/icons-material/Notes';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import routes from '../../../helpers/routes';

function Notes() {
  const [isEditing, setIsEditing] = useState(false);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { setCurrentPage } = NavbarActions;

  useEffect(() => {
    dispatch(setCurrentPage(t('addNote')));
  }, [dispatch, setCurrentPage]);

  return (
    <>
      <Typography align='left' variant='h4'>
        {t('addNote')}
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
              label={t('notes')}
              icon={<NotesIcon fontSize='small' />}
            />
            {!isEditing && (
              <BreadcrumbStyled
                component='p'
                to={routes.notes.add}
                label={t('addNote')}
                icon={<AddIcon fontSize='small' />}
              />
            )}

            {isEditing && (
              <BreadcrumbStyled
                component='p'
                to={routes.category.edit}
                label={t('editCategory')}
                icon={<EditIcon fontSize='small' />}
              />
            )}
          </Breadcrumb>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent='left' sx={{ p: 1 }}>
        <Grid item xs={12}>
          <AddNoteForm />
        </Grid>
      </Grid>
    </>
  );
}

export default Notes;
