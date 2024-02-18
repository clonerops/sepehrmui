import { useEffect, useState } from "react";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {Box} from '@mui/material'

import { useRetrievePurchaserOrders } from "../core/_hooks";
import { IOrder } from "../core/_models";
import { orderColumns, purchaserOrderColumns } from "../helpers/columns";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Pagination from "../../../../_cloner/components/Pagination";

const pageSize = 20

const PurchaserOrderList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    let formData = {
        pageNumber: currentPage,
        pageSize: pageSize,    
    }

    const { data: orders, isLoading } = useRetrievePurchaserOrders(formData);

    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        setResults(orders?.data);
    }, [orders?.data]);


    const renderAction = (item: any) => {
        return (
            <Link
                to={`/dashboard/purchaser_order/lists/${item?.row?.id}`}
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
                    setResults={setResults}
                />
            </Box>
            <MuiDataGrid
                columns={purchaserOrderColumns(renderAction)}
                rows={results || [{}]}
                data={orders?.data || [{}]}
                isLoading={isLoading}
            />
            <Pagination pageCount={+orders?.totalCount / +pageSize || 100} onPageChange={handlePageChange} />
        </ReusableCard>
    );
};

export default PurchaserOrderList;
