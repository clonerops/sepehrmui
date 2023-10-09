import { separateAmountWithCommas } from "../../../../_cloner/helpers/SeprateAmount"

  export const columns = (renderAction: any) => {
    const col = [
      { field: 'receivePayCode', headerName: 'شماره ثبت', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 80 },
      { field: 'receivePaymentSourceFromDesc', headerName: 'دریافت از',
      renderCell: (value: any) => (
        value.row.receivePaymentSourceFromDesc + " " + (value.row?.receiveFromCustomerName === null ? "" : value.row?.receiveFromCustomerName)
      ),
      headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
      { field: 'receivePaymentSourceToDesc',
      renderCell: (value: any) => (
        value.row.receivePaymentSourceToDesc + " " + (value.row?.payToCustomerName === null ? "" : value.row?.payToCustomerName)
      ), headerName: 'پرداخت به', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 160 },
      { field: 'amount', headerName: 'مبلغ',
      renderCell: (value: any) => (
        separateAmountWithCommas(value.row.amount)
      ),
      headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
      { field: 'accountOwner', headerName: 'صاحب حساب', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
      { field: 'trachingCode', headerName: 'کد پیگیری', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
      { field: 'companyName', headerName: 'صاحب شرکت', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
      { field: 'contractCode', headerName: 'شماره قرارداد', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
      { field: 'isAccountingApproval', headerName: 'تایید حسابداری؟', renderCell: (params: any) => (
        params.value === true ? "بله" : "خیر"
      ), headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 100 },
      { field: 'accountingApprovalDate', headerName: 'تاریخ تایید حسابداری', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 120 },
      { field: 'description', headerName: 'توضیحات', headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 380 },
      { headerName: 'عملیات',  renderCell: renderAction, headerClassName: "bg-[#E2E8F0] text-black font-bold", width: 260 }
    ]
    return col
  }