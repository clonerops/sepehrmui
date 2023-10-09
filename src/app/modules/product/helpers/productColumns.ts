
export const columns = (renderAction: any) => {
  const col = [
    { field: 'productCode', headerName: 'کد کالا', cellClassName: "font-bold", headerClassName: "!bg-[#E2E8F0] text-black font-bold", width: 80 },
    { field: 'productName', headerName: 'نام کالا', cellClassName: "!bg-green-100 font-bold", headerClassName: "!bg-[#E2E8F0] text-black font-bold", width: 160 },
    { field: 'productTypeDesc', headerName: 'نوع کالا', headerClassName: "!bg-[#E2E8F0] text-black font-bold", width: 120 },
    { field: 'productSize', headerName: 'سایز', headerClassName: "!bg-[#E2E8F0] text-black font-bold", width: 80 },
    { field: 'productThickness', headerName: 'ضخامت', headerClassName: "!bg-[#E2E8F0] text-black font-bold", width: 80 },
    { field: 'approximateWeight', headerName: 'وزن', headerClassName: "!bg-[#E2E8F0] text-black font-bold", width: 80 },
    { field: 'numberInPackage', headerName: 'تعداد در بسته', headerClassName: "!bg-[#E2E8F0] text-black font-bold", width: 100 },
    { field: 'productStandardDesc', headerName: 'استاندارد', headerClassName: "!bg-[#E2E8F0] text-black font-bold", width: 80 },
    { field: 'productStateDesc', headerName: 'حالت', flex: 1, headerClassName: "!bg-[#E2E8F0] text-black font-bold", width: 80 },
    // { field: 'description', headerName: 'توضیحات', flex: 1, headerClassName: "!bg-[#E2E8F0] text-black font-bold", width: 240 },
    { headerName: 'عملیات',  renderCell: renderAction,  headerClassName: "!bg-[#E2E8F0] text-black font-bold !w-full", minWidth: "100%" }
  ]
  return col
}