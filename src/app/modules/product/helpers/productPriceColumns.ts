export const columns = (renderAction: any) => {
  const col = [
    { field: 'productName', headerName: 'نام کالا', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 360 },
    { field: 'brandName', headerName: 'نام برند', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
    { field: 'price', headerName: 'قیمت', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
    { field: 'registerDate', headerName: 'تاریخ قیمت', flex:1, headerClassName: "bg-[#E2E8F0] text-black font-bold font-bold", width: 160 },
    { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 340, }
  ]
  return col
}