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

import routes from '../../../helpers/routes';

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

function ManageCategory() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { setCurrentPage } = NavbarActions;

  const rows = [
    createData(
      'Cupcake',
      1223,
      new Date('5/1/2022').toLocaleDateString(),
      67,
      4.3
    ),
    createData(
      'Ejemplo',
      1223,
      new Date('1/1/2022').toLocaleDateString(),
      67,
      4.3
    ),
  ];
  useEffect(() => {
    dispatch(setCurrentPage(t('manageCategory')));
  }, [dispatch, setCurrentPage]);

  const onEditHandler = (selected) => {
    console.log('edit', selected);
  };

  const onDeleteHandler = (selected) => {
    console.log('delete', selected);
  };

  const onRenderRow = (row) => {
    return (
      <>
        <TableCell align='right'>{row.calories}</TableCell>
        <TableCell align='right'>{row.fat}</TableCell>
        <TableCell align='right'>{row.carbs}</TableCell>
        <TableCell align='right'>{row.protein}</TableCell>
      </>
    );
  };

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

      <Grid container spacing={2} justifyContent='left' sx={{ p: 1 }}>
        <Grid item xs={12}>
          <Table
            headCells={[
              {
                id: 'name',
                numeric: false,
                disablePadding: true,
                label: 'Dessert (100g serving)',
              },
              {
                id: 'calories',
                numeric: true,
                disablePadding: false,
                label: 'Calories',
              },
              {
                id: 'fat',
                numeric: true,
                disablePadding: false,
                label: 'Fat (g)',
              },
              {
                id: 'carbs',
                numeric: true,
                disablePadding: false,
                label: 'Carbs (g)',
              },
              {
                id: 'protein',
                numeric: true,
                disablePadding: false,
                label: 'Protein (g)',
              },
            ]}
            rows={rows}
            includesToolbar={true}
            isDeleteAllowed={true}
            isEditingAllowed={true}
            headTitle={'Example'}
            onEdit={onEditHandler}
            onDelete={onDeleteHandler}
            onRenderRow={onRenderRow}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ManageCategory;
