import { useState, useEffect } from 'react'
import { Box, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import { AddCircleOutline } from '@mui/icons-material'
import * as Yup from 'yup'

import {  useGetWarehouse, useGetWarehouses, useUpdateWarehouses } from './_hooks'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'

import FormikInput from "../../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import DeleteGridButton from '../../../../_cloner/components/DeleteGridButton'
import SwitchComponent from '../../../../_cloner/components/Switch'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../../_cloner/components/ReusableCard'
import EditGridButton from '../../../../_cloner/components/EditGridButton'
import TransitionsModal from '../../../../_cloner/components/ReusableModal'
import FileUpload from '../../payment/components/FileUpload'
import FormikWarehouseType from '../../../../_cloner/components/FormikWarehouseType'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query'

const initialValues = {
  id: 0,
  name: "",
  warehouseTypeId: null
}


type Props = {
    id: any
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
    setIsClose: React.Dispatch<React.SetStateAction<boolean>>
  }

const EditWarehouse = (props: Props) => {
  const { mutate: updateWarehouse } = useUpdateWarehouses()
  const detailTools = useGetWarehouse(props.id)
  
  const onUpdate = (values: any) => {
    try {
      const formData = {
        id: values.id,
        name: values.name,
        warehouseTypeId: values.warehouseTypeId
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
        <Box component="div">
          <Box component="div">
            <Formik enableReinitialize initialValues={{
              ...initialValues,
              ...detailTools?.data?.data
            }} onSubmit={onUpdate}>
              {({ handleSubmit }) => {
                return <Form onSubmit={handleSubmit} className='mb-4'>
                  <Box component="div" className="md:flex md:flex-col md:justify-start md:items-start gap-4 ">
                  <FormikInput name="id" label="کد انبار " disabled={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikInput name="name" label="نام انبار" autoFocus={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikWarehouseType name="warehouseTypeId" label="نوع انبار" boxClassName=" mt-2 md:mt-0" />
                    <Box component="div" className="mt-2 md:mt-0">
                      <ButtonComponent onClick={() => handleSubmit()}>
                        <Typography className="px-2">
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