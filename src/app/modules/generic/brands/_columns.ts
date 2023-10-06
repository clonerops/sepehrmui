export const columns = (renderAction: any) => {
    const col = [
        { field: 'id', headerName: 'کد برند', headerClassName: "bg-[#2E4374] text-white", width: 80 },
        { field: 'name', headerName: 'نام برند', headerClassName: "bg-[#2E4374] text-white", width: 120 },
        { field: 'isActive',renderCell: (params: any) => (
            params.value === true ? "فعال" : "غیرفعال"
          ), headerName: 'وضعیت', flex: 1, headerClassName: "bg-[#2E4374] text-white", width: 120 },
        { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "bg-[#2E4374] text-white", width: 160 }
    ]
    return col
}
