import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Tooltip, Typography } from '@mui/material'

import { useRetrieveOrdersByMutation } from "../core/_hooks";
import { IOrder } from "../core/_models";
import { ConvertPreSaleColumn } from "../../../../_cloner/helpers/columns";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Pagination from "../../../../_cloner/components/Pagination";
import Backdrop from "../../../../_cloner/components/Backdrop";
import ConfirmDialog from "../../../../_cloner/components/ConfirmDialog";
import { Formik } from "formik";
import FormikUserByRole from "../../../../_cloner/components/FormikUserByRole";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import { Search } from "@mui/icons-material";
import FormikInput from "../../../../_cloner/components/FormikInput";

const initialValues = {
    orderCode: "",
    SaleManagerId: "",
    Roles: ""
}


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
            PageNumber: currentPage,
            PageSize: pageSize,
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
        const formData = {
            ...values,
            PageNumber: currentPage,
            PageSize: pageSize,
            SaleManagerId: values?.SaleManagerId?.value

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
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ handleSubmit, values }) => {
                        return <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 space-y-4 lg:space-y-0">
                                <FormikInput name="orderCode" label="شماره سفارش" />
                                <FormikUserByRole name="SaleManagerId" label="مسئول فروش" values={values} />
                            </div>
                            <div className="flex justify-end items-end">
                                <ButtonComponent onClick={() => handleSubmit()}>
                                    <div className="flex flex-row gap-x-4">
                                        <Search className="text-white" />
                                        <Typography className="text-white">جستجو</Typography>
                                    </div>
                                </ButtonComponent>
                            </div>

                        </form>
                    }}
                </Formik>

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
                onConfirm={() => { }}
            />

        </>
    );
};

export default FinlizePreSale;
