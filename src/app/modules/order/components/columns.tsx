import { Typography } from "@mui/material";

export const orderListColumns = (renderActions: any) => {
    const col = [
        {
            headerName: "کالا", field: "productName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 190, maxWidth: 190
        },
        {
            headerName: "برند", field: "productBrandName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        {
            headerName: "انبار", field: "warehouseName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        {
            headerName: "مقدار", field: "proximateAmount",
            renderCell: (params: any) => {
                const combinedValue = `${params.row.proximateAmount} ${params.row.mainUnit} `;
                return <Typography variant="h4">{combinedValue}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        {
            headerName: "مقدار(فرعی)", field: "proximateSubUnit",
            renderCell: (params: any) => {
                const combinedValue = `${params.row.proximateSubUnit} ${params.row.subUnit}`;
                return <Typography variant="h4">{combinedValue}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        {
            headerName: "قیمت(ریال)", field: "productPrice",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },

        {
            headerName: "قیمت خرید", field: "buyPrice",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        {
            headerName: "", field: "purchaseSettlementDate", hide: true
        },
        {
            headerName: "نوع فاکتور خرید", field: "purchaseInvoiceTypeName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
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
            minWidth: 120,
            flex: 1
        },
    ];
    return col;
}