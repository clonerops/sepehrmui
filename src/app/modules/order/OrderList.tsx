import { useEffect, useState } from "react";
import { useRetrieveOrders, useRetrieveOrdersByMutation } from "./core/_hooks";
import { Link } from "react-router-dom";
import { IOrder } from "./core/_models";
import { Box, Button, Typography } from "@mui/material";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import {
    KeyboardArrowLeft,
    KeyboardArrowRight,
    Visibility,
} from "@mui/icons-material";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import { orderColumns } from "./helpers/columns";
import ReactPaginate from "react-paginate";
import PaginationComponent from "../../../_cloner/components/Pagination";
import Pagination from "../../../_cloner/components/Pagination";

const OrderList = () => {
    const { data: orders } = useRetrieveOrders();
    // const { mutate, data: orders } = useRetrieveOrdersByMutation();
    const [results, setResults] = useState<IOrder[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(200);
    const [pageNumber, setPageNumber] = useState<number>(0);

    useEffect(() => {
        setResults(orders?.data);
    }, [orders?.data]);

    // useEffect(() => {
    //     const formData = {
    //         pageSize,
    //         pageNumber
    //     }
    //     mutate(formData, {
    //         onSuccess: (message) => {
    //             setResults(message?.data);
    //         }
    //     })
    // }, [pageSize, pageNumber]);

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

    // const handlePageChange = (selectedItem: { selected: number }) => {
    //     setPageNumber(selectedItem.selected);
    // };

    // console.log("pageSize", pageSize)
    // console.log("setPageNumber", pageNumber)

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
            />
            {/* <Pagination pageCount={10} onPageChange={handlePageChange} /> */}
        </ReusableCard>
    );
};

export default OrderList;
