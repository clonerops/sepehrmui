import { IconButton, Typography } from "@mui/material";
import ReusableCard from "../../../../../_cloner/components/ReusableCard";
import FormikInput from "../../../../../_cloner/components/FormikInput";
import { SearchRounded } from "@mui/icons-material";
import { UseMutationResult } from "@tanstack/react-query";
import React, { FC } from "react";
import { FormikProps } from "formik";
import { sliceNumberPriceRial } from "../../../../../_cloner/helpers/sliceNumberPrice";
import { calculateTotalAmount } from "../../helpers/functions";
import { IOrderItems, IOrderService } from "../../core/_models";

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
    orderCode,
    formikRef,
    orders,
    orderServices
}) => {
    const onGetOrderDetailByCode = (e: React.ChangeEvent<HTMLInputElement>,  orderCode: number) => {
        e.preventDefault()
        detailTools.mutate(orderCode, {
            onSuccess: () => {
                formikRef.current?.setFieldValue("searchOrderCode", 545);
            },
        });
    };

    return (
        <ReusableCard cardClassName="col-span-2">
        {!postSaleOrder?.data?.succeeded &&
            <form onSubmit={(e: any) => onGetOrderDetailByCode(e, orderCode)} className="flex mt-4 gap-4">
                <FormikInput label="شماره سفارش" name="searchOrderCode" />
                <IconButton type="submit">
                    <SearchRounded color="secondary" />
                </IconButton>
            </form>
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
