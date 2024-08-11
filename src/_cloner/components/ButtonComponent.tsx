import { Button  } from '@mui/material'
import React from 'react'

type IProps = {
    onClick?: () => void
    disabled?: boolean
    children: React.ReactNode
}

const ButtonComponent = (props: IProps) => {
    const {onClick, disabled, children } = props;
    return (
        <Button type='submit' onClick={onClick} disabled={disabled} variant="contained" color={"secondary"} className={disabled ? "bg-gray-500" : "!w-fit mt-2 md:mt-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4"} {...props}>
            {children}
        </Button>

    )
}

export default ButtonComponent