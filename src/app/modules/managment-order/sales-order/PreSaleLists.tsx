import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Button, Typography} from '@mui/material'

import { useRetrieveOrders } from "../core/_hooks";
import { IOrder } from "../core/_models";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FuzzySearch from "../../../../_cloner/helpers/fuse";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import { OrderColumn } from "../../../../_cloner/helpers/columns";
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
         // eslint-disable-next-line
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
                columns={OrderColumn(renderAction)}
                rows={results}
                data={orders?.data}
                isLoading={isLoading}
                onDoubleClick={() => {}}
            />
            {/* <Pagination pageCount={+orders?.totalCount / +pageSize || 100} onPageChange={handlePageChange} /> */}
        </ReusableCard>
    );
};

export default PreSaleLists;
