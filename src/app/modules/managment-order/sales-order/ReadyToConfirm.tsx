import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Button, Tooltip, Typography } from '@mui/material'

import { IOrder } from "../core/_models";
import { useRetrieveOrdersByMutation } from "../core/_hooks";
import { Approval } from "@mui/icons-material";
import { SalesOrderConfirmColumn } from "../../../../_cloner/helpers/columns";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FuzzySearch from "../../../../_cloner/helpers/fuse";
import FormikRadioGroup from "../../../../_cloner/components/FormikRadioGroup";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import { InvoiceType } from "../../../../_cloner/helpers/Enums";
import { useAuth } from "../../../../_cloner/helpers/checkUserPermissions";
import AccessDenied from "../../../routing/AccessDenied";


const ReadyToSalesOrderConfirm = () => {
    const { hasPermission } = useAuth() 

    const navigate = useNavigate()
    
    const orderTools = useRetrieveOrdersByMutation();
    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        const formData = {
            InvoiceTypeId: [InvoiceType.Mahfam, InvoiceType.Sepehr],
            OrderStatusId: 1
        }
        orderTools.mutate(formData, {
            onSuccess: (message) => {
                setResults(message?.data);
            }
        })
        // eslint-disable-next-line
    }, []);



    const renderAction = (item: any) => {
        return (
            <Tooltip title={<Typography variant='h3'>اقدام به ثبت تایید</Typography>}>
                <Link
                    to={`${item.row.orderStatusId === 1 ? `/dashboard/sales_order/ready_to_confirm/${item?.row?.id}` : ""}`}
                    state={{ isConfirmed: true }}
                >
                    <Button variant="contained" color="secondary" disabled={item?.row?.orderStatusId >= 2}>
                        <Approval />
                    </Button>
                </Link>
            </Tooltip>
        );
    };

    const allOption = [
        { value: -1, label: "همه" },
        { value: 2, label: "تایید شده حسابداری" },
        { value: 1, label: "جدید" }];

    const handleFilterBasedofStatus = (values: any) => {
        if (+values === -1) {
            const formData = {
                // InvoiceTypeId: [1, 2],
                InvoiceTypeId: [InvoiceType.Mahfam, InvoiceType.Sepehr],
            };
            orderTools.mutate(formData, {
                onSuccess: (message) => {
                    setResults(message?.data);
                },
            });

        } else {
            const formData = {
                // InvoiceTypeId: [1, 2],
                InvoiceTypeId: [InvoiceType.Mahfam, InvoiceType.Sepehr],
                OrderStatusId: +values,
            };
            orderTools.mutate(formData, {
                onSuccess: (message) => {
                    setResults(message?.data);
                },
            });
        }
    };

    if(!hasPermission("ApproveOrderInvoiceType"))
        return <AccessDenied />

    return (
        <ReusableCard>
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 mb-4">
                <div className="w-full lg:w-[40%]">
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
                        data={orderTools?.data?.data}
                        threshold={0.5}
                        setResults={setResults}
                    />
                </div>
                <Formik initialValues={{ statusId: 1 }} onSubmit={() => { }}>
                    {() => {
                        return <>
                            <FormikRadioGroup onChange={handleFilterBasedofStatus} radioData={allOption} name="statusId" />
                        </>
                    }}
                </Formik>
            </div>
            <MuiDataGrid
                columns={SalesOrderConfirmColumn(renderAction)}
                rows={results}
                data={orderTools?.data?.data}
                isLoading={orderTools.isLoading}
                onDoubleClick={(item: any) => navigate(`${item.row.orderStatusId === 1 ? `/dashboard/sales_order/ready_to_confirm/${item?.row?.id}` : ""}`)}
            />
        </ReusableCard>
    );
};

export default ReadyToSalesOrderConfirm;
