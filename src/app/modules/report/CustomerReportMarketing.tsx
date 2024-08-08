import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button, Typography } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'
import Pagination from '../../../_cloner/components/Pagination'
import { EntranceReportColumn } from '../../../_cloner/helpers/columns'
import FormikCustomerLabelType from '../../../_cloner/components/FormikCustomerLableType'
import FormikCustomerLabel from '../../../_cloner/components/FormikCustomerLabel'
import RadioGroup from '../../../_cloner/components/RadioGroup'

const pageSize = 100

const CustomerReportMarketing = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const filter = {
        }
        // eslint-disable-next-line
    }, [currentPage])


    const renderAction = (item: any) => {
        return (
            <Link
                to={`/dashboard/billlandingList/${item?.row?.id}`}
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
            CustomerLabelTypeId: values.customerLabelTypeId
        };
    }

    const handleChangeStatus = (id: number) => {
        let formData = {
        };
      }
    

    return (
        <>
            <ReusableCard>
                <Formik initialValues={{ customerLabelTypeId: "", customerLabelId: "" }} onSubmit={() => { }}>
                    {({ values }) => {
                        return (
                            <>
                                <div className="flex flex-col lg:flex-row gap-4 w-full mb-4" >
                                    <FormikCustomerLabelType name="customerLabelTypeId" label="نوع برچسب"  />
                                    <FormikCustomerLabel name="customerLabelId" label="نام برچسب"  disabeld={!values.customerLabelTypeId} />
                                </div>
                                <div>
                                    <RadioGroup
                                        key="TransferRemittStatusId"
                                        disabled={false}
                                        categories={
                                            [
                                                { value: 2, title: "براساس برچسب", defaultChecked: true },
                                                { value: 1, title: "براساس سوابق خرید", defaultChecked: false },
                                                { value: 0, title: "هردو", defaultChecked: false },
                                            ]
                                        }
                                        name="TransferRemittStatusId"
                                        id="TransferRemittStatusId"
                                        onChange={(id: number) => handleChangeStatus(id)}
                                    />
                                    <div className='flex items-end justify-end my-4'>
                                        <ButtonComponent onClick={() => handleFilter(values)} disabled={!values.customerLabelId || !values.customerLabelTypeId}>
                                            <Search className="text-white" />
                                            <Typography className="text-white"> جستجو </Typography>
                                        </ButtonComponent>
                                    </div>

                                </div>
                            </>
                        );
                    }}
                </Formik>

                <MuiDataGrid
                    columns={EntranceReportColumn(renderAction)}
                    rows={[]}
                    data={[]}
                // isLoading={transferList.isLoading}
                // onDoubleClick={(item: any) => navigate(`/dashboard/transferRemittance/${item?.row?.id}/entrance`)}
                />
                {/* <Pagination pageCount={transferList?.data?.data?.totalCount / pageSize} onPageChange={handlePageChange} /> */}

            </ReusableCard>
        </>
    )
}

export default CustomerReportMarketing