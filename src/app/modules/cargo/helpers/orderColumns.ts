export const columns = (renderAction: any) => {
  const col = [
    { field: 'productName', headerName: 'نام کالا', headerClass: "tw-bg-[#6501FD] tw-text-black font-bold" },
    { field: 'rowId', headerName: 'شماره ردیف', headerClass: "tw-bg-[#6501FD] tw-text-black font-bold" },
    { field: 'warehouseName', headerName: 'انبار', headerClass: "tw-bg-[#6501FD] tw-text-black font-bold" },
    { field: 'proximateAmount', headerName: 'مقدار تقریبی', headerClass: "tw-bg-[#6501FD] tw-text-black font-bold" },
    { field: 'numberInPackage', headerName: 'تعداد در بسته', headerClass: "tw-bg-[#6501FD] tw-text-black font-bold" },
    { field: 'price', headerName: 'قیمت', headerClass: "tw-bg-[#6501FD] tw-text-black font-bold" },
    { field: 'buyPrice', headerName: 'قیمت خرید', headerClass: "tw-bg-[#6501FD] tw-text-black font-bold" },
    { field: 'purchaseInvoiceTypeDesc', headerName: 'نوع فاکتور خرید', headerClass: "tw-bg-[#6501FD] tw-text-black font-bold" },
    { field: 'purchaserCustomerName', headerName: 'خرید از', headerClass: "tw-bg-[#6501FD] tw-text-black font-bold" },
    { field: 'purchaseSettlementDate', headerName: 'تاریخ تسویه خرید', headerClass: "tw-bg-[#6501FD] tw-text-black font-bold" },
    { field: 'cargoSendDate', headerName: 'تاریخ ارسال', headerClass: "tw-bg-[#6501FD] tw-text-black font-bold" },
  ]
  return col
}