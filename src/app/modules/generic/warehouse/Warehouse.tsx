import { useState, useEffect, useRef } from 'react'
import { Box, Typography } from "@mui/material"
import { Formik, Form, FormikProps } from "formik"
import { AddCircleOutline } from '@mui/icons-material'
import * as Yup from 'yup'

import FormikInput from "../../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../../_cloner/components/ReusableCard'

import { IWarehouse } from "./_models"
import { useDeleteWarehouses, useGetWarehouses, usePostWarehouses } from './_hooks'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'
import Backdrop from '../../../../_cloner/components/Backdrop'
import FormikWarehouseType from '../../../../_cloner/components/FormikWarehouseType'
import EditGridButton from '../../../../_cloner/components/EditGridButton'
import DeleteGridButton from '../../../../_cloner/components/DeleteGridButton'
import TransitionsModal from '../../../../_cloner/components/ReusableModal'
import EditWarehouse from './EditWarehouse'
import ConfirmDialog from '../../../../_cloner/components/ConfirmDialog'
import { VerticalCharts } from '../../../../_cloner/components/VerticalCharts'
import _ from 'lodash'
import FormikCustomer from '../../../../_cloner/components/FormikCustomer'

const initialValues = {
  id: 0,
  name: "",
  warehouseTypeId: null,
  customerId: ""
}

const Warehouse = () => {
  const { data: Warehouses, refetch, isLoading: WarehouseLoading } = useGetWarehouses()
  const { mutate: postWarehouse, isLoading:postLoading } = usePostWarehouses()
  const { mutate: deleteWarehouse, isLoading: deleteLoading } = useDeleteWarehouses()

  const [results, setResults] = useState<IWarehouse[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemForEdit, setItemForEdit] = useState<IWarehouse | undefined>();
  const [approve, setApprove] = useState<boolean>(false);
  const [deletedId, setDeletedId] = useState<number>(0)

  const formikRef = useRef<FormikProps<any>>(null)

  useEffect(() => {
    setResults(Warehouses?.data);
  }, [Warehouses?.data]);

  const handleDelete = (id: number) => {
    if (id)
      deleteWarehouse(id, {
        onSuccess: (response) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
            setApprove(false)
          } else {
            EnqueueSnackbar(response.data.Message, "error")
          }
          refetch();
        },
      });
  }

  const handleEdit = (item: IWarehouse | undefined) => {
    setIsOpen(true);
    setItemForEdit(item);
  };

  const handleOpenApprove = (id: number) => {
    setApprove(true)
    setDeletedId(id)
  }


  const columns = (renderAction: any) => {
    const col = [
      {
        field: 'id', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'کد انبار', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'name', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'نام انبار', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'warehouseTypeDesc', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'نوع انبار', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'customerName', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value ? params.value : "ثبت نشده"}</Typography>;
        },
        headerName: 'مشتری ثبت شده', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: "Action",
        headerName: "عملیات", flex: 1,
        renderCell: renderAction,
        headerClassName: "headerClassName",
        minWidth: 160,
      },
    ]
    return col
  }

  const renderAction = (item: any) => {
    return (
      <Box component="div" className="flex gap-4">
        <EditGridButton onClick={() => handleEdit(item?.row)} />
        <DeleteGridButton onClick={() => handleOpenApprove(item?.row.id)} />
      </Box>
    );
  };
  let groupedWarehouseTypeDesc = _.groupBy(Warehouses?.data, "warehouseTypeDesc")

  const onSubmit = async (values: any) => {
    try {
      const formData = {
        name: values.name,
        warehouseTypeId: values.warehouseTypeId,
        customerId: values.customerId.value,
      }
      postWarehouse(formData, {
        onSuccess: (response: any) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
            formikRef.current?.setFieldValue('id', response.data.id)
            refetch();
          } else {
            EnqueueSnackbar(response.data.Message, "warning")
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  

  if (WarehouseLoading) {
    return <Backdrop loading={WarehouseLoading} />;
  }

  console.log(Warehouses?.data)

  return (
    <>
    {postLoading || deleteLoading && <Backdrop loading={postLoading || deleteLoading} />}
      <Box className="lg:grid lg:grid-cols-2 lg:gap-4">
        <ReusableCard>
          <Box component="div">
            <Box component="div">
              <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit }) => {
                  return <Form onSubmit={handleSubmit} className="mb-4">
                    <Box
                      component="div"
                      // className="md:flex md:justify-start md:items-start gap-4 space-y-4 lg:space-y-0"
                      className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                    >
                      <FormikInput name="id" label="کد انبار " disabled={true} boxClassName=" mt-2 md:mt-0" />
                      <FormikInput name="name" label="نام انبار" autoFocus={true} boxClassName=" mt-2 md:mt-0" />
                      <FormikWarehouseType name="warehouseTypeId" label="نوع انبار" boxClassName=" mt-2 md:mt-0" />
                      <FormikCustomer name="customerId" label="مشتری" boxClassName=" mt-2 md:mt-0" />
                      <Box component="div" className="mt-2 md:mt-0 flex justify-end items-end lg:col-span-2">
                        <ButtonComponent onClick={() => handleSubmit()}>
                          <Typography className="px-2 text-white">
                            <AddCircleOutline className="text-white" />
                            ایجاد انبار جدید
                          </Typography>
                        </ButtonComponent>
                      </Box>
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
                  setResults={setResults}
                />
              </Box>
              <MuiDataGrid
                columns={columns(renderAction)}
                rows={results}
                data={Warehouses?.data}
                getRowId={(row: {id: number}) => row.id}
              />
            </Box>
          </Box>
        </ReusableCard >
        <Box className="lg:grid lg:grid-cols-2 lg:gap-4 hidden">
          <ReusableCard>
            <Box className="flex flex-col flex-wrap gap-4">
              <Typography variant="h3" className="text-yellow-500">راهنما</Typography>
              <Typography>انبارهای تعریف شده، شامل نوع های مختلفی هستند اعم از (امانی، مبادی و ...)</Typography>
              <Typography>از طریق فرم مقابل می توانید اقدام به تعریف انبار کنید، ابتدا نام انبار و سپس نوع انبار را مشخص کنید</Typography>
            </Box>
          </ReusableCard>
          <ReusableCard>
            <Box component="img"
              src={toAbsoulteUrl("/media/logos/iron.png")}
              width={400}
              className='rounded-md'
            />
          </ReusableCard>
          <ReusableCard cardClassName='col-span-2'>
            <></>
            <VerticalCharts
              text='تعداد انبارها برحسب نوع آنها'
              categories={Object.keys(groupedWarehouseTypeDesc) || [{}]}
              data={Object.values(groupedWarehouseTypeDesc).map((item: any) => item.length)}
            />
          </ReusableCard>
        </Box>
      </Box >
      <TransitionsModal
        open={isOpen}
        isClose={() => setIsOpen(false)}
        width="30%"
        title="ویرایش انبار"
      >
        <EditWarehouse id={itemForEdit?.id} refetch={refetch} setIsClose={setIsOpen} />
      </TransitionsModal>
      <ConfirmDialog
        open={approve}
        hintTitle="آیا از حذف مطمئن هستید؟"
        notConfirmText="لغو"
        confirmText={deleteLoading ? "درحال پردازش ..." : "تایید"}
        onCancel={() => setApprove(false)}
        onConfirm={() => handleDelete(deletedId)}

      />

    </>
  )
}

export default Warehouse