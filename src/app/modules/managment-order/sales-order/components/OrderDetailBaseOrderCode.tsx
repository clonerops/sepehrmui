import { Typography } from "@mui/material";
import ReusableCard from "../../../../../_cloner/components/ReusableCard";
import { UseMutationResult } from "@tanstack/react-query";
import React, { FC } from "react";
import { FormikProps } from "formik";
import { sliceNumberPriceRial } from "../../../../../_cloner/helpers/sliceNumberPrice";
import { calculateTotalAmount } from "../../helpers/functions";
import { IOrderItems, IOrderService } from "../../core/_models";
import SearchFromBack from "../../../../../_cloner/components/SearchFromBack";

interface IProps {
    postSaleOrder: any
    detailTools: UseMutationResult<any, unknown, number, unknown>;
    orderCode: number;
    formikRef: React.RefObject<FormikProps<any>>;
    orders?: IOrderItems[]
    orderServices?: IOrderService[]
}

interface IRenderProps {
    value: any 
    title: string
}

const RenderInfo:FC<IRenderProps> = ({value, title}) => {
    return (
        <div className="flex justify-between">
            <Typography variant="h4" className="text-gray-500">
                {title}
            </Typography>
            <Typography variant="h3">
                {value}
            </Typography>
        </div>
    );
};

const OrderDetailBaseOrderCode: FC<IProps> = ({
    postSaleOrder,
    detailTools,
    formikRef,
    orders,
    orderServices
}) => {
    const onGetOrderDetailByCode = (values: any) => {
        detailTools.mutate(values.orderCode, {
            onSuccess: () => {
                formikRef.current?.setFieldValue("searchOrderCode", 545);
            },
        });
    };

    return (
        <ReusableCard cardClassName="col-span-2">
        {!postSaleOrder?.data?.succeeded &&
                    <SearchFromBack inputName='orderCode' initialValues={{orderCode: ""}} onSubmit={onGetOrderDetailByCode} label="شماره سفارش" />
        }
            <div className="mt-8 space-y-8">
                <RenderInfo value={detailTools?.data?.data.orderCode ? detailTools?.data?.data.orderCode : "------------------"} title="شماره سفارش" />
                <RenderInfo value={detailTools?.data?.data.customerName ? detailTools?.data?.data.customerName : "------------------"} title="مشتری" />
                <RenderInfo value={detailTools?.data?.data.registerDate ? detailTools?.data?.data.registerDate : "------------------"} title="تاریخ سفارش" />
                <RenderInfo value={sliceNumberPriceRial(calculateTotalAmount(orders, orderServices))} title="قیمت کل" />
                
            </div>
        </ReusableCard>
    );
};

export default OrderDetailBaseOrderCode;
