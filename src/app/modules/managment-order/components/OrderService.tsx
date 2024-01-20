import { Box, Typography, IconButton } from '@mui/material'


import ReusableCard from "../../../../_cloner/components/ReusableCard"
import {  IOrderItems, IOrderService } from '../core/_models'

import FormikService from '../../../../_cloner/components/FormikService'
import FormikPrice from '../../product/components/FormikPrice'
import { AddCircle, DeleteOutlineRounded } from '@mui/icons-material'
import MuiTable from '../../../../_cloner/components/MuiTable'
import { FormikErrors } from 'formik'
import { useGetServices } from '../../generic/_hooks'
import { calculateProximateAmount, calculateTotalAmount } from '../helpers/functions'
import { sliceNumberPriceRial } from '../../../../_cloner/helpers/sliceNumberPrice'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'

type Props = {
    orderService: IOrderService[],
    setOrderService:  (value: React.SetStateAction<IOrderService[]>) => void
    values: any
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>
    orders: IOrderItems[]
}



const OrderService = (props: Props) => {
    const {orderService, setOrderService, values, setFieldValue, orders} = props;
    const { data: productService } = useGetServices();


    const handleSetServices = () => {
        const orderServices = [...orderService]
        const orderServicetData: IOrderService = {
            description: values.serviceAmount,
            serviceId: values.serviceId,
            serviceName: productService?.find((i: IOrderService) => i.id === values.serviceId)?.description
        }
        if (orderServices.some(item => item.serviceId === values.serviceId)) {
            EnqueueSnackbar("نوع خدمت قبلا به لیست اضافه شده است.", "error")
        } else if (values.serviceId === "") {
            EnqueueSnackbar("نوع خدمت نمی تواند خالی باشد.", "error")
        } else if (values.serviceAmount === "") {
            EnqueueSnackbar("هزینه نوع خدمت نمی تواند خالی باشد.", "error")
        }
        else {
            setOrderService([...orderServices, orderServicetData])
            setFieldValue("amount", sliceNumberPriceRial(calculateTotalAmount(orders, [...orderServices, orderServicetData])))
            setFieldValue('serviceId', "")
            setFieldValue('serviceAmount', "")
        }

    }

    const handleDeleteService = (params: {id: number}) => {
        const filterServices = orderService.filter((item: IOrderService) => item.id !== params.id)
        setOrderService(filterServices)
        setFieldValue("amount", sliceNumberPriceRial(calculateProximateAmount(orders, filterServices, filterServices)))

    }


    const serviceColumns = [
        { id: 1, header: "نام بسته خدمت", accessor: "serviceName" },
        { id: 2, header: "هزینه", accessor: "description" },
        { id: 3, header: "حذف", accessor: "", render: (params: any) => {
            return <IconButton onClick={() => handleDeleteService(params)}>
                <DeleteOutlineRounded className='!text-red-500' />
            </IconButton>
        } },
    ]    

  return (
    <ReusableCard cardClassName="mt-4 md:mt-0">
        <Typography variant="h2" color="primary">بسته خدمت</Typography>
        <Box component="div" className="flex flex-wrap md:flex-nowrap  gap-4 my-4">
            <FormikService label="نوع خدمت" name="serviceId" />
            <FormikPrice name="serviceAmount" label="هزینه" />
            <IconButton onClick={handleSetServices}>
                <AddCircle color='secondary' />
            </IconButton>
        </Box>
    <MuiTable onDoubleClick={() => {}} columns={serviceColumns} data={orderService} />
</ReusableCard>

  )
}

export default OrderService