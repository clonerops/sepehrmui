import { Typography } from '@mui/material';
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
        <div>
            <div {...getRootProps()} className="border-2 border-dashed border-primary p-4 cursor-pointer">
                <input {...getInputProps()} />
                <Typography variant="body1">Please Choose File</Typography>
            </div>
            <div>
                <Typography variant='h4' className='pt-4'>Selected Files:</Typography>
                <ul className='mt-4'>
                    {files.map((file, index) => (
                        <li className='text-md' key={index}>
                            {file.name}
                            <div className='text-red-500 cursor-pointer' onClick={() => removeFile(file)}>Delete</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Attachments;
