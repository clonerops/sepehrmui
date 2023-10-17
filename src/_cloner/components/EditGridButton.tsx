import { Box } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'

const EditGridButton = (props: { onClick: any }) => {
    return (
        <Box component="div" onClick={props.onClick} className="cursor-pointer">
            {/* <Box component="div"
                className="cursor-pointer text-black font-bold"
            > */}
                <EditIcon className="text-yellow-500" />
            {/* </Box> */}
        </Box>

    )
}

export default EditGridButton