import { useEffect, useState } from "react";
import { useRetrieveOrders } from "./core/_hooks";
import { Link } from "react-router-dom";
import { IOrder } from "./core/_models";
import { Box, Typography } from "@mui/material";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import {
    Visibility,
} from "@mui/icons-material";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import { orderColumns } from "./helpers/columns";
import Pagination from "../../../_cloner/components/Pagination";
import Backdrop from "../../../_cloner/components/Backdrop";

const pageSize = 20

const OrderList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    let formData = {
        pageNumber: currentPage,
        pageSize: pageSize,    
    }

    const { data: orders, isLoading } = useRetrieveOrders(formData);

    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        setResults(orders?.data);
    }, [orders?.data]);


    const renderAction = (item: any) => {
        return (
            <Link
                to={`/dashboard/order/detail/${item?.row?.id}`}
                state={{ isConfirmed: false }}
            >
                <Visibility color="secondary" />
            </Link>
        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };
    
    return (
        <ReusableCard>
            <Typography
                color="primary"
                variant="h1"
                className="pb-2 !text-sm md:!text-2xl"
            >
                لیست سفارشات
            </Typography>
            <Box component="div" className="w-auto md:w-[40%] mb-4">
                <FuzzySearch
                    keys={[
                        "orderCode",
                        "registerDate",
                        "customerFirstName",
                        "customerLastName",
                        "orderSendTypeDesc",
                        "paymentTypeDesc",
                        "invoiceTypeDesc",
                        "isTemporary",
                        "totalAmount",
                        "exitType",
                    ]}
                    data={orders?.data}
                    threshold={0.5}
                    setResults={setResults}
                />
            </Box>
            <MuiDataGrid
                columns={orderColumns(renderAction)}
                rows={results}
                data={orders?.data}
                isLoading={isLoading}
            />
            <Pagination pageCount={20} onPageChange={handlePageChange} />
        </ReusableCard>
    );
};

export default OrderList;
