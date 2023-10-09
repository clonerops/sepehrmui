export const columns = (renderAction: any) => {
    const col = [
        { field: 'firstName', headerName: 'کد نام', headerClassName: "bg-[#2E4374] text-white", width: 80 },
        { field: 'lastName', headerName: 'نام خانوادگی', headerClassName: "bg-[#2E4374] text-white", width: 120 },
        { field: 'userName', headerName: 'نام کاربری', headerClassName: "bg-[#2E4374] text-white", width: 120 },
        { field: 'phoneNumber', headerName: 'موبایل', headerClassName: "bg-[#2E4374] text-white", width: 120 },
        { field: 'email', flex: 1, headerName: 'ایمیل', headerClassName: "bg-[#2E4374] text-white", width: 120 },
        { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "bg-[#2E4374] text-white", width: 360 }
    ]
    return col
}
