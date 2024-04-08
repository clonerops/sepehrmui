import React, { FC } from 'react'
import { toAbsoulteUrl } from '../helpers/AssetsHelper';

interface IProps {
    loading: boolean
}

const LazyLoad:FC<IProps> = () => {
    return (
        <section className='flex justify-center items-center fixed w-full h-full top-0 right-0 bg-white transition z-[9999] ease-out bg-opacity-70'>
            <div className='flex flex-col justify-center items-center'>
                <img alt='saipa-logo' className='mb-20 animate-bounce' src={toAbsoulteUrl('/media/mainlogo/2.png')} width={180} height={180} />
            </div>
        </section>
    )
}

export default React.memo(LazyLoad)