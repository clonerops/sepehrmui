export const columns = (renderAction: any) => {
  const col = [
    { field: 'orderCode', headerName: 'شماره سفارش', headerClassName: "headerClassName", width: 100 },
    { field: 'registerDate', headerName: 'تاریخ ثبت سفارش', headerClassName: "headerClassName", width: 120 },
    { field: 'customerFirstName', headerName: 'نام سفارش دهنده', headerClassName: "headerClassName", width: 120 },
    { field: 'customerLastName', headerName: 'نام خانوادگی', headerClassName: "headerClassName", width: 160 },
    { field: 'totalAmount', headerName: 'مبلغ کل', headerClassName: "headerClassName", width: 100 },
    { field: 'description',  headerName: 'توضیحات', headerClassName: "headerClassName", width: 320 },
    { headerName: 'عملیات', renderCell: renderAction, headerClassName: "headerClassName", width: 160 }
  ]
  return col
}