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
import { EntranceReportColumn } from '../../../_cloner/helpers/columns'
import FormikWarehouse from '../../../_cloner/components/FormikWarehouse'
import { useGetEntrancePermitsByMutation } from './_hooks'

const pageSize = 100

const EntranceReport = () => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState<number>(1);

    const entranceTools = useGetEntrancePermitsByMutation()
    useEffect(() => {
        const filter = {
            PageNumber: currentPage,
            PageSize: pageSize,
        }
        entranceTools.mutate(filter)
        // eslint-disable-next-line
    }, [currentPage])


    const renderAction = (item: any) => {
        return (
                <Link
                    to={`/dashboard/billlandingList/${item?.row?.transferRemitance?.id}`}
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
            OriginWarehouseId: values?.originWarehouseId?.value ? values?.originWarehouseId?.value : '',
            PageNumber: currentPage,
            PageSize: pageSize,
        };
        entranceTools.mutate(formData);
    }
    
    return (
        <>
            <ReusableCard>
            <Formik initialValues={{ id: "", originWarehouseId: ""}} onSubmit={() => { }}>
                    {({ values }) => {
                        return (
                            <div className="flex flex-col lg:flex-row gap-4 w-full mb-4" >
                                <FormikInput name="TransferEntransePermitNo" label="شماره ورود" />
                                <FormikWarehouse name="originWarehouseId" label="انبار مبدا" />
                                <ButtonComponent onClick={() => handleFilter(values)}>
                                    <Search className="text-white" />
                                    <Typography className="text-white"> جستجو </Typography>
                                </ButtonComponent>
                            </div>
                        );
                    }}
                </Formik>

                <MuiDataGrid
                    columns={EntranceReportColumn(renderAction)}
                    rows={entranceTools?.data?.data}
                    data={entranceTools?.data?.data}
                    isLoading={entranceTools.isLoading}
                    onDoubleClick={(item: any) => navigate(`/dashboard/transferRemittance/${item?.row?.id}/entrance`)}
                />
                <Pagination pageCount={entranceTools?.data?.data?.totalCount / pageSize} onPageChange={handlePageChange} />

            </ReusableCard>
        </>
    )
}

export default EntranceReport