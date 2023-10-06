export const columns = (renderAction: any) => {
    const col = [
        { field: 'id', headerName: 'کد استاندارد', headerClassName: "bg-[#2E4374] text-white", width: 80 },
        { field: 'desc', headerName: 'استاندارد', headerClassName: "bg-[#2E4374] text-white", width: 120 },
        { field: 'isActive', headerName: 'وضعیت', flex: 1, headerClassName: "bg-[#2E4374] text-white", width: 120 },
        { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "bg-[#2E4374] text-white", width: 160 }
    ]
    return col
}
