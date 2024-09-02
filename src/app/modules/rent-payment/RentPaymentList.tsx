import { useState, useEffect } from 'react'
import { Typography } from "@mui/material"
import Backdrop from '../../../_cloner/components/Backdrop'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'
import { useGetAllRents, useGetRentPaymentsByMutation } from './core/_hooks'
import Pagination from '../../../_cloner/components/Pagination'
import { Formik } from 'formik'
import FormikInput from '../../../_cloner/components/FormikInput'
import FormikDatepicker from '../../../_cloner/components/FormikDatepicker'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'
import { Print, Search } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { RentListsColumn } from '../../../_cloner/helpers/columns'
import { getAllRents } from './core/_requests'

let pageSize = 100;

const initialValues = {
    rentPaymentCode: "",
    referenceCode: "",
    driverName: "",
    // fromDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
    // toDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
    fromDate: "",
    toDate: "",
    orderType: ""
}


const RentPaymentList = () => {
  const navigate = useNavigate()
  const rentPayments = useGetAllRents()
  const [currentPage, setCurrentPage] = useState<number>(1);



  useEffect(() => {
    const formData ={
        pageSize: pageSize,
        pageNumber: currentPage,
        // fromDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
        fromDate: "",
        // toDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),        
        toDate: "",        
    }
    rentPayments.mutate(formData)
     // eslint-disable-next-line
  }, [currentPage]);




  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
};

const handleFilterBasedofStatus = (values: any) => {
    rentPayments.mutate(values, {
        onSuccess: (response) => {
        },
    });
};

const renderPrint = (item: any) => {
  return <div>
    <Link to={`/dashboard/rent_print/${item.row.id}`}>
      <Print />
    </Link>
  </div>
}

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
              columns={RentListsColumn(renderPrint)}
              rows={rentPayments?.data?.data}
              data={rentPayments?.data?.data}
              onDoubleClick={(item: any) => navigate(`/dashboard/rent_print/${item.row.id}`)}
              hideFooter
            />
          </div>
          <Pagination pageCount={+rentPayments?.data?.totalCount / +pageSize || 100} onPageChange={handlePageChange} />

        </ReusableCard>
    </>
  )
}

export default RentPaymentList