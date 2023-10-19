export const columns = (renderAction: any) => {
    const col = [
      { field: 'productName', headerName: 'کالا', headerClassName: "headerClassName", width: 160 },
      { field: 'warehouseName', headerName: 'انبار', headerClassName: "headerClassName", width: 80},
      { field: 'proximateAmount', headerName: 'مقدار', headerClassName: "headerClassName", width: 80 },
      { field: 'price', headerName: 'قیمت', headerClassName: "headerClassName", width: 80 },
      { field: 'productDesc', headerName: 'توضیحات', headerClassName: "headerClassName", width: 160 },
      { field: 'rowId', headerName: 'ردیف فروش', headerClassName: "headerClassName", width: 80 },
      { field: 'buyPrice', headerName: 'قیمت خرید', headerClassName: "headerClassName", width: 100 },
      { field: 'purchaseSettlementDate', headerName: 'تاریخ تسویه خرید', headerClassName: "headerClassName", width: 100 },
      { field: 'purchaseInvoiceTypeName', headerName: 'نوع فاکتور خرید', headerClassName: "headerClassName", width: 100 },
      { field: 'sellerCompanyRow', headerName: 'ردیف بنگاه فروشگاه', headerClassName: "headerClassName", width: 120 },
      { field: 'Action', renderCell: renderAction, headerName: 'حذف', headerClassName: "headerClassName", width: 100 },
    ]
    return col
  }

