import { FC } from 'react';
import { Drawer, Divider, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IBottomDrawerProps } from '../helpers/_models';

const BottomDrawer:FC<IBottomDrawerProps> = ({ open, onClose, children, title }) => {

    return (
        <Drawer anchor="bottom" open={open} onClose={onClose} className='w-full'
            style={{ height: 600, zIndex: 9999, backgroundColor: "transparent" }}>

            <div className='h-[90vh] bg-white text-black overflow-auto'>
                <div className='flex justify-between items-center'>
                    <Typography variant="h2" className='p-4'>{title}</Typography>
                    <div onClick={onClose} className='pl-8 cursor-pointer'>
                        <CloseIcon  className='!text-red-500' />
                    </div>
                </div>
                <Divider />
                <div className='p-4'> {children} </div>
            </div>

        </Drawer>
    );
};

export default BottomDrawer;
