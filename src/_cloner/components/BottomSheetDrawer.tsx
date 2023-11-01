import React, { ReactNode } from 'react';
import {
    Drawer,
    Divider,
    IconButton,
    Box,
    Typography,
    Container,
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
                backgroundColor:"transparent"
            }}
        >
            <Box onClick={onClose} component="div" style={{backgroundColor:"#fcc615"}}>
                <CloseIcon style={{color:"white"}} />
            </Box>
            <Box component="div" style={{ height: "90vh", backgroundColor: "white", color: "black", overflow: "auto" }}>
                <Typography variant="h2" className='p-4'>{title}</Typography>
                <Divider />
                <Box component="div" className='p-4'>
                    {children}
                </Box>
            </Box>
        </Drawer>
    );
};

export default BottomDrawer;
