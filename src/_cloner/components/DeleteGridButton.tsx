import DeleteIcon from '@mui/icons-material/Delete'
import { Tooltip, Typography } from '@mui/material'

const DeleteGridButton = (props: { onClick: any }) => {
    return (
        <Tooltip title={<Typography variant='h3'>حذف</Typography>}>
            <div onClick={props.onClick} className="cursor-pointer">
                <DeleteIcon className="text-red-500" />
            </div>
        </Tooltip>
    )
}

export default DeleteGridButton