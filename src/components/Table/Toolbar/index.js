import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
function TableToolbar(props) {
  const { numSelected } = props;
  const { isDeleteAllowed } = props;
  const { isEditingAllowed } = props;
  const { headTitle } = props;

  const { onDelete } = props;
  const { onEdit } = props;

  const { t } = useTranslation();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} {t('selected')}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          {headTitle}
        </Typography>
      )}

      {isDeleteAllowed && numSelected === 1 && (
        <Tooltip title={t('delete')}>
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
      {isEditingAllowed && numSelected === 1 && (
        <Tooltip title={t('edit')}>
          <IconButton onClick={onEdit}>
            <Edit />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default TableToolbar;
