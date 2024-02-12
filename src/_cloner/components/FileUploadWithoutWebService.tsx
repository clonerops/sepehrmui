// import { Box, Button, Typography } from '@mui/material';
// import React from 'react';
// import { useDropzone } from 'react-dropzone';

// interface FileUploadProps {
//     acceptedFileTypes?: string; // Accepted file types (e.g., 'image/*')
//     files: File[],
//     setFiles: React.Dispatch<React.SetStateAction<File[]>>
// }

// const FileUpload: React.FC<FileUploadProps> = ({
//     files, setFiles
//     //   acceptedFileTypes = 'image/*',
// }) => {

//     const onDrop = (acceptedFiles: File[]) => {
//         setFiles([...files, ...acceptedFiles]);
//     };

//     const removeFile = (file: File) => {
//         const updatedFiles = files.filter((f) => f !== file);
//         setFiles(updatedFiles);
//     };

//     const { getRootProps, getInputProps } = useDropzone({
//         onDrop,
//         accept: {
//             'image/jpge': ['.jpeg', '.Jpeg'],
//             'image/png': ['.png', '.Png', '.PNG'],
//             'image/jpg': ['.jpg', '.Jpg'],
//         },
//         maxSize: 5242880
//     });

//     return (
//         <Box component="div">
//             <Box component="div" {...getRootProps()} className="border-2 border-dashed p-4 border-gray-300">
//                 <input {...getInputProps()} />
//                 <Typography>فایل های ضمیمه را انتخاب کنید</Typography>
//             </Box>
//             <Box component="div">
//                 <Typography className='pt-4'>فایل های انتخاب شده:</Typography>
//                 <Box component="ul" className='mt-8'>
//                     {files.map((file, index) => (
//                         <Box component="li" className='text-xl' key={index}>
//                             {file.name}
//                             <Button className=' pr-16' onClick={() => removeFile(file)} color="secondary">
//                                 <Typography className='text-red-500'>حذف</Typography>
//                             </Button>
//                         </Box>
//                     ))}
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default FileUpload;
import { Box, Button, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useDropzone } from 'react-dropzone';

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
      enqueueSnackbar("امکان آپلود بیش از 2 ضمیمه وجود ندارد", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" }
      })
    } else {
        setFiles([...files, ...acceptedFiles]);

        if (acceptedFiles.length === 0) {
          enqueueSnackbar("سایز فایل بیش از 200kb می باشد", {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "center" }
          })
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
    <Box component="div">
      <Box
        component="div"
        {...getRootProps()}
        className="border-2 border-dashed p-4 border-gray-300"
      >
        <input {...getInputProps()} />
        <Typography>{title}</Typography>
      </Box>
      <Box component="div">
        <Typography className="pt-4">فایل های انتخاب شده:</Typography>
        <Box component="ul" className="mt-8 flex gap-x-4">
          {files.map((file, index) => (
            <Box component="li" className="text-xl " key={index}>
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
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FileUploadWithoutWebService;
