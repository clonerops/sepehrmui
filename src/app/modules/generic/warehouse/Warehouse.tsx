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

import { IWarehouse } from "./_models"
import { useGetWarehouses, usePostWarehouses, useUpdateWarehouses } from './_hooks'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import { validateAndEnqueueSnackbar } from '../../order/sales-order/functions'
import Backdrop from '../../../../_cloner/components/Backdrop'
import FormikWarehouseType from '../../../../_cloner/components/FormikWarehouseType'

const initialValues = {
  id: 0,
  name: "",
  warehouseTypeId: null
}

const validation = Yup.object({
  desc: Yup.string().required("فیلد الزامی می باشد")
})

const Warehouse = () => {
  const { data: Warehouses, refetch, isLoading: WarehouseLoading } = useGetWarehouses()
  const { mutate: postWarehouse } = usePostWarehouses()
  const { mutate: updateWarehouse } = useUpdateWarehouses()

  const [results, setResults] = useState<IWarehouse[]>([]);

  useEffect(() => {
    setResults(Warehouses?.data);
  }, [Warehouses?.data]);

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        name: rowData.row.name,
        warehouseTypeId: rowData.row.warehouseTypeId
      }
      updateWarehouse(formData, {
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
        headerName: 'کد انبار', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'desc', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'نام انبار', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      // {
      //   field: "isActive",
      //   headerName: "وضعیت",
      //   renderCell: renderSwitch,
      //   headerClassName: "headerClassName",
      //   minWidth: 160,
      //   flex: 1,
      // },
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


  if (WarehouseLoading) {
    return <Backdrop loading={WarehouseLoading} />;
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
                    name: values.name,
                    warehouseTypeId:  values.warehouseTypeId
                  }
                  postWarehouse(formData, {
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
                  setStatus("اطلاعات ثبت انبار نادرست می باشد");
                  setSubmitting(false);
                }
              }
            }>
              {({ handleSubmit }) => {
                return <Form onSubmit={handleSubmit} className="mb-4">
                  <Box component="div" className="md:flex md:justify-start md:items-start gap-x-4 ">
                    <FormikInput name="id" label="کد انبار " disabled={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikInput name="name" label="نام انبار" autoFocus={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikWarehouseType name="warehouseTypeId" label="نوع انبار" boxClassName=" mt-2 md:mt-0" />
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
                  "name",
                ]}
                data={Warehouses?.data}
                threshold={0.5}
                setResults={setResults}
              />
            </Box>
            <MuiDataGrid
              columns={columns(renderSwitch)}
              rows={results}
              data={Warehouses?.data}
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

export default Warehouse