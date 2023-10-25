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
            props.setFieldValue("amount", updatedOrders.reduce((accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.productPrice.replace(/,/g, ""), 10), 0))
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

    const onDoubleClick = (params: any) => {
            // Find the index of the double-clicked row based on the row's ID
    const selectedRow: any = props.orders.find(order => order.id === params.row.id);
    const rowIndex = props.orders.indexOf(selectedRow);


        props.setSelectedOrderIndex(rowIndex);

        if (props.setFieldValue) {
            props.setFieldValue("productName", params.row.productName);
            props.setFieldValue("id", params.row.id);
            props.setFieldValue("productPrice", params.row.productPrice);
            props.setFieldValue("proximateAmount", params.row.proximateAmount);
            props.setFieldValue("warehouseId", params.row.warehouseId);
            props.setFieldValue("proximateSubUnit", params.row.proximateSubUnit);
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
                onDoubleClick={(params: any) => {
                    onDoubleClick(params); // Pass the entire params object
                }}
                
            />
        </>
    );
};

export default ProductSelectedList;
