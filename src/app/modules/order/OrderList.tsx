import { useEffect, useState } from "react";
import { useRetrieveOrders } from "./core/_hooks";
import { Link } from "react-router-dom";
import { columns } from "./helpers/orderListColumns";
import { IOrder } from "./core/_models";
import { Button, Card, Typography } from "@mui/material";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";

const OrderList = () => {
    const { data: orders } = useRetrieveOrders();
    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        setResults(orders?.data);
    }, [orders?.data]);

    const renderAction = (item: any) => {
        return <Link
            to={`/dashboard/order/detail/${item?.data?.id}`}
            state={{ isConfirmed: false }}

        >
            <Button color='primary'>
                <Typography>جزئیات</Typography>
            </Button>

        </Link>

    }
    return (
        <>
            <Card>
                <div className="tw-w-80 md:tw-w-[40%] tw-mb-4">
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
                </div>
                <MuiDataGrid columns={columns(renderAction)} rows={results} data={orders?.data} />
            </Card>
        </>
    );
};

export default OrderList;
