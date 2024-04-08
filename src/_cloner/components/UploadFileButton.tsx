import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';

import { EnqueueSnackbar } from '../helpers/Snackebar';

interface FileUploadProps {
    acceptedFileTypes?: string;
    refetch?: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>;
    uploadFileMethode: any
}

const FileUploadButton: React.FC<FileUploadProps> = ({ refetch, uploadFileMethode }) => {
    const acceptedFileTypes: any =
        '.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const [files, setFiles] = useState<File[]>([]);


    const onDrop = (acceptedFiles: File[]) => {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            formData.append('PriceFile', file);
        });

        uploadFileMethode.mutate(formData, {
            onSuccess: (response: any) => {
                if(response.succeeded) {
                    EnqueueSnackbar(response.message, "success")
                    if(refetch) refetch()
                } else {
                    EnqueueSnackbar(response.data.Message, "error")
                  }
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
            <div>
                <Button {...getRootProps()} variant="outlined" color="secondary">
                    <input {...getInputProps()} />
                    <Typography>آپلود فایل</Typography>
                </Button>
            </div>
        </>
    );
};

export default FileUploadButton;
