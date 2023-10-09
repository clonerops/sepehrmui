  export const columns = (renderAction: any) => {
    const col = [
      { field: 'customerFirstName', headerName: 'نام', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 130 },
      { field: 'customerLastName', headerName: 'نام خانوادگی', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
      { field: 'productName', headerName: 'کالا', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
      { field: 'price', headerName: 'قیمت', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 80 },
      { field: 'rentAmount', headerName: 'کرایه', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 80 },
      { field: 'overPrice', headerName: 'قیمت تمام شده', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
      { field: 'priceDate', headerName: 'تاریخ قیمت', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
      { field: 'rate', headerName: 'امتیاز', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 80 },
      { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 240 }
    ]
    return col
  }