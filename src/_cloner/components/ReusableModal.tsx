import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Typography } from '@mui/material';
import { Close } from '@mui/icons-material';


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
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
    height: "90%",
    overflow: "hidden"
    
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
          <Box sx={{ ...style, ...(window.innerWidth < 600 ? mobileStyle : {}) }}>            
          <Box component="div" className='flex justify-between items-center' >
          <Box component="div">
          <Typography variant='h2' color="secondary" className='pb-8'>{props.title}</Typography>
          </Box>
          <Box component="div" onClick={props.isClose}>
            <Close className='text-red-500' />
          </Box>
          </Box>
            {props.children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}