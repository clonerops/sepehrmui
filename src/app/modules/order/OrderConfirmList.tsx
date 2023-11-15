import { useState, useEffect } from "react";
import { useRetrieveOrders } from "./core/_hooks";
import { Link } from "react-router-dom";
import { IOrder } from "./core/_models";
import { Box, Button, Typography } from "@mui/material";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import { orderColumns } from "./helpers/columns";
import { Form, Formik } from "formik";
import FormikRadioGroup from "../../../_cloner/components/FormikRadioGroup";
import Pagination from "../../../_cloner/components/Pagination";

const pageSize = 20


const OrderConfirmList = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filterData, setFilterData] = useState<{
        pageNumber: number;
        pageSize: number;
        InvoiceTypeId: number[];
        OrderStatusId?: number    
    }>({
        pageNumber: currentPage,
        pageSize: pageSize, 
        InvoiceTypeId: [1, 2],   
    })

    const { data: orders, isLoading , refetch} = useRetrieveOrders(filterData);
    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        setResults(orders?.data);
    }, [orders?.data, filterData]);



    const renderAction = (item: any) => {
        return (
            <Link
                to={`/dashboard/order/confirm/${item?.row?.id}`}
                state={{ isConfirmed: true }}
            >
                <Button variant="contained" color="secondary">
                    <Typography variant="h4" color="primary">اقدام به ثبت تایید</Typography>
                </Button>
            </Link>
        );
    };

    const allOption = [
        { value: "-1", label: "همه" },
        { value: "2", label: "تایید شده حسابداری" },
        { value: "1", label: "جدید" }];
    const radioData = [...allOption];

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    const handleFilterBasedofStatus = (values: any) => {
        if(+values.statusId === 1) {
            setFilterData({
                pageNumber: currentPage,
                pageSize: pageSize, 
                InvoiceTypeId: [1, 2],
                OrderStatusId: 1                
            })

        }  else if(+values.statusId === 2) {
            setFilterData({
                pageNumber: currentPage,
                pageSize: pageSize, 
                InvoiceTypeId: [1, 2],
                OrderStatusId: 2                
            })

        }
        refetch()
    }

    return (
        <ReusableCard>
            <Typography color="primary" variant="h1" className="pb-2 !text-sm md:!text-2xl">
                لیست سفارشات جهت تایید
            </Typography>
            <Box component="div" className="flex justify-between items-center mb-4">
                <Box component="div" className="w-auto md:w-[40%]">
                    <FuzzySearch
                        keys={[
                            "orderCode",
                            "registerDate",
                            "customerFirstName",
                            "customerLastName",
                            "orderSendTypeDesc",
                            "paymentTypeDesc",
                            "invoiceTypeDesc",
                            "totalAmount",
                            "exitType",
                        ]}
                        data={orders?.data}
                        threshold={0.5}
                        setResults={setResults}
                    />
                </Box>
                <Formik initialValues={{ statusId: "-1" }} onSubmit={() => { }}>
                    {({ values }) => {
                        return <Form>
                            <FormikRadioGroup radioData={radioData} name="statusId" />
                        </Form>
                    }}
                </Formik>
            </Box>
            <MuiDataGrid
                columns={orderColumns(renderAction)}
                rows={results}
                data={orders?.data}
                isLoading={isLoading}
            />
            <Pagination pageCount={orders?.totalCount / pageSize} onPageChange={handlePageChange} />
        </ReusableCard>
    );
};

export default OrderConfirmList;
