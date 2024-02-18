import { Typography } from "@mui/material"
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount"

export const columns = (renderAction: any) => {
    const col = [
        { field: 'id', headerName: 'کد استاندارد', headerClassName: "headerClassName", width: 80 },
        { field: 'desc', headerName: 'استاندارد', headerClassName: "headerClassName", width: 120 },
        {
            field: 'isActive', headerName: 'وضعیت', renderCell: (params: any) => (
                params.value === true ? "فعال" : "غیرفعال"
            ), flex: 1, headerClassName: "headerClassName", width: 120
        },
        { headerName: 'عملیات', renderCell: renderAction, headerClassName: "headerClassName", width: 160 }
    ]
    return col
}


export const purchaserOrderListsForBetweenWarehouseColumns = (renderAction: any) => {
    const col = [
        {
            field: 'orderCode',
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره سفارش',
            headerClassName: "headerClassName",
            minWidth: 100,
            maxWidth: 100,
            flex: 1
        },
        {
            field: 'registerDate',
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'تاریخ ثبت سفارش',
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1
        },
        {
            field: 'customerName',
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'فروشنده',
            headerClassName: "headerClassName",
            minWidth: 160,
            flex: 1
        },
        {
            field: 'invoiceTypeDesc',
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نوع فاکتور',
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1
        },
        {
            field: 'isTemporary',
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value === false ? "ثبت نهایی" : "ثبت موقت"}</Typography>;
            },
            headerName: 'نوع ثبت',
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1
        },
        {
            field: 'purchaseOrderStatusDesc',
            renderCell: (params: any) => {
                return params.value === 1 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.purchaseOrderStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.purchaseOrderStatusDesc}</Typography>
            },
            headerName: 'وضعیت',
            headerClassName: "headerClassName",
            minWidth: 180,
            flex: 1
        },
        {
            field: 'totalAmount',
            renderCell: (params: any) => {
                return <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'مبلغ کل (ریال)',
            headerClassName: "headerClassName",
            minWidth: 120,
            flex: 1
        },
        {
            field: "Action",
            headerName: 'جزئیات',
            flex: 1,
            renderCell: renderAction,
            headerClassName: "headerClassName",
            minWidth: 220
        }
    ]
    return col
}
