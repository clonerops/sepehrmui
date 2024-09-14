import { useEffect, useState } from "react"
import { Button, Typography } from "@mui/material"
import { DraftListColumn } from "../../../../_cloner/helpers/columns"

import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import TransitionsModal from "../../../../_cloner/components/ReusableModal"
import ImagePreview from "../../../../_cloner/components/ImagePreview"
import { useGetAllDraftOrder, useGetDraftOrderDetail } from "./core/_hooks"
import Pagination from "../../../../_cloner/components/Pagination"
import { IDraftDetail } from "./core/_models"
import Backdrop from "../../../../_cloner/components/Backdrop"
import { Link } from "react-router-dom"
import ReusableCard from "../../../../_cloner/components/ReusableCard"
import { Formik } from "formik"
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker"
import FormikRadioGroup from "../../../../_cloner/components/FormikRadioGroup"
import FormikInput from "../../../../_cloner/components/FormikInput"
import ButtonComponent from "../../../../_cloner/components/ButtonComponent"
import { Search } from "@mui/icons-material"

const pageSize = 100;

const allOption = [
    { value: 1, label: "تایید نشده" },
    { value: 2, label: "تایید شده" },
    { value: -1, label: "همه" }];


const DraftList = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedDraft, setSelectedDraft] = useState<IDraftDetail>({})

    const draftOrderTools = useGetAllDraftOrder()
    const draftOrderDetailTools = useGetDraftOrderDetail()

    useEffect(() => {
        const filter = {
            PageNumber: currentPage,
            PageSize: pageSize,
        }
        draftOrderTools.mutate(filter)

    }, [currentPage])

    useEffect(() => {
        draftOrderDetailTools.mutate(selectedDraft.id || 0)
    }, [selectedDraft.id])

    const handleSelectedDraft = (item: any) => {
        setSelectedDraft(item)
        setIsOpen(true)
    }

    const renderAction = (params: any) => {
        return <div className="flex flex-row gap-x-2">
            <div>
                <Button size="small" variant="contained" color="secondary" onClick={() => handleSelectedDraft(params.row)}>
                    <Typography>نمایش پیش نویس</Typography>
                </Button>
            </div>
            <Link to={`/dashboard/sales_order?draftOrderId=${params.row.id}`} >
                <Button size="small" variant="contained" color="primary">
                    <Typography>ثبت سفارش</Typography>
                </Button>
            </Link>
        </div>
    }

    const onSubmit = () => { }

    const handleFilterBasedofStatus = () => { }

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    return (
        <ReusableCard>
            <Formik initialValues={{}} onSubmit={onSubmit}>
                {({ handleSubmit }) => {
                    return <form className="mb-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 space-y-4 lg:space-y-0">
                            <FormikInput name="CreatorName" label="مسئول فروش" />
                            <FormikDatepicker name="FromDate" label="از تاریخ" />
                            <FormikDatepicker name="ToDate" label="تا تاریخ" />
                        </div>
                        <div className="mx-4 mt-4">
                            <FormikRadioGroup radioData={allOption} name="StatusId" />
                        </div>
                        <div className="flex justify-end items-end">
                            <ButtonComponent onClick={() => handleSubmit()}>
                                <div className="flex flex-row gap-x-4">
                                    <Search className="text-white" />
                                    <Typography className="text-white">جستجو</Typography>
                                </div>
                            </ButtonComponent>
                        </div>
                    </form>
                }}
            </Formik>
            <MuiDataGrid
                columns={DraftListColumn(renderAction)}
                data={draftOrderTools?.data?.data}
                rows={draftOrderTools?.data?.data}
                onDoubleClick={(params: any) => handleSelectedDraft(params.row)}
            />
            <Pagination pageCount={+draftOrderTools?.data?.totalCount / +pageSize || 0} onPageChange={handlePageChange} />

            <TransitionsModal width="80%" open={isOpen} isClose={() => setIsOpen(false)} title={`مشاهده پیش نویس سریال ${selectedDraft.id}`}>
                <div className="mt-4">
                    {draftOrderDetailTools.isLoading ?
                        <Backdrop loading={draftOrderDetailTools.isLoading} /> :
                        <ImagePreview base64Strings={draftOrderDetailTools?.data?.data?.attachments || []} />}
                </div>
            </TransitionsModal>
        </ReusableCard>
    )
}

export default DraftList