import { Box, IconButton, Typography } from "@mui/material";
import { AddCircle, DeleteOutlineRounded } from "@mui/icons-material";
import moment from "moment-jalaali";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FormikPrice from "../../product/components/FormikPrice";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker";
import MuiTable from "../../../../_cloner/components/MuiTable";

import { IOrderItems, IOrderPayment, IOrderService } from "../core/_models";
import { sliceNumberPriceRial } from "../../../../_cloner/helpers/sliceNumberPrice";
import { calculateProximateAmount, calculateTotalAmount } from "../helpers/functions";
import { FormikErrors, FormikProps } from "formik";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import { FC } from "react";

interface IProps {
    postSaleOrder: any,
    orderPayment: IOrderPayment[],
    setOrderPayment: (value: React.SetStateAction<IOrderPayment[]>) => void
    formikRef: React.RefObject<FormikProps<any>>
    orderService: IOrderService[],
    orders: IOrderItems[]
}


const OrderPayment:FC<IProps> = ({ postSaleOrder, orderPayment, orderService, formikRef, orders, setOrderPayment }) => {

    const handleSetPayment = () => {
        const orderPaymentCP = [...orderPayment]
        const orderPaymentData: IOrderPayment = {
            amount: formikRef.current?.values.amount,
            daysAfterExit: +formikRef.current?.values?.number,
            paymentDate: formikRef.current?.values?.settlement,
            paymentType: 0
        }

        const currentTotalPayment = orderPayment.reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue?.amount.replace(/,/g, ""), 10), 0);

        if(formikRef.current?.values?.settlement === undefined || formikRef.current?.values?.settlement === null) {
            EnqueueSnackbar("تاریخ نمی تواند خالی باشد.", "error")
        } else if(formikRef.current?.values?.amount === undefined || formikRef.current?.values?.amount === null) {
            EnqueueSnackbar("مبلغ نمی تواند خالی باشد.", "error")
        } else if (Number(formikRef.current?.values?.amount.replace(/,/g, "")) > calculateTotalAmount(orders, orderService)) {
            EnqueueSnackbar("مبلغ تسویه از مبلغ کل نمی تواند بیشتر باشد.", "error")
        } else if (new Date(moment(new Date()).format("jYYYY/jMM/jDD")) > new Date(formikRef.current?.values?.settlement)) {
            EnqueueSnackbar("تاریخ تسویه نمی تواند از تاریخ سفارش کمتر باشد.", "error")
        } else if (currentTotalPayment + Number(formikRef.current?.values?.amount.replace(/,/g, "")) > calculateTotalAmount(orders, orderService)) {
            EnqueueSnackbar("مجموع مبالغ تسویه نمی تواند از مبلغ کل بیشتر باشد.", "error")
        } else if (formikRef.current?.values?.amount === "0" || formikRef.current?.values?.amount === "") {
            EnqueueSnackbar("مقدار صفر یا مقدار خالی برای مبلغ نامعتبر می باشد .", "error")
        }
        else {
            setOrderPayment([...orderPaymentCP, orderPaymentData])
            formikRef.current?.setFieldValue("amount", sliceNumberPriceRial(calculateProximateAmount(orders, [...orderPaymentCP, orderPaymentData], orderService)))
            formikRef.current?.setFieldValue("number", "")
            formikRef.current?.setFieldValue("settlement", "")
        }
    }

    const handleDeletePayment = (params: { id: number }) => {
        const orderPaymentFilter = orderPayment.filter((item: IOrderPayment) => item.id !== params.id)
        setOrderPayment(orderPaymentFilter)
        formikRef.current?.setFieldValue("amount", sliceNumberPriceRial(calculateProximateAmount(orders, orderPaymentFilter, orderService)))
    }

    const paymentBeforSubmit = [
        { id: 1, header: "مبلغ", accessor: "amount" },
        { id: 2, header: "تاریخ تسویه", accessor: "paymentDate" },
        {
            id: 3, header: "حذف", accessor: "", render: (params: any) => {
                return <IconButton onClick={() => handleDeletePayment(params)}>
                    <DeleteOutlineRounded className='!text-red-500' />
                </IconButton>
            }
        },
    ]
    const paymentAfterSubmit = [
        { id: 1, header: "مبلغ", accessor: "amount" },
        { id: 2, header: "تاریخ تسویه", accessor: "paymentDate" },
    ]


    let renderColumns = postSaleOrder?.data?.data?.succeeded ? paymentAfterSubmit : paymentBeforSubmit


    return (
        <ReusableCard>
            <Typography variant="h2" color="primary">
                تسویه حساب
            </Typography>
            <Box component="div" className="mt-4">
                <Box component="div" className="md:flex space-y-4 md:space-y-0 gap-x-2 my-4">
                    <FormikPrice disabled={postSaleOrder?.data?.data?.succeeded} name="amount" label="مبلغ" InputProps={{
                        inputProps: {
                            style: {
                                textAlign: "center",
                                fontWeight: "bold",
                            },
                        },
                    }} />
                    <FormikInput disabled={postSaleOrder?.data?.data?.succeeded} name="number" label="روز" boxClassName="md:w-[50%]" InputProps={{
                        inputProps: {
                            style: {
                                textAlign: "center",
                                fontWeight: "bold",
                            },
                        },
                    }} />
                    <Box component="div" className="flex w-full">
                        <FormikDatepicker disabled={postSaleOrder?.data?.data?.succeeded} name="settlement" label="تاریخ" />
                    </Box>
                    <IconButton onClick={handleSetPayment}>
                        <AddCircle color="secondary" />
                    </IconButton>
                </Box>
                <MuiTable onDoubleClick={() => { }} columns={renderColumns} data={orderPayment} />
                <Box component="div" className="flex flex-col justify-between mt-8">
                    <Box component="div" className="flex mt-8">
                        <Typography variant="h4" className="flex items-center text-gray-500">
                            جمع کل مبالغ تسویه:
                        </Typography>
                        <Typography variant="h4" className="flex items-center px-4">
                            {sliceNumberPriceRial(orderPayment.reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.amount.replace(/,/g, ""), 10), 0))} ریال
                        </Typography>
                    </Box>
                    <Box component="div" className="flex mt-8">
                        <Typography variant="h4" className="flex items-center text-gray-500">
                            قیمت کل:
                        </Typography>
                        <Typography variant="h4" className="flex items-center px-4">
                            {sliceNumberPriceRial(calculateTotalAmount(orders, orderService))} ریال
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </ReusableCard>
    )
}

export default OrderPayment