import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddCategoryForm from '../../../components/Category/AddForm';
import { useDispatch } from 'react-redux';
import { NavbarActions } from '../../../store/modules/Navbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Breadcrumb from '../../../components/Breadcrumb';
import BreadcrumbStyled from '../../../components/Breadcrumb/Styled';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { CategoryActions } from '../../../store/modules/Category';

import routes from '../../../helpers/routes';

function AddCategory() {
  const [isEditing, setIsEditing] = useState(false);

  const { t } = useTranslation();
  const params = useParams();

  const dispatch = useDispatch();
  const { setCurrentPage } = NavbarActions;

  const { id: categoryId } = params;

  const { setSelectedCategory } = CategoryActions;

  useEffect(() => {
    if (categoryId) {
      dispatch(setCurrentPage(t('editCategory')));
      setIsEditing(true);
      dispatch(setSelectedCategory(categoryId));
    } else {
      dispatch(setCurrentPage(t('addCategory')));
      setIsEditing(false);
    }
  }, [dispatch, setCurrentPage, categoryId, setSelectedCategory]);

  return (
    <>
      <Typography align='left' variant='h4'>
        {!isEditing && t('addCategory')}
        {isEditing && t('editCategory')}
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
            {!isEditing && (
              <BreadcrumbStyled
                component='p'
                to={routes.category.add}
                label={t('addCategory')}
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
          <AddCategoryForm isEditing={isEditing} />
        </Grid>
      </Grid>
    </>
  );
}

export default AddCategory;
