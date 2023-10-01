  export const columns = (renderAction: any) => {
    const col = [
      { field: 'customerFirstName', headerName: 'نام', headerClassName: "bg-[#2E4374] text-white", width: 130 },
      { field: 'customerLastName', headerName: 'نام خانوادگی', headerClassName: "bg-[#2E4374] text-white", width: 160 },
      { field: 'productName', headerName: 'محصول', headerClassName: "bg-[#2E4374] text-white", width: 160 },
      { field: 'price', headerName: 'قیمت', headerClassName: "bg-[#2E4374] text-white", width: 80 },
      { field: 'rentAmount', headerName: 'کرایه', headerClassName: "bg-[#2E4374] text-white", width: 80 },
      { field: 'overPrice', headerName: 'قیمت تمام شده', headerClassName: "bg-[#2E4374] text-white", width: 120 },
      { field: 'priceDate', headerName: 'تاریخ قیمت', headerClassName: "bg-[#2E4374] text-white", width: 120 },
      { field: 'rate', headerName: 'امتیاز', headerClassName: "bg-[#2E4374] text-white", width: 80 },
      { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "bg-[#2E4374] text-white", width: 240 }
    ]
    return col
  }