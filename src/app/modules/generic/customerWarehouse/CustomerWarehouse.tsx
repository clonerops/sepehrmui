import { useState, useEffect } from 'react'
import { Button, Typography } from "@mui/material"
import { Formik } from "formik"

import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import ReusableCard from '../../../../_cloner/components/ReusableCard'

import { ICustomerWarehouse } from "./_models"
import { usePostCustomerWarehouses } from './_hooks'
import Backdrop from '../../../../_cloner/components/Backdrop'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'
import _ from 'lodash'
import FormikCustomer from '../../../../_cloner/components/FormikCustomer'
import { useGetCustomers } from '../../customer/core/_hooks'
import TransitionsModal from '../../../../_cloner/components/ReusableModal'
import FormikWarehouseMultiplie from '../../../../_cloner/components/FormikWarehouseMiltiplie'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'

const initialValues: any = {
  id: 0,
  customerId: "",
  warehouses: []
}

const CustomerWarehouse = () => {
  const customers = useGetCustomers()
  const { mutate: postCustomerWarehouse, isLoading: postLoading } = usePostCustomerWarehouses();

  const [results, setResults] = useState<ICustomerWarehouse[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<any>({})

  useEffect(() => {
    setResults(customers?.data?.data);
     // eslint-disable-next-line
  }, [customers?.data?.data]);

  const onAdd = async (values: any) => {
    try {
      const formData = {
        customerId: values.customerId?.value,
        warehouses: values.warehouses
      }
      postCustomerWarehouse(formData, {
        onSuccess: (response: any) => {
          if (response.succeeded) {
            EnqueueSnackbar(response.message, "success")
          } else {
            EnqueueSnackbar(response.data.Message, "warning")
          }
        }
      })
    } catch (error) {
    }

  }

  const columns = () => {
    const col = [
      {
        field: "customerCode",
        headerName: "کدمشتری",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params?.row?.customerCode}</Typography>;
        },
        headerClassName: "headerClassName",
        minWidth: 80,
        maxWidth: 80,
        flex: 1,
      },
      {
        field: "customerName",
        headerName: "نام مشتری",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params?.row?.firstName} {params?.row?.lastName}</Typography>;
        },
        headerClassName:
          "headerClassName",
        minWidth: 120,
        flex: 1,
      },

      {
        field: "warehouses",
        headerName: "انبارها",
        renderCell: (params: any) => {
          return <Button variant='contained' color='secondary' onClick={() => {
            setSelectedItems(params.row)
            setIsOpen(true)
          }}>
            <Typography>لیست انبار</Typography>
          </Button>
        },
        headerClassName: "headerClassName",
        flex: 1,
        minWidth: 160,
      },
    ];
    return col;
  };

  const columnsWarehouse = () => {
    const col = [
      {
        field: "id",
        headerName: "کد انبار",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params?.value}</Typography>;
        },
        headerClassName: "headerClassName",
        flex: 1,
      },
      {
        field: "name",
        headerName: "نام انبار",
        renderCell: (params: any) => {
          return <Typography variant="h4">{params?.value}</Typography>;
        },
        headerClassName:
          "headerClassName",
        flex: 1,
      },

    ];
    return col;
  };

  let groupedCustomerWarehouse = _.groupBy(customers?.data?.data, "warehouses")
  if (customers.isLoading) {
    return <Backdrop loading={customers.isLoading} />;
  }
  return (
    <>
      {postLoading && <Backdrop loading={postLoading} />}
      <div className="lg:grid lg:grid-cols-2 lg:gap-4">
        <ReusableCard>
          <div>
            <div>
              <Formik initialValues={initialValues} onSubmit={onAdd}>
                {({ handleSubmit }) => {
                  return <form onSubmit={handleSubmit} className="mb-4">
                    <div
                    
                      className="md:flex md:flex-col md:justify-start md:items-start gap-4 space-y-4 lg:space-y-0"
                    >
                      <FormikCustomer name="customerId" label="مشتری" divClassName="mt-2 md:mt-0" />
                      <FormikWarehouseMultiplie name='warehouses' label="انبار" />
                      <div className="mt-2 md:mt-0">
                        <ButtonComponent onClick={() => handleSubmit()}>
                          <Typography className="px-2 text-white">
                            اختصاص انبار به مشتری
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
                    "customerCode",
                    "firstName",
                    "lastName",
                  ]}
                  data={customers?.data?.data}
                  setResults={setResults}
                />
              </div>
              <MuiDataGrid
                columns={columns()}
                rows={results}
                data={customers?.data?.data}
              />
            </div>
          </div>
        </ReusableCard>
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 hidden">
          <ReusableCard>
            <div className="flex flex-col flex-wrap gap-4">
              <Typography variant="h3" className="text-yellow-500">راهنما</Typography>
              <Typography>از طریق فرم مقابل می توانید انبار هایی را به مشتری های خود اختصاص دهید</Typography>
              <Typography>جهت اختصاص یک انبار به مشتری بایستی پس از انتخاب مشتری انباری که میخواهید برای آن ثبت شود را انتخاب کنید و اقدام به ثبت کنید</Typography>
              <Typography variant="h3" className="text-red-500">نکته اول: </Typography>
              <Typography>امکان حذف وجود ندارد اما می توانید اقدام به فعالسازی/غیرفعالسازی کنید</Typography>
              <Typography variant="h3" className="text-red-500">نکته دوم: </Typography>
              <Typography>جهت دسترسی به ثبت و فعال/غیرفعالسازی با پشتیبانی تماس بگیرید</Typography>
            </div>
          </ReusableCard>
          <ReusableCard>
            <img
              src={toAbsoulteUrl("/media/images/WarehouseMaintenance.jpg")}
              className="rounded-md"
              width={400}
            />
          </ReusableCard>
          <ReusableCard cardClassName='col-span-2 flex justify-center items-center'>
            <img
              src={toAbsoulteUrl("/media/mainlogo/2.png")}
              className="rounded-md"
              width={100}
            />

          </ReusableCard>
        </div>
      </div>
      <TransitionsModal open={isOpen} isClose={() => setIsOpen(false)} title='لیست انبارها'>
        <MuiDataGrid
          columns={columnsWarehouse()}
          rows={selectedItems?.warehouses?.length > 0 ? selectedItems?.warehouses : [{}]}
          data={selectedItems?.warehouses?.length > 0 ? selectedItems?.warehouses : [{}]}
        />
      </TransitionsModal>
    </>
  )
}

export default CustomerWarehouse
