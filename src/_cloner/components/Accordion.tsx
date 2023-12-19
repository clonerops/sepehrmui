import {useState, ReactNode} from 'react'
import { Box, Typography, IconButton, Button } from '@mui/material'
import { DeleteOutline, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

type Props = {
    content: ReactNode
    title: string
    deleteOnClick: () => void
}

const Accordion = (props: Props) => {
    const { content, title, deleteOnClick } = props;

    const [state, setState] = useState<{show: boolean, showDelete: boolean}>({
        show: false,
        showDelete: false
    })

    return (
    <>
        <Box component="div" className='accordion flex justify-between items-center w-full bg-white rounded-md my-1'>
            <Typography className="p-4">{title}</Typography>
            <Box component="div" className='flex flex-row gap-x-4'>
                <IconButton onClick={() => setState({show: false, showDelete: !state.showDelete})}>
                    <DeleteOutline className='text-red-500' />
                </IconButton>
                <IconButton onClick={() => setState({show: !state.show, showDelete: false})}>
                    {state.show ? <KeyboardArrowUp color='secondary' />  : <KeyboardArrowDown color='secondary' />}       
                </IconButton>
            </Box>
        </Box>
        {state.showDelete &&
            <Box component="main" className="accordion_main w-full bg-slate-200 rounded-md mt-2">
                <Typography className="p-4">
                    آیا از حذف این گروه اطمینان دارید؟
                </Typography>
                <Button onClick={deleteOnClick} className='!bg-red-500 !text-white'><Typography>حذف</Typography></Button>
                <Button onClick={() => setState({show: false, showDelete: false})} className='!border-2 !border-blue-500 !text-blue-500'><Typography>انصراف</Typography></Button>
            </Box>
        }
        {state.show &&
            <>
                {content}
            </>
        }
    </>
  )
}

export default Accordion