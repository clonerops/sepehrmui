// import { useState } from 'react'
import {  Formik } from 'formik'
import { Button, Typography } from '@mui/material'
import { Search, Visibility } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import FormikInput from '../../../_cloner/components/FormikInput'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'
import { useGetLadingLicenceList } from '../ladingLicence/_hooks'
import { LadingReportColumn } from '../../../_cloner/helpers/columns'
// import Pagination from '../../../_cloner/components/Pagination'

// const pageSize = 20

const LadingReport = () => {
    // const [currentPage, setCurrentPage] = useState<number>(1);

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
    
    // const handlePageChange = (selectedItem: { selected: number }) => {
    //     setCurrentPage(selectedItem.selected + 1);
    // };

  return (
    <>
        <ReusableCard>
            
            <Formik initialValues={{}} onSubmit={() => {}}>
                {() => {
                    return <form>
                        <div className='flex gap-4 w-[50%]'>
                            <FormikInput name="orderCode" label="شماره سفارش" />
                            <Button><Typography><Search /></Typography></Button>
                        </div>
                    </form>
                }}
            </Formik>

            <MuiDataGrid
                columns={LadingReportColumn(renderAction)}
                rows={ladingList?.data?.data}
                data={ladingList?.data?.data}
                isLoading={ladingList.isLoading}
            />
            {/* <Pagination pageCount={ladingList?.data?.data?.totalCount / pageSize} onPageChange={handlePageChange} /> */}

        </ReusableCard>
    </>
  )
}

export default LadingReport