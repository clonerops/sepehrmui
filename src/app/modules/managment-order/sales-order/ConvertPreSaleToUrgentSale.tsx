import { useState } from 'react'
import SalesOrderDetail from './Details'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import { Typography } from '@mui/material'
import ConfirmDialog from '../../../../_cloner/components/ConfirmDialog'
import { useConvertPreSaleOrder } from '../core/_hooks'
import { Params, useParams } from 'react-router-dom'
import { renderAlert } from '../../../../_cloner/helpers/sweetAlert'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/snackebar'
import Backdrop from '../../../../_cloner/components/Backdrop'
import { useAuth } from '../../../../_cloner/helpers/checkUserPermissions'
import TypographyAccessDenied from '../../../../_cloner/components/TypographyAccessDenied'

const ConvertPreSaleToUrgentSale = () => {
  const { hasPermission } = useAuth()

  const { id }: Readonly<Params<string>> = useParams()

  const [approve, setApprove] = useState<boolean>(false)

  const convertOrder = useConvertPreSaleOrder()

  const handleConfirmOrder = () => {
    convertOrder.mutate(id || "", {
      onSuccess: (response) => {
        if (response.succeeded) {
          setApprove(false)
          renderAlert(response.message)
        } else {
          EnqueueSnackbar(response.data.Message, "warning")
        }
      }
    })
  }
  return (
    <>
      {convertOrder.isLoading && <Backdrop loading={convertOrder.isLoading} />}
      <>
        {hasPermission("GetOrderById") ?
          <>
            <SalesOrderDetail />
            <ButtonComponent onClick={() => setApprove(true)}>
              <Typography variant='h3' className='text-white py-2 px-4'>تبدیل سفارش به فروش فوری</Typography>
            </ButtonComponent>
          </>
          : <TypographyAccessDenied title='جهت تبدیل وضعیت سفارش نیاز به دسترسی جزئیات سفارش نیز می باشد' />
        }
      </>
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