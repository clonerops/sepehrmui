import { useState, useEffect } from 'react'
import { Box, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import { AddCircleOutline } from '@mui/icons-material'
import * as Yup from 'yup'

import { IType } from "./_models"
import { useDeleteTypes, useGetTypes, usePostTypes, useUpdateTypes } from './_hooks'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import { validateAndEnqueueSnackbar } from '../../order/sales-order/functions'

import FormikInput from "../../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import DeleteGridButton from '../../../../_cloner/components/DeleteGridButton'
import SwitchComponent from '../../../../_cloner/components/Switch'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../../_cloner/components/ReusableCard'
import EditGridButton from '../../../../_cloner/components/EditGridButton'
import TransitionsModal from '../../../../_cloner/components/ReusableModal'
import EditProductTypes from './EditProductType'
import Backdrop from '../../../../_cloner/components/Backdrop'

const initialValues = {
  id: 0,
  desc: ""
}

const validation = Yup.object({
  desc: Yup.string().required("فیلد الزامی می باشد")
})

const ProductTypes = () => {
  const { data: types, refetch, isLoading: TypeLoading } = useGetTypes()
  const { mutate: postType } = usePostTypes()
  const { mutate: updateType } = useUpdateTypes()
  const { mutate: deleteType } = useDeleteTypes()

  const [results, setResults] = useState<IType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemForEdit, setItemForEdit] = useState<IType | undefined>();

  useEffect(() => {
    setResults(types?.data);
  }, [types?.data]);


  const handleDelete = (id: number) => {
    if (id)
      deleteType(id, {
        onSuccess: (response) => {
          if (response.succeeded) {
            validateAndEnqueueSnackbar(response.message, "success")
          } else {
            validateAndEnqueueSnackbar(response.data.Message, "error")
          }
          refetch();
        },
      });
  }

  const handleEdit = (item: IType | undefined) => {
    setIsOpen(true);
    setItemForEdit(item);
  };

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        desc: rowData.row.desc,
        isActive: !rowData.row.isActive
      }
      updateType(formData, {
        onSuccess: (response) => {
          if (response.succeeded) {
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

  const columns = (renderAction: any, renderSwitch: any) => {
    const col = [
      {
        field: 'id',
        renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'کد نوع کالا', flex: 1, headerClassName: "headerClassName", minWidth: 120
      },
      {
        field: 'desc',
        renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'نوع کالا', flex: 1, headerClassName: "headerClassName", minWidth: 160
      },
      {
        field: "isActive",
        headerName: "وضعیت", flex: 1,
        renderCell: renderSwitch,
        headerClassName: "headerClassName",
        minWidth: 160,
      },
      {
        field: "Delete",
        headerName: "حذف", flex: 1,
        renderCell: renderAction,
        headerClassName: "headerClassName",
        minWidth: 160,
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

  const renderAction = (item: any) => {
    return (
      <Box component="div" className="flex gap-4">
        <EditGridButton onClick={() => handleEdit(item?.row)} />
        <DeleteGridButton onClick={() => handleDelete(item?.row.id)} />
      </Box>
    );
  };

  if (TypeLoading) {
    return <Backdrop loading={TypeLoading} />;
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
                  postType(formData, {
                    onSuccess: (response) => {
                      if (response.succeeded) {
                        validateAndEnqueueSnackbar(response.message, "success")
                        setFieldValue('id', response.data.id)
                        refetch();
                      } else {
                        validateAndEnqueueSnackbar(response.data.Message, "warning")
                      }
                    }
                  })
                } catch (error) {
                  setStatus("اطلاعات ثبت نوع کالا نادرست می باشد");
                  setSubmitting(false);
                }
              }
            }>
              {({ handleSubmit }) => {
                return <Form onSubmit={handleSubmit} className='mb-4'>
                  <Box component="div" className="md:flex md:justify-start md:items-start gap-x-4 ">
                    <FormikInput name="id" label="کد نوع کالا " disabled={true} boxClassName=" mt-2 md:mt-0" />
                    <FormikInput name="desc" label="نوع کالا " autoFocus={true} boxClassName=" mt-2 md:mt-0" />
                    <Box component="div" className="mt-2 md:mt-0">
                      <ButtonComponent onClick={() => handleSubmit()}>
                        <Typography className="px-2">
                          <AddCircleOutline />
                        </Typography>
                      </ButtonComponent>
                    </Box>
                  </Box>
                </Form>
              }}
            </Formik>
            <Box component="div" className='mb-4'>
              <FuzzySearch
                keys={[
                  "id",
                  "desc",
                ]}
                data={types?.data}
                threshold={0.5}
                setResults={setResults}
              />
            </Box>
            <MuiDataGrid
              columns={columns(renderAction, renderSwitch)}
              rows={results}
              data={types?.data}
            />
          </Box>
          <Box component="div">
            <Box
              component="div"
              className="hidden md:flex md:justify-center md:items-center"
            >
              <Box component="img"
                src={toAbsoulteUrl("/media/logos/6075528.jpg")}
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
        <EditProductTypes id={itemForEdit?.id} />
      </TransitionsModal>
    </>
  )
}

export default ProductTypes