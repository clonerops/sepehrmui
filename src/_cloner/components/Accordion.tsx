import {useState, FC} from 'react'
import { Typography, IconButton, Button } from '@mui/material'
import { DeleteOutline, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { IAccordionProps } from '../helpers/_models';

const Accordion:FC<IAccordionProps> = ({content, title, deleteOnClick}) => {

    const [state, setState] = useState<{show: boolean, showDelete: boolean}>({
        show: false,
        showDelete: false
    })

    return (
    <>
        <div className='accordion flex justify-between items-center w-full bg-white rounded-md my-1'>
            <Typography className="p-4">{title}</Typography>
            <div className='flex flex-row gap-x-4'>
                <IconButton onClick={() => setState({show: false, showDelete: !state.showDelete})}>
                    <DeleteOutline className='text-red-500' />
                </IconButton>
                <Button variant="contained" color='primary' onClick={() => setState({show: !state.show, showDelete: false})}>
                   <Typography>مدیریت دسترسی</Typography> {state.show ? <KeyboardArrowUp color='secondary' />  : <KeyboardArrowDown color='secondary' />}       
                </Button>
            </div>
        </div>
        {state.showDelete &&
            <div className="accordion_main w-full bg-slate-200 rounded-md mt-2">
                <Typography className="p-4">
                    آیا از حذف این گروه اطمینان دارید؟
                </Typography>
                <Button onClick={deleteOnClick} className='!bg-red-500 !text-white'><Typography>حذف</Typography></Button>
                <Button onClick={() => setState({show: false, showDelete: false})} className='!border-2 !border-blue-500 !text-blue-500'><Typography>انصراف</Typography></Button>
            </div>
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