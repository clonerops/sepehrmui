
export const columns = (renderAction: any) => {
  const col = [
    { field: 'productCode', headerName: 'کد کالا', cellClassName: "font-bold", headerClassName: "!headerClassName", width: 80 },
    { field: 'productName', headerName: 'نام کالا', cellClassName: "!bg-green-100 font-bold", headerClassName: "!headerClassName", width: 160 },
    { field: 'productTypeDesc', headerName: 'نوع کالا', headerClassName: "!headerClassName", width: 120 },
    { field: 'productSize', headerName: 'سایز', headerClassName: "!headerClassName", width: 80 },
    { field: 'productThickness', headerName: 'ضخامت', headerClassName: "!headerClassName", width: 80 },
    { field: 'approximateWeight', headerName: 'وزن', headerClassName: "!headerClassName", width: 80 },
    { field: 'numberInPackage', headerName: 'تعداد در بسته', headerClassName: "!headerClassName", width: 100 },
    { field: 'productStandardDesc', headerName: 'استاندارد', headerClassName: "!headerClassName", width: 80 },
    { field: 'productStateDesc', headerName: 'حالت', headerClassName: "!headerClassName", width: 80 },
    // { field: 'description', headerName: 'توضیحات', flex: 1, headerClassName: "!headerClassName", width: 240 },
    { headerName: 'عملیات', flex: 1, renderCell: renderAction, headerClassName: "!headerClassName !w-full", minWidth: "100%" }
  ]
  return col
}