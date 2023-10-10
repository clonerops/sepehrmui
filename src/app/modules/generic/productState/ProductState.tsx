import { useState, useEffect } from 'react'
import { Box, Button, Card, Switch, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import { IState } from "./_models"
import { useDeleteState, useGetStates, usePostState, useUpdateState } from './_hooks'
import DeleteGridButton from '../../../../_cloner/components/DeleteGridButton'
import { columns } from './_columns'
import PositionedSnackbar from '../../../../_cloner/components/Snackbar'
import React from 'react'
import { AddCircleOutline } from '@mui/icons-material'
import * as Yup from 'yup'

const initialValues = {
  id: 0,
  desc: ""
}

const validation = Yup.object({
  desc: Yup.string().required("فیلد الزامی می باشد")
})


const ProductState = () => {
  const { data: state, refetch, isLoading: StateLoading } = useGetStates()
  const { mutate: postState, data: postData } = usePostState()
  const { mutate: updateState, data: updateData } = useUpdateState()
  const { mutate: deleteState, data: deleteData } = useDeleteState()

  const [results, setResults] = useState<IState[]>([]);
  const [snackePostOpen, setSnackePostOpen] = useState<boolean>(false);
  const [snackeUpdateOpen, setSnackeUpdateOpen] = useState<boolean>(false);
  const [snackeDeleteOpen, setSnackeDeleteOpen] = useState<boolean>(false);

  useEffect(() => {
    setResults(state?.data);
  }, [state?.data]);


  const handleDelete = (id: number) => {
    if (id)
      deleteState(id, {
        onSuccess: (message: any) => {
          setSnackeDeleteOpen(true);
          refetch();
        },
      });
  }

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        name: rowData.row.desc,
        isActive: !rowData.row.isActive
      }
      updateState(formData, {
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

  if (StateLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {snackePostOpen && ( <PositionedSnackbar open={snackePostOpen} setState={setSnackePostOpen} title={postData?.data?.Message ||postData?.message } /> )}
      {snackeUpdateOpen && ( <PositionedSnackbar open={snackeUpdateOpen} setState={setSnackeUpdateOpen} title={ updateData?.data?.Message || updateData?.message } /> )}
      {snackeDeleteOpen && ( <PositionedSnackbar open={snackeDeleteOpen} setState={setSnackeDeleteOpen} title={ deleteData?.data?.Message || deleteData?.message } /> )}
      <Card className="p-4">
        {/* <Typography color="secondary" variant="h1" className="pb-2 !text-sm md:!text-2xl">حالت ها</Typography> */}
        <Formik initialValues={initialValues} validationSchema={validation} onSubmit={
          async (values, { setStatus, setSubmitting, setFieldValue }) => {
            try {
              const formData = {
                desc: values.desc
              }
              postState(formData, {
                onSuccess: (message: any) => {
                  setFieldValue('id', message.data.id)
                  refetch();
                  setSnackePostOpen(true)
                }
              })
            } catch (error) {
              setStatus("اطلاعات ثبت حالت نادرست می باشد");
              setSubmitting(false);
            }
          }
        }>
          {({ handleSubmit }) => {
            return <Form onSubmit={handleSubmit} className="flex flex-col justify-start items-start mb-4">
              <Box component="div" className="md:flex md:justify-start md:items-start gap-x-4 md:w-[50%]">
                <FormikInput name="id" label="کد حالت " disabled={true} boxClassName="md:w-[50%] mt-2 md:mt-0" />
                <FormikInput name="desc" label="حالت " boxClassName="md:w-[50%] mt-2 md:mt-0" />
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
            data={state?.data}
            threshold={0.5}
            setResults={setResults}
          />
        </Box>
        <MuiDataGrid
          columns={columns(renderAction)}
          rows={results}
          data={state?.data}
        />
      </Card>
    </>
  )
}

export default ProductState