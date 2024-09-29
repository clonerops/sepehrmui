import { useState, useEffect, useRef } from "react";
import { useGetRecievePayments } from "./core/_hooks";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip, Typography } from "@mui/material";
import { IPayment, IPaymentFilter } from "./core/_models";
import { Visibility } from "@mui/icons-material";
import { Formik, FormikProps } from "formik";
import { RecievePaymentListColumn } from "../../../_cloner/helpers/columns";

import Backdrop from "../../../_cloner/components/Backdrop";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import Pagination from "../../../_cloner/components/Pagination";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import { useAuth } from "../../../_cloner/helpers/checkUserPermissions";
import AccessDenied from "../../routing/AccessDenied";

const pageSize = 100

const initialValues = {
    isApproved: 0,
    fromDate: "",
    toDate: "",
}

const RecievePaymentList = () => {
    const {hasPermission} = useAuth()
    // Fetching
    const recievePaymentTools = useGetRecievePayments();
    // States
    const [results, setResults] = useState<IPayment[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const formikRef = useRef<FormikProps<any>>(null)

    const getReceivePayments = (filters: IPaymentFilter) => {
        recievePaymentTools.mutate(filters)
    }

    useEffect(() => {
        setResults(recievePaymentTools?.data?.data);
        // eslint-disable-next-line
    }, [recievePaymentTools?.data?.data]);

    useEffect(() => {
        const filters = {
            FromDate: formikRef?.current?.values?.fromDate,
            ToDate: formikRef?.current?.values?.toDate,
            PageNumber: currentPage,
            PageSize: pageSize,
        }
        getReceivePayments(filters)
        // eslint-disable-next-line
    }, [currentPage]);

    const renderActions = (item: any) => {
        return (
            <div className="flex justify-center items-center gap-x-4">
                <Tooltip title={<Typography variant='h3'>مشاهده جزئیات</Typography>}>
                    <Link target="_blank" to={`/dashboard/payment/accounting/${item?.row?.id}`}>
                        <Typography variant="h4">
                            <Visibility color="primary" />
                        </Typography>
                    </Link>
                </Tooltip>
            </div>

        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    const handleFilter = (values: any) => {
        const filters: any = {
            fromDate: values.fromDate,
            toDate: values.toDate,
            StatusId: 1,
            pageNumber: currentPage,
            pageSize: pageSize,
        }
        getReceivePayments(filters)
    }

    if(!hasPermission("GetAllReceivePays"))
        return<AccessDenied />

    return (
        <>
            {recievePaymentTools.isLoading && <Backdrop loading={recievePaymentTools.isLoading} />}
            <ReusableCard>
                <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={handleFilter}>
                    {({ handleSubmit }) => {
                        return <form onSubmit={handleSubmit}>
                            <div className="flex justify-center items-center gap-8">
                                <FormikDatepicker name="fromDate" label="از تاریخ" />
                                <FormikDatepicker name="toDate" label="تا تاریخ" />
                            </div>
                            <div className="flex justify-end items-end my-4">
                                <ButtonComponent>
                                    <Typography className="!text-white">جستجو</Typography>
                                </ButtonComponent>
                            </div>
                        </form>
                    }}
                </Formik>
                <MuiDataGrid
                    columns={RecievePaymentListColumn(renderActions)}
                    rows={results}
                    data={recievePaymentTools?.data?.data}
                    onDoubleClick={(item: any) => {}}
                />
                <Pagination pageCount={+1000 / +pageSize || 100} onPageChange={handlePageChange} />
            </ReusableCard>
        </>
    );
};

export default RecievePaymentList;
