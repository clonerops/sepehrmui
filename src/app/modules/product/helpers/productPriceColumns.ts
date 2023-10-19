import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount"

export const columns = (renderAction: any) => {
  const col = [
    { field: 'productName', headerName: 'نام کالا', headerClassName: "headerClassName", width: 360 },
    { field: 'brandName', headerName: 'نام برند', headerClassName: "headerClassName", width: 160 },
    {
      field: 'price', headerName: 'قیمت', renderCell: (value: any) => (
        separateAmountWithCommas(value.row.price)
      ), headerClassName: "headerClassName", cellClassName: "font-bold text-[14px]", width: 160
    },
    { field: 'registerDate', headerName: 'تاریخ قیمت', headerClassName: "headerClassName font-bold", width: 160 },
    {
      field: 'isActive', headerName: 'وضعیت', renderCell: (params: any) => (
        params.value === true ? "فعال" : "غیرفعال"
      ), headerClassName: "headerClassName", width: 120
    },
    { headerName: 'عملیات', renderCell: renderAction, flex: 1, headerClassName: "headerClassName", minWidth: 340, }
  ]
  return col
}