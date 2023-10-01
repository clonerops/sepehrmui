
export const columns = (renderAction: any) => {
  const col = [
    { field: 'productCode', headerName: 'کد محصول', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'productName', headerName: 'نام محصول', cellClassName: "!bg-green-100 font-bold", headerClassName: "!bg-[#2E4374] text-white", width: 160 },
    { field: 'productSize', headerName: 'سایز محصول', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'size', headerName: 'ضخامت', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'productIntegratedName', headerName: 'شرح محصول', headerClassName: "!bg-[#2E4374] text-white", width: 280 },
    { field: 'approximateWeight', headerName: 'وزن تقریبی', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'numberInPackage', headerName: 'تعداد در بسته', headerClassName: "!bg-[#2E4374] text-white", width: 100 },
    { field: 'standard', headerName: 'استاندارد', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'productState', headerName: 'حالت', headerClassName: "!bg-[#2E4374] text-white", width: 80 },
    { field: 'description', headerName: 'توضیحات', headerClassName: "!bg-[#2E4374] text-white", width: 240 },
    { headerName: 'عملیات', flex: 1, renderCell: renderAction, headerClassName: "!bg-[#2E4374] text-white", width: 160 }
  ]
  return col
}