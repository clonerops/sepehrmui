import { Typography, IconButton, Button } from '@mui/material'


import ReusableCard from "../../../../_cloner/components/ReusableCard"
import {  IOrderItems, IOrderPayment, IOrderService } from '../core/_models'

import FormikService from '../../../../_cloner/components/FormikService'
import FormikPrice from '../../../../_cloner/components/FormikPrice'
import { DeleteOutlineRounded } from '@mui/icons-material'
import MuiTable from '../../../../_cloner/components/MuiTable'
import { FormikProps } from 'formik'
import { useGetServices } from '../../generic/_hooks'
import { calculateTotalAmount } from '../helpers/functions'
import { sliceNumberPriceRial } from '../../../../_cloner/helpers/sliceNumberPrice'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/snackebar'
import { FC, memo } from 'react'
// import { useAuth } from '../../../../_cloner/helpers/checkUserPermissions'
// import TypographyAccessDenied from '../../../../_cloner/components/TypographyAccessDenied'

interface IProps {
    postSaleOrder: any,
    orderService: IOrderService[],
    setOrderService:  (value: React.SetStateAction<IOrderService[]>) => void
    setOrderPayment: React.Dispatch<React.SetStateAction<IOrderPayment[]>>
    orders: IOrderItems[]
    formikRef: React.RefObject<FormikProps<any>>
}

const OrderService:FC<IProps> = ({postSaleOrder, orderService, setOrderService, setOrderPayment, formikRef, orders}) => {
    // const { hasPermission } = useAuth()
    const { data: productService } = useGetServices();;

    const handleSetServices = () => {
        const orderServices = [...orderService]
        const orderServicetData: IOrderService = {
            orderServiceDescription: formikRef.current?.values.orderServiceDescription,
            orderServiceId: formikRef.current?.values.orderServiceId,
            serviceName: productService?.find((i: IOrderService) => i.id === formikRef.current?.values.orderServiceId)?.description
        }
        if (orderServices.some(item => item.orderServiceId === formikRef.current?.values.orderServiceId)) {
            EnqueueSnackbar("نوع خدمت قبلا به لیست اضافه شده است.", "error")
        } else if (formikRef.current?.values.orderServiceId === "") {
            EnqueueSnackbar("نوع خدمت نمی تواند خالی باشد.", "error")
        } else if (formikRef.current?.values.orderServiceDescription === "") {
            EnqueueSnackbar("هزینه نوع خدمت نمی تواند خالی باشد.", "error")
        }
        else {
            setOrderService([...orderServices, orderServicetData])
            setOrderPayment([])
            formikRef.current?.setFieldValue("orderPaymentAmount", sliceNumberPriceRial(calculateTotalAmount(orders, [...orderServices, orderServicetData])))
            formikRef.current?.setFieldValue('orderServiceId', "")
            formikRef.current?.setFieldValue('orderServiceDescription', "")
        }

    }

    const handleDeleteService = (params: {orderServiceMainId: number}) => {
        const filterServices = orderService.filter((item: IOrderService) => item.orderServiceMainId !== params.orderServiceMainId)
        setOrderService(filterServices)
        setOrderPayment([])
        formikRef.current?.setFieldValue("orderPaymentAmount", sliceNumberPriceRial(calculateTotalAmount(orders, filterServices)))
    }


    const serviceBeforSubmit = [
        { id: 1, header: "نام بسته خدمت", accessor: "serviceName" },
        { id: 2, header: "هزینه(ریال)", accessor: "orderServiceDescription", render: (params: any) => {
            return <Typography variant="h4" className='text-green-500'>{params.orderServiceDescription}</Typography>
        } },
        { id: 3, header: "حذف", accessor: "", render: (params: any) => {
            return <IconButton onClick={() => handleDeleteService(params)}>
                <DeleteOutlineRounded className='!text-red-500' />
            </IconButton>
        } },
    ]    

    const serviceAfterSubmit = [
        { id: 1, header: "نام بسته خدمت", accessor: "serviceName" },
        { id: 2, header: "هزینه(ریال)", accessor: "orderServiceDescription", render: (params: any) => {
            return <Typography variant="h4" className='text-green-500'>{params.orderServiceDescription}</Typography>
        }},
    ]
    
    // useEffect(() => {
    //     let isExists = orderService.some((item: any) => {
    //         return item.orderServiceId === 6
    //     }) 
    //     if(isEdit) {
    //         formikRef.current?.setFieldValue('orderSendTypeId', "")
    //         formikRef.current?.setFieldValue('purchaseOrderSendTypeId', "")
    //         formikRef.current?.setFieldValue('paymentTypeId', "")
    //     } else if(!isEdit) {
    //             formikRef.current?.setFieldValue('orderSendTypeId', "1")
    //             formikRef.current?.setFieldValue('purchaseOrderSendTypeId', "1")
    //             formikRef.current?.setFieldValue('paymentTypeId', "2")
    //     } else if(!isEdit && isExists) {
    //             formikRef.current?.setFieldValue('orderSendTypeId', "2")
    //             formikRef.current?.setFieldValue('purchaseOrderSendTypeId', "2")
    //             formikRef.current?.setFieldValue('paymentTypeId', "1")
    //     } 
    // // eslint-disable-next-line
    // }, [orderService])

    let renderColumns = postSaleOrder?.data?.succeeded ? serviceAfterSubmit : serviceBeforSubmit

    // if(!hasPermission("GetAllServices"))
    //     return <TypographyAccessDenied title='کاربر گرامی دسترسی به لیست بسته های خدمت به شما اعطا نشده است.' />

  return (
    <ReusableCard cardClassName="mt-4 md:mt-0 bg-gradient-to-r from-gray-100">
        <Typography variant="h2" color="primary">بسته خدمت</Typography>
        <div className="flex flex-wrap gap-4 my-4 ">
            <FormikService label="نوع خدمت" name="orderServiceId" disabled={postSaleOrder?.data?.succeeded} />
            <FormikPrice name="orderServiceDescription" label="هزینه" disabled={postSaleOrder?.data?.succeeded} />
            <Button disabled={postSaleOrder?.data?.succeeded} onClick={handleSetServices} className="!w-[120px]" variant="contained">
                <Typography>افزودن</Typography>
            </Button>
        </div>
    <MuiTable onDoubleClick={() => {}} columns={renderColumns} data={orderService} />
</ReusableCard>

  )
}

export default memo(OrderService)