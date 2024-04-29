import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Button, Tooltip, Typography } from '@mui/material'

import { IOrder } from "../core/_models";
import { useRetrievePurchaserOrdersByMutation } from "../core/_hooks";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import FormikRadioGroup from "../../../../_cloner/components/FormikRadioGroup";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import { purchaserOrderConfirm } from "../helpers/columns";
import { Approval } from "@mui/icons-material";


const ReadyToPurchaserOrderConfirm = () => {
    const navigate = useNavigate()

    const { mutate, data: orders, isLoading } = useRetrievePurchaserOrdersByMutation();
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
        // eslint-disable-next-line
    }, []);



    const renderAction = (item: any) => {
        console.log(item)
        return (
            <Tooltip title={<Typography variant='h3'>اقدام به ثبت تایید</Typography>}>
                <Link
                    to={`${item.row.purchaseOrderStatusId === 1 ? `/dashboard/purchaser_order/ready_to_confirm/${item?.row?.id}` : ""}`}
                    state={{ isConfirmed: true }}
                >
                    <Button variant="contained" color="secondary" disabled={item?.row?.purchaseOrderStatusId >= 2}>
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
                        data={orders?.data}
                        setResults={setResults}
                    />
                </div>
                <Formik initialValues={{ statusId: -1 }} onSubmit={() => { }}>
                    {() => {
                        return <>
                            <FormikRadioGroup onChange={handleFilterBasedofStatus} radioData={allOption} name="statusId" />
                        </>
                    }}
                </Formik>
            </div>
            <MuiDataGrid
                columns={purchaserOrderConfirm(renderAction)}
                rows={results}
                data={orders?.data}
                isLoading={isLoading}
                onDoubleClick={(item: any) => navigate(`${item.row.orderStatusId === 1 ? `/dashboard/purchaser_order/ready-to-confirm/${item?.row?.id}` : ""}`)}
            />
        </ReusableCard>
    );
};

export default ReadyToPurchaserOrderConfirm;
