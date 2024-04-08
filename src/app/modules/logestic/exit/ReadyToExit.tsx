import { useState } from 'react'
import ReusableCard from '../../../../_cloner/components/ReusableCard'
import { Form, Formik } from 'formik'
import FormikInput from '../../../../_cloner/components/FormikInput'
import { Box, Button, Typography } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import MuiDataGrid from '../../../../_cloner/components/MuiDataGrid'
import Pagination from '../../../../_cloner/components/Pagination'
import { useGetLadingLicenceList } from '../core/_hooks'
import { ladingColumns } from '../../managment-order/helpers/columns'

const pageSize = 20

const ReadyToExit = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const ladingList = useGetLadingLicenceList();


    const renderAction = (item: any) => {
        return (
            <Link
                to={`/dashboard/exit/${item?.row?.id}`}
            >
                <Button variant="contained" color="secondary">
                    <Typography>صدور مجوز خروج</Typography>
                </Button>
            </Link>
        );
    };
    
    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    console.log(currentPage)

  return (
    <>
        <ReusableCard>
            
            <Formik initialValues={{}} onSubmit={() => {}}>
                {() => {
                    return <Form>
                        <Box component="div" className='flex gap-4 w-[50%]'>
                            <FormikInput name="orderCode" label="شماره سفارش" />
                            <Button><Typography><Search /></Typography></Button>
                        </Box>
                    </Form>
                }}
            </Formik>

            <MuiDataGrid
                columns={ladingColumns(renderAction)}
                rows={ladingList?.data?.data}
                data={ladingList?.data?.data}
                isLoading={ladingList.isLoading}
            />
            <Pagination pageCount={ladingList?.data?.data?.totalCount / pageSize} onPageChange={handlePageChange} />

        </ReusableCard>
    </>
  )
}

export default ReadyToExit