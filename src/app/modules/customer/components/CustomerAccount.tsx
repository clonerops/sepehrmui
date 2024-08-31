import { Formik } from "formik"
import ReusableCard from "../../../../_cloner/components/ReusableCard"
import FormikCustomer from "../../../../_cloner/components/FormikCustomer"
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker"
import ButtonComponent from "../../../../_cloner/components/ButtonComponent"
import { Search } from "@mui/icons-material"
import { Alert, Typography } from "@mui/material"
import RadioGroup from "../../../../_cloner/components/RadioGroup"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import { CustomerAccountColumn, CustomerColumn } from "../../../../_cloner/helpers/columns"
import { separateAmountWithCommas } from "../../../../_cloner/helpers/seprateAmount"
import { convertToPersianWord } from "../../../../_cloner/helpers/convertPersian"

const categories = [
  { value: "1", title: "با احتساب تقریبی", defaultChecked: true },
  { value: "2", title: "بدون احتساب تقریبی", defaultChecked: false }
]

const CustomerAccount = () => {

  return (
    <ReusableCard>
      <Formik initialValues={{}} onSubmit={() => { }}>
        {({ handleSubmit }) => <form>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <FormikCustomer name="customerId" label="مشتری" />

            <FormikDatepicker name='fromDate' label="از تاریخ" />
            <FormikDatepicker name='toDate' label="تا تاریخ" />

            <RadioGroup
              categories={categories}
              id="customerBalanceTypeId"
              key="customerBalanceTypeId"
              name="customerBalanceTypeId"
            />
          </div>
          <div className="flex justify-end items-end">
            <ButtonComponent onClick={() => handleSubmit()}>
              <Search className="text-white" />
              <Typography className="text-white">جستجو</Typography>
            </ButtonComponent>
          </div>
          <div className="my-4">
            <MuiDataGrid
              columns={CustomerAccountColumn()}
              rows={[{}]}
              data={[{}]}
              onDoubleClick={() => { }}
            />
          </div>
          <Alert variant="outlined" color="info">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row justify-start items-center gap-x-4">
                <Typography variant="h3" className="text-gray-500">مانده حساب (ریال): </Typography>
                <Typography variant="h1" color="primary">{separateAmountWithCommas(2345434546)}</Typography>
              </div>
              <div className="lg:pr-36">
                <Typography variant="h3" color="primary">{convertToPersianWord(2345434546)} تومان</Typography>
              </div>

            </div>
          </Alert>

        </form>}
      </Formik>
    </ReusableCard>
  )
}

export default CustomerAccount