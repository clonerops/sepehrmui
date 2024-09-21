import { useEffect, useState } from 'react'
import { UnloadingPermitColumn } from '../../../_cloner/helpers/columns'
import { Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import ReusableCard from '../../../_cloner/components/ReusableCard'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'
import Pagination from '../../../_cloner/components/Pagination'
import SearchFromBack from '../../../_cloner/components/SearchFromBack'
import { useGetEntrancePermitsByMutation } from '../entrancePermit/_hooks'
import RadioGroup from '../../../_cloner/components/RadioGroup'
import { useGetTransferRemittanceStatus } from '../generic/_hooks'
import { dropdownTransferRemittanceStatus } from '../../../_cloner/helpers/dropdowns'
import { Formik } from 'formik'
import { useAuth } from '../../../_cloner/helpers/checkUserPermissions'
import AccessDenied from '../../routing/AccessDenied'

const pageSize = 100

const ReadyToUnloading = () => {
    const { hasPermission } = useAuth()

    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<number>(1);

    const entranceTools = useGetEntrancePermitsByMutation()
    const transferRemittanceStatus = useGetTransferRemittanceStatus()

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
            <Link to={`${item.row.transferRemitance.transferRemittanceStatusId > 2 ? "" : `/dashboard/unloading/${item?.row?.transferRemitance?.id}/${item?.row?.id}`}`}>
                <Button disabled={item.row.transferRemitance.transferRemittanceStatusId > 2} variant="contained" color="secondary">
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

    const handleChangeStatus = (id: number) => {
        let formData = {
            PageNumber: currentPage,
            PageSize: 100,
            TransferRemittStatusId: id,
        };
        entranceTools.mutate(formData);
    }

    const filteredTransferRemittacneStatus = transferRemittanceStatus?.data?.filter((item: {id: number}) => [2,3].includes(+item.id))

    if(!hasPermission("CreateUnloadingPermit"))
        return <AccessDenied />
        
    return (
        <>
            <ReusableCard>
                <SearchFromBack inputName='TransferEntransePermitNo' initialValues={{ TransferEntransePermitNo: "" }} onSubmit={handleFilter} label="شماره ورود" />
                <Formik initialValues={{ id: "" }} onSubmit={() => { }}>
                    {({ handleSubmit }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <RadioGroup
                                        key="TransferRemittStatusId"
                                        disabled={false}
                                        categories={
                                            filteredTransferRemittacneStatus === undefined
                                                ? [{ value: null, title: "همه", defaultChecked: true }]
                                                : dropdownTransferRemittanceStatus([
                                                    { id: null, statusDesc: "همه", defaultChecked: true },
                                                    ...filteredTransferRemittacneStatus,
                                                ])
                                        }
                                        name="TransferRemittStatusId"
                                        id="TransferRemittStatusId"
                                        onChange={(id: number) => handleChangeStatus(id)}
                                    />
                                </div>
                            </form>
                        );
                    }}
                </Formik>

                <MuiDataGrid
                    columns={UnloadingPermitColumn(renderAction)}
                    rows={entranceTools?.data?.data}
                    data={entranceTools?.data?.data}
                    isLoading={entranceTools.isLoading}
                    onDoubleClick={(item: any) => item.row.transferRemitance.transferRemittanceStatusId > 2 ? {} : navigate(`/dashboard/unloadingPermit/${item?.row?.id}/${item?.row?.entrancePermitId}`)}
                />
                <Pagination pageCount={entranceTools?.data?.data?.totalCount / pageSize} onPageChange={handlePageChange} />

            </ReusableCard>
        </>
    )
}

export default ReadyToUnloading