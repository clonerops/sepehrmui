import { useState, useEffect } from "react";
import { Formik } from "formik";
import { Button, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useGetCargosList } from "../cargoAnnouncment/_hooks";
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount";

import ReusableCard from "../../../_cloner/components/ReusableCard";
import FormikInput from "../../../_cloner/components/FormikInput";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import Pagination from "../../../_cloner/components/Pagination";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import FormikCustomer from "../../../_cloner/components/FormikCustomer";

const pageSize = 100;

const ReadyToLading = () => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState<number>(1);

    const cargoList = useGetCargosList();

    useEffect(() => {
        let formData = {
            PageNumber: currentPage,
            PageSize: pageSize,
        };
        cargoList.mutate(formData);
        // eslint-disable-next-line
    }, [currentPage]);

    const handleFilter = (values: any) => {
        let formData = {
            PageNumber: currentPage,
            PageSize: pageSize,
            OrderCode: values?.orderCode ? values?.orderCode : "",
            CustomerId: values?.customerId?.value ? values?.customerId?.value : "",
        };
        cargoList.mutate(formData);
    }

    const renderAction = (item: any) => {
        return (
            <Link to={`/dashboard/lading/${item?.row?.id}`}>
                <Button variant="contained" color="secondary">
                    <Typography>صدور مجوز</Typography>
                </Button>
            </Link>
        );
    };

    const readyToLadingColumns = (renderAction: any) => {
        const col = [
            { field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 120, maxWidth: 120 },
            {
                field: 'cargoAnnounceNo', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: 'شماره اعلام بار', headerClassName: "headerClassName", minWidth: 100, maxWidth: 100, flex: 1
            },
            {
                field: 'orderCode', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.row.order.orderCode}</Typography>;
                },
                headerName: 'شماره سفارش', headerClassName: "headerClassName", minWidth: 100, maxWidth: 100, flex: 1
            },
            {
                field: 'orderStatusId', renderCell: (params: any) => {
                    return params.row.order.orderStatusId === 1 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.order.orderStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.order.orderStatusDesc}</Typography>
                },
                headerName: 'وضعیت سفارش', headerClassName: "headerClassName", minWidth: 180, flex: 1
            },
            {
                field: 'createdBy', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.row.createdBy}</Typography>;
                },
                headerName: 'ثبت کننده', headerClassName: "headerClassName", minWidth: 120, flex: 1
            },
            {
                field: 'deliveryDate', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: 'تاریخ تحویل', headerClassName: "headerClassName", minWidth: 120, flex: 1
            },
            {
                field: 'customerName', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.row.order.customerFirstName + " " + params.row.order.customerLastName}</Typography>;
                },
                headerName: 'سفارش دهنده', headerClassName: "headerClassName", minWidth: 180, flex: 1
            },
            {
                field: 'driverName', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: 'راننده', headerClassName: "headerClassName", minWidth: 180, flex: 1
            },
            {
                field: 'driverMobile', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: 'شماره همراه راننده', headerClassName: "headerClassName", minWidth: 180, flex: 1
            },
            {
                field: 'fareAmount', renderCell: (params: any) => {
                    return <Typography className="text-green-500" variant="h4">{separateAmountWithCommas(params.value)}</Typography>;
                },
                headerName: 'کرایه(ریال)', headerClassName: "headerClassName", minWidth: 180, flex: 1
            },


        ]
        return col
    }


    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    return (
        <>
            <ReusableCard>
                <Formik initialValues={{ orderCode: "", customerId: "" }} onSubmit={() => { }}>
                    {({ values, handleSubmit }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="flex gap-4 w-[50%] mb-4" >
                                    <FormikInput name="orderCode" label="شماره سفارش" />
                                    <FormikCustomer label="مشتری" name="customerId" />
                                    <ButtonComponent onClick={() => handleFilter(values)}>
                                        <Typography>
                                            <Search />
                                        </Typography>
                                    </ButtonComponent>
                                </div>
                            </form>
                        );
                    }}
                </Formik>

                <MuiDataGrid
                    columns={readyToLadingColumns(renderAction)}
                    rows={cargoList?.data?.data}
                    data={cargoList?.data?.data}
                    isLoading={cargoList?.isLoading}
                    onDoubleClick={(item: any) => navigate(`/dashboard/lading/${item?.row?.id}`)}
                />
                <Pagination
                    pageCount={cargoList?.data?.totalCount / pageSize}
                    onPageChange={handlePageChange}
                />
            </ReusableCard>
        </>
    );
};

export default ReadyToLading;
