export const columns = (renderAction: any) => {
    const col = [
      { field: 'productName', headerName: 'کالا', headerClassName: "headerClassName", width: 100 },
      { field: 'productIntegratedName', headerName: 'شرح کالا', headerClassName: "headerClassName", width: 120 },
      { field: 'approximateWeight', headerName: 'وزن تقریبی', headerClassName: "headerClassName", width: 160 },
      { field: 'orderSendTypeDesc', headerName: 'انبار', headerClassName: "headerClassName", width: 120 },
      { field: 'paymentTypeDesc', headerName: 'موجودی', headerClassName: "headerClassName", width: 120 },
      { field: 'invoiceTypeDesc', headerName: 'قیمت', headerClassName: "headerClassName", width: 120 },
    ]
    return col
  }