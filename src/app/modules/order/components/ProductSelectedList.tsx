import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiDataGridCustomRowStyle from "../../../../_cloner/components/MuiDataGridCustomRowStyle";
import { calculateTotalAmount } from "../helpers/functions";
import { orderListColumns } from "./columns";
import { ProductProps } from "../core/_models";
import { v4 as uuidv4 } from 'uuid';

const ProductSelectedList = (props: ProductProps) => {
    const handleDeleteFromList = (indexToDelete: any) => {
        if (props.orders) {
            const updatedOrders = props.orders.filter(
                (order) =>
                    order.id !== indexToDelete.row.id &&
                    order.warehouseId !== indexToDelete.row.warehouseId &&
                    order.productBrandId !== indexToDelete.row.productBrandId
            );
            if (props?.setOrders) props?.setOrders(updatedOrders);
            if (props?.setFieldValue) props?.setFieldValue('amount', calculateTotalAmount(updatedOrders, props.orderService))
        }
    };

    const renderActions = (index: any) => {
        return (
            <>
                {!props.disabled &&
                    <Box
                        component="div"
                        onClick={() => handleDeleteFromList(index)}
                        className="cursor-pointer"
                    >
                        <DeleteIcon className="text-red-500" />
                    </Box>
                }
            </>
        );
    };

    const onDoubleClick = (params: any) => {
        if (props?.orders) {
            const selectedRow: any = props?.orders.find(order => order.id === params.row.id);
            const rowIndex = props?.orders.indexOf(selectedRow);

            if (props?.setSelectedOrderIndex) props?.setSelectedOrderIndex(rowIndex);
            
            const fieldValue = [
                {id: uuidv4(), title: "productName", value: params.row.productName},
                {id: uuidv4(), title: "id", value: params.row.id},
                {id: uuidv4(), title: "productPrice", value: params.row.productPrice},
                {id: uuidv4(), title: "productBrandId", value: params.row.productBrandId},
                {id: uuidv4(), title: "productBrandName", value: params.row.productBrandName},
                {id: uuidv4(), title: "warehouseId", value: params.row.warehouseId},
                {id: uuidv4(), title: "proximateAmount", value: params.row.proximateAmount},
                {id: uuidv4(), title: "warehouseName", value: params.row.warehouseName},
                {id: uuidv4(), title: "proximateSubUnit", value: params.row.proximateSubUnit},
                {id: uuidv4(), title: "buyPrice", value: params.row.buyPrice},
                {id: uuidv4(), title: "purchaseInvoiceTypeName", value: params.row.purchaseInvoiceTypeName},
                {id: uuidv4(), title: "purchaseInvoiceTypeId", value: params.row.purchaseInvoiceTypeId},
                {id: uuidv4(), title: "purchaseSettlementDate", value: params.row.purchaseSettlementDate},
                {id: uuidv4(), title: "purchaserCustomerId", value: params.row.purchaserCustomerId},
                {id: uuidv4(), title: "purchaserCustomerName", value: params.row.purchaserCustomerName},
                {id: uuidv4(), title: "rowId", value: params.row.rowId},
                {id: uuidv4(), title: "productDesc", value: params.row.productDesc},
                {id: uuidv4(), title: "mainUnit", value: params.row.mainUnit},
                {id: uuidv4(), title: "subUnit", value: params.row.subUnit},
            ];

            if (props.setFieldValue) {
                fieldValue.forEach((i: {title: string, value: any}) => (
                    props.setFieldValue(i.title, i.value)
                ))
            }
            
            if (props.setIsBuy) {
                if (params.row.warehouseId === 1) {
                    props.setIsBuy(true)
                } else {
                    props.setIsBuy(false)
                }
            }
            if (props?.setIsUpdate) props?.setIsUpdate(true);
        }
    };

    const filteredColumns = orderListColumns(renderActions).filter(column =>
        column.field !== "warehouseId" &&
        column.field !== "productBrandId" &&
        column.field !== "rowId" &&
        column.field !== "purchaseSettlementDate" &&
        column.field !== "purchaserCustomerId" &&
        column.field !== "purchaserCustomerName" &&
        column.field !== "purchaseInvoiceTypeId" &&
        column.field !== "rowId" &&
        column.field !== "productDesc");

    return (
        <>
            <MuiDataGridCustomRowStyle
                columns={filteredColumns}
                columnTypes={{ hidden: { width: 0 }}}
                rows={props.orders}
                data={props.orders}
                getRowClassName={(params: any) => {
                    if (params.row.warehouseId === 1 && (
                        params.row.purchaseSettlementDate === "" ||
                        params.row.buyPrice === "" ||
                        params.row.proximateAmount === "" ||
                        params.row.purchaseInvoiceTypeId === 0 ||
                        !params.row.purchaserCustomerName
                    )) {
                        return 'custom-row-style'
                    } else if (params.row.warehouseId === 2 && (
                        params.row.proximateAmount === ""
                    )) {
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

export default ProductSelectedList;
