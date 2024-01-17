import { useState, useEffect } from 'react'
import { Box, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import { AddCircleOutline } from '@mui/icons-material'
import * as Yup from 'yup'

import { IType } from "./_models"
import { useDeleteTypes, useGetType, useGetTypes, usePostTypes, useUpdateTypes } from './_hooks'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import { validateAndEnqueueSnackbar } from '../../order/sales-order/functions'

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
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query'
import ImagePreview from '../../../../_cloner/components/ImagePreview'
import { convertFilesToBase64 } from '../../../../_cloner/helpers/ConvertToBase64'

const initialValues = {
  id: 0,
  desc: "",
  image: ""
}

const validation = Yup.object({
  desc: Yup.string().required("فیلد الزامی می باشد")
})

type Props = {
    id?: any
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
    setIsCreateOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductTypeForm = (props: Props) => {
  const { mutate: postType } = usePostTypes()
  const { mutate: updateType } = useUpdateTypes()
  const detailTools = useGetType()

  const isNew = !props.id
  
  const [files, setFiles] = useState<File[]>([]);
  const [base64Attachments, setBase64Attachments] = useState<string>("")


  useEffect(() => {
    if (files.length > 0) {
        convertFilesToBase64(files, setBase64Attachments);
    }
}, [files]);

  useEffect(() => {
    if (!isNew) {
        detailTools.mutate(props.id)
    }
}, [props.id]);


  const onUpdate = (rowData: any) => {
    console.log(rowData)
    try {
      const formData = {
        id: rowData.id,
        desc: rowData.desc,
        image: rowData.image,
        isActive: !rowData.isActive
      }
      updateType(formData, {
        onSuccess: (response) => {
          if (response.succeeded) {
            validateAndEnqueueSnackbar(response.message, "success")
          } else {
            validateAndEnqueueSnackbar(response.data.Message, "error")
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  };

  const onAdd = (values: any) => {
    try {
        const formData = {
          desc: values.desc,
          image: base64Attachments[0]
        }
        postType(formData, {
          onSuccess: (response) => {
            if (response.succeeded) {
              validateAndEnqueueSnackbar(response.message, "success")
            //   setFieldValue('id', response.data.id)
              props.refetch();
            } else {
              validateAndEnqueueSnackbar(response.data.Message, "warning")
            }
          }
        })
      } catch (error) {
        console.log(error)
      }
  }


  const onSubmit = (values: any) => {
    if(isNew) onAdd(values)
    else onUpdate(values)
  }

  if (detailTools?.isLoading) {
    return <p>درحال بارگزاری...</p>;
  }

  return (
    <>
        <Box component="div">
          <Box component="div">
            <Formik enableReinitialize initialValues={isNew ? initialValues : {...initialValues, ...detailTools?.data?.data}} validationSchema={validation} onSubmit={onSubmit}>
              {({ handleSubmit }) => {
                return <Form onSubmit={handleSubmit} className='mb-4'>
                  <Box component="div" className="md:flex md:flex-col md:justify-start md:items-start gap-4 ">
                    <FormikInput name="id" label="کد نوع کالا " disabled={true} boxClassName=" mt-2 md:mt-4" />
                    <FormikInput name="desc" label="نوع کالا " boxClassName=" mt-2 md:mt-0" />
                    <FileUpload files={files} setFiles={setFiles} />
                    {/* {!isNew && <ImagePreview base64Strings={detailTools?.data?.data?.image || ""} />} */}
                    <Box component="div" className="mt-2 md:mt-0">
                      <ButtonComponent onClick={() => handleSubmit()}>
                        <Typography className="px-2">
                          {isNew ? "ثبت نوع کالا" : "ویرایش"}
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

export default ProductTypeForm