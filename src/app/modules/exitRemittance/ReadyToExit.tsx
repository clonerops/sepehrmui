import ReusableCard from '../../../_cloner/components/ReusableCard'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'

import { Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useGetLadingLicenceList } from '../ladingLicence/_hooks'

const ReadyToExit = () => {
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

    const ladingColumns = (renderAction: any) => {
        const col = [
            { field: "Action", headerName: 'جزئیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 120, maxWidth: 120 },
            {
                field: 'id', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: 'شماره مجوز بارگیری', headerClassName: "headerClassName", minWidth: 140, maxWidth: 140, flex: 1
            },
            {
                field: 'createdDate', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: 'تاریخ ثبت مجوز بارگیری', headerClassName: "headerClassName", minWidth: 140, flex: 1
            },
            {
                field: 'cargoAnnounceNo', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.row.cargoAnnounce.cargoAnnounceNo}</Typography>;
                },
                headerName: 'شماره اعلام بار', headerClassName: "headerClassName", minWidth: 160, flex: 1
            },
            {
                field: 'driverName', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.row.cargoAnnounce.driverName}</Typography>;
                },
                headerName: 'راننده', headerClassName: "headerClassName", minWidth: 120, flex: 1
            },
            {
                field: 'isTemporary', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.row.cargoAnnounce.vehicleTypeName}</Typography>;
                },
                headerName: 'نوع وسیله نقلیه', headerClassName: "headerClassName", minWidth: 120, flex: 1
            },
            {
                field: 'carPlaque', renderCell: (params: any) => {
                    return <Typography variant="h4">{params.row.cargoAnnounce.carPlaque}</Typography>;
                },
                headerName: 'شماره پلاک خودروبر', headerClassName: "headerClassName", minWidth: 120, flex: 1
            },
        ]
        return col
    }
    
    
  return (
    <>
        <ReusableCard>
            <MuiDataGrid
                columns={ladingColumns(renderAction)}
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