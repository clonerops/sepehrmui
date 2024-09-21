import ReusableCard from '../../../_cloner/components/ReusableCard'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'

import { Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useGetLadingLicenceList } from '../ladingLicence/_hooks'
import { LadingListColumn } from '../../../_cloner/helpers/columns'
import { useAuth } from '../../../_cloner/helpers/checkUserPermissions'
import AccessDenied from '../../routing/AccessDenied'

const ReadyToExit = () => {
    const {hasPermission} = useAuth()

    const navigate = useNavigate()

    const ladingList = useGetLadingLicenceList();

    const renderAction = (item: any) => {
        return (
            <Link to={`/dashboard/exit/${item?.row?.cargoAnnounceId}/${item?.row?.id}/${item?.row?.createdDate}`}>
                <Button variant="contained" color="secondary">
                    <Typography>صدور مجوز</Typography>
                </Button>
            </Link>
        );
    };

    if(!hasPermission("CreateLadingExitPermit"))
        return <AccessDenied />
    
  return (
    <>
        <ReusableCard>
            <MuiDataGrid
                columns={LadingListColumn(renderAction)}
                rows={ladingList?.data?.data}
                data={ladingList?.data?.data}
                isLoading={ladingList.isLoading}
                onDoubleClick={(item: any) => navigate(`/dashboard/exit/${item?.row?.cargoAnnounceId}`)}
            />
        </ReusableCard>
    </>
  )
}

export default ReadyToExit