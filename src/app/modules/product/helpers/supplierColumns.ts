  export const columns = (renderAction: any) => {
    const col = [
      { field: 'customerFirstName', headerName: 'نام', headerClassName: "headerClassName", width: 130 },
      { field: 'customerLastName', headerName: 'نام خانوادگی', headerClassName: "headerClassName", width: 160 },
      { field: 'productName', headerName: 'کالا', headerClassName: "headerClassName", width: 160 },
      { field: 'price', headerName: 'قیمت', headerClassName: "headerClassName", width: 80 },
      { field: 'rentAmount', headerName: 'کرایه', headerClassName: "headerClassName", width: 80 },
      { field: 'overPrice', headerName: 'قیمت تمام شده', headerClassName: "headerClassName", width: 120 },
      { field: 'priceDate', headerName: 'تاریخ قیمت', headerClassName: "headerClassName", width: 120 },
      { field: 'rate', headerName: 'امتیاز', headerClassName: "headerClassName", width: 80 },
      { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "headerClassName", width: 240 }
    ]
    return col
  }