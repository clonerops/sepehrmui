import { useEffect, useState } from "react"
import { Formik } from "formik"
import { IconButton, Tooltip, Typography } from "@mui/material"
import { Edit, Search, Visibility } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { PaymentRequestColumn } from "../../../_cloner/helpers/columns"

import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import ReusableCard from "../../../_cloner/components/ReusableCard"
import ButtonComponent from "../../../_cloner/components/ButtonComponent"
import FormikInput from "../../../_cloner/components/FormikInput"
import Pagination from "../../../_cloner/components/Pagination"
import { useGetPaymentRequestByIdMutation, useGetPaymentRequests } from "./_hooks"

const pageSize = 100

const ListOfPaymentRequest = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const paymentRequests = useGetPaymentRequests()

  useEffect(() => {
    const filter = {
      PageNumber: currentPage,
      PageSize: pageSize,
    }
    paymentRequests.mutate(filter)
    // eslint-disable-next-line
  }, [currentPage])

  const renderAction = (params: any) => {
    return <div className="flex gap-x-4">
      <Tooltip title={<Typography variant='h3'>مشاهده جزئیات</Typography>}>
        <Link to={`/dashboard/paymentRequestDetail/${params.row.id}`}>
          <IconButton size="small" color="primary">
            <Visibility />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title={<Typography variant='h3'>ویرایش</Typography>}>
        <Link to={`/dashboard/paymentRequestEdit/${params.row.id}`}>
          <IconButton size="small" color="secondary">
            <Edit />
          </IconButton>
        </Link>
      </Tooltip>
    </div>
  }
  const handleFilter = (values: any) => {
    let formData = {
      paymentRequestCode: values.paymentRequestCode ? values.paymentRequestCode : "",
      PageNumber: currentPage,
      PageSize: 100,
    };
    paymentRequests.mutate(formData);
  }

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };


  return (
    <>
      {/* {transferList.isLoading && <Backdrop loading={transferList.isLoading} />} */}
      <ReusableCard>
        <Formik initialValues={{
          paymentRequestCode: "",
        }} onSubmit={() => { }}>
          {({ values }) => {
            return (
              <>
                <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-[50%] mb-4">
                  <FormikInput name="paymentRequestCode" label="شماره درخواست" />
                  <ButtonComponent onClick={() => handleFilter(values)}>
                    <Search className="text-white" />
                    <Typography className="px-2 text-white">جستجو</Typography>
                  </ButtonComponent>
                </div>
              </>
            );
          }}
        </Formik>

        <MuiDataGrid
          columns={PaymentRequestColumn(renderAction)}
          rows={paymentRequests?.data?.data}
          data={paymentRequests?.data?.data}
          onDoubleClick={() => {}}
          hideFooter={true}
        />
        <Pagination pageCount={+paymentRequests?.data?.totalCount / +pageSize || 100} onPageChange={handlePageChange} />
      </ReusableCard>

    </>
  )
}

export default ListOfPaymentRequest