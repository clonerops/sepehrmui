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

    let formData = {
        pageNumber: currentPage,
        pageSize: pageSize,    
    }

    const { data: orders, isLoading } = useRetrieveOrders(formData);
    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        setResults(orders?.data);
    }, [orders?.data]);

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
        { value: "2", label: "تایید شده" },
        { value: "3", label: "تایید نشده" }];
    const radioData = [...allOption];

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

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
                <Formik initialValues={{ warehouseId: "-1" }} onSubmit={() => { }}>
                    {({ }) => {
                        return <Form>
                            <FormikRadioGroup onChange={() => { }} radioData={radioData} name="warehouseId" />
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
            <Pagination pageCount={20} onPageChange={handlePageChange} />
        </ReusableCard>
    );
};

export default OrderConfirmList;
