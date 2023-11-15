import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import { useRetrieveOrder } from "./core/_hooks";
import { AttachMoney, CheckBox, Description, ExitToApp, LocalShipping, Newspaper, Person } from "@mui/icons-material";
import CardTitleValue from "../../../_cloner/components/CardTitleValue";
import MuiTable from "../../../_cloner/components/MuiTable";
import { Form, Formik } from "formik";
import Backdrop from "../../../_cloner/components/Backdrop";
import moment from "moment-jalaali";
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount";
import ImagePreview from "../../../_cloner/components/ImagePreview";
import { useEffect } from "react";

const initialValues = {
    productName: "",
    proximateAmount: "",
    productPrice: "",

    invoiceTypeDesc: "",
    description: "",
    invoiceTypeCheck: false
}

const OrderConfirm = () => {
    const { id } = useParams()
    const { data, isLoading } = useRetrieveOrder(id)
    useEffect(() => {
        
    }, [id])

    const orderAndAmountInfo = [
        { id: 1, title: "شماره سفارش", icon: <Person color="secondary" />, value: data?.data?.orderCode },
        { id: 1, title: "مشتری", icon: <Person color="secondary" />, value: data?.data?.customerFirstName + " " + data?.data?.customerLastName },
        { id: 1, title: "اسم رسمی مشتری", icon: <Person color="secondary" />, value: data?.data?.officialName},
        { id: 2, title: "نوع ارسال", icon: <LocalShipping color="secondary" />, value: data?.data?.orderSendTypeDesc },
        { id: 3, title: "نوع خروج", icon: <ExitToApp color="secondary" />, value: data?.data?.exitType === 1 ? "عادی" : "بعد از تسویه" },
        { id: 4, title: "نوع کرایه", icon: <AttachMoney color="secondary" />, value: data?.data?.paymentTypeDesc },
        { id: 5, title: "نوع فاکتور", icon: <Newspaper color="secondary" />, value: data?.data?.invoiceTypeDesc },
        { id: 5, title: "وضعیت", icon: <CheckBox color="secondary" />, value: data?.data?.orderStatusDesc},
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
        { id: 1, header: "مبلغ(ریال)", accessor: "amount", render: (params: any) => <Typography className="text-green-500" variant="h3">{separateAmountWithCommas(params.amount)}</Typography> },
        { id: 2, header: "روز", accessor: "daysAfterExit" },
        { id: 3, header: "تاریخ تسویه", accessor: "paymentDate" , render: (params: any) => moment(params.paymentDate).format('jYYYYjMM/jDD') },
    ]

    if(isLoading) {
        return <Backdrop loading={isLoading} />
    }

    return (
        <>
            {/* <ReusableTab /> */}
            <Formik initialValues={initialValues} onSubmit={() => { }}>
                {({ }) => {
                    return <Form>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                            {orderAndAmountInfo.map((item: {
                                title: string,
                                icon: React.ReactNode,
                                value: any
                            }) => {
                                return <CardTitleValue title={item.title} value={item.value} icon={item.icon} />
                            })}
                            <CardTitleValue className="md:col-span-4" title={"توضیحات"} value={data?.data?.description ? data?.data?.description : "ندارد"} icon={<Description color="secondary" />} />
                        </Box>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4">
                            <ReusableCard>
                                <Typography variant="h2" color="primary" className="pb-4">بسته های خدمت</Typography>
                                <MuiTable data={data?.data?.orderServices} columns={orderServicesColumn} onDoubleClick={() => {}} />
                            </ReusableCard>
                            <ReusableCard cardClassName="col-span-2">
                                <Typography variant="h2" color="primary" className="pb-4">اقلام سفارش</Typography>
                                <MuiTable tooltipTitle={data?.data?.description ? <Typography>{data?.data?.description}</Typography> : ""} onDoubleClick={() => {}} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={data?.data?.details} columns={orderOrderColumnMain} />
                            </ReusableCard>
                        </Box>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 my-4">
                            <ReusableCard>
                                <Typography variant="h2" color="primary" className="pb-4">تسویه حساب</Typography>
                                <MuiTable data={data?.data?.orderPayments} columns={orderPaymentsColumn} onDoubleClick={() => {}} />
                            </ReusableCard>

                            <ReusableCard cardClassName="col-span-2">
                                <Typography variant="h2" color="primary" className="pb-4">ضمیمه ها</Typography>
                                <ImagePreview base64Strings={data?.data?.attachments.map((i: any) => i.fileData)} />
                            </ReusableCard>
                        </Box>
                    </Form>
                }}
            </Formik>
        </>
    )
}

export default OrderConfirm