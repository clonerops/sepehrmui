export const columns = (renderAction: any) => {
  const col = [
    { field: 'productName', headerName: 'نام محصول', headerClassName: "bg-[#2E4374] text-white", width: 360 },
    { field: 'brandName', headerName: 'نام برند', headerClassName: "bg-[#2E4374] text-white", width: 160 },
    { field: 'price', headerName: 'قیمت', headerClassName: "bg-[#2E4374] text-white", width: 160 },
    { field: 'registerDate', headerName: 'تاریخ قیمت', headerClassName: "bg-[#2E4374] text-white ", width: 160 },
    { headerName: 'عملیات', flex: 1, renderCell: renderAction, headerClassName: "bg-[#2E4374] text-white", width: 340, }
  ]
  return col
}