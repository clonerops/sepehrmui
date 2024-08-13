import { Tooltip, Typography } from "@mui/material"
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import { TransferWarehouseInventoryColumn } from "../../../_cloner/helpers/columns"
import { Visibility } from "@mui/icons-material"
import { useState } from "react"
import TransitionsModal from "../../../_cloner/components/ReusableModal"
import MuiTable from "../../../_cloner/components/MuiTable"
import SearchFromBack from "../../../_cloner/components/SearchFromBack"
import ReusableCard from "../../../_cloner/components/ReusableCard"

const TransferWarehouseInventoryList = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [itemSelected, setItemSelected] = useState<any>({})

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

    const handleFilter = () => { }

    const TransferWarehouseDetailColumn = [
        { id: 1, header: "کد کالا", accessor: "productCode" },
        { id: 2, header: "نام کالا", accessor: "productCode" },
        { id: 3, header: "مقدار انتقال", accessor: "productCode" },
    ]



    return (
        <ReusableCard>
            <SearchFromBack inputName='orderCode' initialValues={{ orderCode: "" }} onSubmit={handleFilter} label="شماره سفارش" />
            <MuiDataGrid
                rows={[{}]}
                data={[{}]}
                columns={TransferWarehouseInventoryColumn(renderAction)}
            />

            <TransitionsModal width="50%" title="جزئیات انتقال کالا" open={isOpen} isClose={() => setIsOpen(false)}>
                <MuiTable tooltipTitle={""} onDoubleClick={() => { }} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={[]} columns={TransferWarehouseDetailColumn} />
            </TransitionsModal>

        </ReusableCard>
    )
}

export default TransferWarehouseInventoryList