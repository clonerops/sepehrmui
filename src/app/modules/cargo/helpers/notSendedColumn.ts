export const columns = (renderAction: any) => {
  const col = [
    { field: 'orderCode', headerName: 'شماره سفارش', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
    { field: 'registerDate', headerName: 'تاریخ ثبت سفارش', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
    { field: 'customerFirstName', headerName: 'نام سفارش دهنده', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
    { field: 'customerLastName', headerName: 'نام خانوادگی', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
    { field: 'totalAmount', headerName: 'مبلغ کل', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
    { field: 'description',  headerName: 'توضیحات', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 320 },
    { headerName: 'عملیات', renderCell: renderAction, headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 }
  ]
  return col
}