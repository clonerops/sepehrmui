import { useState, useEffect } from 'react'
import { Box, Typography } from "@mui/material"
import { Formik, Form } from "formik"
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

const initialValues = {
  id: 0,
  name: "",
  warehouseTypeId: null
}

const validation = Yup.object({
  name: Yup.string().required("فیلد الزامی می باشد"),
  warehouseTypeId: Yup.mixed().required("فیلد الزامی می باشد")
})

const Warehouse = () => {
  const { data: Warehouses, refetch, isLoading: WarehouseLoading } = useGetWarehouses()
  const { mutate: postWarehouse } = usePostWarehouses()
  const { mutate: deleteWarehouse, isLoading: deleteLoading } = useDeleteWarehouses()

  const [results, setResults] = useState<IWarehouse[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemForEdit, setItemForEdit] = useState<IWarehouse | undefined>();
  const [approve, setApprove] = useState<boolean>(false);
  const [deletedId, setDeletedId] = useState<number>(0)

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
                        EnqueueSnackbar(response.message, "success")
                        setFieldValue('id', response.data.id)
                        refetch();
                      } else {
                        EnqueueSnackbar(response.data.Message, "warning")
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
              columns={columns(renderAction)}
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
                src={toAbsoulteUrl("/media/logos/9085059.jpg")}
                width={400}
              />
            </Box>

          </Box>
        </Box>
      </ReusableCard>
      <TransitionsModal
        open={isOpen}
        isClose={() => setIsOpen(false)}
        width="30%"
        title="ویرایش نوع کالا"
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