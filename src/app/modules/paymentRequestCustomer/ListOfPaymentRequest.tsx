import { useEffect, useState } from "react"
import { Formik } from "formik"
import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { PaymentRequestColumn } from "../../../_cloner/helpers/columns"

import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import ReusableCard from "../../../_cloner/components/ReusableCard"
import Pagination from "../../../_cloner/components/Pagination"
import { useApprovePaymentRequest, useGetPaymentRequests, useRejectPaymentRequest } from "./_hooks"
import Backdrop from "../../../_cloner/components/Backdrop"
import SearchFromBack from "../../../_cloner/components/SearchFromBack"
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar"
import TransitionsModal from "../../../_cloner/components/ReusableModal"
import FormikInput from "../../../_cloner/components/FormikInput"
import { rejectReasonValidation } from "./_validation"
import FormikPrice from "../../../_cloner/components/FormikPrice"
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount"

const pageSize = 100

const ListOfPaymentRequest = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [approve, setApprove] = useState<boolean>(false);
  const [reject, setReject] = useState<boolean>(false);
  const [selecetdItem, setSelectedItem] = useState<any>({})

  const paymentRequests = useGetPaymentRequests()
  const approvePaymentRequest = useApprovePaymentRequest()
  const rejectPaymentRequest = useRejectPaymentRequest()

  const getData = () => {
    const filter = {
      PageNumber: currentPage,
      PageSize: pageSize,
    }
    paymentRequests.mutate(filter)
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [currentPage])

  const handleFilter = (values: any) => {
    let formData = {
      PaymentRequestCoode: values.PaymentRequestCoode ? values.PaymentRequestCoode : "",
      PageNumber: currentPage,
      PageSize: pageSize,
    };
    paymentRequests.mutate(formData);
  }

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const handleOpenApprove = (item: any) => {
    setApprove(true)
    setSelectedItem(item)
  }
  const handleOpenReject = (item: any) => {
    setReject(true)
    setSelectedItem(item)
  }

  const handleApprovePaymentRequest = (values: any) => {
    const formData = {
      id: selecetdItem.id,
      amount: typeof (values.amount) === "string" ? +values.amount?.replace(/,/g, "") : values.amount
    }
    approvePaymentRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.succeeded) {
          EnqueueSnackbar("تایید درخواست پرداخت با موفقیت انجام شد", "success")
          setApprove(false)
          getData()
        } else {
          EnqueueSnackbar(response.data.Message, "warning")
        }
      }
    })
  }

  const handleRejectPaymentRequest = (values: { rejectReasonDesc: string }) => {
    const formData = {
      id: selecetdItem.id,
      rejectReasonDesc: values.rejectReasonDesc
    }
    rejectPaymentRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.succeeded) {
          EnqueueSnackbar("عدم تایید درخواست پرداخت با موفقیت انجام شد", "success")
          setReject(false)
          getData()
        } else {
          EnqueueSnackbar(response.data.Message, "warning")
        }
      }
    })
  }


  const renderAction = (params: any) => {
    return <div className="flex gap-x-4">
      <Link to={`${params.row.paymentRequestStatusId > 2 ? "" : `/dashboard/proceedPaymentRequest/${params.row.id}`}`}>
        <Button disabled={params.row.paymentRequestStatusId > 2} className={`${params.row.paymentRequestStatusId > 2 ? "!bg-gray-300 hover:!bg-gray-300" : "!bg-fuchsia-500 hover:!bg-fuchsia-700"}!bg-fuchsia-500 hover:!bg-fuchsia-700`}>
          <Typography className="text-white">پرداخت</Typography>
        </Button>
      </Link>
      <Link to={`/dashboard/paymentRequestDetail/${params.row.id}`}>
        <Button className="!bg-indigo-500 hover:!bg-indigo-700">
          <Typography className="text-white">جزئیات</Typography>
        </Button>
      </Link>
      <Link to={`${params.row.paymentRequestStatusId > 1 ? "" : `/dashboard/paymentRequestEdit/${params.row.id}`} `}>
        <Button disabled={params.row.paymentRequestStatusId > 1} className={`${params.row.paymentRequestStatusId > 1 ? "!bg-gray-300 hover:!bg-gray-300" : "!bg-yellow-500 hover:!bg-yellow-700"}`}>
          <Typography className="">ویرایش</Typography>
        </Button>
      </Link>
      <div>
        <Button disabled={params.row.paymentRequestStatusId > 1} onClick={() => handleOpenApprove(params?.row)} className={`${params.row.paymentRequestStatusId > 1 ? "!bg-gray-300 hover:!bg-gray-300" : "!bg-green-500 hover:!bg-green-700"} `}>
          <Typography className="">تایید</Typography>
        </Button>
      </div>
      <div>
        <Button disabled={params.row.paymentRequestStatusId > 2} onClick={() => handleOpenReject(params?.row)} className= {`${params.row.paymentRequestStatusId > 2 ? "!bg-gray-300 hover:!bg-gray-300" : "!bg-red-500 hover:!bg-red-700"}`}>
          <Typography className="text-white">عدم تایید</Typography>
        </Button>
      </div>
    </div>
  }

  console.log(selecetdItem)

  return (
    <>
      {paymentRequests.isLoading && <Backdrop loading={paymentRequests.isLoading} />}
      {approvePaymentRequest.isLoading && <Backdrop loading={approvePaymentRequest.isLoading} />}
      {rejectPaymentRequest.isLoading && <Backdrop loading={rejectPaymentRequest.isLoading} />}
      <ReusableCard>
        <Formik initialValues={{ PaymentRequestCoode: "" }} onSubmit={() => { }}>
          {() => <SearchFromBack inputName='PaymentRequestCoode' initialValues={{ PaymentRequestCoode: "" }} onSubmit={handleFilter} label="شماره درخواست" />}
        </Formik>

        <MuiDataGrid
          columns={PaymentRequestColumn(renderAction)}
          rows={paymentRequests?.data?.data}
          data={paymentRequests?.data?.data}
          onDoubleClick={() => { }}
          // isLoading={paymentRequests.isLoading}
          hideFooter={true}
        />
        <Pagination pageCount={+paymentRequests?.data?.totalCount / +pageSize || 100} onPageChange={handlePageChange} />
      </ReusableCard>
      <TransitionsModal width="50%" open={approve} isClose={() => setApprove(false)} title={` تایید درخواست پرداخت به شماره ${selecetdItem?.paymentRequestCode}`}>
        <Formik initialValues={{  amount: separateAmountWithCommas(selecetdItem?.amount)}} onSubmit={handleApprovePaymentRequest}>
          {({ handleSubmit }) => {
            return <div className="mt-4">
              <Typography variant="h4" className="text-red-500 !mb-4">درصورتی که نیاز به ویرایش مبلغ درخواست شده دارید از طریق فرم زیر می تواندی اقدام به ویرایش و سپس ثبت تایید نمایید</Typography>
              <FormikPrice name="amount" label="مبلغ" />
              <div className="flex justify-end items-end my-4">
                <Button onClick={() => handleSubmit()} className="!bg-green-500 hover:!bg-green-700">
                  <Typography className="text-white">ثبت</Typography>
                </Button>
              </div>
            </div>
          }}
        </Formik>
      </TransitionsModal>
      <TransitionsModal width="50%" open={reject} isClose={() => setReject(false)} title={`عدم تایید درخواست پرداخت به شماره ${selecetdItem?.paymentRequestCode}`}>
        <Formik validationSchema={rejectReasonValidation} initialValues={{ rejectReasonDesc: "" }} onSubmit={handleRejectPaymentRequest}>
          {({ handleSubmit }) => {
            return <div className="mt-4">
              <FormikInput multiline minRows={3} name="rejectReasonDesc" label="دلیل عدم تایید" />
              <div className="flex justify-end items-end my-4">
                <Button onClick={() => handleSubmit()} className="!bg-red-500 hover:!bg-red-700">
                  <Typography className="text-white">ثبت</Typography>
                </Button>
              </div>
            </div>
          }}
        </Formik>
      </TransitionsModal>
    </>
  )
}

export default ListOfPaymentRequest