import { useState, useEffect } from 'react'
import { Box, Button, Card, Switch, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import { IType } from "./_models"
import { useDeleteTypes, useGetTypes, usePostTypes, useUpdateTypes } from './_hooks'
import DeleteGridButton from '../../../../_cloner/components/DeleteGridButton'
import { columns } from './_columns'
import PositionedSnackbar from '../../../../_cloner/components/Snackbar'
import * as Yup from 'yup'
import { AddCircleOutline } from '@mui/icons-material'

const initialValues = {
  id: 0,
  desc: ""
}

const validation = Yup.object({
  desc: Yup.string().required("فیلد الزامی می باشد")
})

const ProductTypes = () => {
  const { data: types, refetch, isLoading: TypeLoading } = useGetTypes()
  const { mutate: postType, data: postData } = usePostTypes()
  const { mutate: updateType, data: updateData } = useUpdateTypes()
  const { mutate: deleteType, data: deleteData } = useDeleteTypes()

  const [results, setResults] = useState<IType[]>([]);
  const [snackePostOpen, setSnackePostOpen] = useState<boolean>(false);
  const [snackeUpdateOpen, setSnackeUpdateOpen] = useState<boolean>(false);
  const [snackeDeleteOpen, setSnackeDeleteOpen] = useState<boolean>(false);

  useEffect(() => {
    setResults(types?.data);
  }, [types?.data]);


  const handleDelete = (id: number) => {
    if (id)
      deleteType(id, {
        onSuccess: (message) => {
          setSnackeDeleteOpen(true);
          refetch();
        },
      });
  }

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        desc: rowData.row.desc,
        isActive: !rowData.row.isActive
      }
      updateType(formData, {
        onSuccess: () => {
          setSnackeUpdateOpen(true)
          refetch()
        }
      })
    } catch (e) {
      setSnackeUpdateOpen(true);
      return e;
    }
  };

  const renderAction = (item: any) => {
    return (
      <Box component="div" className="flex gap-4">
        <Switch checked={item?.row.isActive} onChange={(_) => onUpdateStatus(item)} />
        <DeleteGridButton onClick={() => handleDelete(item?.row.id)} />
      </Box>
    );
  };

  if (TypeLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {snackePostOpen && ( <PositionedSnackbar open={snackePostOpen} setState={setSnackePostOpen} title={postData?.data?.Message ||postData?.message } /> )}
      {snackeUpdateOpen && ( <PositionedSnackbar open={snackeUpdateOpen} setState={setSnackeUpdateOpen} title={ updateData?.data?.Message || updateData?.message } /> )}
      {snackeDeleteOpen && ( <PositionedSnackbar open={snackeDeleteOpen} setState={setSnackeDeleteOpen} title={ deleteData?.data?.Message || deleteData?.message } /> )}
      <Card className="p-4">
        {/* <Typography color="secondary" variant="h1" className="pb-2 !text-sm md:!text-2xl">نوع کالا ها</Typography> */}
        <Formik initialValues={initialValues} validationSchema={validation} onSubmit={
          async (values, { setStatus, setSubmitting, setFieldValue }) => {
            try {
              const formData = {
                desc: values.desc
              }
              postType(formData, {
                onSuccess: (message: any) => {
                  setFieldValue('id', message.data.id)
                  refetch();
                  setSnackePostOpen(true)
                }
              })
            } catch (error) {
              setStatus("اطلاعات ثبت نوع کالا نادرست می باشد");
              setSubmitting(false);
            }
          }
        }>
          {({ handleSubmit }) => {
            return <Form onSubmit={handleSubmit} className="flex flex-col justify-start items-start mb-8">
              <Box component="div" className="md:flex md:justify-start md:items-start gap-x-4 md:w-[50%]">
                <FormikInput name="id" label="کد نوع کالا " disabled={true} boxClassName="md:w-[50%] mt-2 md:mt-0" />
                <FormikInput name="desc" label="نوع کالا " boxClassName="md:w-[50%] mt-2 md:mt-0" />
                <Button onClick={() => handleSubmit()} variant="contained" color="secondary" className='mt-2 md:mt-0'>
                  <Typography className="px-2">
                    <AddCircleOutline />
                  </Typography>
                </Button>
              </Box>
            </Form>
          }}
        </Formik>
        <Box component="div" className="w-auto md:w-[40%]">
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
          columns={columns(renderAction)}
          rows={results}
          data={types?.data}
        />
      </Card>
    </>
  )
}

export default ProductTypes