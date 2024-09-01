import React, { FC } from 'react'
import { toAbsoulteUrl } from '../helpers/assetsHelper';
import { Card, Typography } from '@mui/material';

interface IProps {
    loading: boolean
}

const LazyLoad:FC<IProps> = () => {
    return (
        <section className='flex justify-center items-center fixed w-full h-full top-0 right-0 transition z-[9999] ease-out bg-opacity-70'>
            <div className='flex flex-col justify-center items-center'>
                {/* <img alt="sepehriranian" className='mb-20 animate-bounce' src={toAbsoulteUrl('/media/icons/lazy.gif')} width={180} height={180} /> */}
                <img alt="sepehriranian" className='' src={toAbsoulteUrl('/media/icons/lazy.gif')}  />
                <Typography variant='h1'>درحال بارگزاری صفحه </Typography>
            </div>
        </section>
    )
}

export default React.memo(LazyLoad)