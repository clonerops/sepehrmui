import { useState, useEffect, useRef } from "react";
import { useGetRecievePayments, usePutRecievePaymentRegister } from "./core/_hooks";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography, Checkbox, Tooltip } from "@mui/material";
import { IPayment, IPaymentFilter } from "./core/_models";
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount";
import { Visibility } from "@mui/icons-material";
import { Formik, FormikProps } from "formik";
import { renderAlert } from "../../../_cloner/helpers/SweetAlert";
import { EnqueueSnackbar } from "../../../_cloner/helpers/Snackebar";

import Backdrop from "../../../_cloner/components/Backdrop";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import React from "react";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import Pagination from "../../../_cloner/components/Pagination";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import moment from "moment-jalaali";
import FormikInput from "../../../_cloner/components/FormikInput";
import CustomButton from "../../../_cloner/components/CustomButton";
import TransitionsModal from "../../../_cloner/components/ReusableModal";

const pageSize = 100

const initialValues = {
    isApproved: 0,
    fromDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
    toDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
}


const PaymentAccountingRegister = () => {
    // Fetching
    const recievePaymentTools = useGetRecievePayments();
    const putRecievePayRegister = usePutRecievePaymentRegister()
    // States
    const [results, setResults] = useState<IPayment[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedIds, setSelectedIds] = useState<any>([]);
    const [isSelectAll, setIsSelectAll] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const formikRef = useRef<FormikProps<any>>(null)
    const formikRefAccountDocNo = useRef<FormikProps<any>>(null)
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
            StatusId: 2,
            FromDate: formikRef?.current?.values?.fromDate,
            ToDate: formikRef?.current?.values?.toDate,
            PageNumber: currentPage,
            PageSize: pageSize,
        }
        getReceivePayments(filters)
        // eslint-disable-next-line
    }, [currentPage]);

    const columns = (renderCheckbox: any, renderAction: any) => {
        const col = [
            {
                field: "id",
                headerName: (
                    <Checkbox
                        color="primary"
                        checked={isSelectAll}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsSelectAll(event.target.checked)}
                    />
                ),
                sortable: false,
                renderCell: renderCheckbox,
                headerClassName: "headerClassName",
                minWidth: 80,
                flex: 1
            },
            {
                headerName: "جزئیات و ثبت",
                renderCell: renderAction,
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1
            },
            {
                field: "receivePayCode",
                renderCell: (params: any) => <Typography variant="h4">{params.value}</Typography>,
                
                headerName: "شماره ثبت",
                headerClassName: "headerClassName",
                minWidth: 80,
                flex: 1
            },
            {
                field: "receiveFromDesc",
                headerName: "دریافت از",
                renderCell: (value: any) => <Typography variant="h4">{value.row.receiveFromDesc}</Typography>,
                headerClassName: "headerClassName",
                minWidth: 240,
                flex: 1
            },
            {
                field: "receiveFromCompanyName",
                renderCell: (params: any) => <Typography variant="h5">{params.value}</Typography>,
                headerName: "شرکت دریافت از",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1
            },
            {
                field: "payToDesc",
                renderCell: (value: any) => (
                    <Typography variant="h4">
                        {value.row.payToDesc +
                            " " +
                            (value.row?.receivePaymentSourceToId !== 1
                                ? ""
                                : value.row?.payToCustomerName)}
                    </Typography>
                ),
                headerName: "پرداخت به",
                headerClassName: "headerClassName",
                minWidth: 240,
                flex: 1
            },
            {
                field: "payToCompanyName",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "شرکت پرداخت به",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1
            },
            {
                field: "amount",
                headerName: "مبلغ(ریال)",
                renderCell: (value: any) => <Typography color="primary" variant="h4">{separateAmountWithCommas(value.row.amount)} </Typography>,
                headerClassName: "headerClassName",
                minWidth: 160,
                flex: 1
            },
            {
                field: "receivePayStatusDesc",
                headerName: "وضعیت",
                renderCell: (value: any) => (
                    <Typography className={`${value.row.receivePayStatusId === 1 ? "text-yellow-500" :
                        value.row.receivePayStatusId === 2 ? "text-green-500" :
                            value.row.receivePayStatusId === 3 ? "text-violet-500" : ""}`} variant="h4">
                        {value.row.receivePayStatusDesc}
                    </Typography>
                ),
                headerClassName: "headerClassName",
                minWidth: 160,
                flex: 1
            },
            {
                field: "accountOwner",
                renderCell: (params: any) => <Typography variant="h5">{params.value}</Typography>,
                headerName: "صاحب حساب",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1
            },
            {
                field: "trachingCode",
                renderCell: (params: any) => <Typography variant="h5">{params.value}</Typography>,
                headerName: "کد پیگیری",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1
            },
           
           
            {
                field: "contractCode",
                renderCell: (params: any) => <Typography variant="h4">{params.value}</Typography>,
                headerName: "شماره قرارداد",
                headerClassName: "headerClassName",
                minWidth: 100,
                flex: 1
            },
        ];
        return col;
    };

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

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    const handleFilter = (values: any) => {
        const filters: any = {
            fromDate: values.fromDate,
            StatusId: 2,
            toDate: values.toDate,
            pageNumber: currentPage,
            pageSize: 100,
        }
        getReceivePayments(filters)
    }

    const onSubmit = () => {
        if (selectedIds.length === 0) {
            EnqueueSnackbar("لطفا سندی را برای ثبت انتخاب کنید", "warning")
        } else {
            const filters: any = {
                receivePays: selectedIds,
                accountDocNo: formikRefAccountDocNo?.current?.values?.accountDocNo
            }
            putRecievePayRegister.mutate(filters, {
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
            {putRecievePayRegister.isLoading && <Backdrop loading={putRecievePayRegister.isLoading} />}
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
                    columns={columns(renderCheckbox, renderActions)}
                    rows={results}
                    data={recievePaymentTools?.data?.data}
                    onDoubleClick={(item: any) => navigate(`/dashboard/payment/accounting/register/${item?.row?.id}`)}
                />
                <Pagination pageCount={+1000 / +pageSize || 100} onPageChange={handlePageChange} />
                <div className="flex justify-end items-end mt-8">
                    <CustomButton disabled={selectedIds.length <= 0} onClick={() => setIsOpen(true)} title="ثبت سند حسابداری" />
                </div>
            </ReusableCard>
            <TransitionsModal
                open={isOpen}
                isClose={() => setIsOpen(false)}
                title="ثبت شماره سند"
                description="لطفا شماره سند را برای ثبت حسابداری دریافت و پرداخت را وارد نمایید"
            >
                <>
                    <Formik
                        innerRef={formikRefAccountDocNo}
                        initialValues={{ accountDocNo: "" }}
                        onSubmit={(actions) => {
                            actions.setSubmitting(false);
                        }}
                    >
                        {() => (
                            <div className="flex flex-col space-y-4">
                                <div className="mt-8">
                                    <FormikInput name="accountDocNo" label="شماره سند" />
                                </div>
                                <div className="flex justify-end items-end gap-4">
                                    <Button className="!bg-green-500" onClick={() => onSubmit()}>
                                        <Typography>ثبت</Typography>
                                    </Button>
                                    <Button className="!bg-red-500" onClick={() => setIsOpen(false)}>
                                        <Typography className="text-white">انصراف</Typography>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Formik>
                </>
            </TransitionsModal>


        </>
    );
};

export default PaymentAccountingRegister;
