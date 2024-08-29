import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Tooltip, Typography } from '@mui/material'
import { useRetrievePurchaserOrdersByMutation } from "../core/_hooks";

import SearchFromBack from "../../../../_cloner/components/SearchFromBack";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import { PurchaserOrderConfirmColumn } from "../../../../_cloner/helpers/columns";


const ReadyToPurchaserOrderConfirm = () => {
    const navigate = useNavigate()

    const { mutate, data: orders, isLoading } = useRetrievePurchaserOrdersByMutation();

    useEffect(() => {
        const formData = {
            InvoiceTypeId: [1],
        }
        mutate(formData)
        // eslint-disable-next-line
    }, []);



    const renderAction = (item: any) => {
        return (
            <Tooltip title={<Typography variant='h3'>اقدام به ثبت تایید</Typography>}>
                <Link to={`${item.row.orderStatusId === 1 ? `/dashboard/purchaser_order/ready_to_confirm/${item?.row?.id}` : ""}`} state={{ isConfirmed: true }}>
                    <Button variant="contained" color="secondary" disabled={item?.row?.orderStatusId >= 2}>
                        <Typography>تایید فاکتور</Typography>
                    </Button>
                </Link>
            </Tooltip>
        );
    };

    // const allOption = [
    //     { value: -1, label: "همه" },
    //     { value: 2, label: "تایید شده حسابداری" },
    //     { value: 1, label: "جدید" }];

    const handleFilterBasedofStatus = (values: any) => {
        if (+values === -1) {
            const formData = {
                InvoiceTypeId: [1],
                OrderCode: +values?.orderCode
            };
            mutate(formData);

        } else {
            const formData = {
                InvoiceTypeId: [1],
                OrderStatusId: +values,
                OrderCode: +values?.orderCode
            };
            mutate(formData);
        }
    };

    return (
        <ReusableCard>
            {/* <div className="flex flex-col justify-between items-center space-y-4 lg:space-y-0 mb-4"> */}
            <div>
                <SearchFromBack inputName='orderCode' initialValues={{orderCode: ""}} onSubmit={handleFilterBasedofStatus} label="شماره سفارش" />
                {/* <div className="w-full lg:w-[40%]">
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
                </div> */}
                {/* <Formik initialValues={{ statusId: -1 }} onSubmit={() => { }}>
                    {() => {
                        return <>
                            <FormikRadioGroup onChange={handleFilterBasedofStatus} radioData={allOption} name="statusId" />
                        </>
                    }}
                </Formik> */}
            </div>
            <MuiDataGrid
                columns={PurchaserOrderConfirmColumn(renderAction)}
                rows={orders?.data || [{}]}
                data={orders?.data || [{}]}
                isLoading={isLoading}
                onDoubleClick={(item: any) => navigate(`${item.row.orderStatusId === 1 ? `/dashboard/purchaser_order/ready-to-confirm/${item?.row?.id}` : ""}`)}
            />
        </ReusableCard>
    );
};

export default ReadyToPurchaserOrderConfirm;
