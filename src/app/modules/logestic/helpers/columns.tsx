import { Typography } from "@mui/material"
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount"

export const readyToCargoColumns = (renderAction: any) => {
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
            field: 'orderExitTypeDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نوع خروج', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'paymentTypeDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نوع کرایه', headerClassName: "headerClassName", minWidth: 120, flex: 1
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
            field: 'totalAmount', renderCell: (params: any) => {
                return <Typography variant="h4" className="text-green-500">{separateAmountWithCommas(params.value)}</Typography>;
            },
            headerName: 'مبلغ کل (ریال)', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {field: "Action",  headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
    ]
    return col
}
