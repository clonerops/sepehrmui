import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import { useRetrieveOrder } from "./core/_hooks";
import { AttachMoney, CheckBox, Description, ExitToApp, LocalShipping, Newspaper, Person } from "@mui/icons-material";
import CardTitleValue from "../../../_cloner/components/CardTitleValue";
import MuiTable from "../../../_cloner/components/MuiTable";
import { Form, Formik } from "formik";
import Backdrop from "../../../_cloner/components/Backdrop";

const initialValues = {
    productName: "",
    proximateAmount: "",
    productPrice: "",

    invoiceTypeDesc: "",
    description: "",
    invoiceTypeCheck: false
}

type Props = {
    data: any | undefined;
    isConfirm?: boolean;
    isError: boolean;
    isLoading: boolean;
}

const OrderConfirm = (props: Props) => {
    const { id } = useParams()
    const { data, isLoading } = useRetrieveOrder(id)

    const orderAndAmountInfo = [
        { id: 1, title: "مشتری", icon: <Person color="secondary" />, value: data?.data?.customerFirstName + " " + data?.data?.customerLastName },
        { id: 2, title: "نوع ارسال", icon: <LocalShipping color="secondary" />, value: data?.data?.orderSendTypeDesc },
        { id: 3, title: "نوع خروج", icon: <ExitToApp color="secondary" />, value: data?.data?.exitType === 1 ? "عادی" : "بعد از تسویه" },
        { id: 4, title: "نوع کرایه", icon: <AttachMoney color="secondary" />, value: data?.data?.paymentTypeDesc },
        { id: 5, title: "نوع فاکتور", icon: <Newspaper color="secondary" />, value: data?.data?.invoiceTypeDesc },
        { id: 5, title: "وضعیت ثبت", icon: <CheckBox color="secondary" />, value: data?.data?.isTemporary === false ? "ثبت نهایی" : "ثبت موقت"  },
    ]
    const orderOrderColumnMain = [
        { id: 1, header: "نام کالا", accessor: "productName" },
        { id: 2, header: "انبار", accessor: "warehouseName" },
        { id: 3, header: "مقدار", accessor: "proximateAmount" },
        { id: 4, header: "قیمت", accessor: "price" },
    ]
    const orderServicesColumn = [
        { id: 1, header: "نوع خدمت", accessor: "service", render: (params: any) => <Typography>{params.service.description}</Typography> },
        { id: 2, header: "هزینه", accessor: "description" },
    ]
    const orderPaymentsColumn = [
        { id: 1, header: "مبلغ", accessor: "productName" },
        { id: 2, header: "روز", accessor: "warehouseName" },
        { id: 3, header: "تاریخ", accessor: "proximateAmount" },
    ]

    if(isLoading) {
        return <Backdrop loading={isLoading} />
    }

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={() => { }}>
                {({ values, setFieldValue }) => {
                    return <Form>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-4 text-right gap-4 my-4">
                            {orderAndAmountInfo.map((item: {
                                title: string,
                                icon: React.ReactNode,
                                value: any
                            }) => {
                                return <CardTitleValue title={item.title} value={item.value} icon={item.icon} />
                            })}
                            <Box component="div" className="col-span-2">
                                <CardTitleValue title={"توضیحات"} value={data?.data?.description ? data?.data?.description : "ندارد"} icon={<Description color="secondary" />} />
                            </Box>
                        </Box>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <ReusableCard>
                                <Typography variant="h2" color="primary" className="pb-4">بسته های خدمت</Typography>
                                <MuiTable data={data?.data?.orderServices} columns={orderServicesColumn} onDoubleClick={() => {}} />
                            </ReusableCard>
                            <ReusableCard cardClassName="col-span-2">
                                <Typography variant="h2" color="primary" className="pb-4">اقلام سفارش</Typography>
                                <MuiTable tooltipTitle={data?.data?.description ? <Typography>{data?.data?.description}</Typography> : ""} onDoubleClick={() => {}} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={data?.data?.details} columns={orderOrderColumnMain} />
                            </ReusableCard>
                            <ReusableCard>
                                <Typography variant="h2" color="primary" className="pb-4">تسویه حساب</Typography>
                                <MuiTable data={data?.data?.orderPayments} columns={orderPaymentsColumn} onDoubleClick={() => {}} />
                            </ReusableCard>
                        </Box>
                    </Form>
                }}
            </Formik>
        </>
    )
}

export default OrderConfirm