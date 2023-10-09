export const columns = (renderAction: any) => {
  const col = [
    { field: 'productIntegratedName',  headerName: 'شرح کالا', headerClassName: "bg-[#E2E8F0] text-black font-bold" },
    { field: 'productName', headerName: 'کالا', headerClassName: "bg-[#E2E8F0] text-black font-bold" },
    { field: 'approximateWeight', width: 120, headerName: 'وزن تقریبی', headerClassName: "bg-[#E2E8F0] text-black font-bold" },
    { field: 'warehouseName', width: 120, headerName: 'انبار', headerClassName: "bg-[#E2E8F0] text-black font-bold" },
    { field: 'approximateInventory', width: 120, headerName: 'موجودی', headerClassName: "bg-[#E2E8F0] text-black font-bold" },
    { field: 'thickness', width: 120, headerName: 'قیمت', headerClassName: "bg-[#E2E8F0] text-black font-bold" },
  ]
  return col
}