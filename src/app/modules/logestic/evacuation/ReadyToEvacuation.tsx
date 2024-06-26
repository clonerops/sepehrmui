import { useEffect, useState } from 'react'
import ReusableCard from '../../../../_cloner/components/ReusableCard'
import { Form, Formik } from 'formik'
import FormikInput from '../../../../_cloner/components/FormikInput'
import { Box, Button, Typography } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import MuiDataGrid from '../../../../_cloner/components/MuiDataGrid'
import Pagination from '../../../../_cloner/components/Pagination'
import { useGetLadingLicenceList, useGetTransferRemitancesByMutation } from '../core/_hooks'
import { evacuationColumns, ladingColumns } from '../../managment-order/helpers/columns'
import ButtonComponent from '../../../../_cloner/components/ButtonComponent'

const pageSize = 20

const ReadyToEvacuation = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const transferList = useGetTransferRemitancesByMutation()
    useEffect(() => {
      const filter = {
        PageNumber: currentPage,
        PageSize: 100,
        IsEntranced: true
      }
      transferList.mutate(filter)
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
                    columns={evacuationColumns(renderAction)}
                    rows={transferList?.data?.data}
                    data={transferList?.data?.data}
                    isLoading={transferList.isLoading}
                />
                <Pagination pageCount={transferList?.data?.data?.totalCount / pageSize} onPageChange={handlePageChange} />

            </ReusableCard>
        </>
    )
}

export default ReadyToEvacuation