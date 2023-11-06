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

// import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// type CheckModalProps = {
//   open: boolean,
//   onClose: () => void,
//   callbackFn: () => void
// }

// export default function CheckModal({ open, onClose, callbackFn }: CheckModalProps) {

//   return (
//     <Modal
//       aria-labelledby="transition-modal-title"
//       open={open}
//       onClose={onClose}
//       closeAfterTransition
//       slots={{ backdrop: Backdrop }}
//       slotProps={{
//         backdrop: {
//           timeout: 500,
//         },
//       }}
//     >
//       <Fade in={open}>
//         <Box sx={style}>
//           <Typography id="transition-modal-title" variant="h6" component="h2">
//             Czy na pewno chcesz usunąć ?
//           </Typography >
//           <Button onClick={callbackFn}>
//             Tak
//           </Button>
//           <Button onClick={onClose}>
//             Nie
//           </Button>
//         </Box>
//       </Fade>
//     </Modal>
//   );
// }