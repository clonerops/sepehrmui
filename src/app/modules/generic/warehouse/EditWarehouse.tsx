import { Box, Typography } from "@mui/material"
import { Formik, Form } from "formik"

import {  useGetWarehouse, useUpdateWarehouses } from './_hooks'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'

import FormikInput from "../../../../_cloner/components/FormikInput"
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import FormikWarehouseType from '../../../../_cloner/components/FormikWarehouseType'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query'
import FormikCustomer from '../../../../_cloner/components/FormikCustomer'
import Backdrop from "../../../../_cloner/components/Backdrop"

const initialValues = {
  id: 0,
  name: "",
  warehouseTypeId: null,
  customerId: ""
}


type Props = {
    id: any
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
    setIsClose: React.Dispatch<React.SetStateAction<boolean>>
  }

const EditWarehouse = (props: Props) => {
  const { mutate: updateWarehouse, isLoading: updateLoading } = useUpdateWarehouses()
  const detailTools = useGetWarehouse(props.id)
  const onUpdate = (values: any) => {
    try {
      const formData = {
        id: values.id,
        name: values.name,
        warehouseTypeId: values.warehouseTypeId,
        customerId: values.customerId.value ? values.customerId.value : detailTools?.data?.data?.customerId
      }
      updateWarehouse(formData, {
        onSuccess: (response) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
            props.refetch()
            props.setIsClose(false)
          } else {
            EnqueueSnackbar(response.data.Message, "error")
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  };

  if (detailTools?.isLoading) {
    return <p>درحال بارگزاری...</p>;
  }

  return (
    <>
        {updateLoading && <Backdrop loading={updateLoading} />}
        <Box component="div">
          <Box component="div">
            <Formik enableReinitialize initialValues={{
              ...initialValues,
              ...detailTools?.data?.data,
              customerId: detailTools?.data?.data.customerName
            }} onSubmit={onUpdate}>
              {({ handleSubmit }) => {
                return <Form onSubmit={handleSubmit} className='my-4'>
                  <Box component="div" className="md:flex md:flex-col md:justify-start md:items-start gap-4 ">
                    <FormikInput name="id" label="کد انبار " disabled={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikInput name="name" label="نام انبار" autoFocus={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikWarehouseType name="warehouseTypeId" label="نوع انبار" boxClassName=" mt-2 md:mt-0" />
                    <FormikCustomer name="customerId" label="مشتری" boxClassName=" mt-2 md:mt-0" />
                    <Box component="div" className="mt-2 md:mt-0">
                      <ButtonComponent onClick={() => handleSubmit()}>
                        <Typography className="px-2 text-white">
                          ویرایش
                        </Typography>
                      </ButtonComponent>
                    </Box>
                  </Box>
                </Form>
              }}
            </Formik>
          </Box>
        </Box>
    </>
  )
}

export default EditWarehouse