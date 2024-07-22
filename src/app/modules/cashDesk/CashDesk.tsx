import { useState, useEffect } from 'react'
import { Typography } from "@mui/material"
import { Formik } from "formik"
import { AddCircleOutline } from '@mui/icons-material'
import * as Yup from 'yup'

import FormikInput from "../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../_cloner/helpers/Fuse"
import SwitchComponent from '../../../_cloner/components/Switch'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../_cloner/components/ReusableCard'

import { ICashDesk } from "./_models"
import { useGetCashDesks, usePostCashDesks, useUpdateCashDesks } from './_hooks'
import { toAbsoulteUrl } from '../../../_cloner/helpers/AssetsHelper'
import { EnqueueSnackbar } from '../../../_cloner/helpers/Snackebar'
import Backdrop from '../../../_cloner/components/Backdrop'

const initialValues = {
  id: 0,
  cashDeskDescription: ""
}

const validation = Yup.object({
  cashDeskDescription: Yup.string().required("فیلد الزامی می باشد")
})

const CashDesks = () => {
  const cashDeskTools = useGetCashDesks()
  const postCashDeskTools = usePostCashDesks()
  const updateCashDeskTools = useUpdateCashDesks()

  const [results, setResults] = useState<ICashDesk[]>([]);

  useEffect(() => {
    setResults(cashDeskTools?.data?.data);
  }, [cashDeskTools?.data?.data]);

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        cashDeskDescription: rowData.row.cashDeskDescription,
        isActive: !rowData.row.isActive
      }
      updateCashDeskTools.mutate(formData, {
        onSuccess: (response) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
          } else {
            EnqueueSnackbar(response.data.Message, "error")
          }
          cashDeskTools.refetch()
        }
      })
    } catch (e) {
      return e;
    }
  };

  const columns = (renderSwitch: any) => {
    const col = [
      {
        field: 'id', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'کد صندوق', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'cashDeskDescription', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'صندوق', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: "isActive",
        headerName: "وضعیت",
        renderCell: renderSwitch,
        headerClassName: "headerClassName",
        minWidth: 160,
        flex: 1,
      },
    ]
    return col
  }


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
      {cashDeskTools.isLoading && <Backdrop loading={cashDeskTools.isLoading} />}
      {postCashDeskTools.isLoading && <Backdrop loading={postCashDeskTools.isLoading} />}
      {updateCashDeskTools.isLoading && <Backdrop loading={updateCashDeskTools.isLoading} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ReusableCard>
          <div>

            <Formik initialValues={initialValues} validationSchema={validation} onSubmit={
              async (values, { setStatus, setSubmitting, setFieldValue }) => {
                try {
                  const formData = {
                    cashDeskDescription: values.cashDeskDescription
                  }
                  postCashDeskTools.mutate(formData, {
                    onSuccess: (response: any) => {
                      if (response.succeeded) {
                        EnqueueSnackbar(response.message, "success")
                        setFieldValue('id', response.data.id)
                        cashDeskTools.refetch();
                      } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                      }
                    }
                  })
                } catch (error) {
                  setStatus("اطلاعات ثبت صندوق نادرست می باشد");
                  setSubmitting(false);
                }
              }
            }>
              {({ handleSubmit }) => {
                return <form onSubmit={handleSubmit} className="mb-4">
                  <div className="md:flex md:justify-start md:items-start gap-x-4 ">
                    <FormikInput name="id" label="کد صندوق " disabled={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikInput name="cashDeskDescription" label="صندوق " autoFocus={true} boxClassName=" mt-2 md:mt-0" />
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
                  "cashDeskDescription",
                ]}
                data={cashDeskTools?.data?.data}
                setResults={setResults}
              />
            </div>
            <MuiDataGrid
              columns={columns(renderSwitch)}
              rows={results}
              data={cashDeskTools?.data?.data}
              onDoubleClick={(item: any) => onUpdateStatus(item)}
            />
          </div>
        </ReusableCard>
        <ReusableCard cardClassName='lg:flex gap-4 hidden'>
          <div>
            <div className="hidden md:flex md:justify-center md:items-center">
              <div className="flex flex-col flex-wrap gap-4">
                <Typography variant="h3" className="text-yellow-500">راهنما</Typography>
                <Typography>هر صندوقی که تعریف می شود صندوق مخصوص به خود را دارا می باشد</Typography>
                <Typography>از طریق فرم مقابل می توانید تمامی صندوق ها را تعریف کرده و ثبت نمایید</Typography>
                <Typography variant="h3" className="text-red-500">نکته اول: </Typography>
                <Typography>امکان حذف صندوق وجود ندارد اما می توانید اقدام به غیرفعاسازی صندوق کنید</Typography>
                <Typography variant="h3" className="text-red-500">نکته دوم: </Typography>
                <Typography>جهت دسترسی به ثبت و فعال/غیرفعالسازی صندوق با پشتیبانی تماس بگیرید</Typography>
              </div>
            </div>
          </div>
          <div>
            <div className="hidden md:flex md:justify-center md:items-center">
              <img alt="sepehriranian"
                src={toAbsoulteUrl("/media/logos/iron.png")}
                width={400}
                className='rounded-lg'
              />
            </div>

          </div>
        </ReusableCard>
      </div>
    </>
  )
}

export default CashDesks