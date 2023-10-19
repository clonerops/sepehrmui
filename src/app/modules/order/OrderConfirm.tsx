import { useState, useEffect } from "react";
import { useRetrieveOrders } from "./core/_hooks";
import { Link } from "react-router-dom";
import { columns } from "./helpers/orderColumns";
import { IOrder } from "./core/_models";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import React from "react";
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount";

const OrderConfirm = () => {
    const { data: orders } = useRetrieveOrders();
    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        setResults(orders?.data);
    }, [orders?.data]);

    const columns = (renderAction: any) => {
        const col = [
            {
                field: 'orderCode', renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: 'شماره سفارش', headerClassName: "headerClassName", width: 100
            },
            {
                field: 'registerDate', renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: 'تاریخ ثبت سفارش', headerClassName: "headerClassName", width: 120
            },
            {
                field: 'customerName', renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: 'سفارش دهنده', headerClassName: "headerClassName", width: 160
            },
            {
                field: 'orderSendTypeDesc', renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: 'نحوه ارسال', headerClassName: "headerClassName", width: 120
            },
            {
                field: 'paymentTypeDesc', renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: 'نحوه پرداخت', headerClassName: "headerClassName", width: 120
            },
            {
                field: 'invoiceTypeDesc', renderCell: (params: any) => {
                    return <Typography>{params.value}</Typography>;
                },
                headerName: 'نوع فاکتور', headerClassName: "headerClassName", width: 120
            },
            {
                field: 'totalAmount', renderCell: (params: any) => {
                    return <Typography>{separateAmountWithCommas(params.value)}</Typography>;
                },
                headerName: 'مبلغ کل', headerClassName: "headerClassName", width: 120
            },
            {
                field: 'exitType', headerName: 'نوع خروج', renderCell: (params: any) => (
                    params.value === 1 ? <Typography className="text-green-500">عادی</Typography>: <Typography className="text-blue-500">بعد از تسویه</Typography>
                ), headerClassName: "headerClassName", width: 120
            },
            { headerName: 'جزئیات', flex:1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
        ]
        return col
    }

    const renderAction = (item: any) => {
        return (
            <Link
                to={`/dashboard/order/detail/${item?.row?.id}`}
                state={{ isConfirmed: true }}
            >
                <Button variant="contained" color="secondary">
                    <Typography>اقدام به ثبت تایید</Typography>
                </Button>
            </Link>
        );
    };
    return (
        <Card className="p-8">
            <Typography color="secondary" variant="h1" className="pb-2 !text-sm md:!text-2xl">
                لیست سفارشات جهت تایید
            </Typography>
            <Box component="div" className="w-auto md:w-[40%]">
                <FuzzySearch
                    keys={[
                        "orderCode",
                        "registerDate",
                        "customerFirstName",
                        "customerLastName",
                        "orderSendTypeDesc",
                        "paymentTypeDesc",
                        "invoiceTypeDesc",
                        "totalAmount",
                        "exitType",
                    ]}
                    data={orders?.data}
                    threshold={0.5}
                    setResults={setResults}
                />
            </Box>
            <MuiDataGrid
                columns={columns(renderAction)}
                rows={results}
                data={orders?.data}
            />
        </Card>
    );
};

export default OrderConfirm;
