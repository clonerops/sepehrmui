import { Button, Typography } from '@mui/material';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import Zoom from 'react-medium-image-zoom';
import imageCompression from 'browser-image-compression';
import { EnqueueSnackbar } from '../helpers/snackebar';

interface FileUploadProps {
  acceptedFileTypes?: string; // Accepted file types (e.g., 'image/*')
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  capture?: any;
  title?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, setFiles, capture, title = "فایل های ضمیمه را انتخاب کنید" }) => {

  const compressImage = async (file: File) => {
    try {
      const options = {
        maxSizeMB: 0.5,  // حجم فایل کمتر از 0.5 مگابایت
        maxWidthOrHeight: 800,  // حداکثر ارتفاع یا عرض تصویر
        useWebWorker: true
      };
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      return file; // اگر فشرده سازی شکست بخورد، فایل اصلی را برمی‌گرداند
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (files.length > 3) {
      EnqueueSnackbar("امکان آپلود بیش از 4 ضمیمه وجود ندارد", "error");
    } else {
      const compressedFilesPromises = acceptedFiles.map(file => compressImage(file));
      const compressedFiles = await Promise.all(compressedFilesPromises);
      setFiles([...files, ...compressedFiles]);
    }
  };

  const removeFile = (file: File) => {
    const updatedFiles = files.filter((f) => f !== file);
    setFiles(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': ['.pdf']
    }
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-4 border-gray-300"
      >
        <input {...getInputProps({ capture: capture || false })} />
        <Typography>{title}</Typography>
      </div>
      <div>
        <Typography className="pt-4">فایل های انتخاب شده:</Typography>
        <ul className="mt-8 flex gap-x-4">
          {files.map((file, index) => (
            <li className="text-xl " key={index}>
              <Zoom>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{ maxWidth: '50%', maxHeight: '50px' }}
                />
              </Zoom>
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

export default FileUpload;
