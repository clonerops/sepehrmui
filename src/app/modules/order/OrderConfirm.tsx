import { useState, useEffect } from "react";
import { useRetrieveOrders } from "./core/_hooks";
import { Link } from "react-router-dom";
import { columns } from "./helpers/orderColumns";
import { IOrder } from "./core/_models";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import React from "react";

const OrderConfirm = () => {
    const { data: orders } = useRetrieveOrders();
    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        setResults(orders?.data);
    }, [orders?.data]);

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
                        "description",
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
