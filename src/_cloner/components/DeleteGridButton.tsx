import { Box } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'

const DeleteGridButton = (props: {onClick: any}) => {
    return (
        <Box component="div" onClick={props.onClick} className="cursor-pointer">
            {/* <Box component="div"
                className="cursor-pointer text-black font-bold"
            > */}
                <DeleteIcon className="text-red-500" />
            {/* </Box> */}
        </Box>

    )
}

export default DeleteGridButton