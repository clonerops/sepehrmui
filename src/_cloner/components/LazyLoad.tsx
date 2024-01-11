import React, { FC } from 'react'
import { Box, CircularProgress } from '@mui/material';
import { toAbsoulteUrl } from '../helpers/AssetsHelper';

interface IProps {
    loading: boolean
}

const LazyLoad:FC<IProps> = () => {
    return (
        <Box component="section" className='flex justify-center items-center fixed w-full h-full top-0 right-0 bg-white transition z-[9999] ease-out bg-opacity-70'>
            <Box component="div" className='flex flex-col justify-center items-center'>
                {/* <CircularProgress color="secondary" className='!w-[160px]' /> */}
                <Box component="img" alt='saipa-logo' className='mb-20 animate-bounce' src={toAbsoulteUrl('/media/logos/folladlogo.png')} width={180} height={180} />
            </Box>
        </Box>
    )
}

export default React.memo(LazyLoad)