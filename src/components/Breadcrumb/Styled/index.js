import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';

import styles from './BreadcrumbStyled.module.css';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

function BreadcrumbStyled({ component, label, icon, to }) {
  return (
    <Link to={to}>
      <StyledBreadcrumb
        className={styles['breadcrumb-link']}
        component={component}
        label={label}
        icon={icon}
      ></StyledBreadcrumb>
    </Link>
  );
}

export default BreadcrumbStyled;
