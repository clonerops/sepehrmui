import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Fab, Tooltip, Typography } from "@mui/material";
import { ApprovalRounded } from "@mui/icons-material";
import { IOrder } from "../../managment-order/core/_models";
import { useRetrievePurchaserOrdersByMutation } from "../../managment-order/core/_hooks";
import { purchaserOrderListsForBetweenWarehouseColumns } from "./_columns";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Pagination from "../../../../_cloner/components/Pagination";
import Backdrop from "../../../../_cloner/components/Backdrop";
import SearchFromBack from "../../../../_cloner/components/SearchFromBack";

const pageSize = 100;

const TransferBetweenWarehouse = () => {
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [results, setResults] = useState<IOrder[]>([]);

    const { mutate, data: orders, isLoading } = useRetrievePurchaserOrdersByMutation();

    const handleFilter = (values: any, isNotTransferedToWarehouse = true) => {
        let formData = {
            pageNumber: currentPage,
            pageSize: pageSize,
            IsNotTransferedToWarehouse: !isNotTransferedToWarehouse ? null : true ,
            PurchaseOrderStatusId: isNotTransferedToWarehouse ? null : 4,
            OrderCode: null
        }
        if(values?.orderCode) formData.OrderCode = values?.orderCode

        mutate(formData,{
            onSuccess: (response) => {
                setResults(response?.data);
            }
        })

    }

    useEffect(() => {
        let formData = {
            pageNumber: currentPage,
            pageSize: pageSize,
            IsNotTransferedToWarehouse: true
        };    
        mutate(formData, {
            onSuccess: (response) => {
                setResults(response?.data);
            }
        })
        // eslint-disable-next-line
    }, [currentPage]);

    const renderAction = (item: any) => {
        return (
            <Tooltip  title={<Typography variant='h3'>اقدام به نقل و انتقال</Typography>}>
                <Link
                to={ item.row.purchaseOrderStatusId === 4 ? '' : `/dashboard/transferBetweenWarehouse/${item?.row?.id}`}
            >   
                <Fab size="small" color="secondary">
                        <ApprovalRounded />
                </Fab>
                </Link>
            </Tooltip>
        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    return (
        <>
            {isLoading && <Backdrop loading={isLoading} />}
            <ReusableCard>
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center mb-4">
                    <div className="w-full lg:w-[50%]">
                        <SearchFromBack inputName='orderCode' initialValues={{orderCode: ""}} onSubmit={handleFilter} label="شماره سفارش" />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <Button onClick={() => handleFilter(null, true)} variant="contained" className={"!bg-pink-800"}>
                            <Typography>سفارشات آماده انتقال</Typography>
                        </Button>
                        <Button onClick={() => handleFilter(null, false)
                        } variant="contained" className={"!bg-sky-800" }>
                            <Typography>سفارشات انتقال داده شده</Typography>
                        </Button>
                    </div>
                </div>
                <MuiDataGrid
                    columns={purchaserOrderListsForBetweenWarehouseColumns(
                        renderAction
                    )}
                    rows={results || [{}]}
                    data={orders?.data || [{}]}
                    onDoubleClick={(item: any) => navigate(item.row.purchaseOrderStatusId === 4 ? '' : `/dashboard/transferBetweenWarehouse/${item?.row?.id}`)}
                    isLoading={isLoading}
                    getRowId={(item: { id: string }) => item.id}
                    hideFooter
                />
                <Pagination
                    pageCount={+orders?.totalCount / +pageSize || 100}
                    onPageChange={handlePageChange}
                />
            </ReusableCard>
        </>
    );
};

export default TransferBetweenWarehouse;
