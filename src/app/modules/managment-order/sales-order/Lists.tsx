import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip, Typography } from '@mui/material'

import { useRetrieveOrdersByMutation } from "../core/_hooks";
import { IOrder } from "../core/_models";
import { Print, Visibility } from "@mui/icons-material";
import { OrderColumn } from "../../../../_cloner/helpers/columns";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Pagination from "../../../../_cloner/components/Pagination";
import SearchFromBack from "../../../../_cloner/components/SearchFromBack";
import Backdrop from "../../../../_cloner/components/Backdrop";
import { InvoiceType } from "../../../../_cloner/helpers/Enums";

const pageSize = 100

const SalesOrderList = () => {
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<number>(1);

    const orderLists = useRetrieveOrdersByMutation()

    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        const formData = {
            pageNumber: currentPage,
            pageSize: pageSize,
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
            <div className="flex flex-row gap-x-4">
                <Tooltip title={<Typography variant='h3'>مشاهده جزئیات</Typography>}>
                    <Link
                        to={`/dashboard/sales_order/lists/${item?.row?.id}`}
                        state={{ isConfirmed: false }}
                    >
                        <Visibility color="secondary" />
                    </Link>
                </Tooltip>
                <Tooltip title={<Typography variant='h3'>فاکتور</Typography>}>
                    <a target='_blank'  href={`/dashboard/${[InvoiceType.Mahfam, InvoiceType.Sepehr].includes(item.row.invoiceTypeId) ? "invoiceOfficial" : "invoiceNotOfficial"}/${item?.row?.id}`}>
                        <Print color="primary" />
                    </a>
                </Tooltip>
            </div>
        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    const onSubmit = (values: any) => {
        const formData = values?.orderCode ? {
            pageNumber: currentPage,
            pageSize: pageSize,
            OrderCode: +values?.orderCode
        } : {
            pageNumber: currentPage,
            pageSize: pageSize,
        }
        orderLists.mutate(formData, {
            onSuccess: (response) => {
                setResults(response?.data);
            }
        })
    }

    return (
        <>
            {orderLists.isLoading && <Backdrop loading={orderLists.isLoading} />}
            <ReusableCard>
                <SearchFromBack inputName='orderCode' initialValues={{orderCode: ""}} onSubmit={onSubmit} label="شماره سفارش" />
                <MuiDataGrid
                    columns={OrderColumn(renderAction)}
                    rows={results}
                    data={orderLists?.data?.data}
                    onDoubleClick={(item: any) => navigate(`/dashboard/sales_order/lists/${item?.row?.id}`)}
                />
                <Pagination pageCount={+orderLists?.data?.totalCount / +pageSize || 100} onPageChange={handlePageChange} />
            </ReusableCard>
        </>
    );
};

export default SalesOrderList;
