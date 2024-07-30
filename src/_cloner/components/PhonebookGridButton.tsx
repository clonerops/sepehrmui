import { Phone } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'

const PhonebookGridButton = (props: { onClick: any }) => {
    return (
        <Tooltip title={<Typography variant='h3'>شماره های تماس</Typography>}>
            <div onClick={props.onClick} className="cursor-pointer">
                <Phone className="text-green-500" />
            </div>
        </Tooltip>
    )
}

export default PhonebookGridButton