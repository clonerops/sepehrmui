import { Typography } from "@mui/material";

export const billlandingColumns = (renderAction: any) => {
    const col = [
        {
            field: 'id', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره حواله', headerClassName: "headerClassName", minWidth: 80, flex: 1
        },
        {
            field: 'registerDate', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'تاریخ حواله', headerClassName: "headerClassName", minWidth: 90, flex: 1
        },
        {
            field: 'transferRemittanceTypeDesc', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'نوع انتقال', headerClassName: "headerClassName", minWidth: 90, flex: 1
        },
        {
            field: 'transferRemittanceStatusDesc', renderCell: (params: any) => {
                return params.row.transferRemittanceStatusId === 2 ? <Typography className="border-2 border-[#272862] text-[#272862] rounded-[4px] px-3 py-1">{params.row.transferRemittanceStatusDesc}</Typography> : <Typography className="border-2 border-green-500 text-green-500 rounded-[4px] px-3 py-1">{params.row.transferRemittanceStatusDesc}</Typography>
            },
            headerName: 'وضعیت', headerClassName: "headerClassName", minWidth: 180, flex: 1
        },
        {
            field: 'originWarehouseName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'انبار مبدا', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {
            field: 'destinationWarehouseName', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'انبار مقصد', headerClassName: "headerClassName", minWidth: 120, flex: 1
        },
        {field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 },
    ]
    return col
}
