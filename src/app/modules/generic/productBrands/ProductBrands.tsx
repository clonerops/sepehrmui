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
import { useRetrieveProducts } from '../../product/core/_hooks'
import FormikComboBox from '../../../../_cloner/components/FormikComboBox'
import { dropdownBrand, dropdownProduct } from '../_functions'
import CheckboxGroup from '../../../../_cloner/components/CheckboxGroup'
import { useGetBrands } from '../brands/_hooks'
import React from 'react'

const initialValues = {
  id: 0,
  desc: "",
  productBrands: []
}

const ProductBrands = () => {
  const { data: products } = useRetrieveProducts()
  const { data: brands } = useGetBrands()
  const { mutate: postType, data: postData } = usePostTypes()
  const { mutate: updateType, data: updateData } = useUpdateTypes()
  const { mutate: deleteType, data: deleteData } = useDeleteTypes()

  const [results, setResults] = useState<IType[]>([]);
  const [snackePostOpen, setSnackePostOpen] = useState<boolean>(false);
  const [snackeUpdateOpen, setSnackeUpdateOpen] = useState<boolean>(false);
  const [snackeDeleteOpen, setSnackeDeleteOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   setResults(types?.data);
  // }, [types?.data]);


  const handleDelete = (id: number) => {
    if (id)
      deleteType(id, {
        onSuccess: (message) => {
          setSnackeDeleteOpen(true);
        },
      });
  }

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        desc: rowData.row.desc
      }
      updateType(formData, {
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

  // if (TypeLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      {snackePostOpen && (<PositionedSnackbar open={snackePostOpen} setState={setSnackePostOpen} title={postData?.data?.Message || postData?.message} />)}
      {snackeUpdateOpen && (<PositionedSnackbar open={snackeUpdateOpen} setState={setSnackeUpdateOpen} title={updateData?.data?.Message || updateData?.message} />)}
      {snackeDeleteOpen && (<PositionedSnackbar open={snackeDeleteOpen} setState={setSnackeDeleteOpen} title={deleteData?.data?.Message || deleteData?.message} />)}
      <Card className="p-4">
        <Typography color="secondary" variant="h1" className="pb-2 !text-sm md:!text-2xl">نوع کالا ها</Typography>
        <Formik initialValues={initialValues} onSubmit={
          async (values, { setStatus, setSubmitting, setFieldValue }) => {
            console.log(values.productBrands)
            try {
              const formData = {
                desc: values.desc
              }
              postType(formData, {
                onSuccess: (message: any) => {
                  setFieldValue('id', message.data.id)
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
            return <Form onSubmit={handleSubmit} className="flex flex-col justify-center w-[50%] mx-auto">
              <Box component="div" className="md:flex md:justify-center md:items-center gap-x-4">
                <FormikComboBox name="productId" label="کالا" options={dropdownProduct(products?.data)} boxClassName="mt-2 md:mt-0" />
                <CheckboxGroup boxClassName='flex justify-between flex-wrap border border-gray-300 px-10 mt-4 md:mt-0' name='productBrands' label='برند ها' options={dropdownBrand(brands?.data)} />
              </Box>
              <Box component="div" className="flex justify-end items-end mt-4">
                <Button onClick={() => handleSubmit()} variant="contained" color="secondary" >
                  <Typography className="px-8 py-2">ثبت</Typography>
                </Button>
              </Box>
            </Form>
          }}
        </Formik>
        {/* <Box component="div" className="w-auto md:w-[40%]">
          <FuzzySearch
            keys={[
              "id",
              "desc",
            ]}
            data={types?.data}
            threshold={0.5}
            setResults={setResults}
          />
        </Box> */}
        {/* <MuiDataGrid
          columns={columns(renderAction)}
          rows={results}
          data={types?.data}
        /> */}
      </Card>
    </>
  )
}

export default ProductBrands