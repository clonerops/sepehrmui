export const columns = (renderAction: any) => {
    const col = [
      { field: 'orderCode', headerName: 'شماره سفارش', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
      { field: 'registerDate', headerName: 'تاریخ ثبت سفارش', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
      { field: 'customerName', headerName: 'سفارش دهنده', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
      { field: 'orderSendTypeDesc', headerName: 'نحوه ارسال', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
      { field: 'paymentTypeDesc', headerName: 'نحوه پرداخت', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
      { field: 'invoiceTypeDesc', headerName: 'نوع فاکتور', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
      { field: 'totalAmount', headerName: 'مبلغ کل', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
      { field: 'exitType', headerName: 'نوع خروج', renderCell: (params: any) => (
        params.value === 1 ? "عادی" : "بعد از تسویه"
      ), headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
      { field: 'description', headerName: 'توضیحات', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 360 },
      { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 }
    ]
    return col
  }