import { useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material"
import { useUploadFileProductInventories } from "../_hooks";
import FileUploadButton from "../../../../../_cloner/components/UploadFileButton";
import FileUpload from "../../../../../_cloner/components/FileUploadWithoutWebService";
import { Formik } from "formik";
import FormikDatepicker from "../../../../../_cloner/components/FormikDatepicker";
import FileUploadWithoutWebService from "../../../../../_cloner/components/FileUploadWithoutWebService";
import CustomButton from "../../../../../_cloner/components/CustomButton";
import { EnqueueSnackbar } from "../../../../../_cloner/helpers/Snackebar";

const initialValues = {
    date: ""
}

const UploadFileInventorySepehr = () => {
    const uploadFileMethode = useUploadFileProductInventories();
    const [files, setFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);

    const onSubmit = () => {
        // const formData = new FormData();
        // files.forEach((file) => {
        //     formData.append('PriceFile', file);
        // });
        // uploadFileMethode.mutate(formData, {
        //     onUploadProgress: (progressEvent: ProgressEvent) => {
        //       const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        //       setUploadProgress(progress);
        //     },
        //       onSuccess: (response: any) => {
        //           if(response.succeeded) {
        //               EnqueueSnackbar(response.message, "success")
        //           } else {
        //               EnqueueSnackbar(response.data.Message, "error")
        //             }
        //       },
        //   });
    }
  return (
    <>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({values, handleSubmit}) => (
                <Box className="flex flex-col gap-y-4">
                    <Typography variant="h3" color="red">جهت آپلود فایل موجودی روزانه انبار سپهر به نکات ذیل دقت فرمائید:</Typography>
                    <ul className="flex flex-col gap-y-2">
                        <li><Typography color="primary" variant="h4">1. ابتدا تاریخ فایل موجودی را انتخاب نمایید</Typography></li>
                        <li><Typography color="primary" variant="h4">2. فرمت فایل باید بصورت اکسل (xlsx.) باشد</Typography></li>
                        <li><Typography color="primary" variant="h4">3. ترتیب فیلدها مهم می باشد: کد کالابرند، کدانبار، موجودی تقریبی، موجودی کف، حداکثر موجودی، حداقل موجودی</Typography></li>
                    </ul>
                    <FormikDatepicker name="date" label="تاریخ" />
                    <FileUploadWithoutWebService disabled={values.date === "" ? true : false}  files={files} setFiles={setFiles} title="فایل موردنظر جهت آپلود را انتخاب کنید"  />
                    {uploadProgress !== null && <LinearProgress variant="determinate" value={uploadProgress} />}

                    <CustomButton onClick={() => handleSubmit()} title="بارگزاری فایل" color="secondary" disabled={values.date === "" ? true : false || files.length  === 0} />
                    {/* <FileUploadButton uploadFileMethode={uploadFileMethode} /> */}
                </Box>
            )}
        </Formik>
    </>
  )
}

export default UploadFileInventorySepehr