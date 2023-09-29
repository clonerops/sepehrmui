import { useState, useEffect } from 'react'
import { useRetrieveOrders } from "./core/_hooks";
import { Link } from "react-router-dom";
import { columns } from "./helpers/orderListColumns";
import { IOrder } from './core/_models';
import { Box, Button, Card, Typography } from '@mui/material';
import FuzzySearch from '../../../_cloner/helpers/Fuse';
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid';

const OrderConfirm = () => {
    const { data: orders } = useRetrieveOrders();
    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        setResults(orders?.data);
    }, [orders?.data]);

    const renderAction = (item: any) => {
        return <Link
            to={`/dashboard/order/detail/${item?.data?.id}`}
            state={{isConfirmed: true}}
        >
            <Button color='primary'>
                <Typography>اقدام به ثبت</Typography>
            </Button>
        </Link>

    }
    return (
        <>
            <Card >
            <Box component="div" className="w-80 md:w-[40%] mb-4">
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
                <MuiDataGrid columns={columns(renderAction)} rows={results} data={orders?.data} />
            </Card>
        </>
    );
};

export default OrderConfirm;
