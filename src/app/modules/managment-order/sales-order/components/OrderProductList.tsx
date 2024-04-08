import { FC, memo } from "react";
import {Delete} from "@mui/icons-material";

import { calculateTotalAmount } from "../../helpers/functions";

import { IOrderItems, IOrderPayment, IOrderService } from "../../core/_models";
import { separateAmountWithCommas } from "../../../../../_cloner/helpers/SeprateAmount";
import { orderListColumns } from "../../helpers/columns";
import { FormikErrors } from "formik";
import { BUY_WAREHOUSE_TYPES } from "../../helpers/constants";

import MuiDataGridCustomRowStyle from "../../../../../_cloner/components/MuiDataGridCustomRowStyle";
import { IProducts } from "../../../generic/products/_models";

interface IProps {
    orders?: IOrderItems[] 
    orderServices?: IOrderService[] 
    setOrders?: React.Dispatch<React.SetStateAction<IOrderItems[]>>
    setOrderPayment?: React.Dispatch<React.SetStateAction<IOrderPayment[]>>
    selectedOrderIndex?: number
    products?: IProducts[]
    setOrderValid: React.Dispatch<React.SetStateAction<boolean>>
    setOrderIndex: React.Dispatch<React.SetStateAction<number>>
    disabled?: boolean
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
    values: any,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>
}

const OrderProductList:FC<IProps> = (props: IProps) => {
    const { orders, orderServices, setOrders, setOrderPayment, setOrderValid, disabled,  setIsUpdate, setOrderIndex, setFieldValue } = props;
    
    const handleDeleteFromList = (indexToDelete: any) => {
        if (orders) {
            const updatedOrders = orders.filter((order) =>
                    order.id+String(order.productBrandName)+String(order.warehouseName) !== indexToDelete.row.id+indexToDelete.row.productBrandName+indexToDelete.row.warehouseName
            );
            if (setOrders) setOrders(updatedOrders);
            if (setOrderPayment) setOrderPayment([]);
            if (setFieldValue) setFieldValue('orderPaymentAmount', calculateTotalAmount(updatedOrders, orderServices))
        }
    };

    const renderActions = (index: any) => {
        return (
            <>
                {!disabled &&
                    <div
                        onClick={() => handleDeleteFromList(index)}
                        className="cursor-pointer"
                    >
                        <Delete className="text-red-500" />
                    </div>
                }
            </>
        );
    };

    const onDoubleClick = (params: any) => {
        if (orders) {
            const selectedRow: any = orders.find(order => order.id === params.row.id);
            const rowIndex = orders.indexOf(selectedRow);
            setOrderIndex(rowIndex)
            const fieldValue = [
                {title: "productName", value: params.row.productName},
                {title: "id", value: params.row.id},
                {title: "productId", value: params.row.productId},
                {title: "price", value: params.row.price.toString()},
                {title: "productBrandId", value: params.row.productBrandId},
                {title: "productBrandName", value: params.row.productBrandName},
                {title: "warehouseId", value: params.row.warehouseId},
                {title: "warehouseTypeId", value: params.row.warehouseTypeId},
                {title: "proximateAmount", value: params.row.proximateAmount},
                {title: "warehouseName", value: params.row.warehouseName},
                {title: "proximateSubUnit", value: params.row.exchangeRate ? Math.ceil(+params.row.proximateAmount.replace(/,/g, "") / params.row.exchangeRate) : params.row.proximateSubUnit},
                {title: "productSubUnitAmount", value: params.row.exchangeRate ? Math.ceil(+params.row.proximateAmount.replace(/,/g, "") / params.row.exchangeRate) : params.row.proximateSubUnit},
                {title: "purchasePrice", value: separateAmountWithCommas(params.row.purchasePrice)},
                {title: "purchaseInvoiceTypeDesc", value: params.row.purchaseInvoiceTypeDesc},
                {title: "purchaseInvoiceTypeId", value: params.row.purchaseInvoiceTypeId},
                {title: "purchaseSettlementDate", value: params.row.purchaseSettlementDate},
                {title: "purchaserCustomerId", value: params.row.purchaserCustomerId},
                {title: "purchaserCustomerName", value: params.row.purchaserCustomerName},
                {title: "rowId", value: params.row.rowId},
                {title: "detailDescription", value: params.row.description},
                {title: "productMainUnitDesc", value: params.row.productMainUnitDesc},
                {title: "productSubUnitDesc", value: params.row.productSubUnitDesc},
                {title: "productSubUnitId", value: params.row.productSubUnitId},
                {title: "exchangeRate", value: params.row.exchangeRate},
            ];

            fieldValue.forEach((i: {title: string, value: any}) => (
                setFieldValue(i.title, i.value)
            ))
            setIsUpdate(true)
        }
    };

    const filteredColumns = orderListColumns(renderActions).filter(column =>
        column.field !== "warehouseId" &&
        column.field !== "warehouseTypeId" &&
        column.field !== "productBrandId" &&
        column.field !== "rowId" &&
        column.field !== "purchaseSettlementDate" &&
        column.field !== "purchaserCustomerId" &&
        column.field !== "purchaserCustomerName" &&
        column.field !== "purchaseInvoiceTypeId" &&
        // column.field !== "purchaseInvoiceTypeDesc" &&
        column.field !== "rowId" &&
        column.field !== "productDesc");

    return (
        <>
            <MuiDataGridCustomRowStyle
                columns={filteredColumns}
                columnTypes={{ hidden: { width: 0 }}}
                rows={orders}
                data={orders}
                getRowClassName={(params: any) => {
                    if (BUY_WAREHOUSE_TYPES.includes(params.row.warehouseId) && (
                        params.row.purchaseSettlementDate === "" ||
                        params.row.purchasePrice === "" ||
                        params.row.proximateAmount === "" ||
                        params.row.purchaseInvoiceTypeId === ""  ||
                        !params.row.purchaserCustomerName
                    )) {
                        setOrderValid(false)
                        return 'custom-row-style'
                    } else if ([2, 6].includes(params.row.warehouseId) && (
                        params.row.proximateAmount === "" ||
                        params.row.price === "0" ||
                        params.row.price === 0 ||
                        params.row.price === ""
                    )) {
                        setOrderValid(false)
                        return 'custom-row-style'
                    } else {
                        setOrderValid(true)
                        return ""
                    }
                }}
                onDoubleClick={(params: any) => {
                    onDoubleClick(params);
                }}

            />
        </>
    );
};

export default memo(OrderProductList);
