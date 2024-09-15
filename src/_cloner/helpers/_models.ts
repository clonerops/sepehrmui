import React from "react"

export interface ICustomButtonProps {
    title: string
    className?: string
    onClick?: any
    disabled?: boolean
    color?: any
    isLoading?: boolean
    fullWidth?: boolean
}


export interface IAccordionProps {
    content: React.ReactNode
    title: string
    deleteOnClick: () => void
}