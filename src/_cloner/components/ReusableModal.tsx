import * as React from 'react';
import { Box, Modal, Fade, Backdrop } from "@mui/material"
import { Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { toAbsoulteUrl } from '../helpers/AssetsHelper';


type Props = {
  children: React.ReactNode
  open: boolean;
  title: string
  width?: string;
  description?: string;
  overflow?: string
  isClose: any
}

export default function TransitionsModal(props: Props) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: props.width ? props.width : "96%",
    width: window.screen.width < 780 ? "96%" : props.width ,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
    height: "auto",

  };

  return (
    <>
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
          <Box sx={style}
          // sx={{ ...style, ...dynamicStyle, ...(isSmallHeightMonitor ? mobileStyle : {}) }}>
          >
            <Box component="div" className='flex justify-between items-center' >
              <Box component="div" className='flex gap-x-2'>
                <Box component="img" src={toAbsoulteUrl('/media/product/credit-card.png')} width={24} />
                <Typography variant='h2'>{props.title}</Typography>
              </Box>
              <Box component="div" onClick={props.isClose} className='cursor-pointer'>
                <Close className='text-red-500' />
              </Box>
            </Box>
            <Typography className="text-sm text-gray-500 pt-2">
              {props.description}
            </Typography>
            <Box component="div" style={{
              maxHeight: "80vh",
              overflow: props.overflow ? props.overflow : "auto"
            }}>
              {props.children}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
