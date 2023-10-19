export const columns = (renderAction: any) => {
    const col = [
      { field: 'orderCode', headerName: 'شماره سفارش', headerClassName: "headerClassName", width: 100 },
      { field: 'registerDate', headerName: 'تاریخ ثبت سفارش', headerClassName: "headerClassName", width: 120 },
      { field: 'customerName', headerName: 'سفارش دهنده', headerClassName: "headerClassName", width: 160 },
      { field: 'orderSendTypeDesc', headerName: 'نحوه ارسال', headerClassName: "headerClassName", width: 120 },
      { field: 'paymentTypeDesc', headerName: 'نحوه پرداخت', headerClassName: "headerClassName", width: 120 },
      { field: 'invoiceTypeDesc', headerName: 'نوع فاکتور', headerClassName: "headerClassName", width: 120 },
      { field: 'totalAmount', headerName: 'مبلغ کل', headerClassName: "headerClassName", width: 120 },
      { field: 'exitType', headerName: 'نوع خروج', renderCell: (params: any) => (
        params.value === 1 ? "عادی" : "بعد از تسویه"
      ), headerClassName: "headerClassName", width: 120 },
      { field: 'description', headerName: 'توضیحات', headerClassName: "headerClassName", width: 360 },
      { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "headerClassName", width: 160 }
    ]
    return col
  }