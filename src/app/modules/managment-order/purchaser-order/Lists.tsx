import { useEffect, useState } from "react";
import { Search, Visibility } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Button, Tooltip, Typography } from '@mui/material'

import { useRetrievePurchaserOrdersByMutation } from "../core/_hooks";
import { IOrder } from "../core/_models";
import { purchaserOrderColumns } from "../helpers/columns";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Pagination from "../../../../_cloner/components/Pagination";
import { Formik } from "formik";
import FormikInput from "../../../../_cloner/components/FormikInput";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";

const pageSize = 100

const PurchaserOrderList = () => {
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<number>(1);

    const orderLists = useRetrievePurchaserOrdersByMutation()

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
            <Tooltip title={<Typography variant='h3'>مشاهده جزئیات</Typography>}>
                <Link
                    to={`/dashboard/purchaser_order/lists/${item?.row?.id}`}
                    state={{ isConfirmed: false }}
                >
                        <Visibility color="primary" />
                </Link>
            </Tooltip>
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
            <Formik initialValues={{ orderCode: "" }} onSubmit={onSubmit}>
                {({ handleSubmit }) => {
                    return <div className="w-[50%] mb-4">
                        <div className="flex justify-center items-center gap-4">
                            <FormikInput name="orderCode" label="شماره سفارش" />
                            <ButtonComponent onClick={handleSubmit}>
                                <Search className="text-white" />
                                <Typography className="text-white">جستجو</Typography>
                            </ButtonComponent>
                        </div>
                    </div>
                }}
            </Formik>
            <MuiDataGrid
                columns={purchaserOrderColumns(renderAction)}
                rows={results || [{}]}
                data={orderLists?.data?.data || [{}]}
                isLoading={orderLists?.isLoading}
                onDoubleClick={(item: any) => navigate(`/dashboard/purchaser_order/lists/${item?.row?.id}`)}
            />
            <Pagination pageCount={+orderLists?.data?.totalCount / +pageSize || 100} onPageChange={handlePageChange} />
        </ReusableCard>
    );
};

export default PurchaserOrderList;
