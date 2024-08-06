import { useState, useEffect } from 'react'
import { Typography } from "@mui/material"
import { Formik } from "formik"

import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../_cloner/helpers/fuse"
import ReusableCard from '../../../_cloner/components/ReusableCard'

import { IAssignCustomerLabel } from "./_models"
import { usePostAsignCustomerLabels } from './_hooks'
import Backdrop from '../../../_cloner/components/Backdrop'
import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar'
import FormikCustomer from '../../../_cloner/components/FormikCustomer'
import { useGetCustomers } from '../customer/core/_hooks'
import TransitionsModal from '../../../_cloner/components/ReusableModal'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'
import { AssignCustomerLabelColumn, AssignCustomerLabelsColumn, CustomerWarehouseColumn, CustomerWarehousesColumn } from '../../../_cloner/helpers/columns'
import FormikCustomerLabelMultiplie from '../../../_cloner/components/FormikCustomerLabelMiltiplie'
import { toAbsoulteUrl } from '../../../_cloner/helpers/assetsHelper'

const initialValues: any = {
  id: 0,
  customerId: "",
  assignedLabels: []
}

const AssignCustomerLabel = () => {
  const customers = useGetCustomers()
  const { mutate: postCustomerLabel, isLoading: postLoading } = usePostAsignCustomerLabels();

  const [results, setResults] = useState<IAssignCustomerLabel[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<any>({})

  useEffect(() => {
    setResults(customers?.data?.data);
     // eslint-disable-next-line
  }, [customers?.data?.data]);

  const onAdd = async (values: any) => {
    try {
      const formData = {
        customerId: values.customerId?.value,
        assignedLabels: values.assignedLabels
      }
      postCustomerLabel(formData, {
        onSuccess: (response: any) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
          } else {
            EnqueueSnackbar(response.data.Message, "warning")
          }
        }
      })
    } catch (error) {
    }

  }



  if (customers.isLoading) {
    return <Backdrop loading={customers.isLoading} />;
  }
  return (
    <>
      {postLoading && <Backdrop loading={postLoading} />}
      <div className="lg:grid lg:grid-cols-2 lg:gap-4">
        <ReusableCard>
          <div>
            <div>
              <Formik initialValues={initialValues} onSubmit={onAdd}>
                {({ handleSubmit }) => {
                  return <form onSubmit={handleSubmit} className="mb-4">
                    <div
                    
                      className="md:flex md:flex-col md:justify-start md:items-start gap-4 space-y-4 lg:space-y-0"
                    >
                      <FormikCustomer name="customerId" label="مشتری" divClassName="mt-2 md:mt-0" />
                      <FormikCustomerLabelMultiplie name='assignedLabels' label="برچسب" />
                      <div className="mt-2 md:mt-0">
                        <ButtonComponent onClick={() => handleSubmit()}>
                          <Typography className="px-2 text-white">
                            اختصاص برچسب به مشتری
                          </Typography>
                        </ButtonComponent>
                      </div>
                    </div>
                  </form>
                }}
              </Formik>
              <div className="mb-4">
                <FuzzySearch
                  keys={[
                    "customerCode",
                    "firstName",
                    "lastName",
                  ]}
                  data={customers?.data?.data}
                  setResults={setResults}
                />
              </div>
              <MuiDataGrid
                columns={AssignCustomerLabelsColumn(setSelectedItems, setIsOpen)}
                rows={results}
                data={customers?.data?.data}
                onDoubleClick={(item: any) => {
                  setSelectedItems(item.row)
                  setIsOpen(true)
                }}
              />
            </div>
          </div>
        </ReusableCard>
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 hidden">
          <ReusableCard>
            <div className="flex flex-col flex-wrap gap-4">
              <Typography variant="h3" className="text-yellow-500">راهنما</Typography>
              <Typography>از طریق فرم مقابل می توانید برچسب هایی را به مشتری های خود اختصاص دهید</Typography>
              <Typography>جهت اختصاص یک برچسب به مشتری بایستی پس از انتخاب مشتری برچسبی که میخواهید برای آن ثبت شود را انتخاب کنید و اقدام به ثبت کنید</Typography>
              <Typography variant="h3" className="text-red-500">نکته اول: </Typography>
              <Typography>امکان حذف وجود ندارد اما می توانید اقدام به فعالسازی/غیرفعالسازی کنید</Typography>
              <Typography variant="h3" className="text-red-500">نکته دوم: </Typography>
              <Typography>جهت دسترسی به ثبت و فعال/غیرفعالسازی با پشتیبانی تماس بگیرید</Typography>
            </div>
          </ReusableCard>
          <ReusableCard cardClassName='flex justify-center items-center'>
            <img alt="sepehriranian"
              src={toAbsoulteUrl("/media/mainlogo/2.png")}
              className="rounded-md"
              width={100}
            />
          </ReusableCard>
          <ReusableCard cardClassName='col-span-2 flex justify-center items-center'>
            <img alt="sepehriranian"
              src={toAbsoulteUrl("/media/images/Customer_service_phrases_Featured.jpg")}
              className="rounded-md"
            //   width={100}
            />

          </ReusableCard>
        </div>
      </div>
      <TransitionsModal open={isOpen} isClose={() => setIsOpen(false)} title='لیست برچسب های مشتری'>
        <MuiDataGrid
          columns={AssignCustomerLabelColumn()}
          rows={selectedItems?.customerLabels?.length > 0 ? selectedItems?.customerLabels : [{}]}
          data={selectedItems?.customerLabels?.length > 0 ? selectedItems?.customerLabels : [{}]}
        />
      </TransitionsModal>
    </>
  )
}

export default AssignCustomerLabel
