import { useState, useEffect, useRef } from "react";
import { useGetRecievePayments, useUpdatePaymentApproved } from "./core/_hooks";
import { Link } from "react-router-dom";
import Backdrop from "../../../_cloner/components/Backdrop";
import { Button, Checkbox, Typography } from "@mui/material";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import { IPayment, IPaymentFilter } from "./core/_models";
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount";
import { DoneAll, Visibility } from "@mui/icons-material";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import Pagination from "../../../_cloner/components/Pagination";
import { Formik, FormikProps } from "formik";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import moment from "moment-jalaali";
import { renderAlert } from "../../../_cloner/helpers/SweetAlert";
import { EnqueueSnackbar } from "../../../_cloner/helpers/Snackebar";
import ConfirmDialog from "../../../_cloner/components/ConfirmDialog";

const pageSize = 100

const initialValues = {
    isApproved: 0,
    fromDate: '1402/12/01',
    toDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
}

const PaymentAccounting = () => {
    // Fetching
    const { mutate, data, isLoading } = useGetRecievePayments();
    const approveReceivePay = useUpdatePaymentApproved();
    // States
    const [results, setResults] = useState<IPayment[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedIds, setSelectedIds] = useState<any>([]);
    const [isSelectAll, setIsSelectAll] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const formikRef = useRef<FormikProps<any>>(null)

    const getReceivePayments = (filters: IPaymentFilter) => {
        mutate(filters, {
            onSuccess: () => {

            }
        })
    }

    useEffect(() => {
        setResults(data?.data);
         // eslint-disable-next-line
    }, [data?.data]);
    useEffect(() => {
        const filters = {
            IsApproved: formikRef?.current?.values?.isApproved,
            FromDate: formikRef?.current?.values?.fromDate,
            ToDate: formikRef?.current?.values?.toDate,
            PageNumber: currentPage,
            PageSize: 100,
        }
        getReceivePayments(filters)
        // eslint-disable-next-line
    }, [currentPage]);

    const columns = (renderAction: any, renderCheckbox: any, ) => {
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
                maxWidth: 80,
                flex: 1
            },

            {
                field: "receivePayCode",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "شماره ثبت",
                headerClassName: "headerClassName",
                minWidth: 80,
                flex: 1
            },
            // {
            //     field: "receivePaymentSourceFromDesc",
            //     headerName: "دریافت از",
            //     renderCell: (value: any) => (
            //         <Typography variant="h4">
            //             {value.row.receivePaymentSourceFromDesc +
            //                 " " +
            //                 (value.row?.receivePaymentSourceFromId !== 1
            //                     ? ""
            //                     : value.row?.receiveFromCustomerName)}
            //         </Typography>
            //     ),
            //     headerClassName: "headerClassName",
            //     minWidth: 240,
            //     flex: 1
            // },
            // {
            //     field: "receivePaymentSourceToDesc",
            //     renderCell: (value: any) => (
            //         <Typography variant="h4">
            //             {value.row.receivePaymentSourceToDesc +
            //                 " " +
            //                 (value.row?.receivePaymentSourceToId !== 1
            //                     ? ""
            //                     : value.row?.payToCustomerName)}
            //         </Typography>
            //     ),
            //     headerName: "پرداخت به",
            //     headerClassName: "headerClassName",
            //     minWidth: 240,
            //     flex: 1
            // },
            {
                field: "receiveFromDesc",
                headerName: "دریافت از",
                renderCell: (value: any) => (
                    <Typography variant="h4">
                        {value.row.receiveFromDesc
                            // " " +
                            // (value.row?.receivePaymentTypeFromId !== 1
                            //     ? ""
                            //     : value.row?.receiveFromCustomerName)
                                }
                    </Typography>
                ),
                headerClassName: "headerClassName",
                minWidth: 240,
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
                field: "amount",
                headerName: "مبلغ",
                renderCell: (value: any) => (
                    <Typography color="primary" variant="h4">
                        {separateAmountWithCommas(value.row.amount)+ "تومان"}
                    </Typography>
                ),
                headerClassName: "headerClassName",
                minWidth: 160,
                flex: 1
            },
            {
                field: "receivePayStatusDesc",
                headerName: "وضعیت",
                renderCell: (value: any) => (
                    <Typography className={`${
                        value.row.receivePayStatusId === 1 ? "text-yellow-500" :
                        value.row.receivePayStatusId === 2 ? "text-green-500" : 
                        value.row.receivePayStatusId === 3 ? "text-violet-500" : ""   }`} variant="h4">
                        {value.row.receivePayStatusDesc}
                    </Typography>
                ),
                headerClassName: "headerClassName",
                minWidth: 160,
                flex: 1
            },
            {
                field: "accountOwner",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "صاحب حساب",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1
            },
            {
                field: "trachingCode",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "کد پیگیری",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1
            },
            {
                field: "companyName",
                renderCell: (params: any) => {
                    return <Typography variant="h5">{params.value}</Typography>;
                },
                headerName: "صاحب شرکت",
                headerClassName: "headerClassName",
                minWidth: 100,
                flex: 1
            },
            {
                field: "contractCode",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "شماره قرارداد",
                headerClassName: "headerClassName",
                minWidth: 100,
                flex: 1
            },
            {
                headerName: "جزئیات",
                renderCell: renderAction,
                headerClassName: "headerClassName",
                minWidth: 80,
                flex: 1
            },
        ];
        return col;
    };

    const renderActions = (item: any) => {
        return (
            <div className="flex justify-center items-center gap-x-4">
                <Link to={`/dashboard/payment/accounting/${item?.row?.id}`}>
                    <Typography variant="h4">
                        <Visibility color="primary" />
                    </Typography>
                </Link>
                <Link to={`/dashboard/payment/edit/${item?.row?.id}`}>
                    <Typography variant="h4">
                        <DoneAll color="secondary" />
                    </Typography>
                </Link>
            </div>
            
        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };
    
    const handleFilter = (values: any) => {
        const filters: any = {
            isApproved: +values.isApproved,
            fromDate: values.fromDate,
            toDate: values.toDate,
            pageNumber: currentPage,
            pageSize: 100,
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
            {isLoading && <Backdrop loading={isLoading} />}
            <ReusableCard>
                <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={handleFilter}>
                    {({values}) => {
                       return <form>
                            <div className="flex justify-center items-center gap-8">
                                <FormikDatepicker name="fromDate" label="از تاریخ" />
                                <FormikDatepicker name="toDate" label="تا تاریخ" />
                            </div>
                            <div className="flex justify-end items-end my-4">
                                <ButtonComponent onClick={() => handleFilter(values)}>
                                  <Typography className="!text-white">جستجو</Typography>  
                                </ButtonComponent>
                            </div>
                        </form>
                    }}
                </Formik>
                <MuiDataGrid
                    columns={columns(renderActions, renderCheckbox)}
                    rows={results}
                    data={data?.data}
                />
                <div className="flex justify-end items-end mt-8">
                    <Button className="!bg-green-500 !px-8" onClick={() => setIsOpen(true)}>
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
