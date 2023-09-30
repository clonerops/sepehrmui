import { Box } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'

const EditGridButton = (props: { onClick: any }) => {
    return (
        <Box component="div" onClick={props.onClick} className="bg-yellow-500 px-4 py-2 cursor-pointer rounded-md">
            <Box component="div"
                className="cursor-pointer text-white"
            >
                <EditIcon />
            </Box>
        </Box>

    )
}

export default EditGridButton