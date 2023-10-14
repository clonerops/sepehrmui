import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUploadFileProductPrice } from '../../app/modules/product/core/_hooks';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';

interface FileUploadProps {
    acceptedFileTypes?: string;
    setSnackeOpen: any;
    requestMessage: any;
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}

const FileUploadButton: React.FC<FileUploadProps> = ({ setSnackeOpen, requestMessage, refetch }) => {
    const acceptedFileTypes: any =
        '.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const [files, setFiles] = useState<File[]>([]);

    const uploadFile: any = useUploadFileProductPrice();

    const onDrop = (acceptedFiles: File[]) => {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            formData.append('PriceFile', file);
        });

        uploadFile.mutate(formData, {
            onSuccess: (data: any) => {
                requestMessage(data?.data?.Message || data?.message)
                setSnackeOpen(true)
                refetch()
            },
        });

        setFiles([...files, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: acceptedFileTypes,
        maxSize: 5242880,
    });

    return (
        <>
            <Box component="div">
                <Button {...getRootProps()} variant="outlined" color="secondary">
                    <input {...getInputProps()} />
                    <Typography>آپلود فایل</Typography>
                </Button>
            </Box>
        </>
    );
};

export default FileUploadButton;
