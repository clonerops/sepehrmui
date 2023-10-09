import { Box } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'

const DeleteGridButton = (props: {onClick: any}) => {
    return (
        <Box component="div" onClick={props.onClick} className="bg-red-500 px-4 py-2 cursor-pointer rounded-md">
            <Box component="div"
                className="cursor-pointer text-black font-bold"
            >
                <DeleteIcon />
            </Box>
        </Box>

    )
}

export default DeleteGridButton