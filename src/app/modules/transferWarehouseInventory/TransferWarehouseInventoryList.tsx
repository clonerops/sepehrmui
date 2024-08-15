import { Tooltip, Typography } from "@mui/material"
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import { TransferWarehouseInventoryColumn } from "../../../_cloner/helpers/columns"
import { Visibility } from "@mui/icons-material"
import { useEffect, useState } from "react"
import TransitionsModal from "../../../_cloner/components/ReusableModal"
import MuiTable from "../../../_cloner/components/MuiTable"
import SearchFromBack from "../../../_cloner/components/SearchFromBack"
import ReusableCard from "../../../_cloner/components/ReusableCard"
import { useGetTransferWarehouseListsFiltered } from "./_hooks"
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar"

const TransferWarehouseInventoryList = () => {
    const transferWarehouseInventoryTools = useGetTransferWarehouseListsFiltered()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [itemSelected, setItemSelected] = useState<any>({})

    const handleFilter = (filters: {}) => {
        transferWarehouseInventoryTools.mutate(filters, {
            onSuccess: (response) => {
                if(!response.succeeded)
                    return EnqueueSnackbar(response.data.Message, "error") 
            }
        })
     }

     useEffect(() => {
        handleFilter({})
     }, [])

    const renderAction = (item: any) => {
        return (
            <Tooltip title={<Typography variant='h3'>مشاهده جزئیات</Typography>}>
                <div className="flex gap-x-4">
                    <Visibility onClick={() => handleOpen(item?.row)} className="text-yellow-500" />
                </div>
            </Tooltip>

        )
    }

    const handleOpen = (item: any) => {
        setItemSelected(item)
        setIsOpen(true)
    }


    const TransferWarehouseDetailColumn = [
        { id: 1, header: "نام کالا", accessor: "productName" },
        { id: 2, header: "نام برند", accessor: "brandName" },
        { id: 3, header: "مقدار انتقال", accessor: "transferAmount" },
    ]

    return (
        <ReusableCard>
            <SearchFromBack inputName='id' initialValues={{ id: "" }} onSubmit={handleFilter} label="شماره انتقال" />
            <MuiDataGrid
                rows={transferWarehouseInventoryTools?.data?.data}
                data={transferWarehouseInventoryTools?.data?.data}
                columns={TransferWarehouseInventoryColumn(renderAction)}
            />

            <TransitionsModal width="50%" title="جزئیات انتقال کالا" open={isOpen} isClose={() => setIsOpen(false)}>
                <MuiTable tooltipTitle={""} onDoubleClick={() => { }} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={itemSelected.details} columns={TransferWarehouseDetailColumn} />
            </TransitionsModal>

        </ReusableCard>
    )
}

export default TransferWarehouseInventoryList