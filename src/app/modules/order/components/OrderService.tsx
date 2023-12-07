import { Box, Typography, Button, IconButton } from '@mui/material'


import ReusableCard from "../../../../_cloner/components/ReusableCard"
import {  IOrderService } from '../core/_models'

import FormikService from '../../../../_cloner/components/FormikService'
import FormikPrice from '../../product/components/FormikPrice'
import { validateAndEnqueueSnackbar } from '../sales-order/functions'
import { AddCircle, DeleteOutlineRounded } from '@mui/icons-material'
import MuiTable from '../../../../_cloner/components/MuiTable'
import { FormikErrors } from 'formik'
import { useGetServices } from '../../generic/_hooks'

type Props = {
    orderService: IOrderService[],
    setOrderService:  (value: React.SetStateAction<IOrderService[]>) => void
    values: any
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>
}



const OrderService = (props: Props) => {
    const {orderService, setOrderService, values, setFieldValue} = props;
    const { data: productService } = useGetServices();


    const handleSetServices = () => {
        const orderServices = [...orderService]
        const orderServicetData: IOrderService = {
            description: values.serviceAmount,
            serviceId: values.serviceId,
            serviceName: productService?.find((i: IOrderService) => i.id === values.serviceId)?.description
        }
        if (orderServices.some(item => item.serviceId === values.serviceId)) {
            validateAndEnqueueSnackbar("نوع خدمت قبلا به لیست اضافه شده است.", "error")
        } else if (values.serviceId === "") {
            validateAndEnqueueSnackbar("نوع خدمت نمی تواند خالی باشد.", "error")
        } else if (values.serviceAmount === "") {
            validateAndEnqueueSnackbar("هزینه نوع خدمت نمی تواند خالی باشد.", "error")
        }
        else {
            setOrderService([...orderServices, orderServicetData])
            // setFieldValue("amount", sliceNumberPriceRial(calculateTotalAmount(orders, [...orderServices, orderServicetData])))
            setFieldValue('serviceId', "")
            setFieldValue('serviceAmount', "")
        }

    }

    const handleDeleteService = (params: {id: number}) => {
        const filterServices = orderService.filter((item: IOrderService) => item.id !== params.id)
        setOrderService(filterServices)
        // setFieldValue("amount", sliceNumberPriceRial(calculateProximateAmount(orders, filterServices, filterServices)))
        // setOrderPayment([])

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
            <Button color="secondary" onClick={handleSetServices}>
                <AddCircle />
            </Button>
        </Box>
    <MuiTable onDoubleClick={() => {}} columns={serviceColumns} data={orderService} />
    {/* <Table>
        <TableHead>
            <TableRow>
                <TableCell className="!font-bold">نوع خدمت</TableCell>
                <TableCell className="!font-bold">هزینه</TableCell>
                <TableCell className="!font-bold">حذف</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {orderService?.map((i) => (
                <TableRow>
                    <TableCell>{i?.serviceName}</TableCell>
                    <TableCell>{i?.description} ریال</TableCell>
                    <TableCell>
                        <Box component="div" onClick={
                            () => {
                                const filterServices = orderService.filter((item: IOrderService) => item.id !== i.id)
                                setOrderService(filterServices)
                                setFieldValue("amount", sliceNumberPriceRial(calculateProximateAmount(orders, filterServices, filterServices)))
                                setOrderPayment([])
                            }
                        }>
                            <Delete className="text-red-500 cursor-pointer" />
                        </Box>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table> */}
</ReusableCard>

  )
}

export default OrderService