// const customerTypeCellRenderer = (params: any) => {
//   if (params.data.customerType === 0) {
//     return 'حقوقی';
//   } else {
//     return 'حقیقی';
//   }
// };
// const customerValidTypeCellRenderer = (params: any) => {
//   if (params.data.customerValidityId === 1) {
//     return 'عادی';
//   } else if (params.data.customerValidityId === 2) {
//     return 'VIP';
//   } else {
//     return "سیاه"
//   }
// };
// const customerIsSupplier = (params: any) => {
//   if (params.data.isSupplier) {
//     return 'بله';
//   } else {
//     return "خیر"
//   }
// };

export const columns = (renderAction: any) => {
  const col = [
    { field: 'id', headerName: 'کد مشتری', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'firstName', headerName: 'نام', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'lastName', headerName: 'نام خانوادگی', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'nationalId', headerName: 'کدملی', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'customerType', headerName: 'نوع مشتری', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'customerValidityId', headerName: 'نوع اعتبار', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'mobile', headerName: 'موبایل', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'isSupplier', headerName: 'تامین کننده؟', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'address1', headerName: 'آدرس یک', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'address2', headerName: 'آدرس دو', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'representative', headerName: 'معرف', headerClassName: "bg-[#2E4374] text-white" },
    { headerName: 'عملیات', renderCell: renderAction, headerClassName: "bg-[#2E4374] text-white" }
  ]
  return col
}

// export const columns = [
//   { field: 'id', headerName: 'کد مشتری', headerClassName: "bg-[#2E4374] text-white" },
//   { field: 'firstName', headerName: 'نام', headerClassName: "bg-[#2E4374] text-white" },
//   { field: 'lastName', headerName: 'نام خانوادگی', headerClassName: "bg-[#2E4374] text-white", width: 150 },
//   { field: 'nationalId', headerName: 'کدملی', headerClassName: "bg-[#2E4374] text-white" },
//   { field: 'customerType', headerName: 'نوع مشتری', headerClassName: "bg-[#2E4374] text-white" },
//   { field: 'customerValidityId', headerName: 'نوع اعتبار', headerClassName: "bg-[#2E4374] text-white" },
//   { field: 'mobile', headerName: 'موبایل', headerClassName: "bg-[#2E4374] text-white" },
//   { field: 'isSupplier', headerName: 'تامین کننده؟', headerClassName: "bg-[#2E4374] text-white" },
//   { field: 'address1', headerName: 'آدرس یک', headerClassName: "bg-[#2E4374] text-white", width: 280 },
//   { field: 'address2', headerName: 'آدرس دو', headerClassName: "bg-[#2E4374] text-white", width: 280 },
//   { field: 'representative', headerName: 'معرف', headerClassName: "bg-[#2E4374] text-white" },
//   { headerName: 'عملیات', renderCell: renderAction, headerClassName: "bg-[#2E4374] text-white" }
// ]