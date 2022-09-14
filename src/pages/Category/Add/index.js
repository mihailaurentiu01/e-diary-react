import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddCategoryForm from '../../../components/Category/AddForm';
import { useDispatch } from 'react-redux';
import { NavbarActions } from '../../../store/modules/Navbar';
import { useEffect } from 'react';

import Breadcrumb from '../../../components/Breadcrumb';
import BreadcrumbStyled from '../../../components/Breadcrumb/Styled';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';

import routes from '../../../helpers/routes';

function AddCategory() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { setCurrentPage } = NavbarActions;

  useEffect(() => {
    dispatch(setCurrentPage(t('addCategory')));
  }, [dispatch, setCurrentPage]);

  return (
    <>
      <Typography align='left' variant='h4'>
        {t('addCategory')}
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
            <BreadcrumbStyled
              component='p'
              to={routes.category.add}
              label={t('addCategory')}
              icon={<AddIcon fontSize='small' />}
            />
          </Breadcrumb>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent='left' sx={{ p: 1 }}>
        <Grid item xs={12}>
          <AddCategoryForm />
        </Grid>
      </Grid>
    </>
  );
}

export default AddCategory;
