import { useEffect, useState } from 'react'
import { UnloadingPermitColumn } from '../../../_cloner/helpers/columns'
import { Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import ReusableCard from '../../../_cloner/components/ReusableCard'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'
import Pagination from '../../../_cloner/components/Pagination'
import SearchFromBack from '../../../_cloner/components/SearchFromBack'
import { useGetEntrancePermitsByMutation } from '../entrancePermit/_hooks'

const pageSize = 100

const ReadyToUnloading = () => {
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
                to={`/dashboard/unloading/${item?.row?.transferRemitance?.id}/${item?.row?.id}`}
            >
                <Button variant="contained" color="secondary">
                    <Typography>صدور مجوز تخلیه</Typography>
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
            PageSize: pageSize,
        };
        entranceTools.mutate(formData);
    }

    console.log("entranceTools?.data?.data", entranceTools?.data?.data)

    return (
        <>
            <ReusableCard>
                <SearchFromBack inputName='TransferEntransePermitNo' initialValues={{ TransferEntransePermitNo: "" }} onSubmit={handleFilter} label="شماره ورود" />
                <MuiDataGrid
                    columns={UnloadingPermitColumn(renderAction)}
                    rows={entranceTools?.data?.data}
                    data={entranceTools?.data?.data}
                    isLoading={entranceTools.isLoading}
                    onDoubleClick={(item: any) => navigate(`/dashboard/unloadingPermit/${item?.row?.id}/${item?.row?.entrancePermitId}`)}
                />
                <Pagination pageCount={entranceTools?.data?.data?.totalCount / pageSize} onPageChange={handlePageChange} />

            </ReusableCard>
        </>
    )
}

export default ReadyToUnloading