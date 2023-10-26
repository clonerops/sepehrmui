import { Typography } from "@mui/material"
import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount"

export const columnsCargo = (renderAction: any) => {
    const col = [
        {
            field: 'orderCode',
            headerName: 'شماره سفارش',
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>
            },
            minWidth: 100,
            maxWidth: 100,
            flex:1
        },
        {
            field: 'customerFullName',
            headerName: 'نام و نام خانوادگی',
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.row.customerFirstName} {params.row.customerLastName}</Typography>
            },
            minWidth: 180, 
            maxWidth: 180, 
            flex: 1
        },
        {
            field: 'totalAmount',
            headerName: 'مبلغ کل',
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{separateAmountWithCommas(params.value)} ریال</Typography>
            },
            minWidth: 140,
            maxWidth: 140,
            flex:1
        },
        {
            field: 'description',
            headerName: 'توضیحات',
            headerClassName: "headerClassName",
            renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>
            },
            minWidth: 320,
            maxWidth: 320,
            flex:1
        },
        {
            headerName: 'عملیات',
            renderCell: renderAction,
            headerClassName: "headerClassName",
            minWidth: 160,
            flex:1
        }
    ]
    return col
}