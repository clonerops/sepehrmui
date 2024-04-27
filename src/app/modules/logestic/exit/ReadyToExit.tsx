import { useState } from 'react'
import ReusableCard from '../../../../_cloner/components/ReusableCard'
import { Form, Formik } from 'formik'
import FormikInput from '../../../../_cloner/components/FormikInput'
import { Box, Button, Typography } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import MuiDataGrid from '../../../../_cloner/components/MuiDataGrid'
import Pagination from '../../../../_cloner/components/Pagination'
import { useGetLadingPermitList } from '../core/_hooks'
import { ladingColumns } from '../../managment-order/helpers/columns'

const pageSize = 20

const ReadyToExit = () => {
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<number>(1);

    const ladingList = useGetLadingPermitList();


    const renderAction = (item: any) => {
        return (
            <Link
                // to={`/dashboard/exit/${item?.row?.cargoAnnounceId}`}
                to={`/dashboard/exit/${item?.row?.cargoAnnounceId}/${item?.row?.id}/${item?.row?.createDate}`}
            >
                <Button variant="contained" color="secondary">
                    <Typography>صدور مجوز</Typography>
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
                onDoubleClick={(item: any) => navigate(`/dashboard/exit/${item?.row?.cargoAnnounceId}`)}
            />
            <Pagination pageCount={ladingList?.data?.data?.totalCount / pageSize} onPageChange={handlePageChange} />

        </ReusableCard>
    </>
  )
}

export default ReadyToExit