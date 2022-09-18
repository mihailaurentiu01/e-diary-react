import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog(props) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { open } = props;
  const { title } = props;
  const { context } = props;
  const { optionCancel } = props;
  const { optionAgree } = props;
  const { handleOnAgree } = props;
  const { handleClose } = props;

  const onAgreeHandler = () => {
    handleClose();
    handleOnAgree();
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{context}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {optionCancel}
          </Button>
          <Button onClick={onAgreeHandler} autoFocus>
            {optionAgree}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
