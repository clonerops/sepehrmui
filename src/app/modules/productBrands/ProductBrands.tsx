import { useState, useEffect } from 'react'
import { Typography } from "@mui/material"
import { Formik } from "formik"
import { AddCircleOutline } from '@mui/icons-material'
import { IProductBrand, IProductBrandFilter } from "./_models"
import { useGetProductBrandsByMutation, useGetProductPricesByProductType, usePostProductBrands, useUpdateProductBrands } from './_hooks'
import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar'
// import { VerticalCharts } from '../../../_cloner/components/VerticalCharts'
import { ProductBrandsColumn } from '../../../_cloner/helpers/columns'

import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../_cloner/helpers/fuse"
import FormikBrand from '../../../_cloner/components/FormikBrand'
import SwitchComponent from '../../../_cloner/components/Switch'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import Backdrop from '../../../_cloner/components/Backdrop'
import FormikProduct from '../../../_cloner/components/FormikProductComboSelect'
import Pagination from '../../../_cloner/components/Pagination'

import _ from 'lodash'
import { toAbsoulteUrl } from '../../../_cloner/helpers/assetsHelper'
import { useAuth } from '../../../_cloner/helpers/checkUserPermissions'
import AccessDenied from '../../routing/AccessDenied'

const initialValues: any = {
  id: 0,
  productId: "",
  brandId: ""
}

let pageSize = 100

const ProductBrands = () => {
  const { hasPermission } = useAuth()

  const productBrandTools = useGetProductBrandsByMutation()
  const postProductBrandTools = usePostProductBrands()
  const updateProductBrandTools = useUpdateProductBrands()
  // const productPricesType = useGetProductPricesByProductType()

  // console.log("productPricesType?.data?.data", productPricesType?.data?.data)

  const [results, setResults] = useState<IProductBrand[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filters: IProductBrandFilter = {
    PageNumber: currentPage,
    PageSize: pageSize
  }

  useEffect(() => {
    productBrandTools.mutate(filters, {
      onSuccess: (response) => setResults(response?.data)
    })
    // eslint-disable-next-line
  }, [currentPage]);

  // useEffect(() => {
  //   productPricesType.mutate({})
  //   // eslint-disable-next-line
  // }, []);


  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        productId: rowData.row.productId,
        brandId: Number(rowData.row.brandId),
        isActive: !rowData.row.isActive
      }
      updateProductBrandTools.mutate(formData, {
        onSuccess: (response) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
          } else {
            EnqueueSnackbar(response.data.Message, "error")
          }
          productBrandTools.mutate(filters);
        }
      })
    } catch (e) {
      return e;
    }
  };

  const renderSwitch = (item: any) => {
    return (
      <>
        {hasPermission("UpdateProductBrand") &&
          <SwitchComponent
            checked={item?.row.isActive}
            onChange={(_) => onUpdateStatus(item)}
          />
        }
      </>
    );
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  if (!hasPermission("CreateProductBran"))
    return <AccessDenied />

  // let groupedProductBrand = _.groupBy(productBrandTools?.data?.data, "productName")

  return (
    <>
      {/* {productPricesType.isLoading && <Backdrop loading={productPricesType.isLoading} />} */}
      {productBrandTools.isLoading && <Backdrop loading={productBrandTools.isLoading} />}
      {postProductBrandTools.isLoading && <Backdrop loading={postProductBrandTools.isLoading} />}
      {updateProductBrandTools.isLoading && <Backdrop loading={updateProductBrandTools.isLoading} />}

      <div className="lg:grid lg:grid-cols-3 lg:gap-4 space-y-4 lg:space-y-0">
        <ReusableCard cardClassName='col-span-2'>
          <Formik initialValues={initialValues} onSubmit={
            async (values, { setStatus, setSubmitting, setFieldValue }) => {
              try {
                const formData = {
                  productId: values.productId?.value,
                  brandId: Number(values.brandId?.value)
                }
                postProductBrandTools.mutate(formData, {
                  onSuccess: (response: any) => {
                    if (response.succeeded) {
                      EnqueueSnackbar(response.message, "success")
                      setFieldValue('id', response.data.id)
                    } else {
                      EnqueueSnackbar(response.data.Message, "warning")
                    }
                    productBrandTools.mutate(filters);
                  }
                })
              } catch (error) {
                setStatus("اطلاعات ثبت نوع کالا نادرست می باشد");
                setSubmitting(false);
              }
            }
          }>
            {({ handleSubmit }) => {
              return <form onSubmit={handleSubmit} className="mb-4">
                <div className="md:flex md:justify-start md:items-start gap-4 space-y-4 lg:space-y-0">
                  <FormikProduct name="productId" label="کالا" divClassName="mt-2 md:mt-0" />
                  <FormikBrand name='brandId' label="برند" />
                  <div className="mt-2 md:mt-0">
                    <ButtonComponent>
                      <Typography className="px-2">
                        <AddCircleOutline className="text-white" />
                      </Typography>
                    </ButtonComponent>
                  </div>
                </div>
              </form>
            }}
          </Formik>
          <div className="mb-4">
            <FuzzySearch
              keys={[
                "id",
                "product.productCode",
                "productName",
                "brandId",
                "brandName",
              ]}
              data={productBrandTools?.data?.data}
              setResults={setResults}
            />
          </div>
          <MuiDataGrid
            columns={ProductBrandsColumn(renderSwitch)}
            rows={results}
            data={productBrandTools?.data?.data}
            onDoubleClick={(item: any) => onUpdateStatus(item)}
            hideFooter={true}
            getRowId={(item: { id: number }) => item.id}
          />
          <Pagination pageCount={+productBrandTools?.data?.totalCount / +pageSize || 100} onPageChange={handlePageChange} />
        </ReusableCard>
        <ReusableCard>
          <div className="hidden md:flex md:justify-center md:items-center">
            <img alt="sepehriranian"
              src={toAbsoulteUrl("/media/logos/6075528.jpg")}
              width={400}
            />
          </div>
        </ReusableCard>
      </div>
    </>
  )
}

export default ProductBrands