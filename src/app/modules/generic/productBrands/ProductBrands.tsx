import { useState, useEffect } from 'react'
import { Typography } from "@mui/material"
import { Formik } from "formik"
import { AddCircleOutline } from '@mui/icons-material'

import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import FormikBrand from '../../../../_cloner/components/FormikBrand'
import SwitchComponent from '../../../../_cloner/components/Switch'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../../_cloner/components/ReusableCard'

import { IProductBrand } from "./_models"
import { useGetProductBrands, usePostProductBrands, useUpdateProductBrands } from './_hooks'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import Backdrop from '../../../../_cloner/components/Backdrop'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'
import FormikProduct from '../../../../_cloner/components/FormikProductComboSelect'
import { VerticalCharts } from '../../../../_cloner/components/VerticalCharts'
import _ from 'lodash'

const initialValues: any = {
  id: 0,
  productId: "",
  brandId: ""
}

const ProductBrands = () => {
  const { data: productBrands, refetch, isLoading: productBrandLoading } = useGetProductBrands();
  const { mutate: postProductBrand, isLoading: postLoading } = usePostProductBrands();
  const { mutate: updateProductBrand, isLoading: updateLoading } = useUpdateProductBrands();

  const [results, setResults] = useState<IProductBrand[]>([]);

  useEffect(() => {
    setResults(productBrands?.data);
     // eslint-disable-next-line
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
        field: "id",
        headerName: "کد کالابرند",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params?.value}</Typography>;
        },
        headerClassName:"headerClassName",
        minWidth: 80,
        maxWidth: 80,
        flex: 1,
      },
      {
        field: "productCode",
        headerName: "کدکالا",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params?.row?.product?.productCode}</Typography>;
        },
        headerClassName:"headerClassName",
        minWidth: 80,
        maxWidth: 80,
        flex: 1,
      },
      {
        field: "productName",
        headerName: "کالا",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerClassName:
          "headerClassName",
        minWidth: 180,
        flex: 1,
      },
      {
        field: "brandId",
        headerName: "کدبرند",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params?.row?.brand?.id}</Typography>;
        },
        headerClassName: "headerClassName",
        flex: 1,
        minWidth: 80,
        maxWidth: 80,
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

  let groupedProductBrand = _.groupBy(productBrands?.data, "productName")

  if (productBrandLoading) {
    return <Backdrop loading={productBrandLoading} />;
  }
  return (
    <>
      {postLoading && <Backdrop loading={postLoading} />}
      {updateLoading && <Backdrop loading={updateLoading} />}
      <div className="lg:grid lg:grid-cols-2 lg:gap-4">
        <ReusableCard>
          <div>
            <div>
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
                  return <form onSubmit={handleSubmit} className="mb-4">
                    <div
                    
                      className="md:flex md:justify-start md:items-start gap-4 space-y-4 lg:space-y-0"
                    > 
                      <FormikProduct name="productId" label="کالا" divClassName="mt-2 md:mt-0" />
                      <FormikBrand name='brandId' label="برند" />
                      <div className="mt-2 md:mt-0">
                        <ButtonComponent onClick={() => handleSubmit()}>
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
                    "brand.id",
                    "product.productCode",
                    "productName",
                    "brandName",
                  ]}
                  data={productBrands?.data}
                  setResults={setResults}
                />
              </div>
              <MuiDataGrid
                columns={columns(renderSwitch)}
                rows={results}
                data={productBrands?.data}
              />
            </div>
          </div>
        </ReusableCard>
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 hidden">
          <ReusableCard>
            <div className="flex flex-col flex-wrap gap-4">
              <Typography variant="h3" className="text-yellow-500">راهنما</Typography>
              <Typography>کالاهای موجود هرکدام دارای برند های خاصی می باشد</Typography>
              <Typography>جهت اختصاص یک برند به کالا بایستی پس از انتخاب کالابرند برندی که میخواهید برای آن کالا ثبت نمایید را انتخاب کنید و اقدام به ثبت کالا برند کنید</Typography>
              <Typography variant="h3" className="text-red-500">نکته اول: </Typography>
              <Typography>امکان حذف برند محصول وجود ندارد اما می توانید اقدام به غیرفعاسازی کالابرند کنید</Typography>
              <Typography variant="h3" className="text-red-500">نکته دوم: </Typography>
              <Typography>جهت دسترسی به ثبت و فعال/غیرفعالسازی کالابرند با پشتیبانی تماس بگیرید</Typography>
            </div>
          </ReusableCard>
          <ReusableCard>
            <img
              src={toAbsoulteUrl("/media/logos/8595513.jpg")}
              width={400}
            />
          </ReusableCard>
          <ReusableCard cardClassName='col-span-2'>
            <VerticalCharts 
              text='تعداد برندها برحسب کالا'  
              categories={Object.keys(groupedProductBrand) || [{}]} 
              data={Object.values(groupedProductBrand).map((item: any) => item.length)}
             />
          </ReusableCard>
        </div>
      </div>
    </>
  )
}

export default ProductBrands