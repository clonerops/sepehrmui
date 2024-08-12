import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Tooltip, Typography } from '@mui/material'

import { useRetrieveOrdersByMutation } from "../core/_hooks";
import { IOrder } from "../core/_models";
import { Print, Visibility } from "@mui/icons-material";
import { ConvertPreSaleColumn, OrderColumn } from "../../../../_cloner/helpers/columns";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Pagination from "../../../../_cloner/components/Pagination";
import SearchFromBack from "../../../../_cloner/components/SearchFromBack";
import Backdrop from "../../../../_cloner/components/Backdrop";
import ConfirmDialog from "../../../../_cloner/components/ConfirmDialog";

const pageSize = 100

const FinlizePreSale = () => {
    const navigate = useNavigate()
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [approve, setApprove] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>({})

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
                        <Button variant="contained" color="secondary">
                            <Typography>نمایش جزئیات</Typography>
                        </Button>

                    </Link>
                </Tooltip>
                <div>
                    <Button onClick={() => handleOpenApprove(item)} variant="contained" color="primary" >
                        <Typography>نهایی کردن سفارش</Typography>
                    </Button>
                </div>

            </div>
        );
    };

    const handleOpenApprove = (item: any) => {
        setSelectedItem(item)
        setApprove(true)
    }

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
                <SearchFromBack inputName='orderCode' initialValues={{ orderCode: "" }} onSubmit={onSubmit} label="شماره سفارش" />
                <MuiDataGrid
                    columns={ConvertPreSaleColumn(renderAction)}
                    rows={results}
                    data={orderLists?.data?.data}
                    onDoubleClick={(item: any) => navigate(`/dashboard/sales_order/lists/${item?.row?.id}`)}
                />
                <Pagination pageCount={+orderLists?.data?.totalCount / +pageSize || 100} onPageChange={handlePageChange} />
            </ReusableCard>
            <ConfirmDialog
                open={approve}
                hintTitle={`آیا از تغییر وضعیت سفارش ${selectedItem?.row?.orderCode} مطمئن هستید؟`}
                notConfirmText="لغو"
                // confirmText={approveTools.isLoading ? "درحال پردازش ..." : "تایید"}
                confirmText={"تایید"}
                onCancel={() => setApprove(false)}
                // onConfirm={() => handleConfirmOrder(values, 2)}
                onConfirm={() => {}}
            />

        </>
    );
};

export default FinlizePreSale;
