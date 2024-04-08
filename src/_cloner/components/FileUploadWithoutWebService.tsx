import { Button, Typography } from '@mui/material';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { EnqueueSnackbar } from '../helpers/Snackebar';

interface FileUploadProps {
  acceptedFileTypes?: string; // Accepted file types (e.g., 'image/*')
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  title?: string
  disabled?: boolean | undefined
}

const FileUploadWithoutWebService: React.FC<FileUploadProps> = ({ files, setFiles, disabled=false, title="فایل های ضمیمه را انتخاب کنید" }) => {


  const onDrop = (acceptedFiles: File[]) => {
    if (files.length > 1) {
          EnqueueSnackbar("امکان آپلود بیش از 2 ضمیمه وجود ندارد", "error")
    } else {
      setFiles([...files, ...acceptedFiles]);
      
      if (acceptedFiles.length === 0) {
          EnqueueSnackbar("سایز فایل بیش از 200kb می باشد", "error")
        }    
    }

  };

  const removeFile = (file: File) => {
    const updatedFiles = files.filter((f) => f !== file);
    setFiles(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    onDrop,
    disabled: disabled,
    maxSize: 209600, // 60KB in bytes (1KB = 1024 bytes)
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-4 border-gray-300"
      >
        <input {...getInputProps()} />
        <Typography>{title}</Typography>
      </div>
      <div>
        <Typography className="pt-4">فایل های انتخاب شده:</Typography>
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
    </>
  );
};

export default FileUploadWithoutWebService;
