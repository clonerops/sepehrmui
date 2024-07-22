import { useState, useEffect } from 'react'
import { Typography } from "@mui/material"
import { Formik } from "formik"
import { AddCircleOutline, AddTask, AdfScanner, DesignServices, TextDecrease } from '@mui/icons-material'
import * as Yup from 'yup'

import FormikInput from "../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../_cloner/helpers/Fuse"
import SwitchComponent from '../../../_cloner/components/Switch'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../_cloner/components/ReusableCard'

import { IState } from "./_models"
import { useGetStates, usePostState, useUpdateState } from './_hooks'
import { EnqueueSnackbar } from '../../../_cloner/helpers/Snackebar'
import { toAbsoulteUrl } from '../../../_cloner/helpers/AssetsHelper'
import Backdrop from '../../../_cloner/components/Backdrop'
import CardWithIcons from '../../../_cloner/components/CardWithIcons'
import _ from 'lodash'

const initialValues = {
  id: 0,
  desc: ""
}

const validation = Yup.object({
  desc: Yup.string().required("فیلد الزامی می باشد")
})


const ProductState = () => {
  const stateTools = useGetStates()
  const postStateTools = usePostState()
  const updateStateTools = useUpdateState()

  const [results, setResults] = useState<IState[]>([]);

  useEffect(() => {
    setResults(stateTools?.data?.data);
     // eslint-disable-next-line
  }, [stateTools?.data?.data]);



  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        name: rowData.row.desc,
        isActive: !rowData.row.isActive
      }
      updateStateTools.mutate(formData, {
        onSuccess: (response) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
          } else {
            EnqueueSnackbar(response.data.Message, "error")
          }
          stateTools.refetch()
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
        headerName: 'کد حالت', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'desc', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'حالت', headerClassName: "headerClassName", minWidth: 160,
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
      {stateTools.isLoading && <Backdrop loading={stateTools.isLoading} />}
      {postStateTools.isLoading && <Backdrop loading={postStateTools.isLoading} />}
      {updateStateTools.isLoading && <Backdrop loading={updateStateTools.isLoading} />}

      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <CardWithIcons
          title='تعداد حالت های ثبت شده'
          icon={<DesignServices className="text-white" />}
          value={stateTools?.data?.data?.length}
          iconClassName='bg-[#3322D8]' />
        <CardWithIcons
          title='تعداد حالت ها در وضعیت فعال'
          icon={<AddTask className="text-white" />}
          value={_.filter(stateTools?.data?.data, 'isActive').length}
          iconClassName='bg-[#369BFD]' />
        <CardWithIcons
          title='تعداد حالت ها در وضعیت غیرفعال'
          icon={<TextDecrease className="text-white" />}
          value={_.filter(stateTools?.data?.data, (item) => !item.isActive).length}
          iconClassName='bg-[#F8B30E]' />
        <CardWithIcons
          title='تعداد حالت های ثبت امروز'
          icon={<AdfScanner className="text-white" />}
          value={0}
          iconClassName='bg-[#EB5553]' />
      </div>

      <ReusableCard>
        <div className="md:grid md:grid-cols-2 md:gap-x-4">
          <div>
            <Formik initialValues={initialValues} validationSchema={validation} onSubmit={
              async (values, { setStatus, setSubmitting, setFieldValue }) => {
                try {
                  const formData = {
                    desc: values.desc
                  }
                  postStateTools.mutate(formData, {
                    onSuccess: (response: any) => {
                      if (response.succeeded) {
                        EnqueueSnackbar(response.message, "success")
                        setFieldValue('id', response.data.id)
                        stateTools.refetch();
                      } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                      }
                    }
                  })
                } catch (error) {
                  setStatus("اطلاعات ثبت حالت نادرست می باشد");
                  setSubmitting(false);
                }
              }
            }>
              {({ handleSubmit }) => {
                return <form onSubmit={handleSubmit} className='mb-4'>
                  <div className="md:flex md:justify-start md:items-start gap-x-4 ">
                    <FormikInput name="id" label="کد حالت " disabled={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikInput name="desc" label="حالت " autoFocus={true} boxClassName=" mt-2 md:mt-0" />
                    <div className="mt-2 md:mt-0">
                      <ButtonComponent>
                        <Typography className="px-2">
                          <AddCircleOutline />
                        </Typography>
                      </ButtonComponent>
                    </div>
                  </div>
                </form>
              }}
            </Formik>
            <div className='mb-4'>
              <FuzzySearch
                keys={[
                  "id",
                  "desc",
                ]}
                data={stateTools?.data?.data}
                threshold={0.5}
                setResults={setResults}
              />
            </div>
            <MuiDataGrid
              columns={columns(renderSwitch)}
              rows={results}
              data={stateTools?.data?.data}
              onDoubleClick={(item: any) => onUpdateStatus(item)}
            />
          </div>
          <div>
            <div className="hidden md:flex md:justify-center md:items-center" >
              <img alt="sepehriranian"
                src={toAbsoulteUrl("/media/logos/6137729.jpg")}
                width={400}
              />
            </div>
          </div>
        </div>
      </ReusableCard>
    </>
  )
}

export default ProductState