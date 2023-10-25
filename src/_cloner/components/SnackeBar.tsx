import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackbarProps {
  open: boolean;
  message: string;
  handleClose: () => void;
  severity: 'success' | 'error' | 'info' | 'warning';
}

const CustomSnackbar: React.FC<SnackbarProps> = (props) => {
  const { open, message, handleClose, severity } = props;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "top", horizontal: "center"}}>
      <Alert severity={severity} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
