export const columns = (renderAction: any) => {
    const col = [
      { field: 'productName', headerName: 'محصول', headerClassName: "bg-[#2E4374] text-white", width: 100 },
      { field: 'productIntegratedName', headerName: 'شرح محصول', headerClassName: "bg-[#2E4374] text-white", width: 120 },
      { field: 'approximateWeight', headerName: 'وزن تقریبی', headerClassName: "bg-[#2E4374] text-white", width: 160 },
      { field: 'orderSendTypeDesc', headerName: 'انبار', headerClassName: "bg-[#2E4374] text-white", width: 120 },
      { field: 'paymentTypeDesc', headerName: 'موجودی', headerClassName: "bg-[#2E4374] text-white", width: 120 },
      { field: 'invoiceTypeDesc', headerName: 'قیمت', headerClassName: "bg-[#2E4374] text-white", width: 120 },
    ]
    return col
  }