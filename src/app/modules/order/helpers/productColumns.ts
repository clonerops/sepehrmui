export const columns = (renderAction: any) => {
  const col = [
    { field: 'productIntegratedName', flex: 1, headerName: 'شرح کالا', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'productName', headerName: 'کالا', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'approximateWeight', width: 120, headerName: 'وزن تقریبی', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'warehouseName', width: 120, headerName: 'انبار', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'approximateInventory', width: 120, headerName: 'موجودی', headerClassName: "bg-[#2E4374] text-white" },
    { field: 'thickness', width: 120, headerName: 'قیمت', headerClassName: "bg-[#2E4374] text-white" },
  ]
  return col
}