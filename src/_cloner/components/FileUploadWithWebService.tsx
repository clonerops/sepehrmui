import { Button, Typography, LinearProgress } from '@mui/material';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { EnqueueSnackbar } from '../helpers/Snackebar';

interface FileUploadProps {
  acceptedFileTypes?: string; // Accepted file types (e.g., 'image/*')
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  title?: string
  uploadFileMethode: any
  refetch?: any
}

const FileUploadWithWebService: React.FC<FileUploadProps> = ({ files, setFiles,title="فایل های ضمیمه را انتخاب کنید", uploadFileMethode, refetch }) => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
        formData.append('PriceFile', file);
    });

    uploadFileMethode.mutate(formData, {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setUploadProgress(progress);
      },
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


  const removeFile = (file: File) => {
    const updatedFiles = files.filter((f) => f !== file);
    setFiles(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    onDrop,
    maxSize: 209600, // 60KB in bytes (1KB = 1024 bytes)
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-4 border-gray-300"
      >
        <input {...getInputProps()} />
        <Typography>{title}</Typography>
      </div>
      {uploadProgress !== null && <LinearProgress variant="determinate" value={uploadProgress} />}
      <div>
        {/* <Typography className="pt-4">فایل های انتخاب شده:</Typography> */}
        <ul className="mt-8 flex gap-x-4">
          {files.map((file, index) => (
            <li className="text-xl " key={index}>
              {/* {file.name} */}
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ maxWidth: '50%', maxHeight: '50px' }}
              />
              <Button
                className="pr-16"
                onClick={() => removeFile(file)}
                color="secondary"
              >
                <Typography className="text-red-500">حذف</Typography>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUploadWithWebService;
