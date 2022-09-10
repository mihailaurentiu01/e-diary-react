import diaryLogo from '../../assets/img/diary.png';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import styles from './Welcome.module.css';
import { APP_NAME } from '../../helpers/constants';

const theme = createTheme();

theme.typography.h1 = {
  fontSize: '4rem',
  '@media (min-width:600px)': {
    fontSize: '5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '7rem',
  },
};

function Welcome() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='xs'>
        <ThemeProvider theme={theme}>
          <Typography variant='h1'>{APP_NAME}</Typography>
          <img className={styles.centered} src={diaryLogo} width='250' />
        </ThemeProvider>
      </Container>
    </>
  );
}

export default Welcome;
