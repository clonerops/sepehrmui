import { useEffect, useState } from 'react'
import ReusableCard from '../../../../_cloner/components/ReusableCard'
import { Formik } from 'formik'
import FormikInput from '../../../../_cloner/components/FormikInput'
import { Button, Typography } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import MuiDataGrid from '../../../../_cloner/components/MuiDataGrid'
import Pagination from '../../../../_cloner/components/Pagination'
import { useGetTransferRemitancesByMutation } from '../core/_hooks'
import { evacuationColumns } from '../../managment-order/helpers/columns'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'
import SearchFromBack from '../../../../_cloner/components/SearchFromBack'

const pageSize = 20

const ReadyToEvacuation = () => {
    const navigate = useNavigate()
    
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
            <Link
                to={`/dashboard/evacuation/${item?.row?.id}/${item?.row?.entrancePermitId}`}
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
                    columns={evacuationColumns(renderAction)}
                    rows={transferList?.data?.data}
                    data={transferList?.data?.data}
                    isLoading={transferList.isLoading}
                    onDoubleClick={(item: any) => navigate(`/dashboard/evacuation/${item?.row?.id}/${item?.row?.entrancePermitId}`)}
                />
                <Pagination pageCount={transferList?.data?.data?.totalCount / pageSize} onPageChange={handlePageChange} />

            </ReusableCard>
        </>
    )
}

export default ReadyToEvacuation