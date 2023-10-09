export const columns = (renderAction: any) => {
    const col = [
        { field: 'firstName', headerName: 'کد نام', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 80 },
        { field: 'lastName', headerName: 'نام خانوادگی', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
        { field: 'userName', headerName: 'نام کاربری', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
        { field: 'phoneNumber', headerName: 'موبایل', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
        { field: 'email', flex: 1, headerName: 'ایمیل', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
        { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 360 }
    ]
    return col
}
