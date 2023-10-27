import { IProducts } from "../../product/core/_models";
import { Button, Typography, Box } from "@mui/material";
import MuiTable from "../../../../_cloner/components/MuiTable";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";
import MuiDataGridCustomRowStyle from "../../../../_cloner/components/MuiDataGridCustomRowStyle";
import { calculateTotalAmount } from "../helpers/functions";

const ProductSelectedList = (props: {
    orders: IProducts[];
    setOrders: any;
    setIsBuy: any;
    // setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>
    setFieldValue?: any;
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    selectedOrderIndex?: any;
    setSelectedOrderIndex?: any;
    products?: IProducts[]
}) => {
    const handleDeleteFromList = (indexToDelete: any) => {
        if (props.orders) {
            const updatedOrders = props.orders.filter(
                (order) =>
                    order.id !== indexToDelete.row.id &&
                    order.warehouseId !== indexToDelete.row.warehouseId &&
                    order.productBrandId !== indexToDelete.row.productBrandId
            );
            props.setOrders(updatedOrders);
            props.setFieldValue('amount', calculateTotalAmount(updatedOrders))
        }
    };

    const renderActions = (index: any) => {
        return (
            <>
                <Box
                    component="div"
                    onClick={() => handleDeleteFromList(index)}
                    className="cursor-pointer"
                >
                    <DeleteIcon className="text-red-500" />
                </Box>
            </>
        );
    };

    const columnTypes = {
        hidden: {
            width: 0, // Set the width to 0 to effectively hide the column
        },
    };

    const columns = (renderActions: any) => {
        const col = [
            {
                headerName: "کالا", field: "productName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>
                }, headerClassName: "headerClassName", flex: 1, minWidth: 120
            },
            {
                headerName: "برند", field: "productBrandName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>
                }, headerClassName: "headerClassName", flex: 1, minWidth: 80
            },
            {
                headerName: "انبار", field: "warehouseName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>
                }, headerClassName: "headerClassName", flex: 1, minWidth: 80
            },
            {
                headerName: "مقدار", field: "proximateAmount",
                renderCell: (params: any) => {
                    const combinedValue = `${params.row.proximateAmount} ${params.row.mainUnit} `;
                    return <Typography variant="h4">{combinedValue}</Typography>
                }, headerClassName: "headerClassName", flex: 1, minWidth: 110
            },
            {
                headerName: "تعداد/مقدار(فرعی)", field: "proximateSubUnit",
                renderCell: (params: any) => {
                    const combinedValue = `${params.row.proximateSubUnit} ${params.row.subUnit}`;
                    return <Typography variant="h4">{combinedValue}</Typography>
                }, headerClassName: "headerClassName", flex: 1, minWidth: 110
            },
            {
                headerName: "قیمت", field: "productPrice",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>
                }, headerClassName: "headerClassName", flex: 1, minWidth: 80
            },
           
            {
                headerName: "قیمت خرید", field: "buyPrice",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>
                }, headerClassName: "headerClassName", flex: 1, minWidth: 80
            },
            {
                headerName: "", field: "purchaseSettlementDate", hide: true
            },
            {
                headerName: "نوع فاکتور خرید", field: "purchaseInvoiceTypeName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>
                }, headerClassName: "headerClassName", flex: 1, minWidth: 120
            },
            {
                headerName: "", field: "rowId", hide: true
            },
            {
                headerName: "", field: "warehouseId", type: "hidden"
            },
            {
                headerName: "", field: "productBrandId", type: "hidden"
            },
            {
                headerName: "", field: "purchaseInvoiceTypeId", type: "hidden"
            },
            {
                headerName: "", field: "purchaserCustomerName", type: "hidden"
            },
            {
                headerName: "حذف",
                field: "Action",
                renderCell: renderActions,
                headerClassName: "headerClassName",
                minWidth: 80,
                flex: 1
            },
        ];
        return col;
    }

    const onDoubleClick = (params: any) => {
        const selectedRow: any = props.orders.find(order => order.id === params.row.id);
        const rowIndex = props.orders.indexOf(selectedRow);

        props.setSelectedOrderIndex(rowIndex);

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

        if (params.row.warehouseId === 1) {
            props.setIsBuy(true)
        } else {
            props.setIsBuy(false)
        }
        props.setIsUpdate(true);
    };

    const filteredColumns = columns(renderActions).filter(column => 
        column.field !== "warehouseId" && 
        column.field !== "productBrandId" && 
        column.field !== "rowId" && 
        column.field !== "purchaseSettlementDate" && 
        column.field !== "purchaserCustomerId" &&
        column.field !== "purchaserCustomerName" &&
        column.field !== "purchaseInvoiceTypeId" &&
        column.field !== "rowId" &&
        column.field !== "productDesc" );

        return (
        <>
            {/* <MuiTable */}
            <MuiDataGridCustomRowStyle
                columns={filteredColumns}
                columnTypes={columnTypes}
                rows={props.orders}
                data={props.orders}
                getRowClassName={(params: any) => {
                    if (params.row.warehouseId === 1 && (
                        params.row.purchaseSettlementDate === "" ||
                        params.row.buyPrice === "" ||
                        params.row.purchaseInvoiceTypeId === 0 ||
                        !params.row.purchaserCustomerName
                    )) {
                        return 'custom-row-style'
                    } else {
                        return ""
                    }

                }}
                onDoubleClick={(params: any) => {
                    onDoubleClick(params); // Pass the entire params object
                }}

            />
        </>
    );
};

export default ProductSelectedList;
