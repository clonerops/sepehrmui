import { useState } from "react";
import { Box, Typography } from "@mui/material"
import { useUploadFileProductInventories } from "../_hooks";
import FileUploadButton from "../../../../../_cloner/components/UploadFileButton";
import FileUpload from "../../../../../_cloner/components/FileUpload";

const UploadFileInventorySepehr = () => {
    const uploadFileMethode = useUploadFileProductInventories();
    const [files, setFiles] = useState<File[]>([]);

  return (
    <>
        <Box className="flex flex-col gap-y-4">
            <Typography variant="h3" color="red">جهت آپلود فایل موجودی روزانه انبار سپهر به نکات ذیل دقت فرمائید:</Typography>
            <ul className="flex flex-col gap-y-2">
                <li><Typography color="primary" variant="h4">1. ابتدا تاریخ فایل موجودی را انتخاب نمایید</Typography></li>
                <li><Typography color="primary" variant="h4">2. فرمت فایل باید بصورت اکسل (xlsx.) باشد</Typography></li>
                <li><Typography color="primary" variant="h4">3. ترتیب فیلدها مهم می باشد: کد کالابرند، کدانبار، موجودی تقریبی، موجودی کف، حداکثر موجودی، حداقل موجودی</Typography></li>
            </ul>
            <FileUpload files={files} setFiles={setFiles} title="فایل موردنظر جهت آپلود را انتخاب کنید" uploadFileMethode={uploadFileMethode}   />
            {/* <FileUploadButton uploadFileMethode={uploadFileMethode} /> */}
        </Box>
    </>
  )
}

export default UploadFileInventorySepehr