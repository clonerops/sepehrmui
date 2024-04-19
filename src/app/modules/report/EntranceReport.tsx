import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Tooltip, Typography } from '@mui/material'
import { Search, Visibility } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useGetTransferRemitancesByMutation } from '../logestic/core/_hooks'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import FormikInput from '../../../_cloner/components/FormikInput'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'
import { entranceReportColumns } from '../managment-order/helpers/columns'
import Pagination from '../../../_cloner/components/Pagination'

const pageSize = 20

const EntranceReport = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const transferList = useGetTransferRemitancesByMutation()
    useEffect(() => {
        const filter = {
            PageNumber: currentPage,
            PageSize: 100,
            IsEntranced: true
        }
        transferList.mutate(filter)
        // eslint-disable-next-line
    }, [currentPage])


    const renderAction = (item: any) => {
        return (
            <Tooltip title={<Typography variant='h3'>نمایش جزئیات</Typography>}>
                <Link
                    to={`/dashboard/billlandingList/${item?.row?.id}`}
                >
                    <Visibility color='secondary' />
                </Link>
            </Tooltip>
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
                }} onSubmit={() => { }}>
                    {({ values }) => {
                        return (
                            <form>
                                <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-[50%] mb-4">
                                    <FormikInput
                                        name="TransferEntransePermitNo"
                                        label="شماره ورود"
                                    />
                                    <ButtonComponent onClick={() => handleFilter(values)}>
                                        <Search className="text-white" />
                                        <Typography className="px-2 text-white">جستجو</Typography>
                                    </ButtonComponent>
                                </div>
                            </form>
                        );
                    }}
                </Formik>

                <MuiDataGrid
                    columns={entranceReportColumns(renderAction)}
                    rows={transferList?.data?.data}
                    data={transferList?.data?.data}
                    isLoading={transferList.isLoading}
                />
                <Pagination pageCount={transferList?.data?.data?.totalCount / pageSize} onPageChange={handlePageChange} />

            </ReusableCard>
        </>
    )
}

export default EntranceReport