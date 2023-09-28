export const columns = (renderAction: any) => {
  const col = [
    { field: 'productCode', headerName: 'کد کالا', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'productName', headerName: 'نام کالا', headerClassName: "!bg-[#2E4374] text-white", width: 160 },
    { field: 'size', headerName: 'سایز کالا', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'productIntegratedName', headerName: 'شرح کالا', headerClassName: "!bg-[#2E4374] text-white", width: 280 },
    { field: 'approximateWeight', headerName: 'وزن تقریبی', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'numberInPackage', headerName: 'تعداد در بسته', headerClassName: "!bg-[#2E4374] text-white", width: 100 },
    { field: 'standard', headerName: 'استاندارد', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'productState', headerName: 'حالت', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'description', headerName: 'توضیحات', headerClassName: "!bg-[#2E4374] text-white", width: 240 },
    { headerName: 'عملیات', renderCell: renderAction, headerClassName: "!bg-[#2E4374] text-white", width: 160 }
  ]
  return col
}