import { Typography } from "@mui/material";

export const billlandingColumns = (renderAction: any) => {
    const col = [
        {
            field: 'cargoAn32nounceNo', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'شماره حواله', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
        {
            field: 'cargo34An32nounceNo', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'تاریخ حواله', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
        {
            field: 'cargoAnn3123ounceNo', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'انبار مبدا', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
        {
            field: '423', renderCell: (params: any) => {
                return <Typography variant="h4">{params.value}</Typography>;
            },
            headerName: 'انبار مقصد', headerClassName: "headerClassName", minWidth: 100, flex: 1
        },
        {field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 120 },
    ]
    return col
}
