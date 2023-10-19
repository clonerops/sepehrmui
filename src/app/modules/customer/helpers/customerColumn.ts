export const columns = (renderAction: any) => {
  const col = [
    { field: 'customerCode', headerName: 'کد مشتری', headerClassName: "headerClassName", width: 80 },
    { field: 'firstName', headerName: 'نام', headerClassName: "headerClassName" },
    { field: 'lastName', headerName: 'نام خانوادگی', headerClassName: "headerClassName", width: 150 },
    { field: 'mobile', headerName: 'موبایل', headerClassName: "headerClassName" },
    { field: 'representative', headerName: 'معرف', headerClassName: "headerClassName" },
    {
      field: 'customerValidityId', headerName: 'نوع اعتبار', width: 80,
      renderCell: (params: any) => (
        params.value === 1 ? "عادی" : params.value === 2 ? "VIP" : "سیاه"
      ), headerClassName: "headerClassName"
    },
    { field: 'tel1', headerName: 'تلفن یک', headerClassName: "headerClassName" },
    { field: 'isSupplier', headerName: 'تامین کننده؟', renderCell: (params: any) => (
      params.value === true ? "بله" : "خیر"
    ), headerClassName: "headerClassName", cellClassName: "text-center", width: 80 },
    { field: 'fatherName', headerName: 'نام پدر', headerClassName: "headerClassName" },
    { field: 'nationalId', headerName: 'کدملی', headerClassName: "headerClassName" },
    { field: 'address1', headerName: 'آدرس یک', headerClassName: "headerClassName", width: 280 },
    {
      field: 'customerType', headerName: 'نوع مشتری', width: 80, renderCell: (params: any) => (
        params.value === 0 ? "حقیقی" : "حقوقی"
      ), headerClassName: "headerClassName"
    },
    { field: 'address2', headerName: 'آدرس دو', headerClassName: "headerClassName", width: 280 },
    { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "headerClassName", width: 160 }
  ]
  return col
}
