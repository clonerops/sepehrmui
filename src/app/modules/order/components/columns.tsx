import { Typography } from "@mui/material";
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount";

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
                const combinedValue = `${params.row.proximateAmount} ${params.row.productMainUnitDesc} `;
                return <Typography variant="h4">{combinedValue}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        {
            headerName: "مقدار(فرعی)", field: "proximateSubUnit",
            renderCell: (params: any) => {
                const combinedValue = `${params.row.proximateSubUnit} ${params.row.productSubUnitDesc}`;
                return <Typography variant="h4">{combinedValue}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        {
            headerName: "قیمت(ریال)", field: "price",
            renderCell: (params: any) => {
                return <Typography variant="h4">{separateAmountWithCommas(params.value)}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },

        {
            headerName: "قیمت خرید", field: "purchasePrice",
            renderCell: (params: any) => {
                return <Typography variant="h4">{separateAmountWithCommas(params.value)}</Typography>
            }, headerClassName: "headerClassName", flex: 1, minWidth: 120,
        },
        {
            headerName: "", field: "purchaseSettlementDate", hide: true
        },
        {
            headerName: "نوع فاکتور خرید", field: "purchaseInvoiceTypeDesc",
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

export const salesOrderConfirmColumns = (renderAction: any) => {
    const col = [
        {
            field: 'orderCode', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره سفارش', headerClassName: "headerClassName", minWidth: 100, maxWidth: 100, flex: 1
        },
        {
            field: 'registerDate', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'تاریخ ثبت سفارش', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'customerName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'سفارش دهنده', headerClassName: "headerClassName", minWidth: 160, flex: 1
        },
        {
            field: 'invoiceTypeDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نوع فاکتور', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'isTemporary', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value === false ? "ثبت نهایی" : "ثبت موقت"}</Typography>;
            },
            headerName: 'نوع ثبت', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'orderStatusId', renderCell: (params: any) => {
                return params.value === 1 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.orderStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.orderStatusDesc}</Typography>
            },
            headerName: 'وضعیت', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
        {
            field: 'totalAmount', renderCell: (params: any) => {
                return <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'مبلغ کل (ریال)', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
    ]
    return col
}