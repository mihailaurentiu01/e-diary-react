import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SNACKBAR_DURATION } from '../../helpers/constants';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function SnackbarCustom(props) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={props.open}
        autoHideDuration={props.duration || SNACKBAR_DURATION}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={props.handleClose}
          severity={props.type}
          sx={{ width: '100%' }}
        >
          {props.msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
