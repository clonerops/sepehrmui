import { useEffect } from 'react'
import { Typography } from "@mui/material"
import { Formik } from "formik"
import * as Yup from 'yup'

import { useGetType, usePostTypes, useUpdateTypes } from './_hooks'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'

import FormikInput from "../../../../_cloner/components/FormikInput"
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query'
import Backdrop from '../../../../_cloner/components/Backdrop'

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
  const { mutate: postType, isLoading: postLoading } = usePostTypes()
  const { mutate: updateType, isLoading: updateLoading } = useUpdateTypes()
  const detailTools = useGetType()

  const isNew = !props.id

  useEffect(() => {
    if (!isNew) {
      detailTools.mutate(props.id)
    }
     // eslint-disable-next-line
  }, [props.id]);


  const onUpdate = (rowData: any) => {
    try {
      const formData = {
        id: rowData.id,
        desc: rowData.desc,
        isActive: !rowData.isActive
      }
      updateType(formData, {
        onSuccess: (response) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
          } else {
            EnqueueSnackbar(response.data.Message, "error")
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
      }
      postType(formData, {
        onSuccess: (response) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
            props.refetch();
          } else {
            EnqueueSnackbar(response.data.Message, "warning")
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }


  const onSubmit = (values: any) => {
    if (isNew) onAdd(values)
    else onUpdate(values)
  }

  if (detailTools?.isLoading) {
    return <p>درحال بارگزاری...</p>;
  }

  return (
    <>
        {updateLoading && <Backdrop loading={updateLoading} />}
        {postLoading && <Backdrop loading={postLoading} />}
        <div>
          <Formik enableReinitialize initialValues={isNew ? initialValues : { ...initialValues, ...detailTools?.data?.data }} validationSchema={validation} onSubmit={onSubmit}>
            {({ handleSubmit }) => {
              return <form onSubmit={handleSubmit} className='mb-4'>
                <div className="md:flex md:flex-col md:justify-start md:items-start gap-4 ">
                  <FormikInput name="id" label="کد نوع کالا " disabled={true} boxClassName=" mt-2 md:mt-4" />
                  <FormikInput name="desc" label="نوع کالا " boxClassName=" mt-2 md:mt-0" />
                  {/* {!isNew && <ImagePreview base64Strings={detailTools?.data?.data?.image || ""} />} */}
                  <div className="mt-2 md:mt-0">
                    <ButtonComponent>
                      <Typography className="px-2">
                        {isNew ? "ثبت نوع کالا" : "ویرایش"}
                      </Typography>
                    </ButtonComponent>
                  </div>
                </div>
              </form>
            }}
          </Formik>
        </div>
    </>
  )
}

export default ProductTypeForm