export const columns = (renderAction: any) => {
    const col = [
      { field: 'orderCode', headerName: 'شماره سفارش', headerClassName: "bg-[#2E4374] text-white", width: 100 },
      { field: 'registerDate', headerName: 'تاریخ ثبت سفارش', headerClassName: "bg-[#2E4374] text-white", width: 120 },
      { field: 'customerName', headerName: 'سفارش دهنده', headerClassName: "bg-[#2E4374] text-white", width: 160 },
      { field: 'orderSendTypeDesc', headerName: 'نحوه ارسال', headerClassName: "bg-[#2E4374] text-white", width: 120 },
      { field: 'paymentTypeDesc', headerName: 'نحوه پرداخت', headerClassName: "bg-[#2E4374] text-white", width: 120 },
      { field: 'invoiceTypeDesc', headerName: 'نوع فاکتور', headerClassName: "bg-[#2E4374] text-white", width: 120 },
      { field: 'totalAmount', headerName: 'مبلغ کل', headerClassName: "bg-[#2E4374] text-white", width: 120 },
      { field: 'exitType', headerName: 'نوع خروج', renderCell: (params: any) => (
        params.value === 1 ? "عادی" : "بعد از تسویه"
      ), headerClassName: "bg-[#2E4374] text-white", width: 120 },
      { field: 'description', headerName: 'توضیحات', headerClassName: "bg-[#2E4374] text-white", width: 360 },
      { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "bg-[#2E4374] text-white", width: 160 }
    ]
    return col
  }