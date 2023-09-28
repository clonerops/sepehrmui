import { Box, Typography } from '@mui/material';
import React from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
    acceptedFileTypes?: string; // Accepted file types (e.g., 'image/*')
    files: File[],
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const Attachments: React.FC<FileUploadProps> = ({
    files, setFiles
    //   acceptedFileTypes = 'image/*',
}) => {

    const onDrop = (acceptedFiles: File[]) => {
        setFiles([...files, ...acceptedFiles]);
    };

    const removeFile = (file: File) => {
        const updatedFiles = files.filter((f) => f !== file);
        setFiles(updatedFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <Box>
            <Box {...getRootProps()} className="border-2 border-dashed border-primary p-4 cursor-pointer">
                <input {...getInputProps()} />
                <Typography variant="body1">Please Choose File</Typography>
            </Box>
            <Box>
                <Typography variant='h4' className='pt-4'>Selected Files:</Typography>
                <Box component="ul" className='mt-4'>
                    {files.map((file, index) => (
                        <Box component='li' className='text-md' key={index}>
                            {file.name}
                            <Box className='text-red-500 cursor-pointer' onClick={() => removeFile(file)}>Delete</Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Attachments;
