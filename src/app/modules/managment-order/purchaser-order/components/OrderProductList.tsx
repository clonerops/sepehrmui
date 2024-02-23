import { Box } from "@mui/material";
import {Delete} from "@mui/icons-material";

import { calculateTotalAmount } from "../../helpers/functions";

import { IOrderItems, IOrderPayment, IOrderService } from "../../core/_models";

import MuiDataGridCustomRowStyle from "../../../../../_cloner/components/MuiDataGridCustomRowStyle";
import { BUY_WAREHOUSE_TYPES } from "../../helpers/constants";
import { separateAmountWithCommas } from "../../../../../_cloner/helpers/SeprateAmount";
import { orderPurchaserListColumns } from "../../helpers/columns";
import { IProducts } from "../../../generic/products/_models";

type ProductProps = {
    orders?: IOrderItems[] ;
    orderServices?: IOrderService[] ;
    setOrders?: React.Dispatch<React.SetStateAction<IOrderItems[]>>;
    setOrderPayment?: React.Dispatch<React.SetStateAction<IOrderPayment[]>>;
    // setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>> | undefined;
    setFieldValue?: any;
    selectedOrderIndex?: number;
    products?: IProducts[]
    disabled?: boolean
    setState?: React.Dispatch<React.SetStateAction<{
        isBuy: boolean;
        orderIndex: number;
        isUpdate: boolean;
        isProductChoose: boolean;
    }>>
}

const OrderProductList = (props: ProductProps) => {
    const { orders, orderServices, setOrders, setOrderPayment, setFieldValue, selectedOrderIndex, products, disabled, setState } = props;
    
    const handleDeleteFromList = (indexToDelete: any) => {
        if (orders) {
            const updatedOrders = orders.filter((order) =>
                    order.id+String(order.productBrandName)+String(order.warehouseName) !== indexToDelete.row.id+indexToDelete.row.productBrandName+indexToDelete.row.warehouseName
            );
            if (setOrders) setOrders(updatedOrders);
            if (setOrderPayment) setOrderPayment([]);
            if (setFieldValue) setFieldValue('amount', calculateTotalAmount(updatedOrders, orderServices).toString())
        }
    };

    const renderActions = (index: any) => {
        return (
            <>
                {!disabled &&
                    <Box
                        component="div"
                        onClick={() => handleDeleteFromList(index)}
                        className="cursor-pointer"
                    >
                        <Delete className="text-red-500" />
                    </Box>
                }
            </>
        );
    };

    const onDoubleClick = (params: any) => {
        if (orders) {
            const selectedRow: any = orders.find(order => order.id === params.row.id);
            const rowIndex = orders.indexOf(selectedRow);

            if (setState) setState((prev) => (
                {
                    ...prev, 
                    orderIndex: rowIndex
                }
            ))    
            const fieldValue = [
                {title: "productName", value: params.row.productName},
                {title: "id", value: params.row.id},
                {title: "productId", value: params.row.id},
                {title: "price", value: params.row.price.toString()},
                {title: "productBrandId", value: params.row.productBrandId},
                {title: "productBrandName", value: params.row.productBrandName},
                {title: "warehouseId", value: params.row.warehouseId},
                {title: "proximateAmount", value: params.row.proximateAmount},
                {title: "proximateSubUnit", value: params.row.exchangeRate ? Math.ceil(+params.row.proximateAmount.replace(/,/g, "") / params.row.exchangeRate) : params.row.proximateSubUnit},
                {title: "purchasePrice", value: separateAmountWithCommas(params.row.purchasePrice)},
                {title: "purchaseInvoiceTypeDesc", value: params.row.purchaseInvoiceTypeDesc},
                {title: "purchaseInvoiceTypeDesc", value: params.row.purchaseInvoiceTypeDesc},
                {title: "purchaseInvoiceTypeId", value: params.row.purchaseInvoiceTypeId},
                {title: "purchaseSettlementDate", value: params.row.purchaseSettlementDate},
                {title: "purchaserCustomerId", value: params.row.purchaserCustomerId},
                {title: "purchaserCustomerName", value: params.row.purchaserCustomerName},
                {title: "rowId", value: params.row.rowId},
                {title: "productDesc", value: params.row.productDesc},
                {title: "productMainUnitDesc", value: params.row.productMainUnitDesc},
                {title: "productSubUnitDesc", value: params.row.productSubUnitDesc},
                {title: "productSubUnitId", value: params.row.productSubUnitId},
                {title: "exchangeRate", value: params.row.exchangeRate},
            ];

            if (setFieldValue) {
                fieldValue.forEach((i: {title: string, value: any}) => (
                    setFieldValue(i.title, i.value)
                ))
            }
            
            if (setState) {
                if (BUY_WAREHOUSE_TYPES.includes(params.row.warehouseId)) {
                    setState((prev) => (
                        {
                            ...prev, 
                            isBuy: true
                        }
                    ))
                } else {
                    setState((prev) => (
                        {
                            ...prev, 
                            isBuy: false
                        }
                    ))
                }
            }
            if (setState) setState((prev) => (
                {
                    ...prev, 
                    isUpdate: true
                }
            ))

        }
    };

    const filteredColumns = orderPurchaserListColumns(renderActions).filter(column =>
        column.field !== "warehouseId" &&
        column.field !== "productBrandId" &&
        column.field !== "rowId" &&
        column.field !== "purchasePrice" &&
        column.field !== "purchaserCustomerId" &&
        column.field !== "purchaserCustomerName" &&
        column.field !== "purchaseInvoiceTypeId" &&
        column.field !== "purchaseInvoiceTypeDesc" &&
        column.field !== "rowId" &&
        column.field !== "productDesc" );

    return (
        <>
            <MuiDataGridCustomRowStyle
                columns={filteredColumns}
                columnTypes={{ hidden: { width: 0 }}}
                rows={orders}
                data={orders}
                getRowClassName={(params: any) => {
                    if (params.row.purchaseSettlementDate === "") {
                        return 'custom-row-style'
                    } else {
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

export default OrderProductList;
