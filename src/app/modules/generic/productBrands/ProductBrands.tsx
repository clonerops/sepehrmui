import { useState, useEffect } from 'react'
import { Box, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import { AddCircleOutline } from '@mui/icons-material'

import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import FormikComboBox from '../../../../_cloner/components/FormikComboBox'
import FormikBrand from '../../../../_cloner/components/FormikBrand'
import SwitchComponent from '../../../../_cloner/components/Switch'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../../_cloner/components/ReusableCard'

import { IProductBrand } from "./_models"
import { useGetProductBrands, usePostProductBrands, useUpdateProductBrands } from './_hooks'
import { useRetrieveProducts } from '../../product/core/_hooks'
import { dropdownBrand, dropdownProduct } from '../_functions'
import { useGetBrands } from '../brands/_hooks'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import Backdrop from '../../../../_cloner/components/Backdrop'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'

const initialValues: any = {
  id: 0,
  productId: "",
  brandId: ""
}

const ProductBrands = () => {
  const { data: products } = useRetrieveProducts()
  const { data: brands } = useGetBrands()
  const { data: productBrands, refetch, isLoading: productBrandLoading } = useGetProductBrands();
  const { mutate: postProductBrand } = usePostProductBrands();
  const { mutate: updateProductBrand } = useUpdateProductBrands();

  const [results, setResults] = useState<IProductBrand[]>([]);

  useEffect(() => {
    setResults(productBrands?.data);
  }, [productBrands?.data]);


  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        productId: rowData.row.productId,
        brandId: Number(rowData.row.brandId),
        isActive: !rowData.row.isActive
      }
      updateProductBrand(formData, {
        onSuccess: (response) => {
          if(response.succeeded) {
            EnqueueSnackbar(response.message, "success")
          } else {
            EnqueueSnackbar(response.data.Message, "error")
          }
        refetch()
        }
      })
    } catch (e) {
      return e;
    }
  };

  const renderSwitch = (item: any) => {
    return (
      <SwitchComponent
        checked={item?.row.isActive}
        onChange={(_) => onUpdateStatus(item)}
      />
    );
  };

  const columns = (renderSwitch: any) => {
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
    ];
    return col;
  };

  if (productBrandLoading) {
    return <Backdrop loading={productBrandLoading} />;
  }

  return (
    <>
      <ReusableCard>
        <Box component="div" className="md:grid md:grid-cols-2 md:gap-x-4">
          <Box component="div">
            <Formik initialValues={initialValues} onSubmit={
              async (values, { setStatus, setSubmitting, setFieldValue }) => {
                try {
                  const formData = {
                    productId: values.productId?.value,
                    brandId: Number(values.brandId)
                  }
                  postProductBrand(formData, {
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
                    <FormikBrand name='brandId' label="برند" options={dropdownBrand(brands?.data)} />
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
              columns={columns(renderSwitch)}
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
      </ReusableCard>
    </>
  )
}

export default ProductBrands