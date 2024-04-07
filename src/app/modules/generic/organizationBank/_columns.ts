
export const columns = (renderAction: any) => {
    const col = [
      { field: 'bankCode', headerName: 'کد بانک', cellClassName: "font-bold", headerClassName: "!headerClassName", width: 80 },
      { field: 'bankName', headerName: 'نام بانک', cellClassName: "!bg-green-100 font-bold", headerClassName: "!headerClassName", width: 160 },
      { field: 'accountOwner', headerName: 'صاحب حساب', headerClassName: "!headerClassName", width: 120 },
      { field: 'accountNo', headerName: 'شماره حساب', headerClassName: "!headerClassName", width: 80 },
      { field: 'branchName', headerName: 'شعبه', headerClassName: "!headerClassName", width: 80 },
      { headerName: 'عملیات', flex: 1, renderCell: renderAction, headerClassName: "!headerClassName !w-full", minWidth: "100%" }
    ]
    return col
  }