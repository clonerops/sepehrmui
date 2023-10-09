// export const columns = (renderAction: any) => {
//     const col = [
//       { field: 'orderCode', headerName: 'شماره سفارش', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
//       { field: 'registerDate', headerName: 'تاریخ ثبت سفارش', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
//       { field: 'customerFirstName', headerName: 'سفارش دهنده', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
//       { field: 'customerLastName', headerName: 'نحوه ارسال', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
//       { field: 'orderSendTypeDesc', headerName: 'نحوه پرداخت', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
//       { field: 'paymentTypeDesc', headerName: 'نوع', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
//       { field: 'invoiceTypeDesc', headerName: ' فاکتور', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
//       { field: 'totalAmount', headerName: 'مبلغ کل', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
//       { field: 'exitType', headerName: 'نوع خروج', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
//       { field: 'description', headerName: 'توضیحات', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
//       { headerName: 'عملیات', cellRenderer: renderAction, headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 }
//     ]
//     return col
//   }
// export const columns = (renderAction: any) => {
//     const col = [
//       { field: 'rowId', headerName: 'شماره ردیف', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 80 },
//       { field: 'productName', headerName: 'نام کالا', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120, flex:1 },
//       { field: 'warehouseName', headerName: 'انبار', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
//       { field: 'price', headerName: 'قیمت', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
//       { field: 'cargoSendDate', headerName: 'تاریخ ارسال بار', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
//       { field: 'proximateAmount', headerName: 'مقدار تقریبی', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 80 },
//       { field: 'numberInPackage', headerName: 'تعداد در بسته', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
//     ]
//     return col
//   }


export const columns = [
  { header: 'شماره ردیف', accessor: 'rowId' },
  { header: 'نام کالا', accessor: 'productName' },
  { header: 'انبار', accessor: 'warehouseName' },
  { header: 'قیمت', accessor: 'price' },
  { header: 'تاریخ ارسال بار', accessor: 'cargoSendDate' },
  { header: 'مقدار تقریبی', accessor: 'proximateAmount' },
  { header: 'تعداد در بسته', accessor: 'numberInPackage' },
];
