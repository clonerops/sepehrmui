import { useState } from 'react'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import { Form, Formik } from 'formik'
import FormikInput from '../../../_cloner/components/FormikInput'
import FormikSelect from '../../../_cloner/components/FormikSelect'
import { dropdownCustomer } from '../generic/_functions'
import { useGetCustomers } from '../customer/core/_hooks'
import { Box, Button, Typography } from '@mui/material'
import { Search } from '@mui/icons-material'
import OrderList from '../order/OrderList'
import { orderColumns } from '../order/helpers/columns'
import { useRetrieveOrders } from '../order/core/_hooks'
import { Link } from 'react-router-dom'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'
import Pagination from '../../../_cloner/components/Pagination'

const pageSize = 20

const LadingList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    let formData = {
        pageNumber: currentPage,
        pageSize: pageSize,    
    }
    const { data: customers } = useGetCustomers();
    const { data: orders, isLoading } = useRetrieveOrders(formData);

    const renderAction = (item: any) => {
        return (
            <Link
                to={`/dashboard/lading/${item?.row?.id}`}
            >
                <Button variant="contained" color="secondary">
                    <Typography>صدور مجوز بارگیری</Typography>
                </Button>
            </Link>
        );
    };
    
    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

  return (
    <>
        <ReusableCard>
            
            <Formik initialValues={{}} onSubmit={() => {}}>
                {({}) => {
                    return <Form>
                        <Box component="div" className='flex gap-4 w-[50%]'>
                            <FormikInput name="orderCode" label="شماره سفارش" />
                            <FormikSelect options={dropdownCustomer(customers?.data)} label="مشتری" name="customerId" />
                            <Button><Typography><Search /></Typography></Button>
                        </Box>
                    </Form>
                }}
            </Formik>

            <MuiDataGrid
                columns={orderColumns(renderAction)}
                rows={orders?.data}
                data={orders?.data}
                isLoading={isLoading}
            />
            <Pagination pageCount={orders?.totalCount / pageSize} onPageChange={handlePageChange} />

        </ReusableCard>
    </>
  )
}

export default LadingList