export const columns = (renderAction: any) => {
    const col = [
      { field: 'productName', headerName: 'کالا', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
      { field: 'warehouseName', headerName: 'انبار', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 80},
      { field: 'proximateAmount', headerName: 'مقدار', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 80 },
      { field: 'price', headerName: 'قیمت', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 80 },
      { field: 'productDesc', headerName: 'توضیحات', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
      { field: 'rowId', headerName: 'ردیف فروش', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 80 },
      { field: 'buyPrice', headerName: 'قیمت خرید', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
      { field: 'purchaseSettlementDate', headerName: 'تاریخ تسویه خرید', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
      { field: 'purchaseInvoiceTypeName', headerName: 'نوع فاکتور خرید', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
      { field: 'sellerCompanyRow', headerName: 'ردیف بنگاه فروشگاه', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
      { field: 'Action', renderCell: renderAction, headerName: 'حذف', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
    ]
    return col
  }

