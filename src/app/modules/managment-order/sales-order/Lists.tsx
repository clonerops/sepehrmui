import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip, Typography } from '@mui/material'

import { useRetrieveOrdersByMutation } from "../core/_hooks";
import { IOrder } from "../core/_models";
import { orderColumns } from "../helpers/columns";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Pagination from "../../../../_cloner/components/Pagination";
import { Print, Visibility } from "@mui/icons-material";
import SearchFromBack from "../../../../_cloner/components/SearchFromBack";

const pageSize = 100

const SalesOrderList = () => {
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<number>(1);

    const orderLists = useRetrieveOrdersByMutation()

    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        const formData = {
            pageNumber: currentPage,
            pageSize: 100,
        }
        orderLists.mutate(formData, {
            onSuccess: (response) => {
                setResults(response?.data);
            }
        })
        // eslint-disable-next-line
    }, [currentPage]);


    const renderAction = (item: any) => {
        return (
            <>
                <Tooltip title={<Typography variant='h3'>مشاهده جزئیات</Typography>}>
                    <Link
                        to={`/dashboard/sales_order/lists/${item?.row?.id}`}
                        state={{ isConfirmed: false }}
                    >
                        <Visibility color="secondary" />
                    </Link>
                </Tooltip>
                <Tooltip title={<Typography variant='h3'>فاکتور رسمی</Typography>}>
                    <Link to="/dashboard/invoiceOfficial">
                        <Print color="primary" />
                    </Link>
                </Tooltip>
            </>
        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    const onSubmit = (values: any) => {
        const formData = values?.orderCode ? {
            pageNumber: currentPage,
            pageSize: 100,
            OrderCode: +values?.orderCode
        } : {
            pageNumber: currentPage,
            pageSize: 100,
        }
        orderLists.mutate(formData, {
            onSuccess: (response) => {
                setResults(response?.data);
            }
        })
    }

    return (
        <ReusableCard>
            <SearchFromBack inputName='orderCode' initialValues={{orderCode: ""}} onSubmit={onSubmit} label="شماره سفارش" />
            <MuiDataGrid
                columns={orderColumns(renderAction)}
                rows={results}
                data={orderLists?.data?.data}
                isLoading={orderLists.isLoading}
                onDoubleClick={(item: any) => navigate(`/dashboard/sales_order/lists/${item?.row?.id}`)}
            />
            <Pagination pageCount={+orderLists?.data?.totalCount / +pageSize || 100} onPageChange={handlePageChange} />
        </ReusableCard>
    );
};

export default SalesOrderList;
