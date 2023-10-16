import { useState, useEffect } from "react"
import { useGetRecievePaymentByApproved } from "./core/_hooks"
import { Link } from "react-router-dom"
import Backdrop from "../../../_cloner/components/Backdrop"
import { Box, Button, Card, Container, Typography } from "@mui/material"
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../_cloner/helpers/Fuse"
import { IPayment } from "./core/_models"
import React from "react"
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount"
import { Visibility } from "@mui/icons-material"


const PaymentAccounting = () => {
    // Fetching
    const { mutate, data, isLoading } = useGetRecievePaymentByApproved()
    // States
    const [results, setResults] = useState<IPayment[]>([]);

    useEffect(() => {
        setResults(data?.data);
    }, [data?.data]);
    useEffect(() => {
        mutate("0")
        // eslint-disable-next-line
    }, [])

    const columns = (renderAction: any) => {
        const col = [
            { field: 'receivePayCode', renderCell: (params: any) => {
                return <Typography>{params.value}</Typography>;
            }, headerName: 'شماره ثبت', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 80 },
            {
                field: 'receivePaymentSourceFromDesc', headerName: 'دریافت از',
                renderCell: (value: any) => (
                    <Typography>{value.row.receivePaymentSourceFromDesc + " " + (value.row?.receiveFromCustomerName === null ? "" : value.row?.receiveFromCustomerName)}</Typography>
                ),
                headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 240
            },
            {
                field: 'receivePaymentSourceToDesc',
                renderCell: (value: any) => (
                    <Typography>{value.row.receivePaymentSourceToDesc + " " + (value.row?.payToCustomerName === null ? "" : value.row?.payToCustomerName)}</Typography>
                ), headerName: 'پرداخت به', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 240
            },
            {
                field: 'amount', headerName: 'مبلغ',
                renderCell: (value: any) => (
                    <Typography>{separateAmountWithCommas(value.row.amount)}</Typography>
                ),
                headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100
            },
            {
                field: 'accountOwner', renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                }, headerName: 'صاحب حساب', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 180
            },
            {
                field: 'trachingCode', renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                }, headerName: 'کد پیگیری', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 180
            },
            {
                field: 'companyName', renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                }, headerName: 'صاحب شرکت', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100
            },
            {
                field: 'contractCode', renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                }, headerName: 'شماره قرارداد', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100
            },
            {
                field: 'isAccountingApproval', headerName: 'تایید حسابداری؟', renderCell: (params: any) => (
                    params.value === true ? <Typography className="text-green-500">بله</Typography> : <Typography className="text-red-500">خیر</Typography>
                ), headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100
            },
            {
                field: 'accountingApprovalDate', renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                }, headerName: 'تاریخ تایید حسابداری', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160
            },
            { headerName: 'جزئیات و تایید حسابداری', renderCell: renderAction, headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 260 }
        ]
        return col
    }

    const renderActions = (item: any) => {
        return <Link to={`/dashboard/payment/accounting/${item?.row?.id}`}>
            <Button variant="contained" color="secondary">
                <Typography>
                    <Visibility />
                </Typography>
            </Button>
        </Link>

    }
    return (
        <>
            {isLoading && <Backdrop loading={isLoading} />}
            <Card className="p-8">
                <Box component="div" className="w-auto md:w-[40%] mb-4">
                    <FuzzySearch
                        keys={[
                            "receivePayCode",
                            "receivePaymentSourceFromDesc",
                            "receivePaymentSourceToDesc",
                            "amount",
                            "accountOwner",
                            "trachingCode",
                            "companyName",
                            "contractCode",
                            "isAccountingApproval",
                            "accountingApprovalDate",
                            "accountingApproverId",
                        ]}
                        data={data?.data}
                        threshold={0.5}
                        setResults={setResults}
                    />
                </Box>
                <MuiDataGrid columns={columns(renderActions)} rows={results} data={data?.data} />
            </Card>
        </>
    )
}

export default PaymentAccounting