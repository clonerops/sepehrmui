import { useState, useEffect, useRef } from 'react'
import { Checkbox, Typography } from "@mui/material"
import { Formik, FormikProps } from "formik"

import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../_cloner/helpers/fuse"
import ReusableCard from '../../../_cloner/components/ReusableCard'
import Backdrop from '../../../_cloner/components/Backdrop'

import { IAssignCustomerLabel } from "./_models"
import { useGetCustomerLabels, usePostAsignCustomerLabels } from './_hooks'
import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar'
import { useGetCustomer, useGetCustomers } from '../customer/core/_hooks'
import { AssignCustomerLabelsCheckboxColumn } from '../../../_cloner/helpers/columns'
import { toAbsoulteUrl } from '../../../_cloner/helpers/assetsHelper'
import FormikSearchableCustomer from '../../../_cloner/components/FormikSearchableCustomer'

const initialValues: any = {
  id: 0,
  customerId: "",
}

const AssignCustomerLabelV2 = () => {
  const customers = useGetCustomers()
  const customerDetailTools = useGetCustomer()
  const customerLabelsTools = useGetCustomerLabels()

  const { mutate: postCustomerLabel, isLoading: postLoading } = usePostAsignCustomerLabels();
  const [resultLabels, setResultLabels] = useState<IAssignCustomerLabel[]>([]);
  const [selectedIds, setSelectedIds] = useState<any>([]);

  let formikRef = useRef<FormikProps<any>>(null);


  useEffect(() => {
    setResultLabels(customerLabelsTools?.data?.data);
    // eslint-disable-next-line
  }, [customerLabelsTools?.data?.data]);


  const renderCheckbox = (item: any) => {
    const isChecked = selectedIds.includes(item.row.id);
    
    return (
      <div className="flex justify-center items-center gap-x-4">
        <Checkbox
          checked={isChecked}
          onChange={() => handleCheckboxClick(item.row)}
        />
      </div>
    );
  };

  const handleCheckboxClick = (item: any) => {
    const currentIndex = selectedIds.indexOf(item?.id);
    const newSelectedIds = [...selectedIds];

    if (currentIndex === -1) {
      newSelectedIds.push(item?.id);
    } else {
      newSelectedIds.splice(currentIndex, 1);
    }

    const formData = {
      customerId: formikRef?.current?.values?.customerId?.value,
      assignedLabels: newSelectedIds
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
    setSelectedIds(newSelectedIds);
  };


  const onChangeCustomer = (item: { value: string, label: string, customerLabels: any[] }) => {
    if(item?.value) {
      customerDetailTools.mutate(item.value, {
        onSuccess: (response) => {
          const filtered = response.data.customerLabels.map((item: { customerLabelId: number }) => item.customerLabelId)
          setSelectedIds(filtered)
        }
      })
    } else {
      setSelectedIds([])
    }
  }


  if (customers.isLoading) {
    return <Backdrop loading={customers.isLoading} />;
  }
  return (
    <>
      {postLoading && <Backdrop loading={postLoading} />}
      <div className="lg:grid lg:grid-cols-2 lg:gap-4">
        <ReusableCard cardClassName='h-[660px]'>
          <div>
            <Formik enableReinitialize innerRef={formikRef} initialValues={initialValues} onSubmit={() => {}}>
              {() => {
                return <form className="mb-4">
                  <div className="flex flex-col space-y-4">
                    <FormikSearchableCustomer name="customerId" label="مشتری" divClassName="mt-2 md:mt-0" onChange={onChangeCustomer} />
                    <div className="mb-4">
                      <FuzzySearch
                        keys={[
                          "customerLabelTypeDesc",
                          "labelName",
                        ]}
                        data={customerLabelsTools?.data?.data}
                        setResults={setResultLabels}
                      />
                    </div>
                    <MuiDataGrid
                      columns={AssignCustomerLabelsCheckboxColumn(renderCheckbox)}
                      rows={resultLabels}
                      data={customerLabelsTools?.data?.data}
                      isLoading={customerLabelsTools.isLoading || customerDetailTools.isLoading}
                      height={520}
                      onDoubleClick={() => { }}
                    />
                  </div>
                </form>
              }}
            </Formik>
          </div>
        </ReusableCard>
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 hidden h-[660px]">
          <ReusableCard>
            <div className="flex flex-col flex-wrap gap-4">
              <Typography variant="h3" className="text-yellow-500">راهنما</Typography>
              <Typography>از طریق فرم مقابل می توانید برچسب هایی را به مشتری های خود اختصاص دهید</Typography>
              <Typography>جهت اختصاص یک برچسب به مشتری بایستی پس از انتخاب مشتری برچسبی که میخواهید برای آن ثبت شود را انتخاب کنید و اقدام به ثبت کنید</Typography>
            </div>
          </ReusableCard>
          <ReusableCard>
            <div className="flex flex-col flex-wrap gap-4">
              <Typography variant="h3" className="text-red-500">نکته اول: </Typography>
              <Typography>امکان حذف وجود ندارد اما می توانید اقدام به فعالسازی/غیرفعالسازی کنید</Typography>
              <Typography variant="h3" className="text-red-500">نکته دوم: </Typography>
              <Typography>جهت دسترسی به ثبت و فعال/غیرفعالسازی با پشتیبانی تماس بگیرید</Typography>
            </div>
          </ReusableCard>
          <ReusableCard cardClassName='col-span-2 flex justify-center items-center'>
            <img alt="sepehriranian"
              src={toAbsoulteUrl("/media/images/Customer_service_phrases_Featured.jpg")}
              className="rounded-md bg-cover"
            />
          </ReusableCard>
        </div>
      </div>
    </>
  )
}

export default AssignCustomerLabelV2
