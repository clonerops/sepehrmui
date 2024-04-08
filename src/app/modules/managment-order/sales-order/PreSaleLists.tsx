import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Button, Typography} from '@mui/material'

import { useRetrieveOrders } from "../core/_hooks";
import { IOrder } from "../core/_models";
import { orderColumns } from "../helpers/columns";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
// import Pagination from "../../../../_cloner/components/Pagination";

// const pageSize = 20

const PreSaleLists = () => {
    // const [currentPage, setCurrentPage] = useState<number>(1);

    let formData = {
        pageNumber: 1,
        pageSize: 100,    
    }

    const { data: orders, isLoading } = useRetrieveOrders(formData);

    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        setResults(orders?.data);
    }, [orders?.data]);


    const renderAction = (item: any) => {
        return (
            <Link
                to={`/dashboard/sales_order/presale-to-urgentsale/${item?.row?.id}`}
                state={{ isConfirmed: false }}
            >
                <Button variant="contained" color="secondary"> 
                    <Typography variant="h4" color="primary">جزئیات و تبدیل</Typography>
                </Button>

            </Link>
        );
    };

    // const handlePageChange = (selectedItem: { selected: number }) => {
    //     setCurrentPage(selectedItem.selected + 1);
    // };
    
    return (
        <ReusableCard>
            <div className="w-auto md:w-[40%] mb-4">
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
            </div>
            <MuiDataGrid
                columns={orderColumns(renderAction)}
                rows={results}
                data={orders?.data}
                isLoading={isLoading}
            />
            {/* <Pagination pageCount={+orders?.totalCount / +pageSize || 100} onPageChange={handlePageChange} /> */}
        </ReusableCard>
    );
};

export default PreSaleLists;
