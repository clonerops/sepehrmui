import { useState } from 'react'
import SalesOrderDetail from './Details'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import { Typography } from '@mui/material'
import ConfirmDialog from '../../../../_cloner/components/ConfirmDialog'

const ConvertPreSaleToUrgentSale = () => {
    const [approve, setApprove] = useState<boolean>(false)
    const handleConfirmOrder = () => {}
  return (
    <>
        <SalesOrderDetail />
        <ButtonComponent onClick={() => setApprove(true)}>
            <Typography variant='h3' className='text-white py-2 px-4'>تبدیل سفارش به فروش فوری</Typography>
        </ButtonComponent>
        <ConfirmDialog
            open={approve}
            hintTitle="آیا از تبدیل سفارش موردنظر به سفارش فروش فوری مطمئن هستید؟"
            notConfirmText="لغو"
            confirmText={"تایید"}
            onCancel={() => setApprove(false)}
            onConfirm={() => handleConfirmOrder()}
        />

    </>
  )
}

export default ConvertPreSaleToUrgentSale