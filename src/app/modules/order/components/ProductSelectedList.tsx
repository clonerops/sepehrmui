import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiDataGridCustomRowStyle from "../../../../_cloner/components/MuiDataGridCustomRowStyle";
import { calculateTotalAmount } from "../helpers/functions";
import { orderListColumns } from "./columns";
import { ProductProps } from "../core/_models";



// const ProductSelectedList = (props: {
//     orders: IProducts[];
//     setOrders: any;
//     setIsBuy: any;
//     setFieldValue?: any;
//     setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
//     selectedOrderIndex?: any;
//     setSelectedOrderIndex?: any;
//     products?: IProducts[]
//     disabled?: boolean
// }) => {
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
            if (props?.setFieldValue) props?.setFieldValue('amount', calculateTotalAmount(updatedOrders))
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

    const columnTypes = {
        hidden: {
            width: 0,
        },
    };

    const onDoubleClick = (params: any) => {
        if (props?.orders) {
            const selectedRow: any = props?.orders.find(order => order.id === params.row.id);
            const rowIndex = props?.orders.indexOf(selectedRow);

            if (props?.setSelectedOrderIndex) props?.setSelectedOrderIndex(rowIndex);

            if (props.setFieldValue) {
                props.setFieldValue("productName", params.row.productName);
                props.setFieldValue("id", params.row.id);
                props.setFieldValue("productPrice", params.row.productPrice);
                props.setFieldValue("productBrandId", params.row.productBrandId);
                props.setFieldValue("productBrandName", params.row.productBrandName);
                props.setFieldValue("warehouseId", params.row.warehouseId);
                props.setFieldValue("proximateAmount", params.row.proximateAmount);
                props.setFieldValue("warehouseName", params.row.warehouseName);
                props.setFieldValue("proximateSubUnit", params.row.proximateSubUnit);
                props.setFieldValue("buyPrice", params.row.buyPrice);
                props.setFieldValue("purchaseInvoiceTypeName", params.row.purchaseInvoiceTypeName);
                props.setFieldValue("purchaseInvoiceTypeId", params.row.purchaseInvoiceTypeId);
                props.setFieldValue("purchaseSettlementDate", params.row.purchaseSettlementDate);
                props.setFieldValue("purchaserCustomerId", params.row.purchaserCustomerId);
                props.setFieldValue("purchaserCustomerName", params.row.purchaserCustomerName);
                props.setFieldValue("rowId", params.row.rowId);
                props.setFieldValue("productDesc", params.row.productDesc);
                props.setFieldValue("mainUnit", params.row.mainUnit);
                props.setFieldValue("subUnit", params.row.subUnit);
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
                columnTypes={columnTypes}
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
