import { useState, useEffect } from 'react'
import { Box, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import { AddCircleOutline } from '@mui/icons-material'

import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import FormikBrand from '../../../../_cloner/components/FormikBrand'
import SwitchComponent from '../../../../_cloner/components/Switch'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../../_cloner/components/ReusableCard'

import { ICustomerWarehouse } from "./_models"
import { useGetCustomerWarehouses, usePostCustomerWarehouses, useUpdateCustomerWarehouses } from './_hooks'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import Backdrop from '../../../../_cloner/components/Backdrop'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'
import FormikProduct from '../../../../_cloner/components/FormikProductComboSelect'
import { VerticalCharts } from '../../../../_cloner/components/VerticalCharts'
import _ from 'lodash'
import FormikCustomer from '../../../../_cloner/components/FormikCustomer'
import FormikWarehouse from '../../../../_cloner/components/FormikWarehouse'

const initialValues: any = {
  id: 0,
  customerId: "",
  warehouseId: ""
}

const CustomerWarehouse = () => {
  const { data: CustomerWarehouses, refetch, isLoading: CustomerWarehouseLoading } = useGetCustomerWarehouses();
  const { mutate: postCustomerWarehouse } = usePostCustomerWarehouses();
  const { mutate: updateCustomerWarehouse } = useUpdateCustomerWarehouses();

  const [results, setResults] = useState<ICustomerWarehouse[]>([]);

  useEffect(() => {
    // setResults(CustomerWarehouses?.data);
    setResults([]);
  }, [CustomerWarehouses?.data]);


  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        id: rowData.row.id,
        customerId: rowData.row.customerId,
        warehouseId: Number(rowData.row.warehouseId),
        isActive: !rowData.row.isActive
      }
      // updateCustomerWarehouse(formData, {
      //   onSuccess: (response) => {
      //     if(response.succeeded) {
      //       EnqueueSnackbar(response.message, "success")
      //     } else {
      //       EnqueueSnackbar(response.data.Message, "error")
      //     }
      //   refetch()
      //   }
      // })
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
        field: "customerId",
        headerName: "کدمشتری",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params?.row?.product?.productCode}</Typography>;
        },
        headerClassName:"headerClassName",
        minWidth: 80,
        maxWidth: 80,
        flex: 1,
      },
      {
        field: "customerName",
        headerName: "نام مشتری",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerClassName:
          "headerClassName",
        minWidth: 120,
        flex: 1,
      },
      {
        field: "warehouseId",
        headerName: "کد انبار",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params?.row?.brand?.id}</Typography>;
        },
        headerClassName: "headerClassName",
        flex: 1,
        minWidth: 80,
        maxWidth: 80,
      },
      {
        field: "warehouseName",
        headerName: "نام انبار",
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

  let groupedCustomerWarehouse = _.groupBy(CustomerWarehouses?.data, "productName")

  if (CustomerWarehouseLoading) {
    return <Backdrop loading={CustomerWarehouseLoading} />;
  }
  return (
    <>
      <Box className="lg:grid lg:grid-cols-2 lg:gap-4">
        <ReusableCard>
          <Box component="div">
            <Box component="div">
              <Formik initialValues={initialValues} onSubmit={
                async (values, { setStatus, setSubmitting, setFieldValue }) => {
                  try {
                    const formData = {
                      customerId: values.productId?.value,
                      warehouseId: Number(values.brandId)
                    }
  //                   postCustomerWarehouse(formData, {
  //                     onSuccess: (response: any) => {
  //                       if(response.succeeded) {
  //                         EnqueueSnackbar(response.message, "success")
  //                         setFieldValue('id', response.data.id)
  //                         refetch();
  //                       } else {
  //                         EnqueueSnackbar(response.data.Message, "warning")
  //                       }                        
  // }
  //                   })
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
                      className="md:flex md:justify-start md:items-start gap-4 space-y-4 lg:space-y-0"
                    > 
                      <FormikCustomer name="customerId" label="مشتری" boxClassName="mt-2 md:mt-0" />
                      <FormikWarehouse name='warehouseId' label="انبار" />ظ
                      <Box component="div" className="mt-2 md:mt-0">
                        <ButtonComponent onClick={() => handleSubmit()}>
                          <Typography className="px-2">
                            <AddCircleOutline className="text-white" />
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
                    "customerId",
                    "customerName",
                    "warehouseId",
                    "warehouseName",
                  ]}
                  data={CustomerWarehouses?.data}
                  setResults={setResults}
                />
              </Box>
              <MuiDataGrid
                columns={columns(renderSwitch)}
                // rows={results}
                rows={[{}]}
                // data={CustomerWarehouses?.data}
                data={[{}]}
              />
            </Box>
          </Box>
        </ReusableCard>
        <Box className="lg:grid lg:grid-cols-2 lg:gap-4 hidden">
          <ReusableCard>
            <Box className="flex flex-col flex-wrap gap-4">
              <Typography variant="h3" className="text-yellow-500">راهنما</Typography>
              <Typography>از طریق فرم مقابل می توانید انبار هایی را به مشتری های خود اختصاص دهید</Typography>
              <Typography>جهت اختصاص یک انبار به مشتری بایستی پس از انتخاب مشتری انباری که میخواهید برای آن ثبت شود را انتخاب کنید و اقدام به ثبت کنید</Typography>
              <Typography variant="h3" className="text-red-500">نکته اول: </Typography>
              <Typography>امکان حذف وجود ندارد اما می توانید اقدام به فعالسازی/غیرفعالسازی کنید</Typography>
              <Typography variant="h3" className="text-red-500">نکته دوم: </Typography>
              <Typography>جهت دسترسی به ثبت و فعال/غیرفعالسازی با پشتیبانی تماس بگیرید</Typography>
            </Box>
          </ReusableCard>
          <ReusableCard>
            <Box 
              component="img"
              src={toAbsoulteUrl("/media/images/WarehouseMaintenance.jpg")}
              className="rounded-md"
              width={400}
            />
          </ReusableCard>
          <ReusableCard cardClassName='col-span-2'>
            <VerticalCharts 
              text='تعداد انبار ثبت شده برحسب مشتری'  
              categories={Object.keys(groupedCustomerWarehouse) || [{}]} 
              data={Object.values(groupedCustomerWarehouse).map((item: any) => item.length)}
             />
          </ReusableCard>
        </Box>
      </Box>
    </>
  )
}

export default CustomerWarehouse