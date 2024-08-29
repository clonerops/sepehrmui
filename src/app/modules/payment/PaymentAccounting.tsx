import { useState, useEffect, useRef } from "react";
import { useGetRecievePayments, useUpdatePaymentApproved } from "./core/_hooks";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Tooltip, Typography } from "@mui/material";
import { IPayment, IPaymentFilter } from "./core/_models";
import { DoneAll, Visibility } from "@mui/icons-material";
import { Formik, FormikProps } from "formik";
import { renderAlert } from "../../../_cloner/helpers/sweetAlert";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { PaymentAccountingColumn } from "../../../_cloner/helpers/columns";

import Backdrop from "../../../_cloner/components/Backdrop";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import Pagination from "../../../_cloner/components/Pagination";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import moment from "moment-jalaali";
import ConfirmDialog from "../../../_cloner/components/ConfirmDialog";

const pageSize = 100

const initialValues = {
    isApproved: 0,
    // fromDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
    // toDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
    fromDate: "",
    toDate: "",
}

const PaymentAccounting = () => {
    // Fetching
    const recievePaymentTools = useGetRecievePayments();
    const approveReceivePay = useUpdatePaymentApproved();
    // States
    const [results, setResults] = useState<IPayment[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedIds, setSelectedIds] = useState<any>([]);
    const [isSelectAll, setIsSelectAll] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

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
            FromDate: formikRef?.current?.values?.fromDate,
            ToDate: formikRef?.current?.values?.toDate,
            StatusId: 1,
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
                    <Link to={`/dashboard/payment/accounting/${item?.row?.id}`}>
                        <Typography variant="h4">
                            <Visibility color="primary" />
                        </Typography>
                    </Link>
                </Tooltip>
                <Tooltip title={<Typography variant='h3'>ویرایش و تایید</Typography>}>
                    <Link to={`/dashboard/payment/edit/${item?.row?.id}`}>
                        <Typography variant="h4">
                            <DoneAll color="secondary" />
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

    const renderCheckbox = (item: any) => {
        const isChecked = isSelectAll ?
            selectedIds.length === results.length :
            selectedIds.includes(item.row.id);

        return (
            <div className="flex justify-center items-center gap-x-4">
                <Checkbox
                    checked={isChecked}
                    onChange={() => {
                        if (isSelectAll) {
                            handleHeaderCheckboxClick(isChecked);
                        } else {
                            handleCheckboxClick(item.row.id);
                        }
                    }}
                />
            </div>
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

    const handleCheckboxClick = (id: any) => {
        const currentIndex = selectedIds.indexOf(id);
        const newSelectedIds = [...selectedIds];

        if (currentIndex === -1) {
            newSelectedIds.push(id);
        } else {
            newSelectedIds.splice(currentIndex, 1);
        }

        setSelectedIds(newSelectedIds);
    };


    const onSubmit = () => {
        if (selectedIds.length === 0) {
            EnqueueSnackbar("لطفا سندی را برای ثبت انتخاب کنید", "warning")
        } else {
            const filters: any = {
                ids: selectedIds,
            }
            approveReceivePay.mutate(filters, {
                onSuccess: (response) => {
                    if (response?.succeeded) {
                        renderAlert(response.message)
                        setIsOpen(false)
                    } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                    }
                }
            })
        }
    }

    return (
        <>
            {recievePaymentTools.isLoading && <Backdrop loading={recievePaymentTools.isLoading} />}
            {approveReceivePay.isLoading && <Backdrop loading={approveReceivePay.isLoading} />}

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
                    columns={PaymentAccountingColumn(renderActions, renderCheckbox, isSelectAll, setIsSelectAll)}
                    rows={results}
                    data={recievePaymentTools?.data?.data}
                    onDoubleClick={(item: any) => navigate(`/dashboard/payment/edit/${item?.row?.id}`)}
                />
                <div className="flex justify-end items-end mt-8">
                    <Button disabled={selectedIds.length <= 0} variant="contained" color="primary" onClick={() => setIsOpen(true)}>
                        <DoneAll className="text-white" />
                        <Typography className="text-white">ثبت تایید</Typography>
                    </Button>
                </div>
                <Pagination pageCount={+1000 / +pageSize || 100} onPageChange={handlePageChange} />
            </ReusableCard>
            <ConfirmDialog
                open={isOpen}
                hintTitle="آیا از تایید سند دریافت و پرداخت مطمئن هستید؟"
                notConfirmText="لغو"
                confirmText={approveReceivePay?.isLoading ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setIsOpen(false)}
                onConfirm={() => onSubmit()}
            />

        </>
    );
};

export default PaymentAccounting;
