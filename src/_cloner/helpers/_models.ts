import React from "react"

export interface ICustomButtonProps {
    title: string
    className?: string
    onClick?: () => void
    disabled?: boolean
    color?: "secondary" | "primary"
    isLoading?: boolean
    fullWidth?: boolean
}


export interface IAccordionProps {
    content: React.ReactNode
    title: string
    deleteOnClick: () => void
}


export interface IActiveTextProps {
    params: { value: boolean }
    successTitle: string
    dangerTitle: string
}


export interface IFileUploadProps {
    files: File[]
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
}


export interface IBackdropProps {
    loading: boolean
}


export interface IBottomDrawerProps {
    open: boolean
    onClose: () => void
    children: React.ReactNode
    title: string
}


export interface ICardInformationProps {
    title: string
    cardClassName: string
    value: any
}


export interface IBubbleChartProps {
    data?: any
    isLoading?: boolean
    isError?: boolean
}


export interface ICardTitleValueProps {
    title: string
    className?: string
    index?: string | number
    icon: React.ReactNode
    value: string | number
}


export interface ICardWithIconsProps {
    icon: React.ReactNode
    title: string
    value: string | number,
    iconClassName: string
    textClassName?: string
}

