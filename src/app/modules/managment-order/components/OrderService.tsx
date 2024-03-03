import { Box, Typography, IconButton, Button } from '@mui/material'


import ReusableCard from "../../../../_cloner/components/ReusableCard"
import {  IOrderItems, IOrderPayment, IOrderService } from '../core/_models'

import FormikService from '../../../../_cloner/components/FormikService'
import FormikPrice from '../../../../_cloner/components/FormikPrice'
import { AddCircle, DeleteOutlineRounded } from '@mui/icons-material'
import MuiTable from '../../../../_cloner/components/MuiTable'
import { FormikProps } from 'formik'
import { useGetServices } from '../../generic/_hooks'
import { calculateProximateAmount, calculateTotalAmount } from '../helpers/functions'
import { sliceNumberPriceRial } from '../../../../_cloner/helpers/sliceNumberPrice'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'
import { FC, memo } from 'react'

interface IProps {
    postSaleOrder: any,
    orderService: IOrderService[],
    setOrderService:  (value: React.SetStateAction<IOrderService[]>) => void
    setOrderPayment: React.Dispatch<React.SetStateAction<IOrderPayment[]>>
    orders: IOrderItems[]
    formikRef: React.RefObject<FormikProps<any>>
}

console.log("OrderServices is rendered")


const OrderService:FC<IProps> = ({postSaleOrder, orderService, setOrderService, setOrderPayment, formikRef, orders}) => {
    const { data: productService } = useGetServices();


    const handleSetServices = () => {
        const orderServices = [...orderService]
        const orderServicetData: IOrderService = {
            description: formikRef.current?.values.serviceAmount,
            serviceId: formikRef.current?.values.serviceId,
            serviceName: productService?.find((i: IOrderService) => i.id === formikRef.current?.values.serviceId)?.description
        }
        if (orderServices.some(item => item.serviceId === formikRef.current?.values.serviceId)) {
            EnqueueSnackbar("نوع خدمت قبلا به لیست اضافه شده است.", "error")
        } else if (formikRef.current?.values.serviceId === "") {
            EnqueueSnackbar("نوع خدمت نمی تواند خالی باشد.", "error")
        } else if (formikRef.current?.values.serviceAmount === "") {
            EnqueueSnackbar("هزینه نوع خدمت نمی تواند خالی باشد.", "error")
        }
        else {
            setOrderService([...orderServices, orderServicetData])
            setOrderPayment([])
            formikRef.current?.setFieldValue("orderPaymentAmount", sliceNumberPriceRial(calculateTotalAmount(orders, [...orderServices, orderServicetData])))
            // formikRef.current?.setFieldValue('serviceId', "")
            // formikRef.current?.setFieldValue('serviceAmount', "")
            formikRef.current?.setFieldValue('orderServiceId', "")
            formikRef.current?.setFieldValue('orderServiceDescription', "")
        }

    }

    const handleDeleteService = (params: {id: number}) => {
        const filterServices = orderService.filter((item: IOrderService) => item.id !== params.id)
        setOrderService(filterServices)
        formikRef.current?.setFieldValue("orderPaymentAmount", sliceNumberPriceRial(calculateProximateAmount(orders, filterServices, filterServices)))

    }


    const serviceBeforSubmit = [
        { id: 1, header: "نام بسته خدمت", accessor: "serviceName" },
        { id: 2, header: "هزینه", accessor: "description" },
        { id: 3, header: "حذف", accessor: "", render: (params: any) => {
            return <IconButton onClick={() => handleDeleteService(params)}>
                <DeleteOutlineRounded className='!text-red-500' />
            </IconButton>
        } },
    ]    

    const serviceAfterSubmit = [
        { id: 1, header: "نام بسته خدمت", accessor: "serviceName" },
        { id: 2, header: "هزینه", accessor: "description" },
    ]    

    let renderColumns = postSaleOrder?.data?.succeeded ? serviceAfterSubmit : serviceBeforSubmit

  return (
    <ReusableCard cardClassName="mt-4 md:mt-0 bg-gradient-to-r from-gray-100">
        <Typography variant="h2" color="primary">بسته خدمت</Typography>
        <Box component="div" className="flex flex-wrap md:flex-nowrap gap-4 my-4 ">
            <FormikService label="نوع خدمت" name="serviceId" disabled={postSaleOrder?.data?.succeeded} />
            <FormikPrice name="serviceAmount" label="هزینه" disabled={postSaleOrder?.data?.succeeded} />
            <Button onClick={handleSetServices} className="!w-[120px]" variant="contained">
                <Typography>افزودن</Typography>
            </Button>
        </Box>
    <MuiTable onDoubleClick={() => {}} columns={renderColumns} data={orderService} />
</ReusableCard>

  )
}

export default memo(OrderService)