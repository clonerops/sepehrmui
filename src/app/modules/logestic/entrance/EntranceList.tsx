import { useEffect, useState } from 'react'
import { Tooltip, Typography } from '@mui/material'
import { Visibility } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useGetTransferRemitancesByMutation } from '../core/_hooks'
import { entranceReportColumns } from '../../managment-order/helpers/columns'

import ReusableCard from '../../../../_cloner/components/ReusableCard'
import MuiDataGrid from '../../../../_cloner/components/MuiDataGrid'
import Pagination from '../../../../_cloner/components/Pagination'
import SearchFromBack from '../../../../_cloner/components/SearchFromBack'

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
              <SearchFromBack inputName='TransferEntransePermitNo' initialValues={{TransferEntransePermitNo: ""}} onSubmit={handleFilter} label="شماره ورود" />
              <MuiDataGrid
                  columns={entranceReportColumns(renderAction)}
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