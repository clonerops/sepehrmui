export const columns = (renderAction: any) => {
    const col = [
        { field: 'id', headerName: 'کد حالت', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 80 },
        { field: 'desc', headerName: 'حالت', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
        { field: 'isActive', headerName: 'وضعیت',renderCell: (params: any) => (
            params.value === true ? "فعال" : "غیرفعال"
          ), flex: 1, headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
        { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 }
    ]
    return col
}
