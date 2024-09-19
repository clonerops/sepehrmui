import { useEffect, useState } from "react";
import { Visibility } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from '@mui/material'

import { useRetrievePurchaserOrdersByMutation } from "../core/_hooks";
import { IOrder } from "../core/_models";
import { PurchaserOrderColumn } from "../../../../_cloner/helpers/columns";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Pagination from "../../../../_cloner/components/Pagination";
import SearchFromBack from "../../../../_cloner/components/SearchFromBack";
import { useAuth } from "../../../../_cloner/helpers/checkUserPermissions";
import AccessDenied from "../../../routing/AccessDenied";

const pageSize = 100

const PurchaserOrderList = () => {
    const { hasPermission } = useAuth()
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<number>(1);

    const orderLists = useRetrievePurchaserOrdersByMutation(hasPermission("GetAllPurchaseOrders"))

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
                <Link
                    to={`/dashboard/purchaser_order/lists/${item?.row?.id}`}
                    state={{ isConfirmed: false }}
                >
                    <Button variant="contained" color="secondary">
                        <Visibility color="primary" /> <Typography variant="h5">جزئیات</Typography>
                    </Button>
                </Link>
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

    if(!hasPermission("GetAllPurchaseOrders"))
        return <AccessDenied />

    return (
        <ReusableCard>
            <SearchFromBack inputName='orderCode' initialValues={{orderCode: ""}} onSubmit={onSubmit} label="شماره سفارش" />
            <MuiDataGrid
                columns={PurchaserOrderColumn(renderAction)}
                rows={results || [{}]}
                data={orderLists?.data?.data || [{}]}
                isLoading={orderLists?.isLoading}
                onDoubleClick={(item: any) => navigate(`/dashboard/purchaser_order/lists/${item?.row?.id}`)}
                hideFooter
            />
            <Pagination pageCount={+orderLists?.data?.totalCount / +pageSize || 100} onPageChange={handlePageChange} />
        </ReusableCard>
    );
};

export default PurchaserOrderList;
