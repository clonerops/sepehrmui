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
import ConfirmDialog from "../../../_cloner/components/ConfirmDialog"
import { renderAlert } from "../../../_cloner/helpers/sweetAlert"
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar"
import TransitionsModal from "../../../_cloner/components/ReusableModal"
import FormikInput from "../../../_cloner/components/FormikInput"
import { rejectReasonValidation } from "./_validation"

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

  const handleApprovePaymentRequest = (id: string) => {
    approvePaymentRequest.mutate(id, {
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
      <Link to={`/dashboard/proceedPaymentRequest/${params.row.id}`}>
        <Button className="!bg-fuchsia-500 hover:!bg-fuchsia-700">
          <Typography className="text-white">پرداخت</Typography>
        </Button>
      </Link>
      <Link to={`/dashboard/paymentRequestDetail/${params.row.id}`}>
        <Button className="!bg-indigo-500 hover:!bg-indigo-700">
          <Typography className="text-white">جزئیات</Typography>
        </Button>
      </Link>
      <Link to={`/dashboard/paymentRequestEdit/${params.row.id}`}>
        <Button className="!bg-yellow-500 hover:!bg-yellow-700">
          <Typography className="">ویرایش</Typography>
        </Button>
      </Link>
      <div>
        <Button onClick={() => handleOpenApprove(params?.row)} className="!bg-green-500 hover:!bg-green-700">
          <Typography className="">تایید</Typography>
        </Button>
      </div>
      <div>
        <Button onClick={() => handleOpenReject(params?.row)} className="!bg-red-500 hover:!bg-red-700">
          <Typography className="text-white">عدم تایید</Typography>
        </Button>
      </div>
    </div>
  }

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
      <ConfirmDialog
        open={approve}
        hintTitle="آیا از تایید مطمئن هستید؟"
        notConfirmText="لغو"
        confirmText={approvePaymentRequest.isLoading ? "درحال پردازش ..." : "تایید"}
        onCancel={() => setApprove(false)}
        onConfirm={() => handleApprovePaymentRequest(selecetdItem.id)}
      />
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