import { Box, Button, IconButton, Typography } from "@mui/material";
import { AddCircle, DeleteOutlineRounded } from "@mui/icons-material";
import moment from "moment-jalaali";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FormikPrice from "../../../../_cloner/components/FormikPrice";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker";
import MuiTable from "../../../../_cloner/components/MuiTable";

import { IOrderItems, IOrderPayment, IOrderService } from "../core/_models";
import { sliceNumberPriceRial } from "../../../../_cloner/helpers/sliceNumberPrice";
import { calculateProximateAmount, calculateTotalAmount } from "../helpers/functions";
import { FormikProps } from "formik";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import { FC, memo, useMemo } from "react";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";

interface IProps {
    postSaleOrder: any,
    orderPayment: IOrderPayment[],
    setOrderPayment: (value: React.SetStateAction<IOrderPayment[]>) => void
    formikRef: React.RefObject<FormikProps<any>>
    orderService: IOrderService[],
    orders: IOrderItems[]
}


const OrderPayment:FC<IProps> = ({ postSaleOrder, orderPayment, orderService, formikRef, orders, setOrderPayment }) => {

    let totalAmount = useMemo(() => calculateTotalAmount(orders, orderService), [orders, orderService])

    const handleSetPayment = () => {
        const orderPaymentCP: any = [...orderPayment]
        const orderPaymentData: any = {
            orderPaymentAmount: formikRef.current?.values.orderPaymentAmount,
            orderPaymentDaysAfterExit: +formikRef.current?.values?.orderPaymentDaysAfterExit,
            orderPaymentDate: formikRef.current?.values?.orderPaymentDate,
            orderPaymentType: 0
        }

        const currentTotalPayment = orderPayment.reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue?.orderPaymentAmount.replace(/,/g, ""), 10), 0);

        if(formikRef.current?.values?.orderPaymentDate === undefined || formikRef.current?.values?.orderPaymentDate === null || formikRef.current?.values?.orderPaymentDate === "") {
            EnqueueSnackbar("تاریخ نمی تواند خالی باشد.", "error")
        } else if(formikRef.current?.values?.orderPaymentAmount === undefined || formikRef.current?.values?.orderPaymentAmount === null) {
            EnqueueSnackbar("مبلغ نمی تواند خالی باشد.", "error")
        } else if (Number(formikRef.current?.values?.orderPaymentAmount.replace(/,/g, "")) > calculateTotalAmount(orders, orderService)) {
            EnqueueSnackbar("مبلغ تسویه از مبلغ کل نمی تواند بیشتر باشد.", "error")
        } else if (new Date(moment(new Date()).format("jYYYY/jMM/jDD")) > new Date(formikRef.current?.values?.orderPaymentDate)) {
            EnqueueSnackbar("تاریخ تسویه نمی تواند از تاریخ سفارش کمتر باشد.", "error")
        } else if (currentTotalPayment + Number(formikRef.current?.values?.orderPaymentAmount.replace(/,/g, "")) > calculateTotalAmount(orders, orderService)) {
            EnqueueSnackbar("مجموع مبالغ تسویه نمی تواند از مبلغ کل بیشتر باشد.", "error")
        } else if (formikRef.current?.values?.orderPaymentAmount === "0" || formikRef.current?.values?.orderPaymentAmount === "") {
            EnqueueSnackbar("مقدار صفر یا مقدار خالی برای مبلغ نامعتبر می باشد .", "error")
        }
        else {
            setOrderPayment([...orderPaymentCP, orderPaymentData])
            formikRef.current?.setFieldValue("orderPaymentAmount", sliceNumberPriceRial(calculateProximateAmount(orders, [...orderPaymentCP, orderPaymentData], orderService)))
            formikRef.current?.setFieldValue("orderPaymentDaysAfterExit", "")
            formikRef.current?.setFieldValue("orderPaymentDate", "")
        }
    }
    
    const handleDeletePayment = (params: { id: number }) => {
        const cpOrderPayment = [...orderPayment]
        let orderPaymentFilter = cpOrderPayment.splice(1)
        setOrderPayment(orderPaymentFilter)
        formikRef.current?.setFieldValue("orderPaymentAmount", sliceNumberPriceRial(calculateProximateAmount(orders, orderPaymentFilter, orderService)))
    }

    const paymentBeforSubmit = [
        { id: 1, header: "مبلغ(ریال)", accessor: "orderPaymentAmount", render: (params: any) => {
            return <Typography variant="h4" className='text-green-500'>{params.orderPaymentAmount}</Typography>
        } },
        { id: 2, header: "تاریخ تسویه", accessor: "orderPaymentDate" },
        {
            id: 3, header: "حذف", accessor: "", render: (params: any) => {
                return <IconButton onClick={() => handleDeletePayment(params)}>
                    <DeleteOutlineRounded className='!text-red-500' />
                </IconButton>
            }
        },
    ]
    const paymentAfterSubmit = [
        { id: 1, header: "مبلغ(ریال)", accessor: "orderPaymentAmount", render: (params: any) => {
            return <Typography variant="h4" className='text-green-500'>{params.orderPaymentAmoun}</Typography>
        } },
        { id: 2, header: "تاریخ تسویه", accessor: "orderPaymentDate" },
    ]


    let renderColumns = postSaleOrder?.data?.succeeded ? paymentAfterSubmit : paymentBeforSubmit


    return (
        <ReusableCard cardClassName="bg-gradient-to-r from-gray-100">
            <Typography variant="h2" color="primary">
                تسویه حساب
            </Typography>
            <Box component="div" className="mt-4">
                <Box component="div" className="md:flex space-y-4 md:space-y-0 gap-x-2 my-4">
                    <FormikPrice disabled={postSaleOrder?.data?.succeeded} name="orderPaymentAmount" label="مبلغ" InputProps={{
                        inputProps: {
                            style: {
                                textAlign: "center",
                                fontWeight: "bold",
                            },
                        },
                    }} />
                    <FormikInput disabled={postSaleOrder?.data?.succeeded} name="orderPaymentDaysAfterExit" label="روز" boxClassName="md:w-[50%]" InputProps={{
                        inputProps: {
                            style: {
                                textAlign: "center",
                                fontWeight: "bold",
                            },
                        },
                    }} />
                    <Box component="div" className="flex w-full">
                        <FormikDatepicker disabled={postSaleOrder?.data?.succeeded} name="orderPaymentDate" label="تاریخ" />
                    </Box>
                    <Button disabled={postSaleOrder?.data?.succeeded} onClick={handleSetPayment} className="!w-[120px]" variant="contained">
                         <Typography>افزودن</Typography>
                    </Button>
                </Box>
                <MuiTable onDoubleClick={() => { }} columns={renderColumns} data={orderPayment} />
                <Box component="div" className="flex flex-col justify-between mt-8">
                    <Box component="div" className="flex mt-8">
                        <Typography variant="h4" className="flex items-center text-gray-500">
                            جمع کل مبالغ تسویه:
                        </Typography>
                        <Typography variant="h4" className="flex items-center px-4">
                            {sliceNumberPriceRial(orderPayment.reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.orderPaymentAmount.replace(/,/g, ""), 10), 0))} ریال
                        </Typography>
                    </Box>
                    <Box component="div" className="flex mt-8">
                        <Typography variant="h4" className="flex items-center text-gray-500">
                            قیمت کل:
                        </Typography>
                        <Typography variant="h4" className="flex items-center px-4">
                            {sliceNumberPriceRial(totalAmount)} ریال
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </ReusableCard>
    )
}

export default memo(OrderPayment)