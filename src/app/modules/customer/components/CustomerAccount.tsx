import { Formik } from "formik"
import ReusableCard from "../../../../_cloner/components/ReusableCard"
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker"
import ButtonComponent from "../../../../_cloner/components/ButtonComponent"
import { Search } from "@mui/icons-material"
import { Alert, Typography } from "@mui/material"
import RadioGroup from "../../../../_cloner/components/RadioGroup"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import { CustomerAccountColumn } from "../../../../_cloner/helpers/columns"
import { separateAmountWithCommas } from "../../../../_cloner/helpers/seprateAmount"
import { convertToPersianWord } from "../../../../_cloner/helpers/convertPersian"
import FormikSearchableCustomer from "../../../../_cloner/components/FormikSearchableCustomer"
import { useGetCustomersAccountReport } from "../core/_hooks"
import Backdrop from "../../../../_cloner/components/Backdrop"
import ReportViewer from "../../../../_cloner/components/ReportViewer"

const initialValues = {
  customerId: "",
  fromDate: "",
  toDate: "",
  billingReportType: "1"
}

const categories = [
  { value: "1", title: "با احتساب تقریبی", defaultChecked: true },
  { value: "2", title: "بدون احتساب تقریبی", defaultChecked: false }
]

const CustomerAccount = () => {

  const customerAccountTools = useGetCustomersAccountReport()

  const onSubmit = (values: any) => {
    const filters = {
      ...values,
      customerId: values.customerId.value,
      billingReportType: +values.billingReportType
    }
    customerAccountTools.mutate(filters)
  }

  return (
    <>
      {customerAccountTools.isLoading && <Backdrop loading={customerAccountTools.isLoading} />}
      <ReusableCard>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleSubmit, values }) => <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <FormikSearchableCustomer name="customerId" label="مشتری" />

              <FormikDatepicker name='fromDate' label="از تاریخ" />
              <FormikDatepicker name='toDate' label="تا تاریخ" />

              <RadioGroup
                categories={categories}
                id="billingReportType"
                key="billingReportType"
                name="billingReportType"
              />
            </div>
            <div className="flex justify-end items-end">
              <ButtonComponent onClick={() => handleSubmit()} disabled={
                !values.customerId ||
                !values.fromDate ||
                !values.toDate
              }>
                <Search className="text-white" />
                <Typography className="text-white">جستجو</Typography>
              </ButtonComponent>
            </div>

            <div className="my-4">
              <MuiDataGrid
                columns={CustomerAccountColumn()}
                rows={customerAccountTools?.data?.data?.details}
                data={customerAccountTools?.data?.data?.details}
                onDoubleClick={() => { }}
              />
            </div>
            <Alert variant="outlined" color="info">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row items-center gap-x-4">
                    <Typography variant="h3" className="text-gray-500">مانده حساب (ریال): </Typography>
                    <Typography variant="h1" color="primary">{separateAmountWithCommas(customerAccountTools?.data?.data?.remainingAmount || 0)}</Typography>
                  </div>
                </div>
                <div className="lg:pr-36">
                  <Typography variant="h3" color="primary">{convertToPersianWord(customerAccountTools?.data?.data?.remainingAmount || 0)} تومان</Typography>
                </div>

              </div>
            </Alert>
            {/* {customerAccountTools?.data?.data.length > 0 &&
              <ReportViewer  />
            } */}
            {/* {customerAccountTools?.data?.data?.details?.length > 0 &&
              <ReportViewer path={"/reports/CustomerAccount.mrt"} data={customerAccountTools?.data?.data?.details} />
            } */}
          </form>}
        </Formik>
      </ReusableCard>
    </>
  )
}

export default CustomerAccount