import { Box, Button, LinearProgress, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUploadFileProductPrice } from '../../app/modules/product/core/_hooks';

interface FileUploadProps {
    acceptedFileTypes?: string; // Accepted file types (e.g., 'image/*')
    files: File[],
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const FileUploadButton: React.FC<FileUploadProps> = ({
    files, setFiles
    //   acceptedFileTypes = 'image/*',
}) => {
    const acceptedFileTypes: any = '.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadFile: any = useUploadFileProductPrice()

    const onDrop = (acceptedFiles: File[]) => {
        setFiles([...files, ...acceptedFiles]);

        const file = acceptedFiles[0];
        
        const formData = new FormData();
        formData.append('PriceFile', file);
        console.log('formData', formData);
        
        const onUploadProgresssBar = (progressEvent: any) => {
            // Calculate and update the upload progress
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            uploadFile.setUploadProgress(progress);
        }
        uploadFile.mutate(formData,  onUploadProgresssBar, {
          onSuccess: (data: any) => {
          }
        })
        
    };

    const removeFile =   (file: File) => {
        const updatedFiles = files.filter((f) => f !== file);
        setFiles(updatedFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: acceptedFileTypes,
        maxSize: 5242880
    });

    return (
        <Box component="div">
            <Button {...getRootProps()} variant='outlined' color='secondary'>
                <input {...getInputProps()} />
                <Typography>آپلود فایل</Typography>
            </Button>
            {uploadProgress > 0 && <LinearProgress variant="determinate" value={uploadProgress} />}
        </Box>
    );
};

export default FileUploadButton;
