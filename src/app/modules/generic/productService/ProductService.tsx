import { useState, useEffect } from 'react'
import { Typography } from "@mui/material"
import { Formik } from "formik"
import { AddCircleOutline, AddTask, AdfScanner, DesignServices, TextDecrease } from '@mui/icons-material'
import * as Yup from 'yup'

import FormikInput from "../../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import SwitchComponent from '../../../../_cloner/components/Switch'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../../_cloner/components/ReusableCard'
import FuzzySearch from "../../../../_cloner/helpers/Fuse"

import { IService } from "./_models"
import { useGetServices, usePostServices, useUpdateServices } from './_hooks'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'
import Backdrop from '../../../../_cloner/components/Backdrop'
import CardWithIcons from '../../../../_cloner/components/CardWithIcons'
import _ from 'lodash'

const initialValues = {
  id: 0,
  desc: ""
}

const validation = Yup.object({
  desc: Yup.string().required("فیلد الزامی می باشد")
})

const ProductService = () => {
  const { data: Services, refetch, isLoading: ServiceLoading } = useGetServices()
  const { mutate: postService, isLoading: postLoading } = usePostServices()
  const { mutate: updateService, isLoading: updateLoading } = useUpdateServices()

  const [results, setResults] = useState<IService[]>([]);

  useEffect(() => {
    setResults(Services?.data);
     // eslint-disable-next-line
  }, [Services?.data]);


  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        description: rowData.row.description,
        isActive: !rowData.row.isActive
      }
      updateService(formData, {
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
        headerName: 'کد خدمت', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'description', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'نوع خدمت', headerClassName: "headerClassName", minWidth: 120,
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


  if (ServiceLoading) {
    return <Backdrop loading={ServiceLoading} />;
  }

  return (
    <>
      {postLoading && <Backdrop loading={postLoading} />}
      {updateLoading && <Backdrop loading={updateLoading} />}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
        <ReusableCard cardClassName='order-2 lg:order-1'>
          <div>
            <Formik initialValues={initialValues} validationSchema={validation} onSubmit={
              async (values, { setStatus, setSubmitting, setFieldValue }) => {
                try {
                  const formData = {
                    description: values.desc
                  }
                  postService(formData, {
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
                  setStatus("اطلاعات ثبت خدمت جدید نادرست می باشد");
                  setSubmitting(false);
                }
              }
            }>
              {({ handleSubmit }) => {
                return <form onSubmit={handleSubmit} className="mb-4">
                  <div className="md:flex md:justify-start md:items-start gap-x-4 ">
                    <FormikInput name="id" label="کد خدمت " disabled={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikInput name="desc" label="نوع خدمت " autoFocus={true} boxClassName=" mt-2 md:mt-0" />
                    <ButtonComponent onClick={() => handleSubmit()}>
                      <Typography className="px-2">
                        <AddCircleOutline className='text-white' />
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
                data={Services?.data}
                threshold={0.5}
                setResults={setResults}
              />
            </div>
            <MuiDataGrid
              columns={columns(renderSwitch)}
              rows={results}
              data={Services?.data}
              onDoubleClick={(item: any) => onUpdateStatus(item)}
            />
          </div>
        </ReusableCard>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:h-[240px] order-1 lg:order-2">
          <CardWithIcons
            title='تعداد سرویس های ثبت شده'
            icon={<DesignServices className="text-white" />}
            value={Services?.data?.length}
            iconClassName='bg-[#3322D8]' />
          <CardWithIcons
            title='تعداد سرویس ها در وضعیت فعال'
            icon={<AddTask className="text-white" />}
            value={_.filter(Services?.data, 'isActive').length}
            iconClassName='bg-[#369BFD]' />
          <CardWithIcons
            title='تعداد سرویس ها در وضعیت غیرفعال'
            icon={<TextDecrease className="text-white" />}
            value={_.filter(Services?.data, (item) => !item.isActive).length}
            iconClassName='bg-[#F8B30E]' />
          <CardWithIcons
            title='تعداد سرویس های ثبت امروز'
            icon={<AdfScanner className="text-white" />}
            value={0}
            iconClassName='bg-[#EB5553]' />
        </div>
      </div>
    </>
  )
}

export default ProductService