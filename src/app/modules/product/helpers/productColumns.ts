
export const columns = (renderAction: any) => {
  const col = [
    { field: 'productCode', headerName: 'کد کالا', cellClassName: "font-bold", headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'productName', headerName: 'نام کالا', cellClassName: "!bg-green-100 font-bold", headerClassName: "!bg-[#2E4374] text-white", width: 160 },
    { field: 'productTypeDesc', headerName: 'نوع کالا', headerClassName: "!bg-[#2E4374] text-white", width: 120 },
    { field: 'productSize', headerName: 'سایز', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'productThickness', headerName: 'ضخامت', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'approximateWeight', headerName: 'وزن', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'numberInPackage', headerName: 'تعداد در بسته', headerClassName: "!bg-[#2E4374] text-white", width: 100 },
    { field: 'productStandardDesc', headerName: 'استاندارد', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'productStateDesc', headerName: 'حالت', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'description', headerName: 'توضیحات', flex: 1, headerClassName: "!bg-[#2E4374] text-white", width: 240 },
    { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "!bg-[#2E4374] text-white", width: 160 }
  ]
  return col
}