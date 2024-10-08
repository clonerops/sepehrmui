import { useState, useEffect } from 'react'
import { Typography } from "@mui/material"
import { Formik } from "formik"
import { AddCircleOutline } from '@mui/icons-material'
import * as Yup from 'yup'

import FormikInput from "../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../_cloner/helpers/fuse"
import SwitchComponent from '../../../_cloner/components/Switch'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import Backdrop from '../../../_cloner/components/Backdrop'

import { IStandard } from "./_models"
import { useGetStandards, usePostStandards, useUpdateStandards } from './_hooks'
import { toAbsoulteUrl } from '../../../_cloner/helpers/assetsHelper'
import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar'
import { ProductStandardsColumn } from '../../../_cloner/helpers/columns'

const initialValues = {
  id: 0,
  desc: ""
}

const validation = Yup.object({
  desc: Yup.string().required("فیلد الزامی می باشد")
})

const ProductStandards = () => {
  
  const standardTools = useGetStandards()
  const postStandardTools = usePostStandards()
  const updateStandardTools = useUpdateStandards()

  const [results, setResults] = useState<IStandard[]>([]);

  useEffect(() => {
    setResults(standardTools?.data?.data);
     // eslint-disable-next-line
  }, [standardTools?.data?.data]);

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        desc: rowData.row.desc,
        isActive: !rowData.row.isActive
      }
      updateStandardTools.mutate(formData, {
        onSuccess: (response) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
          } else {
            EnqueueSnackbar(response.data.Message, "error")
          }
          standardTools.refetch()
        }
      })
    } catch (e) {
      return e;
    }
  };

  const renderSwitch = (item: any) => {
    return (
      <SwitchComponent
        checked={item?.row.isActive}
        onChange={(_) => onUpdateStatus(item)}
      />
    );
  };

  return (
    <>
      {standardTools.isLoading && <Backdrop loading={standardTools.isLoading} />}
      {updateStandardTools.isLoading && <Backdrop loading={updateStandardTools.isLoading} />}
      {postStandardTools.isLoading && <Backdrop loading={postStandardTools.isLoading} />}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ReusableCard>
          <div>

            <Formik initialValues={initialValues} validationSchema={validation} onSubmit={
              async (values, { setStatus, setSubmitting, setFieldValue }) => {
                try {
                  const formData = {
                    desc: values.desc
                  }
                  postStandardTools.mutate(formData, {
                    onSuccess: (response: any) => {
                      if (response.succeeded) {
                        EnqueueSnackbar(response.message, "success")
                        setFieldValue('id', response.data.id)
                        standardTools.refetch();
                      } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                      }
                    }
                  })
                } catch (error) {
                  setStatus("اطلاعات ثبت استاندارد نادرست می باشد");
                  setSubmitting(false);
                }
              }
            }>
              {({ handleSubmit }) => {
                return <form onSubmit={handleSubmit} className="mb-4">
                  <div className="md:flex md:justify-start md:items-start gap-x-4 ">
                    <FormikInput name="id" label="کد استاندارد " disabled={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikInput name="desc" label="استاندارد " autoFocus={true} boxClassName=" mt-2 md:mt-0" />
                    <ButtonComponent>
                      <Typography className="px-2">
                        <AddCircleOutline className='!text-white' />
                      </Typography>
                    </ButtonComponent>
                  </div>
                </form>
              }}
            </Formik>
            <div className="mb-4">
              <FuzzySearch
                keys={[
                  "id",
                  "desc",
                ]}
                data={standardTools?.data?.data}
                setResults={setResults}
              />
            </div>
            <MuiDataGrid
              columns={ProductStandardsColumn(renderSwitch)}
              rows={results}
              data={standardTools?.data?.data}
              onDoubleClick={(item: any) => onUpdateStatus(item)}
              getRowId={(item: { id: number }) => item.id}
            />
          </div>
        </ReusableCard>
        <ReusableCard cardClassName='lg:flex gap-4 hidden'>
          <div>
            <div className="hidden md:flex md:justify-center md:items-center">
              <div className="flex flex-col flex-wrap gap-4">
                <Typography variant="h3" className="text-yellow-500">راهنما</Typography>
                <Typography>هر کالایی که تعریف می شود استاندارد مخصوص به خود را دارا می باشد</Typography>
                <Typography>از طریق فرم مقابل می توانید تمامی استادارد ها را تعریف کرده و در فرم تعریف کالا از این استادارد ها برای اختصاص به به کالا استفاده کنید</Typography>
                <Typography variant="h3" className="text-red-500">نکته اول: </Typography>
                <Typography>امکان حذف استادارد کالا وجود ندارد اما می توانید اقدام به غیرفعاسازی کالابرند کنید</Typography>
                <Typography variant="h3" className="text-red-500">نکته دوم: </Typography>
                <Typography>جهت دسترسی به ثبت و فعال/غیرفعالسازی کالابرند با پشتیبانی تماس بگیرید</Typography>
              </div>
            </div>
          </div>
          <div>
            <div className="hidden md:flex md:justify-center md:items-center"
            >
              <img alt="sepehriranian"
                src={toAbsoulteUrl("/media/logos/11089.jpg")}
                width={400}
              />
            </div>

          </div>
        </ReusableCard>
      </div>
    </>
  )
}

export default ProductStandards