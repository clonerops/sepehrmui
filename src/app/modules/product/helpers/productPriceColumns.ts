import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount"

export const columns = (renderAction: any) => {
  const col = [
    { field: 'productName', headerName: 'نام کالا', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 360 },
    { field: 'brandName', headerName: 'نام برند', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
    {
      field: 'price', headerName: 'قیمت', renderCell: (value: any) => (
        separateAmountWithCommas(value.row.price)
      ), headerClassName: "bg-[#E2E8F0] text-black font-bold", cellClassName: "font-bold text-[14px]", width: 160
    },
    { field: 'registerDate', headerName: 'تاریخ قیمت', headerClassName: "bg-[#E2E8F0] text-black font-bold font-bold", width: 160 },
    {
      field: 'isActive', headerName: 'وضعیت', renderCell: (params: any) => (
        params.value === true ? "فعال" : "غیرفعال"
      ), flex: 1, headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120
    },
    { headerName: 'عملیات', renderCell: renderAction, flex: 1, headerClassName: "bg-[#E2E8F0] text-black font-bold", minWidth: 340, }
  ]
  return col
}