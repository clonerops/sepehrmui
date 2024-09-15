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
    successTitle: string;
    dangerTitle: string;
}

export interface IFileUploadProps {
    files: File[]
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
}


export interface IBottomDrawerProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}
