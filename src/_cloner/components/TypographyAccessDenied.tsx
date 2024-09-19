import { Typography } from '@mui/material'
import { FC } from 'react'
import { ITypographyAccessDenied } from '../helpers/_models'


const TypographyAccessDenied:FC<ITypographyAccessDenied> = ({ title = "جهت استفاده از این بخش باید دسترسی های لازم را دارا باشید"}) => {
  return (
    <Typography className='flex justify-center  items-center' variant="h4">
         {title}
    </Typography>
  )
}

export default TypographyAccessDenied