import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button,  Typography } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import FormikInput from '../../../_cloner/components/FormikInput'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'
import Pagination from '../../../_cloner/components/Pagination'
import { useGetTransferRemitancesByMutation } from '../transferRemittance/_hooks'
import { EntranceReportColumn } from '../../../_cloner/helpers/columns'

const pageSize = 100

const EntranceReport = () => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState<number>(1);

    const transferList = useGetTransferRemitancesByMutation()
    useEffect(() => {
        const filter = {
            PageNumber: currentPage,
            PageSize: pageSize,
            IsEntranced: true
        }
        transferList.mutate(filter)
        // eslint-disable-next-line
    }, [currentPage])


    const renderAction = (item: any) => {
        return (
                <Link
                    to={`/dashboard/billlandingList/${item?.row?.id}`}
                >
                    <Button variant='contained' color="secondary">
                        <Typography variant='h5'>جزئیات</Typography> 
                    </Button>
                </Link>
        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    const handleFilter = (values: any) => {
        let formData = {
            TransferEntransePermitNo: values.TransferEntransePermitNo ? values.TransferEntransePermitNo : "",
            PageNumber: currentPage,
            PageSize: 100,
            IsEntranced: true
        };
        transferList.mutate(formData);
    }

    return (
        <>
            <ReusableCard>
                <Formik initialValues={{
                    id: "",
                }} onSubmit={handleFilter}>
                    {({ handleSubmit }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-[50%] mb-4">
                                    <FormikInput
                                        name="TransferEntransePermitNo"
                                        label="شماره ورود"
                                    />
                                    <ButtonComponent>
                                        <Search className="text-white" />
                                        <Typography className="px-2 text-white">جستجو</Typography>
                                    </ButtonComponent>
                                </div>
                            </form>
                        );
                    }}
                </Formik>

                <MuiDataGrid
                    columns={EntranceReportColumn(renderAction)}
                    rows={transferList?.data?.data}
                    data={transferList?.data?.data}
                    isLoading={transferList.isLoading}
                    onDoubleClick={(item: any) => navigate(`/dashboard/billlandingList/${item?.row?.id}`)}
                />
                <Pagination pageCount={transferList?.data?.data?.totalCount / pageSize} onPageChange={handlePageChange} />

            </ReusableCard>
        </>
    )
}

export default EntranceReport