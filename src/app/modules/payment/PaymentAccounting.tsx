import { useState, useEffect, useRef } from "react";
import { useGetRecievePaymentByApproved, useGetRecievePayments } from "./core/_hooks";
import { Link } from "react-router-dom";
import Backdrop from "../../../_cloner/components/Backdrop";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import { IPayment, IPaymentFilter } from "./core/_models";
import React from "react";
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount";
import { Edit, Visibility } from "@mui/icons-material";
import ActiveText from "../../../_cloner/components/ActiveText";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import Pagination from "../../../_cloner/components/Pagination";
import { Formik, FormikProps } from "formik";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import RadioGroup from "../../../_cloner/components/RadioGroup";
import moment from "moment-jalaali";

const pageSize = 100

const initialValues = {
    isApproved: 0,
    fromDate: '1402/12/01',
    toDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
}

const categories = [
    { value: 0, title: "همه", defaultChecked: true },
    { value: 1, title: "تایید شده ها", defaultChecked: false },
    { value: 2, title: "تایید نشده ها", defaultChecked: false }
]


const PaymentAccounting = () => {
    // Fetching
    const { mutate, data, isLoading } = useGetRecievePayments();
    // States
    const [results, setResults] = useState<IPayment[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const formikRef = useRef<FormikProps<any>>(null)

    const getReceivePayments = (filters: IPaymentFilter) => {
        mutate(filters, {
            onSuccess: () => {

            }
        })
    }

    useEffect(() => {
        setResults(data?.data);
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

    const columns = (renderAction: any) => {
        const col = [
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
            {
                field: "receivePaymentSourceFromDesc",
                headerName: "دریافت از",
                renderCell: (value: any) => (
                    <Typography variant="h4">
                        {value.row.receivePaymentSourceFromDesc +
                            " " +
                            (value.row?.receiveFromCustomerName === null
                                ? ""
                                : value.row?.receiveFromCustomerName)}
                    </Typography>
                ),
                headerClassName: "headerClassName",
                minWidth: 240,
                flex: 1
            },
            {
                field: "receivePaymentSourceToDesc",
                renderCell: (value: any) => (
                    <Typography variant="h4">
                        {value.row.receivePaymentSourceToDesc +
                            " " +
                            (value.row?.payToCustomerName === null
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
                field: "isAccountingApproval",
                headerName: "تایید حسابداری؟",
                renderCell: (params: any) => {
                    return (
                        <ActiveText
                            params={params}
                            successTitle="بله"
                            dangerTitle="خیر"
                        />
                    );
                },
                headerClassName: "headerClassName",
                minWidth: 100,
                flex: 1
            },
            {
                field: "accountingApprovalDate",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "تاریخ تایید حسابداری",
                headerClassName: "headerClassName",
                minWidth: 160,
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
                        <Edit color="secondary" />
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
                            <div className="flex justify-between items-center my-4">
                                <RadioGroup
                                    categories={categories}
                                    id="isApproved"
                                    key="isApproved"
                                    name="isApproved"
                                />

                                <ButtonComponent onClick={() => handleFilter(values)}>
                                  <Typography className="!text-white">جستجو</Typography>  
                                </ButtonComponent>
                            </div>
                        </form>
                    }}
                </Formik>
                <MuiDataGrid
                    columns={columns(renderActions)}
                    rows={results}
                    data={data?.data}
                />
                <Pagination pageCount={+1000 / +pageSize || 100} onPageChange={handlePageChange} />
            </ReusableCard>
        </>
    );
};

export default PaymentAccounting;
