export const columns = (renderAction: any) => {
  const col = [
    { field: 'customerCode', headerName: 'کد مشتری', headerClassName: "bg-[#2E4374] text-white", width: 80 },
    { field: 'firstName', headerName: 'نام', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'lastName', headerName: 'نام خانوادگی', headerClassName: "bg-[#2E4374] text-white", width: 150 },
    { field: 'mobile', headerName: 'موبایل', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'representative', headerName: 'معرف', headerClassName: "bg-[#2E4374] text-white" },
    {
      field: 'customerValidityId', headerName: 'نوع اعتبار', width: 80,
      renderCell: (params: any) => (
        params.value === 1 ? "عادی" : params.value === 2 ? "VIP" : "سیاه"
      ), headerClassName: "bg-[#2E4374] text-white"
    },
    { field: 'tel1', headerName: 'تلفن یک', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'isSupplier', headerName: 'تامین کننده؟', renderCell: (params: any) => (
      params.value === true ? "بله" : "خیر"
    ), headerClassName: "bg-[#2E4374] text-white", cellClassName: "text-center", width: 80 },
    { field: 'fatherName', headerName: 'نام پدر', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'nationalId', headerName: 'کدملی', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'address1', headerName: 'آدرس یک', headerClassName: "bg-[#2E4374] text-white", width: 280 },
    {
      field: 'customerType', headerName: 'نوع مشتری', width: 80, renderCell: (params: any) => (
        params.value === 0 ? "حقیقی" : "حقوقی"
      ), headerClassName: "bg-[#2E4374] text-white"
    },
    { field: 'address2', headerName: 'آدرس دو', headerClassName: "bg-[#2E4374] text-white", width: 280 },
    { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "bg-[#2E4374] text-white", width: 160 }
  ]
  return col
}
