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
import Backdrop from '../../../_cloner/components/Backdrop'
import ReusableCard from '../../../_cloner/components/ReusableCard'

import { ICost } from "./_models"
import { useGetCosts, usePostCosts, useUpdateCosts } from './_hooks'
import { toAbsoulteUrl } from '../../../_cloner/helpers/assetsHelper'
import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar'
import { CostsColumn } from '../../../_cloner/helpers/columns'
import AccessDenied from '../../routing/AccessDenied'
import { useAuth } from '../../../_cloner/helpers/checkUserPermissions'

const initialValues = {
  id: 0,
  costDescription: ""
}

const validation = Yup.object({
  costDescription: Yup.string().required("فیلد الزامی می باشد")
})

const Costs = () => {
  const {hasPermission} = useAuth()

  const costTools = useGetCosts()
  const potsCostTools = usePostCosts()
  const updateCostTools = useUpdateCosts()

  const [results, setResults] = useState<ICost[]>([]);

  useEffect(() => {
    setResults(costTools?.data?.data);
     // eslint-disable-next-line
  }, [costTools?.data?.data]);

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        costDescription: rowData.row.costDescription,
        isActive: !rowData.row.isActive
      }
      updateCostTools.mutate(formData, {
        onSuccess: (response) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
          } else {
            EnqueueSnackbar(response.data.Message, "error")
          }
          costTools.refetch()
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
  }

  if(!hasPermission("CreateCost"))
    return <AccessDenied />


  return (
    <>
      {costTools.isLoading && <Backdrop loading={costTools.isLoading} />}
      {potsCostTools.isLoading && <Backdrop loading={potsCostTools.isLoading} />}
      {updateCostTools.isLoading && <Backdrop loading={updateCostTools.isLoading} />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ReusableCard>
          <div>

            <Formik initialValues={initialValues} validationSchema={validation} onSubmit={
              async (values, { setStatus, setSubmitting, setFieldValue }) => {
                try {
                  const formData = {
                    costDescription: values.costDescription
                  }
                  potsCostTools.mutate(formData, {
                    onSuccess: (response: any) => {
                      if (response.succeeded) {
                        EnqueueSnackbar(response.message, "success")
                        setFieldValue('id', response.data.id)
                        costTools.refetch();
                      } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                      }
                    }
                  })
                } catch (error) {
                  setStatus("اطلاعات ثبت هزینه نادرست می باشد");
                  setSubmitting(false);
                }
              }
            }>
              {({ handleSubmit }) => {
                return <form onSubmit={handleSubmit} className="mb-4">
                  <div className="md:flex md:justify-start md:items-start gap-x-4 ">
                    <FormikInput name="id" label="کد هزینه " disabled={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikInput name="costDescription" label="هزینه " autoFocus={true} boxClassName=" mt-2 md:mt-0" />
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
                  "costDescription",
                ]}
                data={costTools?.data?.data}
                setResults={setResults}
              />
            </div>
            <MuiDataGrid
              columns={CostsColumn(renderSwitch)}
              rows={results}
              data={costTools?.data?.data}
              onDoubleClick={(item: any) => onUpdateStatus(item)}
            />
          </div>
        </ReusableCard>
        <ReusableCard cardClassName='lg:flex lg:justify-center lg:items-center gap-4 hidden'>
          <div>
            <div className="hidden md:flex md:justify-center md:items-center">
              <div className="flex flex-col flex-wrap gap-4">
                <Typography>از طریق فرم مقابل می توانید تمامی هزینه ها را تعریف کرده و ثبت نمایید</Typography>
                <Typography variant="h3" className="text-red-500">نکته اول: </Typography>
                <Typography>امکان حذف هزینه وجود ندارد اما می توانید اقدام به غیرفعاسازی آن کنید</Typography>
                <Typography variant="h3" className="text-red-500">نکته دوم: </Typography>
                <Typography>جهت دسترسی به ثبت و فعال/غیرفعالسازی هزینه با پشتیبانی تماس بگیرید</Typography>
              </div>
            </div>
          </div>
          <div>
            <div
              className="hidden md:flex md:justify-center md:items-center"
            >
              <img alt="sepehriranian"
                src={toAbsoulteUrl("/media/images/cost.png")}
                width={400}
              />
            </div>

          </div>
        </ReusableCard>
      </div>
    </>
  )
}

export default Costs