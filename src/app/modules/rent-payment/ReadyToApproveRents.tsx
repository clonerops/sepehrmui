import { useState, useEffect, useRef } from 'react'
import { Button, Typography } from "@mui/material"
import Backdrop from '../../../_cloner/components/Backdrop'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import MuiDataGrid from '../../../_cloner/components/MuiDataGrid'
import { useGetAllRents } from './core/_hooks'
import Pagination from '../../../_cloner/components/Pagination'
import { Formik, FormikProps } from 'formik'
import FormikInput from '../../../_cloner/components/FormikInput'
import FormikDatepicker from '../../../_cloner/components/FormikDatepicker'
import ButtonComponent from '../../../_cloner/components/ButtonComponent'
import { Search } from '@mui/icons-material'
import { ReadyToApproveRentsColumn } from '../../../_cloner/helpers/columns'
import TransitionsModal from '../../../_cloner/components/ReusableModal'
import ApproveRentForm from './components/ApproveRentForm'

let pageSize = 100;

const initialValues = {
    rentPaymentCode: "",
    referenceCode: "",
    driverName: "",
    fromDate: null,
    toDate: null,
    orderType: ""
}

const ReadyToApproveRents = () => {
    const rents = useGetAllRents()
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<any>({})

    let formikRef = useRef<FormikProps<any>>(null);

    useEffect(() => {
        const formData = {
            pageSize: pageSize,
            pageNumber: currentPage,
            fareAmountStatusId: 1,
            fromDate: null,
            toDate: null,
        }
        rents.mutate(formData)
        // eslint-disable-next-line
    }, [currentPage]);


    const handleOpen = (item: any) => {
        setSelectedItem(item)
        setIsOpen(true)
    }


    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    const renderAction = (item: any) => {
        return (
            <div className="flex flex-row items-center justify-center gap-x-4">
                <Button onClick={() => handleOpen(item.row)} variant="contained" size="small" color="secondary">
                    <Typography>اقدام به تایید کرایه</Typography>
                </Button>
            </div>
        );
    };


    const handleFilter = (values: any) => {
        const formData = {
            ...values,
            fareAmountStatusId: 1,
        }

        rents.mutate(formData);
    };



    return (
        <>
            {rents?.isLoading && <Backdrop loading={rents?.isLoading} />}
            <ReusableCard>
                <div className="mb-4">
                    <Formik initialValues={initialValues} onSubmit={handleFilter}>
                        {({ handleSubmit }) => {
                            return <>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <FormikInput name='referenceCode' label="شماره مرجع" />
                                    <FormikInput name='driverName' label="نام راننده" />
                                    <FormikDatepicker name='fromDate' label="از تاریخ" />
                                    <FormikDatepicker name='toDate' label="تا تاریخ" />
                                    <ButtonComponent onClick={() => handleSubmit()}>
                                        <Search className="text-white" />
                                        <Typography className="text-white">جستجو</Typography>
                                    </ButtonComponent>
                                </div>
                            </>
                        }}
                    </Formik>
                </div>

                <div>
                    <MuiDataGrid
                        columns={ReadyToApproveRentsColumn(renderAction)}
                        rows={rents?.data?.data}
                        data={rents?.data?.data}
                        onDoubleClick={(item: any) => { }}
                        hideFooter
                    />
                </div>
                <Pagination pageCount={+rents?.data?.totalCount / +pageSize || 100} onPageChange={handlePageChange} />
            </ReusableCard>

            <TransitionsModal
                open={isOpen}
                isClose={() => setIsOpen(false)}
                title="ثبت کرایه"
                description="درصورتی که مغایرتی در اطلاعات مشتری ثبت شده وجود دارد می توانید از طریق فرم ذیل اقدام به ویرایش اطلاعات کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
            >
                <ApproveRentForm formikRef={formikRef} selectedItem={selectedItem} setIsOpen={setIsOpen} rents={rents} />
            </TransitionsModal>

        </>
    )
}

export default ReadyToApproveRents