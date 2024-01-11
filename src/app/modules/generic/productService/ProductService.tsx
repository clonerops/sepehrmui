import { useState, useEffect } from 'react'
import { Box, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import { AddCircleOutline } from '@mui/icons-material'
import * as Yup from 'yup'

import FormikInput from "../../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import SwitchComponent from '../../../../_cloner/components/Switch'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../../_cloner/components/ReusableCard'
import FuzzySearch from "../../../../_cloner/helpers/Fuse"

import { IService } from "./_models"
import { useGetServices, usePostServices, useUpdateServices } from './_hooks'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import { validateAndEnqueueSnackbar } from '../../order/sales-order/functions'
import Backdrop from '../../../../_cloner/components/Backdrop'

const initialValues = {
  id: 0,
  desc: ""
}

const validation = Yup.object({
  desc: Yup.string().required("فیلد الزامی می باشد")
})

const ProductService = () => {
  const { data: Services, refetch, isLoading: ServiceLoading } = useGetServices()
  const { mutate: postService } = usePostServices()
  const { mutate: updateService } = useUpdateServices()

  const [results, setResults] = useState<IService[]>([]);

  useEffect(() => {
    setResults(Services?.data);
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
          if(response.succeeded) {
            validateAndEnqueueSnackbar(response.message, "success")
          } else {
            validateAndEnqueueSnackbar(response.data.Message, "error")
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
      <ReusableCard>
        <Box component="div" className="md:grid md:grid-cols-2 md:gap-x-4">
          <Box component="div">
            <Formik initialValues={initialValues} validationSchema={validation} onSubmit={
              async (values, { setStatus, setSubmitting, setFieldValue }) => {
                try {
                  const formData = {
                    description: values.desc
                  }
                  postService(formData, {
                    onSuccess: (response: any) => {
                      if(response.succeeded) {
                        validateAndEnqueueSnackbar(response.message, "success")
                        setFieldValue('id', response.data.id)
                        refetch();
                      } else {
                        validateAndEnqueueSnackbar(response.data.Message, "warning")
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
                return <Form onSubmit={handleSubmit} className="mb-4">
                  <Box component="div" className="md:flex md:justify-start md:items-start gap-x-4 ">
                    <FormikInput name="id" label="کد خدمت " disabled={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikInput name="desc" label="نوع خدمت " autoFocus={true} boxClassName=" mt-2 md:mt-0" />
                    <ButtonComponent onClick={() => handleSubmit()}>
                      <Typography className="px-2">
                        <AddCircleOutline />
                      </Typography>
                    </ButtonComponent>
                  </Box>
                </Form>
              }}
            </Formik>
            <Box component="div" className="mb-4">
              <FuzzySearch
                keys={[
                  "id",
                  "desc",
                ]}
                data={Services?.data}
                threshold={0.5}
                setResults={setResults}
              />
            </Box>
            <MuiDataGrid
              columns={columns(renderSwitch)}
              rows={results}
              data={Services?.data}
            />
          </Box>
          <Box component="div">
            <Box
              component="div"
              className="hidden md:flex md:justify-center md:items-center"
            >
              <Box component="img"
                src={toAbsoulteUrl("/media/logos/7758834.jpg")}
                width={400}
              />
            </Box>

          </Box>
        </Box>
      </ReusableCard>
    </>
  )
}

export default ProductService