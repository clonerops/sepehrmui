import { Typography } from '@mui/material'

export const userListColumns = (renderAction: any) => {
    const col = [
        { field: 'firstName', flex: 1, headerName: 'نام', headerClassName: "headerClassName", renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        }, minWidth: 130 },
        { field: 'lastName', flex: 1, headerName: 'نام خانوادگی', headerClassName: "headerClassName", renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        }, minWidth: 140 },
        { field: 'userName', flex: 1, headerName: 'نام کاربری', headerClassName: "headerClassName", renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        }, minWidth: 140 },
        { field: 'phoneNumber', flex: 1, headerName: 'موبایل', headerClassName: "headerClassName", renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        }, minWidth: 120 },
        { field: 'email', flex: 1, headerName: 'ایمیل', headerClassName: "headerClassName", renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        }, minWidth: 120 },
        { headerName: 'عملیات', flex: 1,  renderCell: renderAction, headerClassName: "headerClassName", minWidth: 80 }
    ]
    return col
}
