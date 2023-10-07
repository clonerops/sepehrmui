import { useState, useEffect } from 'react'
import { Box, Button, Card, Switch, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import { IBrand } from "./_models"
import { useDeleteBrands, useGetBrands, usePostBrands, useUpdateBrands } from './_hooks'
import DeleteGridButton from '../../../../_cloner/components/DeleteGridButton'
import { columns } from './_columns'
import PositionedSnackbar from '../../../../_cloner/components/Snackbar'

const initialValues = {
  id: 0,
  name: ""
}

const Brands = () => {
  const { data: brands, refetch, isLoading: brandLoading } = useGetBrands()
  const { mutate: postBrand, data: postData } = usePostBrands()
  const { mutate: updateBrand, data: updateData } = useUpdateBrands()
  const { mutate: deleteBrand, data: deleteData } = useDeleteBrands()

  const [results, setResults] = useState<IBrand[]>([]);
  const [snackePostOpen, setSnackePostOpen] = useState<boolean>(false);
  const [snackeUpdateOpen, setSnackeUpdateOpen] = useState<boolean>(false);
  const [snackeDeleteOpen, setSnackeDeleteOpen] = useState<boolean>(false);

  useEffect(() => {
    setResults(brands?.data);
  }, [brands?.data]);


  const handleDelete = (id: number) => {
    if (id)
      deleteBrand(id, {
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
        name: rowData.row.name
      }
      updateBrand(formData, {
        onSuccess: () => {
          setSnackeUpdateOpen(true)
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

  if (brandLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {snackePostOpen && ( <PositionedSnackbar open={snackePostOpen} setState={setSnackePostOpen} title={postData?.data?.Message ||postData?.message } /> )}
      {snackeUpdateOpen && ( <PositionedSnackbar open={snackeUpdateOpen} setState={setSnackeUpdateOpen} title={ updateData?.data?.Message || updateData?.message } /> )}
      {snackeDeleteOpen && ( <PositionedSnackbar open={snackeDeleteOpen} setState={setSnackeDeleteOpen} title={ deleteData?.data?.Message || deleteData?.message } /> )}
      <Card className="p-4">
        <Typography color="primary" variant="h1" className="pb-2 !text-sm md:!text-2xl">برندها</Typography>
        <Formik initialValues={initialValues} onSubmit={
          async (values, { setStatus, setSubmitting, setFieldValue }) => {
            try {
              const formData = {
                name: values.name
              }
              postBrand(formData, {
                onSuccess: (message: any) => {
                  setFieldValue('id', message.data.id)
                  refetch();
                  setSnackePostOpen(true)
                }
              })
            } catch (error) {
              setStatus("اطلاعات ثبت برند نادرست می باشد");
              setSubmitting(false);
            }
          }
        }>
          {({ handleSubmit }) => {
            return <Form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
              <Box component="div" className="md:flex md:justify-center md:items-center gap-x-4 md:w-[50%]">
                <FormikInput name="id" label="کد برند" disabled={true} boxClassName="md:w-[50%] mt-2 md:mt-0" />
                <FormikInput name="name" label="نام برند" boxClassName="md:w-[50%] mt-2 md:mt-0" />
              </Box>
              <Box component="div" className="flex justify-end md:w-[50%] mt-4">
                <Button onClick={() => handleSubmit()} variant="contained" color="primary" >
                  <Typography className="px-8 py-2">ثبت</Typography>
                </Button>
              </Box>
            </Form>
          }}
        </Formik>
        <Box component="div" className="w-auto md:w-[40%]">
          <FuzzySearch
            keys={[
              "id",
              "name",
            ]}
            data={brands?.data}
            threshold={0.5}
            setResults={setResults}
          />
        </Box>
        <MuiDataGrid
          columns={columns(renderAction)}
          rows={results}
          data={brands?.data}
        />
      </Card>
    </>
  )
}

export default Brands