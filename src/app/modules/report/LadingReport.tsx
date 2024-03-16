import { useState } from 'react'
import { Form, Formik } from 'formik'
import { Box, Button, Typography } from '@mui/material'
import { Search, Visibility } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useGetLadingLicenceList } from '../logestic/core/_hooks'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import FormikInput from '../../../_cloner/components/FormikInput'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'
import { ladingColumns, ladingReportColumns } from '../managment-order/helpers/columns'
import Pagination from '../../../_cloner/components/Pagination'

const pageSize = 20

const LadingReport = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const ladingList = useGetLadingLicenceList();


    const renderAction = (item: any) => {
        return (
            <Link
                to={`/dashboard/exit/${item?.row?.id}`}
            >
                <Visibility color='secondary' />
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
                            <Button><Typography><Search /></Typography></Button>
                        </Box>
                    </Form>
                }}
            </Formik>

            <MuiDataGrid
                columns={ladingReportColumns(renderAction)}
                rows={ladingList?.data?.data}
                data={ladingList?.data?.data}
                isLoading={ladingList.isLoading}
            />
            <Pagination pageCount={ladingList?.data?.data?.totalCount / pageSize} onPageChange={handlePageChange} />

        </ReusableCard>
    </>
  )
}

export default LadingReport