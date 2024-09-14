import { useEffect, useState } from "react"
import { Button, Typography } from "@mui/material"
import { DraftListColumn } from "../../../../_cloner/helpers/columns"

import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import TransitionsModal from "../../../../_cloner/components/ReusableModal"
import ImagePreview from "../../../../_cloner/components/ImagePreview"
import { useGetAllDraftOrder } from "./core/_hooks"
import Pagination from "../../../../_cloner/components/Pagination"

const pageSize = 100;

const DraftList = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1);

    const draftOrderTools = useGetAllDraftOrder()

    useEffect(() => {
        const filter = {
            PageNumber: currentPage,
            PageSize: pageSize,
        }
        draftOrderTools.mutate(filter)

    }, [currentPage])



    const renderAction = () => {
        return <Button variant="contained" color="secondary" onClick={() => setIsOpen(true)}>
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
                data={[]}
                rows={[]}
                onDoubleClick={() => { }}
            />
            <Pagination pageCount={+draftOrderTools?.data?.totalCount / +pageSize || 0} onPageChange={handlePageChange} />

            <TransitionsModal width="80%" open={isOpen} isClose={() => setIsOpen(false)} title="مشاهده پیش نویس سریال 1254789">
                <div className="mt-4">
                    <ImagePreview base64Strings={[]} />
                </div>
            </TransitionsModal>
        </>
    )
}

export default DraftList