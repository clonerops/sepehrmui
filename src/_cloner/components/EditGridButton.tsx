import EditIcon from '@mui/icons-material/Edit'
import { Tooltip, Typography } from '@mui/material'

const EditGridButton = (props: { onClick: any }) => {
    return (
        <Tooltip title={<Typography variant='h3'>ویرایش</Typography>}>
            <div onClick={props.onClick} className="cursor-pointer">
                {/* <EditIcon className="text-yellow-500" /> */}
                <EditIcon className="" />
            </div>
        </Tooltip>

    )
}

export default EditGridButton