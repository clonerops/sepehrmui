export const columns = (renderAction: any) => {
    const col = [
      { field: 'productName', headerName: 'کالا', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
      { field: 'productIntegratedName', headerName: 'شرح کالا', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
      { field: 'approximateWeight', headerName: 'وزن تقریبی', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
      { field: 'orderSendTypeDesc', headerName: 'انبار', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
      { field: 'paymentTypeDesc', headerName: 'موجودی', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
      { field: 'invoiceTypeDesc', headerName: 'قیمت', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
    ]
    return col
  }