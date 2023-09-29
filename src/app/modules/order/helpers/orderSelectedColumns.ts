export const columns = (renderAction: any) => {
    const col = [
      { field: 'productName', headerName: 'محصول', headerClassName: "bg-[#2E4374] text-white", width: 160 },
      { field: 'warehouseName', headerName: 'انبار', headerClassName: "bg-[#2E4374] text-white", width: 80},
      { field: 'proximateAmount', headerName: 'مقدار', headerClassName: "bg-[#2E4374] text-white", width: 80 },
      { field: 'price', headerName: 'قیمت', headerClassName: "bg-[#2E4374] text-white", width: 80 },
      { field: 'productDesc', headerName: 'توضیحات', headerClassName: "bg-[#2E4374] text-white", width: 160 },
      { field: 'rowId', headerName: 'ردیف فروش', headerClassName: "bg-[#2E4374] text-white", width: 80 },
      { field: 'buyPrice', headerName: 'قیمت خرید', headerClassName: "bg-[#2E4374] text-white", width: 100 },
      { field: 'purchaseSettlementDate', headerName: 'تاریخ تسویه خرید', headerClassName: "bg-[#2E4374] text-white", width: 100 },
      { field: 'purchaseInvoiceTypeName', headerName: 'نوع فاکتور خرید', headerClassName: "bg-[#2E4374] text-white", width: 100 },
      { field: 'sellerCompanyRow', headerName: 'ردیف بنگاه فروشگاه', headerClassName: "bg-[#2E4374] text-white", width: 120 },
      { field: 'Action', renderCell: renderAction, headerName: 'حذف', headerClassName: "bg-[#2E4374] text-white", width: 100 },
    ]
    return col
  }

