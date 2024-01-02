import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type CheckModalProps = {
  open: boolean,
  onClose: () => void,
  callbackFn: () => void
}

const AlertDialog = ({ open, onClose, callbackFn }: CheckModalProps) => {

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Uwaga!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Czy na pewno chcesz usunąć ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={callbackFn}>Tak</Button>
          <Button onClick={onClose} autoFocus>
            Nie
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AlertDialog
