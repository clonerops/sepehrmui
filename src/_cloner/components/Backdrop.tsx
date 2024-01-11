import React, { FC } from 'react'
import { Box, CircularProgress } from '@mui/material';
import { toAbsoulteUrl } from '../helpers/AssetsHelper';

interface IProps {
    loading: boolean
}

const Backdrop:FC<IProps> = () => {
    return (
        <Box component="section" className='flex justify-center items-center fixed w-full h-full top-0 right-0 bg-white transition z-[9999] ease-out bg-opacity-70'>
            <Box component="div" className='flex flex-col justify-center items-center'>
                <CircularProgress color="secondary" className='!w-[120px]' />

                {/* <Box component="img" alt='saipa-logo' className='mb-20 animate-ping' src={toAbsoulteUrl('/media/logos/load.gif')} width={80} height={80} /> */}
                {/* <Box component="img" alt='saipa-logo' className='mb-20 animate-ping' src={toAbsoulteUrl('/media/logos/follad.png')} width={80} height={80} /> */}
            </Box>
        </Box>
    )
}

export default React.memo(Backdrop)