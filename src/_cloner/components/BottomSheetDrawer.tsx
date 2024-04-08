import React, { ReactNode } from 'react';
import {
    Drawer,
    Divider,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface BottomDrawerProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    title: string;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({ open, onClose, children, title }) => {

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            className='w-full'
            style={{
                height: 600,
                zIndex: 9999,
                backgroundColor: "transparent"
            }}
        >

            <div style={{ height: "90vh", backgroundColor: "white", color: "black", overflow: "auto" }}>
                <div className='flex justify-between items-center'>
                    <Typography variant="h2" className='p-4'>{title}</Typography>
                    <div onClick={onClose} className='pl-8 cursor-pointer'>
                        <CloseIcon style={{ color: "red" }} />
                    </div>
                </div>
                <Divider />
                <div className='p-4'>
                    {children}
                </div>
            </div>
        </Drawer>
    );
};

export default BottomDrawer;
