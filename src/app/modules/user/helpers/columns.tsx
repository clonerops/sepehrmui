import { Typography } from '@mui/material'

export const userListColumns = (renderAction: any) => {
    const col = [
        { field: 'firstName', headerName: 'کد نام', headerClassName: "headerClassName", width: 80, renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        } },
        { field: 'lastName', headerName: 'نام خانوادگی', headerClassName: "headerClassName", width: 120, renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        } },
        { field: 'userName', headerName: 'نام کاربری', headerClassName: "headerClassName", width: 120, renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        } },
        { field: 'phoneNumber', headerName: 'موبایل', headerClassName: "headerClassName", width: 120, renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        } },
        { field: 'email', flex: 1, headerName: 'ایمیل', headerClassName: "headerClassName", width: 120, renderCell: (params: any) => {
            return <Typography variant="h4">{params.value}</Typography>
        } },
        { field: "Action", headerName: 'عملیات',  renderCell: renderAction, headerClassName: "headerClassName", width: 360 }
    ]
    return col
}
