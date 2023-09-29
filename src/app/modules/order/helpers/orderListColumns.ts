// export const columns = (renderAction: any) => {
//     const col = [
//       { field: 'orderCode', headerName: 'شماره سفارش', headerClassName: "bg-[#2E4374] text-white", width: 160 },
//       { field: 'registerDate', headerName: 'تاریخ ثبت سفارش', headerClassName: "bg-[#2E4374] text-white", width: 160 },
//       { field: 'customerFirstName', headerName: 'سفارش دهنده', headerClassName: "bg-[#2E4374] text-white", width: 160 },
//       { field: 'customerLastName', headerName: 'نحوه ارسال', headerClassName: "bg-[#2E4374] text-white", width: 160 },
//       { field: 'orderSendTypeDesc', headerName: 'نحوه پرداخت', headerClassName: "bg-[#2E4374] text-white", width: 160 },
//       { field: 'paymentTypeDesc', headerName: 'نوع', headerClassName: "bg-[#2E4374] text-white", width: 160 },
//       { field: 'invoiceTypeDesc', headerName: ' فاکتور', headerClassName: "bg-[#2E4374] text-white", width: 160 },
//       { field: 'totalAmount', headerName: 'مبلغ کل', headerClassName: "bg-[#2E4374] text-white", width: 160 },
//       { field: 'exitType', headerName: 'نوع خروج', headerClassName: "bg-[#2E4374] text-white", width: 160 },
//       { field: 'description', headerName: 'توضیحات', headerClassName: "bg-[#2E4374] text-white", width: 160 },
//       { headerName: 'عملیات', cellRenderer: renderAction, headerClassName: "bg-[#2E4374] text-white", width: 160 }
//     ]
//     return col
//   }
export const columns = (renderAction: any) => {
    const col = [
      { field: 'rowId', headerName: 'شماره ردیف', headerClassName: "bg-[#2E4374] text-white", width: 80 },
      { field: 'productName', headerName: 'نام محصول', headerClassName: "bg-[#2E4374] text-white", width: 120, flex:1 },
      { field: 'warehouseName', headerName: 'انبار', headerClassName: "bg-[#2E4374] text-white", width: 100 },
      { field: 'price', headerName: 'قیمت', headerClassName: "bg-[#2E4374] text-white", width: 160 },
      { field: 'cargoSendDate', headerName: 'تاریخ ارسال بار', headerClassName: "bg-[#2E4374] text-white", width: 100 },
      { field: 'proximateAmount', headerName: 'مقدار تقریبی', headerClassName: "bg-[#2E4374] text-white", width: 80 },
      { field: 'numberInPackage', headerName: 'تعداد در بسته', headerClassName: "bg-[#2E4374] text-white", width: 100 },
    ]
    return col
  }

