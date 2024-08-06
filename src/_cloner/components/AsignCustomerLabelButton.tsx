import { Assignment } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'

const AsignCustomerLabelButton = (props: { onClick: any }) => {
    return (
        <Tooltip title={<Typography variant='h3'>تخصیص برچسب به مشتری</Typography>}>
            <div onClick={props.onClick} className="cursor-pointer">
                <Assignment className="text-fuchsia-500" />
            </div>
        </Tooltip>
    )
}

export default AsignCustomerLabelButton