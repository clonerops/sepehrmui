import { useState, useEffect, useRef } from "react";
import { useGetRecievePayments } from "./core/_hooks";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Checkbox, Tooltip } from "@mui/material";
import { IPayment, IPaymentFilter } from "./core/_models";
import { Visibility } from "@mui/icons-material";
import { Formik, FormikProps } from "formik";
import { PaymentAccountingRegisterListColumn } from "../../../_cloner/helpers/columns";

import Backdrop from "../../../_cloner/components/Backdrop";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import Pagination from "../../../_cloner/components/Pagination";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import moment from "moment-jalaali";

const pageSize = 100

const initialValues = {
    isApproved: 0,
    // fromDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
    // toDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
    fromDate: "",
    toDate: "",
}


const PaymentAccountingRegisterList = () => {
    // Fetching
    const recievePaymentTools = useGetRecievePayments();
    // States
    const [results, setResults] = useState<IPayment[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedIds, setSelectedIds] = useState<any>([]);
    const [isSelectAll, setIsSelectAll] = useState<boolean>(false)

    const formikRef = useRef<FormikProps<any>>(null)
    const navigate = useNavigate()

    const getReceivePayments = (filters: IPaymentFilter) => {

        recievePaymentTools.mutate(filters)
    }

    useEffect(() => {
        setResults(recievePaymentTools?.data?.data);
        // eslint-disable-next-line
    }, [recievePaymentTools?.data?.data]);
    useEffect(() => {
        const filters = {
            StatusId: 3,
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
            <Tooltip title={<Typography variant='h3'>مشاهده جزئیات</Typography>}>
                <div className="flex justify-center items-center gap-x-4">
                    <Link to={`/dashboard/payment/accounting/register/${item?.row?.id}`}>
                        <Typography variant="h4">
                            <Visibility color="primary" />
                        </Typography>
                    </Link>
                </div>
            </Tooltip>
        );
    };

    const handleHeaderCheckboxClick = (isChecked: boolean) => {
        const allIds = results.map((item: any) => item.id);
        setSelectedIds(isChecked ? allIds : []);
        setIsSelectAll(isChecked);
    };

    useEffect(() => {
        handleHeaderCheckboxClick(isSelectAll)
        // eslint-disable-next-line
    }, [isSelectAll])

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    const handleFilter = (values: any) => {
        const filters: any = {
            fromDate: values.fromDate,
            StatusId: 3,
            toDate: values.toDate,
            pageNumber: currentPage,
            pageSize: 100,
        }
        getReceivePayments(filters)
    }

    return (
        <>
            {recievePaymentTools.isLoading && <Backdrop loading={recievePaymentTools.isLoading} />}
            <ReusableCard>
                <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={handleFilter}>
                    {({ handleSubmit }) => {
                        return <form onSubmit={handleSubmit}>
                            <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
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
                    columns={PaymentAccountingRegisterListColumn(renderActions)}
                    rows={results}
                    data={recievePaymentTools?.data?.data}
                    onDoubleClick={(item: any) => navigate(`/dashboard/payment/accounting/register/${item?.row?.id}`)}
                />
                <Pagination pageCount={+1000 / +pageSize || 100} onPageChange={handlePageChange} />
            </ReusableCard>

        </>
    );
};

export default PaymentAccountingRegisterList;
