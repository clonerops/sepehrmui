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

import { ILabel } from "./_models"
import { useGetLabels, usePostLabels, useUpdateLabels } from './_hooks'
import { toAbsoulteUrl } from '../../../_cloner/helpers/assetsHelper'
import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar'

const initialValues = {
  id: 0,
  desc: ""
}

const validation = Yup.object({
  desc: Yup.string().required("فیلد الزامی می باشد")
})

const CustomerLabels = () => {
  const { data: Labels, refetch, isLoading: LabelLoading } = useGetLabels()
  const { mutate: postLabel, isLoading: postLoading } = usePostLabels()
  const { mutate: updateLabel, isLoading: updateLoading } = useUpdateLabels()

  const [results, setResults] = useState<ILabel[]>([]);

  useEffect(() => {
    setResults(Labels?.data);
     // eslint-disable-next-line
  }, [Labels?.data]);

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        desc: rowData.row.desc,
        isActive: !rowData.row.isActive
      }
      updateLabel(formData, {
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
        headerName: 'کد برچسب', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'desc', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'برچسب', headerClassName: "headerClassName", minWidth: 120,
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


  if (LabelLoading) {
    return <Backdrop loading={LabelLoading} />;
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
                    desc: values.desc
                  }
                  postLabel(formData, {
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
                  setStatus("اطلاعات ثبت برچسب نادرست می باشد");
                  setSubmitting(false);
                }
              }
            }>
              {({ handleSubmit }) => {
                return <form onSubmit={handleSubmit} className="mb-4">
                  <div className="md:flex md:justify-start md:items-start gap-x-4 ">
                    <FormikInput name="id" label="کد برچسب " disabled={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikInput name="desc" label="برچسب " autoFocus={true} boxClassName=" mt-2 md:mt-0" />
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
                data={Labels?.data}
                threshold={0.5}
                setResults={setResults}
              />
            </div>
            <MuiDataGrid
              columns={columns(renderSwitch)}
              rows={results}
              data={Labels?.data}
              onDoubleClick={(item: any) => onUpdateStatus(item)}
              getRowId={(item: { id: number }) => item.id}
            />
          </div>
        </ReusableCard>
        <ReusableCard cardClassName='lg:flex gap-4 hidden'>
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

export default CustomerLabels