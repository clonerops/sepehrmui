import { useState, useEffect } from 'react'
import { Box, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import { AddCircleOutline } from '@mui/icons-material'
import * as Yup from 'yup'

import FormikInput from "../../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import SwitchComponent from '../../../../_cloner/components/Switch'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../../_cloner/components/ReusableCard'

import { IStandard } from "./_models"
import { useGetStandards, usePostStandards, useUpdateStandards } from './_hooks'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import { validateAndEnqueueSnackbar } from '../../order/sales-order/functions'

const initialValues = {
  id: 0,
  desc: ""
}

const validation = Yup.object({
  desc: Yup.string().required("فیلد الزامی می باشد")
})

const ProductStandards = () => {
  const { data: standards, refetch, isLoading: StandardLoading } = useGetStandards()
  const { mutate: postStandard } = usePostStandards()
  const { mutate: updateStandard } = useUpdateStandards()

  const [results, setResults] = useState<IStandard[]>([]);

  useEffect(() => {
    setResults(standards?.data);
  }, [standards?.data]);

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        desc: rowData.row.desc,
        isActive: !rowData.row.isActive
      }
      updateStandard(formData, {
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
        headerName: 'کد استاندارد', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'desc', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'استاندارد', headerClassName: "headerClassName", minWidth: 120,
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


  if (StandardLoading) {
    return <p>Loading...</p>;
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
                    desc: values.desc
                  }
                  postStandard(formData, {
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
                  setStatus("اطلاعات ثبت استاندارد نادرست می باشد");
                  setSubmitting(false);
                }
              }
            }>
              {({ handleSubmit }) => {
                return <Form onSubmit={handleSubmit} className="mb-4">
                  <Box component="div" className="md:flex md:justify-start md:items-start gap-x-4 ">
                    <FormikInput name="id" label="کد استاندارد " disabled={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikInput name="desc" label="استاندارد " autoFocus={true} boxClassName=" mt-2 md:mt-0" />
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
                data={standards?.data}
                threshold={0.5}
                setResults={setResults}
              />
            </Box>
            <MuiDataGrid
              columns={columns(renderSwitch)}
              rows={results}
              data={standards?.data}
            />
          </Box>
          <Box component="div">
            <Box
              component="div"
              className="hidden md:flex md:justify-center md:items-center"
            >
              <Box component="img"
                src={toAbsoulteUrl("/media/logos/11089.jpg")}
                width={400}
              />
            </Box>

          </Box>
        </Box>
      </ReusableCard>
    </>
  )
}

export default ProductStandards