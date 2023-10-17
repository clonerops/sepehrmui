import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Typography } from '@mui/material';


type Props = {
  children: React.ReactNode
  open: boolean;
  title: string
  width?: string;
  isClose: any
}

export default function TransitionsModal(props: Props) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: props.width ? props.width : "96%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: "90%",
    overflow: "auto"
  };

  const mobileStyle = {
    height: "100%",
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.isClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={{ ...style, ...(window.innerWidth < 600 ? mobileStyle : {}) }}>            <Typography variant='h2' color="secondary" className='pb-8'>{props.title}</Typography>
            {props.children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}