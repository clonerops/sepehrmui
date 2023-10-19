export const columns = (renderAction: any) => {
    const col = [
        { field: 'firstName', headerName: 'کد نام', headerClassName: "headerClassName", width: 80 },
        { field: 'lastName', headerName: 'نام خانوادگی', headerClassName: "headerClassName", width: 120 },
        { field: 'userName', headerName: 'نام کاربری', headerClassName: "headerClassName", width: 120 },
        { field: 'phoneNumber', headerName: 'موبایل', headerClassName: "headerClassName", width: 120 },
        { field: 'email', flex: 1, headerName: 'ایمیل', headerClassName: "headerClassName", width: 120 },
        { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "headerClassName", width: 360 }
    ]
    return col
}
