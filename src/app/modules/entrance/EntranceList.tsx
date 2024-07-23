import { useEffect, useState } from 'react'
import { Button, Tooltip, Typography } from '@mui/material'
import { Search, Visibility } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useGetTransferRemitancesByMutation } from '../transferRemittance/_hooks'
import { EntranceReportColumn } from '../../../_cloner/helpers/columns'

import ReusableCard from '../../../_cloner/components/ReusableCard'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'
import Pagination from '../../../_cloner/components/Pagination'
import SearchFromBack from '../../../_cloner/components/SearchFromBack'
import { Formik } from 'formik'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'
import FormikInput from '../../../_cloner/components/FormikInput'
import FormikWarehouse from '../../../_cloner/components/FormikWarehouse'
import FormikCustomer from '../../../_cloner/components/FormikCustomer'

const pageSize = 100

const EntranceList = () => {
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
            <Tooltip title={<Typography variant='h3'>نمایش جزئیات</Typography>}>
                <Link
                    to={`/dashboard/billlandingList/${item?.row?.id}`}
                >
                    <Button variant='contained' color="secondary">
                       <Typography>جزئیات</Typography> <Visibility />
                    </Button>
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
            OriginWarehouseId: values.originWarehouseId,
            MarketerId: values.marketerId.value,
            PageNumber: currentPage,
            PageSize: pageSize,
            IsEntranced: true
        };
        transferList.mutate(formData);
    }

    return (
        <>
            <ReusableCard>
              {/* <SearchFromBack inputName='TransferEntransePermitNo' initialValues={{TransferEntransePermitNo: ""}} onSubmit={handleFilter} label="شماره ورود" /> */}
              <Formik initialValues={{ originWarehouseId: "", marketerId: "" }} onSubmit={() => { }}>
                    {({ values }) => {
                        return (
                            <div className="flex flex-col lg:flex-row gap-4 w-full mb-4" >
                                <FormikWarehouse name="originWarehouseId" label="انبار مبدا" />
                                <FormikCustomer label="فروشنده" name="marketerId" />
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

export default EntranceList