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

const pageSize = 100;

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
        return <Button variant="contained" color="secondary" onClick={() => handleSelectedDraft(params.row)}>
            <Typography>نمایش پیش نویس</Typography>
        </Button>
    }

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    return (
        <>
            <MuiDataGrid
                columns={DraftListColumn(renderAction)}
                data={draftOrderTools?.data?.data}
                rows={draftOrderTools?.data?.data}
                onDoubleClick={(params: any) => handleSelectedDraft(params.row)}
            />
            <Pagination pageCount={+draftOrderTools?.data?.totalCount / +pageSize || 0} onPageChange={handlePageChange} />

            <TransitionsModal width="80%" open={isOpen} isClose={() => setIsOpen(false)} title={`مشاهده پیش نویس سریال ${selectedDraft.id}`}>
                <div className="mt-4">
                    {draftOrderDetailTools.isLoading ? <Backdrop loading={draftOrderDetailTools.isLoading} /> : <ImagePreview base64Strings={draftOrderDetailTools?.data?.data?.attachments || []} />}
                </div>
            </TransitionsModal>
        </>
    )
}

export default DraftList