import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip, Typography } from '@mui/material'

import { useRetrieveOrdersByMutation } from "../core/_hooks";
import { IOrder } from "../core/_models";
import { Print, Search, Visibility } from "@mui/icons-material";
import { OrderColumn } from "../../../../_cloner/helpers/columns";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Pagination from "../../../../_cloner/components/Pagination";
import SearchFromBack from "../../../../_cloner/components/SearchFromBack";
import Backdrop from "../../../../_cloner/components/Backdrop";
import { InvoiceType } from "../../../../_cloner/helpers/Enums";
import { Formik } from "formik";
import FormikUserByRole from "../../../../_cloner/components/FormikUserByRole";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import FormikInput from "../../../../_cloner/components/FormikInput";
import { useAuth } from "../../../../_cloner/helpers/checkUserPermissions";
import AccessDenied from "../../../routing/AccessDenied";

const initialValues = {
    orderCode: "",
    SaleManagerId: "",
    Roles: ""
}

const pageSize = 100

const SalesOrderList = () => {
    const { hasPermission } = useAuth()

    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<number>(1);

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
                {hasPermission("GetOrderById") &&
                    <Tooltip title={<Typography variant='h3'>مشاهده جزئیات</Typography>}>
                        <Link
                            to={`/dashboard/sales_order/lists/${item?.row?.id}`}
                            state={{ isConfirmed: false }}
                        >
                            <Visibility color="secondary" />
                        </Link>
                    </Tooltip>
                }
                <Tooltip title={<Typography variant='h3'>فاکتور</Typography>}>
                    <a target='_blank' href={`/dashboard/${[InvoiceType.Mahfam, InvoiceType.Sepehr].includes(item.row.invoiceTypeId) ? "invoiceOfficial" : "invoiceNotOfficial"}/${item?.row?.id}`}>
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

    if (!hasPermission("GetAllOrders"))
        return <AccessDenied />

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
