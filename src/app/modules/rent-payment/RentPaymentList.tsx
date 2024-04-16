import { useState, useEffect } from 'react'
import { Typography } from "@mui/material"
import Backdrop from '../../../_cloner/components/Backdrop'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'
import { useGetRentPaymentsByMutation } from './core/_hooks'
import Pagination from '../../../_cloner/components/Pagination'
import { Formik } from 'formik'
import FormikInput from '../../../_cloner/components/FormikInput'
import FormikSelect from '../../../_cloner/components/FormikSelect'
import FormikDatepicker from '../../../_cloner/components/FormikDatepicker'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'
import { Search } from '@mui/icons-material'

let pageSize = 100;

const initialValues = {
    rentPaymentCode: "",
    referenceCode: "",
    driverName: "",
    fromDate: "",
    toDate: "",
    orderType: ""
}


const RentPaymentList = () => {
  const rentPayments = useGetRentPaymentsByMutation()
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const formData ={
        pageSize: pageSize,
        pageNumber: currentPage
    }
    rentPayments.mutate(formData)
     // eslint-disable-next-line
  }, [currentPage]);


  const columns = () => {
    const col = [
      {
        field: 'id', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'شماره پرداخت', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'referenceCode', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'شماره مرجع', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'totalFareAmount', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'مبلغ پرداخت شده', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'otherCosts', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'سایر هزینه ها', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'driverName', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'راننده', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'driverMobile', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'شماره همراه راننده', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'driverAccountNo', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'شماره حساب راننده', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      {
        field: 'orderType', renderCell: (params: any) => {
          return <Typography variant="h4">{params.value}</Typography>;
        },
        headerName: 'نوع سفارش', headerClassName: "headerClassName", minWidth: 120,
        flex: 1,
      },
      
    ]
    return col
  }

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
};

const handleFilterBasedofStatus = (values: any) => {
    rentPayments.mutate(values, {
        onSuccess: (response) => {
        },
    });
};



  return (
    <>
        {rentPayments?.isLoading && <Backdrop loading={rentPayments?.isLoading} />}
        <ReusableCard>
            <div className="mb-4">
                    <Formik initialValues={initialValues} onSubmit={handleFilterBasedofStatus}>
                        {({handleSubmit}) => {
                            return <>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <FormikInput name='rentPaymentCode' label="شماره پرداخت" />
                                    <FormikInput name='referenceCode' label="شماره مرجع" />
                                    <FormikInput name='driverName' label="نام راننده" />
                                    <FormikDatepicker name='fromDate' label="از تاریخ" />
                                    <FormikDatepicker name='toDate' label="تا تاریخ" />
                                    <ButtonComponent onClick={() => handleSubmit()}>
                                        <Search className="text-white" />
                                        <Typography className="text-white">جستجو</Typography>
                                    </ButtonComponent>
                                </div>
                            </>
                        }}
                    </Formik>
                </div>

          <div>
            <MuiDataGrid
              columns={columns()}
              rows={rentPayments?.data?.data}
              data={rentPayments?.data?.data}
              hideFooter
            />
          </div>
          <Pagination pageCount={+rentPayments?.data?.totalCount / +pageSize || 100} onPageChange={handlePageChange} />

        </ReusableCard>
    </>
  )
}

export default RentPaymentList