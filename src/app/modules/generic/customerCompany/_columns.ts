export const columns = (renderAction: any) => {
    const col = [
        { field: 'id', headerName: 'مشتری', headerClassName: "headerClassName", width: 80 },
        { field: 'desc', headerName: 'شرکت رسمی', headerClassName: "headerClassName", width: 120 },
        { field: 'isActive', headerName: 'وضعیت', renderCell: (params: any) => (
            params.value === true ? "فعال" : "غیرفعال"
          ), flex: 1, headerClassName: "headerClassName", width: 120 },
        { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "headerClassName", width: 160 }
    ]
    return col
}
