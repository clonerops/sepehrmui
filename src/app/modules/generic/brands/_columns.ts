export const columns = (renderAction: any) => {
    const col = [
        { field: 'id', headerName: 'کد برند', headerClassName: "bg-[#E2E8F0] Yekan_bold text-black !font-bold", width: 80 },
        { field: 'name', headerName: 'نام برند', headerClassName: "bg-[#E2E8F0] text-black !font-bold", width: 120 },
        { field: 'isActive',renderCell: (params: any) => (
            params.value === true ? "فعال" : "غیرفعال"
          ), headerName: 'وضعیت', flex: 1, headerClassName: "bg-[#E2E8F0] text-black !font-bold", width: 120 },
        { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "bg-[#E2E8F0] text-black !font-bold", width: 160 }
    ]
    return col
}
