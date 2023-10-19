import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount"

  export const columns = (renderAction: any) => {
    const col = [
      { field: 'receivePayCode', headerName: 'شماره ثبت', headerClassName: "headerClassName", width: 80 },
      { field: 'receivePaymentSourceFromDesc', headerName: 'دریافت از',
      renderCell: (value: any) => (
        value.row.receivePaymentSourceFromDesc + " " + (value.row?.receiveFromCustomerName === null ? "" : value.row?.receiveFromCustomerName)
      ),
      headerClassName: "headerClassName", width: 160 },
      { field: 'receivePaymentSourceToDesc',
      renderCell: (value: any) => (
        value.row.receivePaymentSourceToDesc + " " + (value.row?.payToCustomerName === null ? "" : value.row?.payToCustomerName)
      ), headerName: 'پرداخت به', headerClassName: "headerClassName", width: 160 },
      { field: 'amount', headerName: 'مبلغ',
      renderCell: (value: any) => (
        separateAmountWithCommas(value.row.amount)
      ),
      headerClassName: "headerClassName", width: 100 },
      { field: 'accountOwner', headerName: 'صاحب حساب', headerClassName: "headerClassName", width: 100 },
      { field: 'trachingCode', headerName: 'کد پیگیری', headerClassName: "headerClassName", width: 100 },
      { field: 'companyName', headerName: 'صاحب شرکت', headerClassName: "headerClassName", width: 100 },
      { field: 'contractCode', headerName: 'شماره قرارداد', headerClassName: "headerClassName", width: 100 },
      { field: 'isAccountingApproval', headerName: 'تایید حسابداری؟', renderCell: (params: any) => (
        params.value === true ? "بله" : "خیر"
      ), headerClassName: "headerClassName", width: 100 },
      { field: 'accountingApprovalDate', headerName: 'تاریخ تایید حسابداری', headerClassName: "headerClassName", width: 120 },
      { field: 'description', headerName: 'توضیحات', headerClassName: "headerClassName", width: 380 },
      { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "headerClassName", width: 260 }
    ]
    return col
  }