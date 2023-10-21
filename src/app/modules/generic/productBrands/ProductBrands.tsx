import { useState, useEffect } from 'react'
import { Box, Button, Card, Switch, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import { IProductBrand } from "./_models"
import { useDeleteProductBrands, useGetProductBrands, usePostProductBrands, useUpdateProductBrands } from './_hooks'
import DeleteGridButton from '../../../../_cloner/components/DeleteGridButton'
import { columns } from './_columns'
import PositionedSnackbar from '../../../../_cloner/components/Snackbar'
import { useRetrieveProducts } from '../../product/core/_hooks'
import FormikComboBox from '../../../../_cloner/components/FormikComboBox'
import { dropdownBrand, dropdownProduct } from '../_functions'
import CheckboxGroup from '../../../../_cloner/components/CheckboxGroup'
import { useGetBrands } from '../brands/_hooks'
import React from 'react'
import FormikSelect from '../../../../_cloner/components/FormikSelect'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import { AddCircleOutline } from '@mui/icons-material'

const initialValues: any = {
  id: 0,
  productId: "",
  brandId: ""
}

const ProductBrands = () => {
  const { data: products } = useRetrieveProducts()
  const { data: brands } = useGetBrands()
  const { data: productBrands, refetch, isLoading: productBrandLoading } = useGetProductBrands();
  const { mutate: postProductBrand, data: postProductBrandData } = usePostProductBrands();
  const { mutate: updateProductBrand, data: updateProductBrandData } = useUpdateProductBrands();
  const { mutate: deleteProductBrand, data: deleteProductBrandData } = useDeleteProductBrands();

  const [results, setResults] = useState<IProductBrand[]>([]);
  const [snackePostOpen, setSnackePostOpen] = useState<boolean>(false);
  const [snackeUpdateOpen, setSnackeUpdateOpen] = useState<boolean>(false);
  const [snackeDeleteOpen, setSnackeDeleteOpen] = useState<boolean>(false);

  useEffect(() => {
    setResults(productBrands?.data);
  }, [productBrands?.data]);


  const handleDelete = (id: number) => {
    if (id)
      deleteProductBrand(id, {
        onSuccess: (message) => {
          setSnackeDeleteOpen(true);
          refetch()
        },
      });
  }

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        productId: rowData.row.productId,
        brandId: Number(rowData.row.brandId),
        isActive: !rowData.row.isActive
      }
      updateProductBrand(formData, {
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

  const renderSwitch = (item: any) => {
    return (
      <Switch
        checked={item?.row.isActive}
        onChange={(_) => onUpdateStatus(item)}
        color="secondary"
      />
    );
  };
  const renderAction = (item: any) => {
    return (
      <Box component="div" className="flex gap-4">
        <DeleteGridButton onClick={() => handleDelete(item?.row.id)} />
      </Box>
    );
  };

  const columns = (renderAction: any, renderSwitch: any) => {
    const col = [
      {
        field: "productName",
        headerName: "کالا",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerClassName:
          "headerClassName",
        minWidth: 120,
        flex: 1,
      },
      {
        field: "brandName",
        headerName: "برند",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerClassName: "headerClassName",
        flex: 1,
        minWidth: 160,
      },
      {
        field: "isActive",
        headerName: "وضعیت",
        renderCell: renderSwitch,
        headerClassName: "headerClassName",
        flex: 1,
        minWidth: 160,
      },
      // {
      //   headerName: "حذف",
      //   flex: 1,
      //   renderCell: renderAction,
      //   headerClassName: "headerClassName",
      //   minWidth: 120,
      // },
    ];
    return col;
  };

  if (productBrandLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      {snackePostOpen && (<PositionedSnackbar open={snackePostOpen} setState={setSnackePostOpen} title={postProductBrandData?.data?.Message || postProductBrandData?.message} />)}
      {snackeUpdateOpen && (<PositionedSnackbar open={snackeUpdateOpen} setState={setSnackeUpdateOpen} title={updateProductBrandData?.data?.Message || updateProductBrandData?.message} />)}
      {snackeDeleteOpen && (<PositionedSnackbar open={snackeDeleteOpen} setState={setSnackeDeleteOpen} title={deleteProductBrandData?.data?.Message || deleteProductBrandData?.message} />)}
      <Card className="p-4" elevation={8}>
        <Box component="div" className="md:grid md:grid-cols-2 md:gap-x-4">
          <Box component="div">
            <Formik initialValues={initialValues} onSubmit={
              async (values, { setStatus, setSubmitting, setFieldValue, resetForm }) => {
                try {
                  const formData = {
                    productId: values.productId?.value,
                    brandId: Number(values.brandId)
                  }
                  postProductBrand(formData, {
                    onSuccess: (message: any) => {
                      setFieldValue('id', message.data.id)
                      setSnackePostOpen(true)
                      refetch()
                      resetForm()
                    }
                  })
                } catch (error) {
                  setStatus("اطلاعات ثبت نوع کالا نادرست می باشد");
                  setSubmitting(false);
                }
              }
            }>
              {({ handleSubmit }) => {
                return <Form onSubmit={handleSubmit} className="mb-4">
                  <Box
                    component="div"
                    className="md:flex md:justify-start md:items-start gap-x-4"
                  >
                    <FormikComboBox name="productId" label="کالا" options={dropdownProduct(products?.data)} boxClassName="mt-2 md:mt-0" />
                    <FormikSelect name='brandId' label="برند" options={dropdownBrand(brands?.data)} />
                    <Box component="div" className="mt-2 md:mt-0">
                      <Button onClick={() => handleSubmit()} variant="contained" color="secondary" >
                        <Typography className="px-2">
                          <AddCircleOutline />
                        </Typography>
                      </Button>
                    </Box>
                  </Box>
                </Form>
              }}
            </Formik>
            <Box component="div" className="mb-4">
              <FuzzySearch
                keys={[
                  "id",
                  "productName",
                  "brandName",
                ]}
                data={productBrands?.data}
                threshold={0.5}
                setResults={setResults}
              />
            </Box>
            <MuiDataGrid
              columns={columns(renderAction, renderSwitch)}
              rows={results}
              data={productBrands?.data}
            />
          </Box>
          <Box component="div">
            <Box
              component="div"
              className="hidden md:flex md:justify-center md:items-center"
            >
              <Box component="img"
                src={toAbsoulteUrl("/media/logos/8595513.jpg")}
                width={400}
              />
            </Box>
          </Box>

        </Box>
      </Card>
    </>
  )
}

export default ProductBrands