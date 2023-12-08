import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import {Button, Typography, Box} from '@mui/material'

import { IOrder } from "../core/_models";
import { useRetrieveOrdersByMutation } from "../core/_hooks";
import {  salesOrderConfirmColumns } from "../components/columns";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import FormikRadioGroup from "../../../../_cloner/components/FormikRadioGroup";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";


const ReadyToSalesOrderConfirm = () => {
    
    const { mutate, data: orders, isLoading } = useRetrieveOrdersByMutation();
    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        const formData = {
            InvoiceTypeId: [1, 2], 
        }
        mutate(formData, {
            onSuccess: (message) => {
                setResults(message?.data);
            }
        })
    }, []);



    const renderAction = (item: any) => {
        return (
            <Link
                to={`${item.row.orderStatusId !== 2 ? `/dashboard/sales-order/ready-to-confirm/${item?.row?.id}` : ""}`}
                state={{ isConfirmed: true }}
            >
                <Button variant="contained" color="secondary" disabled={item?.row?.orderStatusId === 2}> 
                    <Typography variant="h4" color="primary">اقدام به ثبت تایید</Typography>
                </Button>
            </Link>
        );
    };

    const allOption = [
        { value: -1, label: "همه" },
        { value: 2, label: "تایید شده حسابداری" },
        { value: 1, label: "جدید" }];

    const handleFilterBasedofStatus = (values: any) => {
        if(+values === -1) {
            const formData = {
                InvoiceTypeId: [1, 2],
            };
            mutate(formData, {
                onSuccess: (message) => {
                    setResults(message?.data);
                },
            });

        } else {
            const formData = {
                InvoiceTypeId: [1, 2],
                OrderStatusId: +values,
            };
            mutate(formData, {
                onSuccess: (message) => {
                    setResults(message?.data);
                },
            });
        }
    };

    return (
        <ReusableCard>
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
                <Formik initialValues={{ statusId: -1 }} onSubmit={() => { }}>
                    {({ }) => {
                        return <>
                            <FormikRadioGroup onChange={handleFilterBasedofStatus} radioData={allOption} name="statusId" />
                        </>
                    }}
                </Formik>
            </Box>
            <MuiDataGrid
                columns={salesOrderConfirmColumns(renderAction)}
                rows={results}
                data={orders?.data}
                isLoading={isLoading}
            />
        </ReusableCard>
    );
};

export default ReadyToSalesOrderConfirm;
