export const columns = (renderAction: any) => {
  const col = [
    { field: 'orderCode', headerName: 'شماره سفارش', headerClassName: "bg-[#2E4374] text-white", width: 100 },
    { field: 'registerDate', headerName: 'تاریخ ثبت سفارش', headerClassName: "bg-[#2E4374] text-white", width: 120 },
    { field: 'customerFirstName', headerName: 'نام سفارش دهنده', headerClassName: "bg-[#2E4374] text-white", width: 120 },
    { field: 'customerLastName', headerName: 'نام خانوادگی', headerClassName: "bg-[#2E4374] text-white", width: 160 },
    { field: 'totalAmount', headerName: 'مبلغ کل', headerClassName: "bg-[#2E4374] text-white", width: 100 },
    { field: 'description', flex: 1, headerName: 'توضیحات', headerClassName: "bg-[#2E4374] text-white", width: 320 },
    { headerName: 'عملیات', renderCell: renderAction, headerClassName: "bg-[#2E4374] text-white", width: 160 }
  ]
  return col
}