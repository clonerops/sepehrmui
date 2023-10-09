export const columns = (renderAction: any) => {
  const col = [
    { field: 'customerCode', headerName: 'کد مشتری', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 80 },
    { field: 'firstName', headerName: 'نام', headerClassName: "bg-[#E2E8F0] text-black font-bold" },
    { field: 'lastName', headerName: 'نام خانوادگی', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 150 },
    { field: 'mobile', headerName: 'موبایل', headerClassName: "bg-[#E2E8F0] text-black font-bold" },
    { field: 'representative', headerName: 'معرف', headerClassName: "bg-[#E2E8F0] text-black font-bold" },
    {
      field: 'customerValidityId', headerName: 'نوع اعتبار', width: 80,
      renderCell: (params: any) => (
        params.value === 1 ? "عادی" : params.value === 2 ? "VIP" : "سیاه"
      ), headerClassName: "bg-[#E2E8F0] text-black font-bold"
    },
    { field: 'tel1', headerName: 'تلفن یک', headerClassName: "bg-[#E2E8F0] text-black font-bold" },
    { field: 'isSupplier', headerName: 'تامین کننده؟', renderCell: (params: any) => (
      params.value === true ? "بله" : "خیر"
    ), headerClassName: "bg-[#E2E8F0] text-black font-bold", cellClassName: "text-center", width: 80 },
    { field: 'fatherName', headerName: 'نام پدر', headerClassName: "bg-[#E2E8F0] text-black font-bold" },
    { field: 'nationalId', headerName: 'کدملی', headerClassName: "bg-[#E2E8F0] text-black font-bold" },
    { field: 'address1', headerName: 'آدرس یک', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 280 },
    {
      field: 'customerType', headerName: 'نوع مشتری', width: 80, renderCell: (params: any) => (
        params.value === 0 ? "حقیقی" : "حقوقی"
      ), headerClassName: "bg-[#E2E8F0] text-black font-bold"
    },
    { field: 'address2', headerName: 'آدرس دو', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 280 },
    { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 }
  ]
  return col
}
