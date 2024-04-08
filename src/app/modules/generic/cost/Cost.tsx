import { useState, useEffect } from 'react'
import { Typography } from "@mui/material"
import { Formik } from "formik"
import { AddCircleOutline } from '@mui/icons-material'
import * as Yup from 'yup'

import FormikInput from "../../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import SwitchComponent from '../../../../_cloner/components/Switch'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../../_cloner/components/ReusableCard'

import { ICost } from "./_models"
import { useGetCosts, usePostCosts, useUpdateCosts } from './_hooks'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'
import Backdrop from '../../../../_cloner/components/Backdrop'

const initialValues = {
  id: 0,
  costDescription: ""
}

const validation = Yup.object({
  costDescription: Yup.string().required("فیلد الزامی می باشد")
})

const Costs = () => {
  const { data: Costs, refetch, isLoading: CostLoading } = useGetCosts()
  const { mutate: postCost, isLoading: postLoading } = usePostCosts()
  const { mutate: updateCost, isLoading: updateLoading } = useUpdateCosts()

  const [results, setResults] = useState<ICost[]>([]);

  useEffect(() => {
    setResults(Costs?.data);
  }, [Costs?.data]);

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        costDescription: rowData.row.costDescription,
        isActive: !rowData.row.isActive
      }
      updateCost(formData, {
        onSuccess: (response) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
          } else {
            EnqueueSnackbar(response.data.Message, "error")
          }
          refetch()
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
        headerName: 'کد هزینه', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'costDescription', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'هزینه', headerClassName: "headerClassName", minWidth: 120,
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


  if (CostLoading) {
    return <Backdrop loading={CostLoading} />;
  }

  return (
    <>
      {updateLoading && <Backdrop loading={updateLoading} />}
      {postLoading && <Backdrop loading={postLoading} />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ReusableCard>
          <div>

            <Formik initialValues={initialValues} validationSchema={validation} onSubmit={
              async (values, { setStatus, setSubmitting, setFieldValue }) => {
                try {
                  const formData = {
                    costDescription: values.costDescription
                  }
                  postCost(formData, {
                    onSuccess: (response: any) => {
                      if (response.succeeded) {
                        EnqueueSnackbar(response.message, "success")
                        setFieldValue('id', response.data.id)
                        refetch();
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
                    <ButtonComponent onClick={() => handleSubmit()}>
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
                data={Costs?.data}
                setResults={setResults}
              />
            </div>
            <MuiDataGrid
              columns={columns(renderSwitch)}
              rows={results}
              data={Costs?.data}
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
              <img
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