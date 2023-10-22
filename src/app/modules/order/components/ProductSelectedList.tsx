import { IProducts } from "../../product/core/_models";
import { Button, Typography, Box } from "@mui/material";
import MuiTable from "../../../../_cloner/components/MuiTable";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";

const ProductSelectedList = (props: {
    orders: IProducts[];
    setOrders: any;
    // setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>
    setFieldValue?: any;
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    selectedOrderIndex?: any;
    setSelectedOrderIndex?: any;
}) => {
    const handleDeleteFromList = (indexToDelete: any) => {
        if (props.orders) {
            const updatedOrders = props.orders.filter(
                (order) =>
                    order.id !== indexToDelete.row.id ||
                    order.warehouseId !== indexToDelete.row.warehouseId
            );
            props.setOrders(updatedOrders);
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
    const columns = (renderActions: any) => {
        const col = [
            {
                headerName: "کالا", field: "productName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>
                }, headerClassName: "headerClassName", flex: 1, minWidth: 120
            },
            {
                headerName: "انبار", field: "warehouseName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>
                }, headerClassName: "headerClassName", flex: 1, minWidth: 80
            },
            {
                headerName: "مقدار(واحداصلی)", field: "proximateAmount",
                renderCell: (params: any) => {
                    const combinedValue = `${params.row.proximateAmount} ${params.row.mainUnit} `;
                    return <Typography variant="h4">{combinedValue}</Typography>
                }, headerClassName: "headerClassName", flex: 1, minWidth: 110
            },
            {
                headerName: "مقدار(واحدفرعی)", field: "proximateSubUnit",
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
            // {
            //     headerName: "توضیحات", field: "productDesc",
            //     renderCell: (params: any) => {
            //         return <Typography variant="h4">{params.value}</Typography>
            //     }, headerClassName: "headerClassName", flex: 1, minWidth: 80
            // },
            {
                headerName: "ردیف فروش", field: "rowId",
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
                headerName: "تاریخ تسویه خرید", field: "purchaseSettlementDate",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>
                }, headerClassName: "headerClassName", flex: 1, minWidth: 120
            },
            {
                headerName: "نوع فاکتور خرید", field: "purchaseInvoiceTypeName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>
                }, headerClassName: "headerClassName", flex: 1, minWidth: 120
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

    const onDoubleClick = (rowData: any, index: number) => {
        props.setSelectedOrderIndex(index);

        if (props.setFieldValue) {
            props.setFieldValue("productName", rowData.productName);
            props.setFieldValue("id", rowData.id);
            props.setFieldValue("productPrice", rowData.productPrice);
            props.setFieldValue("proximateAmount", rowData.proximateAmount);
            props.setFieldValue("warehouseId", rowData.warehouseId);
        }
        props.setIsUpdate(true);
    };

    return (
        <>
            {/* <MuiTable */}
            <MuiDataGrid
                columns={columns(renderActions)}
                rows={props.orders}
                data={props.orders}
                onDoubleClick={onDoubleClick}
            />
        </>
    );
};

export default ProductSelectedList;
