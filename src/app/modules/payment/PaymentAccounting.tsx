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
import ActiveText from "../../../_cloner/components/ActiveText"


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
            {
                field: 'receivePayCode', renderCell: (params: any) => {
                    return <Typography variant="h3">{params.value}</Typography >;
                }, headerName: 'شماره ثبت', headerClassName: "headerClassName", minWidth: 80
            },
            {
                field: 'receivePaymentSourceFromDesc', headerName: 'دریافت از',
                renderCell: (value: any) => (
                    <Typography variant="h3">{value.row.receivePaymentSourceFromDesc + " " + (value.row?.receiveFromCustomerName === null ? "" : value.row?.receiveFromCustomerName)}</Typography >
                ),
                headerClassName: "headerClassName", minWidth: 240
            },
            {
                field: 'receivePaymentSourceToDesc',
                renderCell: (value: any) => (
                    <Typography variant="h3">{value.row.receivePaymentSourceToDesc + " " + (value.row?.payToCustomerName === null ? "" : value.row?.payToCustomerName)}</Typography >
                ), headerName: 'پرداخت به', headerClassName: "headerClassName", minWidth: 240
            },
            {
                field: 'amount', headerName: 'مبلغ',
                renderCell: (value: any) => (
                    <Typography variant="h3">{separateAmountWithCommas(value.row.amount)}</Typography >
                ),
                headerClassName: "headerClassName", minWidth: 160
            },
            {
                field: 'accountOwner', renderCell: (params: any) => {
                    return <Typography variant="h3">{params.value}</Typography >;
                }, headerName: 'صاحب حساب', headerClassName: "headerClassName", minWidth: 180
            },
            {
                field: 'trachingCode', renderCell: (params: any) => {
                    return <Typography variant="h3">{params.value}</Typography >;
                }, headerName: 'کد پیگیری', headerClassName: "headerClassName", minWidth: 180
            },
            {
                field: 'companyName', renderCell: (params: any) => {
                    return <Typography variant="h3">{params.value}</Typography >;
                }, headerName: 'صاحب شرکت', headerClassName: "headerClassName", minWidth: 100
            },
            {
                field: 'contractCode', renderCell: (params: any) => {
                    return <Typography variant="h3">{params.value}</Typography >;
                }, headerName: 'شماره قرارداد', headerClassName: "headerClassName", minWidth: 100
            },
            {
                field: 'isAccountingApproval', headerName: 'تایید حسابداری؟', renderCell: (params: any) => {
                    return <ActiveText params={params} successTitle="بله" dangerTitle="خیر" />
                }, headerClassName: "headerClassName", minWidth: 100
            },
            {
                field: 'accountingApprovalDate', renderCell: (params: any) => {
                    return <Typography variant="h3">{params.value}</Typography >;
                }, headerName: 'تاریخ تایید حسابداری', headerClassName: "headerClassName", minWidth: 160
            },
            { headerName: 'جزئیات و تایید حسابداری', renderCell: renderAction, headerClassName: "headerClassName", minWidth: 260 }
        ]
        return col
    }

    const renderActions = (item: any) => {
        return <Link to={`/dashboard/payment/accounting/${item?.row?.id}`}>
            <Typography variant="h3">
                <Visibility color="secondary" />
            </Typography >
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