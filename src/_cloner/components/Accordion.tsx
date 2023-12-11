import {useState} from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { DeleteOutline, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

const Accordion = () => {
    const [show, setShow] = useState<boolean>(false)

    console.log("show", show)
  return (
    <>
        <Box component="div" className='accordion flex justify-between items-center w-full bg-white rounded-md'>
            <Typography className="p-4">گروه فروشندگان نبشی</Typography>
            <Box component="div" className='flex flex-row gap-x-4'>
                <IconButton>
                    <DeleteOutline className='text-red-500' />
                </IconButton>
                <IconButton onClick={() => setShow((prev) => !prev)}>
                    {show ? <KeyboardArrowUp color='secondary' />  : <KeyboardArrowDown color='secondary' />}       
                </IconButton>
            </Box>
        </Box>
        {show &&
            <Box component="main" className="accordion_main w-full bg-slate-200 rounded-md mt-2">
                <Typography className="p-4">گروه فروشندگان نبشی</Typography>
            </Box>
        }
    </>
  )
}

export default Accordion