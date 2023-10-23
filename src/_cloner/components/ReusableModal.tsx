import * as React from 'react';
import { Box, Dialog, Modal, Fade, Backdrop } from "@mui/material"
import { Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { IconComponent } from './DynamicIcon';
import { toAbsoulteUrl } from '../helpers/AssetsHelper';


type Props = {
  children: React.ReactNode
  open: boolean;
  title: string
  width?: string;
  description?: string;
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
    height: "auto",
    overflow: window.innerWidth < 600 ? "auto" : "hidden"

  };

  const mobileStyle = {
    height: "100%",
  };

  const isSmallHeightMonitor = window.innerHeight < 600; // Adjust the height threshold as needed

  const dynamicStyle = {
    overflow: isSmallHeightMonitor ? "auto" : "hidden",
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
          <Box  sx={{ ...style, ...dynamicStyle, ...(isSmallHeightMonitor ? mobileStyle : {}) }}>
            <Box component="div" className='flex justify-between items-center' >
              <Box component="div" className='flex gap-x-2'>
                <Box component="img" src={toAbsoulteUrl('/media/mainlogo/rebar.png')} width={24} />
                <Typography variant='h2'>{props.title}</Typography>
              </Box>
              <Box component="div" onClick={props.isClose} className='cursor-pointer'>
                <Close className='text-red-500' />
              </Box>
            </Box>
            <Typography className="text-sm text-gray-500 pt-2">
              {props.description}
            </Typography>
            {props.children}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

// import { Dialog, Transition } from '@headlessui/react'
// import { Close, SearchRounded } from '@mui/icons-material';
// import { Box, Modal, Typography } from '@mui/material';
// import { Fragment, useState } from 'react'
// import Backdrop from '@mui/material/Backdrop';

// type Props = {
//   children: React.ReactNode
//   open: boolean;
//   title: string
//   width?: string;
//   description?: string;
//   isClose: any
// }


// export default function TransitionsModal(props: Props) {
//   return (
//     <>
//       <Transition appear show={props.open} as={Fragment}>
//         <Dialog
//           open={props.open}
//           onClose={props.isClose}
//           className="relative -z-50">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Box component="div" className="fixed inset-0 bg-black bg-opacity-50" />
//           </Transition.Child>

//           <Box component="div" className="fixed inset-0 overflow-y-auto">
//             <Box component="div" className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className={`w-full text-right ${props.width} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}>

//                   <Box component="div" className="flex justify-between items-center">
//                     <Dialog.Title
//                       as="h3"
//                       className="text-lg font-medium leading-6 text-gray-900"
//                     >
//                       {props.title}
//                     </Dialog.Title>
//                     <Box component="div" className='cursor-pointer' onClick={props.isClose}>
//                       <Close className='text-red-500' />
//                     </Box>
//                   </Box>
//                   <Box component="div" className="my-2">
//                     <Typography className="text-sm text-gray-500">
//                       {props.description}
//                     </Typography>
//                   </Box>
//                   <Box component="div">
//                     {props.children}
//                   </Box>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </Box>
//           </Box>
//         </Dialog>
//       </Transition>
//     </>
//   )
// }
