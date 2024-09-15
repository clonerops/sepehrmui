import React, { FC } from 'react'
import { CircularProgress } from '@mui/material';

const Backdrop = () => {
    return (
        <section className='flex justify-center items-center fixed w-full h-full top-0 right-0 bg-white transition z-[9999] ease-out bg-opacity-70'>
            <div className='flex flex-col justify-center items-center'>
                <CircularProgress color="secondary" />
            </div>
        </section>
    )
}

export default React.memo(Backdrop)