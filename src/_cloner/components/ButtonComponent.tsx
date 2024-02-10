import { Button, useTheme  } from '@mui/material'
import React from 'react'

type IProps = {
    onClick?: () => void
    children: React.ReactNode
}

const ButtonComponent = (props: IProps) => {
    const {onClick, children } = props;
    const theme = useTheme()
    return (
        <Button onClick={onClick} variant="contained" color={"primary"} className='mt-2 md:mt-0 bg-gradient-to-r from-indigo-500' {...props}>
            {children}
        </Button>

    )
}

export default ButtonComponent