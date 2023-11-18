import { useState, useEffect } from 'react'
import { Box, Button, Card, Switch, Typography } from "@mui/material"
import { Formik, Form } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import Fuzziesearch from "../../../../_cloner/helpers/Fuse"
import { ICustomerCompany } from "./_models"
import { useDeleteCustomerCompanies, useGetCustomerCompanies, usePostCustomerCompanies, useUpdateCustomerCompanies } from './_hooks'
import DeleteGridButton from '../../../../_cloner/components/DeleteGridButton'
import { columns } from './_columns'
import PositionedSnackbar from '../../../../_cloner/components/Snackbar'
import React from 'react'
import { AddCircleOutline } from '@mui/icons-material'
import * as Yup from 'yup'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import SwitchComponent from '../../../../_cloner/components/Switch'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import ReusableCard from '../../../../_cloner/components/ReusableCard'
import FormikSelect from '../../../../_cloner/components/FormikSelect'
import { dropdownCustomer } from '../_functions'
import { useGetCustomers } from '../../customer/core/_hooks'

const initialValues = {
  companyName: "",
  customerId: ""
}

const validation = Yup.object({
  customerId: Yup.string().required("فیلد الزامی می باشد")
})

const CustomerCompanies = () => {
  const { data: customerCompanies, refetch, isLoading: CustomerCompanyLoading } = useGetCustomerCompanies("")
  const { mutate: postCustomerCompany, data: postData } = usePostCustomerCompanies()
  const { mutate: updateCustomerCompany, data: updateData } = useUpdateCustomerCompanies()
  const { mutate: deleteCustomerCompany, data: deleteData } = useDeleteCustomerCompanies()
  const { data: customers } = useGetCustomers()

  const [results, setResults] = useState<ICustomerCompany[]>([]);
  const [snackePostOpen, setSnackePostOpen] = useState<boolean>(false);
  const [snackeUpdateOpen, setSnackeUpdateOpen] = useState<boolean>(false);
  const [snackeDeleteOpen, setSnackeDeleteOpen] = useState<boolean>(false);
  useEffect(() => {
    setResults(customerCompanies?.data);
  }, [customerCompanies?.data]);


  const handleDelete = (id: number) => {
    if (id)
      deleteCustomerCompany(id, {
        onSuccess: (message: any) => {
          setSnackeDeleteOpen(true);
          refetch();
        },
      });
  }

  const onUpdateStatus = (rowData: any) => {
    try {
      const formData = {
        companyName: rowData.row.companyName,
        customerId: rowData.row.customerId,
        isActive: !rowData.row.isActive
      }
      updateCustomerCompany(formData, {
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

  const columns = (renderAction: any, renderSwitch: any) => {
    const col = [
      {
        field: 'companyName', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'نام شرکت', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'customerFullName', renderCell: (params: any) => {
          console.log("params", params)
          return <Typography variant="h4">{params.row.customer.firstName+" "+params.row.customer.lastName}</Typography>;
        },
        headerName: 'مشتری', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'customerOfficialName', renderCell: (params: any) => {
          console.log("params", params)
          return <Typography variant="h4">{params.row.customer.officialName}</Typography>;
        },
        headerName: 'اسم رسمی مشتری', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      // {
      //   field: "isActive",
      //   headerName: "وضعیت",
      //   renderCell: renderSwitch,
      //   headerClassName: "headerClassName",
      //   minWidth: 160,
      //   flex: 1,
      // },
      // { headerName: 'عملیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
    ]
    return col
  }


  const renderSwitch = (item: any) => {
    return (
      <SwitchComponent
        checked={item?.row.isActive}
        onChange={(_) => onUpdateStatus(item)}
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

  if (CustomerCompanyLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {snackePostOpen && (<PositionedSnackbar open={snackePostOpen} setState={setSnackePostOpen} title={postData?.data?.Message || postData?.message} />)}
      {snackeUpdateOpen && (<PositionedSnackbar open={snackeUpdateOpen} setState={setSnackeUpdateOpen} title={updateData?.data?.Message || updateData?.message} />)}
      {snackeDeleteOpen && (<PositionedSnackbar open={snackeDeleteOpen} setState={setSnackeDeleteOpen} title={deleteData?.data?.Message || deleteData?.message} />)}
      <ReusableCard>
        <Box component="div" className="md:grid md:grid-cols-2 md:gap-x-4">
          <Box component="div">
            <Formik initialValues={initialValues} validationSchema={validation} onSubmit={
              async (values, { setStatus, setSubmitting, setFieldValue }) => {
                try {
                  const formData = {
                    customerId: values.customerId,
                    companyName: values.companyName
                  }
                  postCustomerCompany(formData, {
                    onSuccess: (message: any) => {
                      setFieldValue('id', message.data.id)
                      refetch();
                      setSnackePostOpen(true)
                    }
                  })
                } catch (error) {
                  setStatus("اطلاعات ثبت استاندارد نادرست می باشد");
                  setSubmitting(false);
                }
              }
            }>
              {({ handleSubmit }) => {
                return <Form onSubmit={handleSubmit} className="mb-4">
                  <Box component="div" className="md:flex md:justify-start md:items-start gap-x-4 ">
                    <FormikInput name="companyName" label="شرکت" boxClassName=" mt-2 md:mt-0" />
                    <FormikSelect name={"customerId"} label="مشتری" options={dropdownCustomer(customers?.data)} />
                    <ButtonComponent onClick={() => handleSubmit()}>
                      <Typography className="px-2">
                        <AddCircleOutline />
                      </Typography>
                    </ButtonComponent>
                  </Box>
                </Form>
              }}
            </Formik>
            <Box component="div" className="mb-4">
              <Fuzziesearch
                keys={[
                  "id",
                  "desc",
                ]}
                data={customerCompanies?.data}
                threshold={0.5}
                setResults={setResults}
              />
            </Box>
            <MuiDataGrid
              columns={columns(renderAction, renderSwitch)}
              rows={results}
              data={customerCompanies?.data}
            />
          </Box>
          <Box component="div">
            <Box
              component="div"
              className="hidden md:flex md:justify-center md:items-center"
            >
              <Box component="img"
                src={toAbsoulteUrl("/media/logos/11089.jpg")}
                width={400}
              />
            </Box>

          </Box>
        </Box>
      </ReusableCard>
    </>
  )
}

export default CustomerCompanies