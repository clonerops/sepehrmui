import { useState } from "react";
import { Typography } from "@mui/material"
import { useUploadFileProductInventories } from "../_hooks";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/snackebar";
import { Formik } from "formik";

import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker";
import FileUploadWithoutWebService from "../../../../_cloner/components/FileUploadWithoutWebService";
import CustomButton from "../../../../_cloner/components/CustomButton";
import moment from "moment-jalaali";
import Backdrop from "../../../../_cloner/components/Backdrop";

const initialValues = {
    inventoryDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD')
}

const UploadFileInventorySepehr = () => {
    const uploadFileMethode = useUploadFileProductInventories();
    const [files, setFiles] = useState<File[]>([]);

    const onSubmit = (values: any) => {
        const formData: any = new FormData();
        files.forEach((file) => {
            formData.append('PriceFile', file);
        });
        formData.append('InventoryDate', values.inventoryDate)

        uploadFileMethode.mutate(formData, {
              onSuccess: (response: any) => {
                  if(response.succeeded) {
                      EnqueueSnackbar(response.message, "success")
                  } else {
                      EnqueueSnackbar(response.data.Message, "error")
                    }
              },
          });
    }
  return (
    <>
        {uploadFileMethode.isLoading && <Backdrop loading={uploadFileMethode.isLoading} />}
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({values, handleSubmit}) => (
                <div className="flex flex-col gap-y-4">
                    <Typography variant="h3" color="red">جهت آپلود فایل موجودی روزانه انبار سپهر به نکات ذیل دقت فرمائید:</Typography>
                    <ul className="flex flex-col gap-y-2">
                        <li><Typography color="primary" variant="h4">1. ابتدا تاریخ فایل موجودی را انتخاب نمایید</Typography></li>
                        <li><Typography color="primary" variant="h4">2. فرمت فایل باید بصورت اکسل (xlsx.) باشد</Typography></li>
                        <li><Typography color="primary" variant="h4">3. ترتیب فیلدها مهم می باشد: کد کالابرند، کدانبار، موجودی تقریبی، موجودی کف، حداکثر موجودی، حداقل موجودی</Typography></li>
                    </ul>
                    <FormikDatepicker name="inventoryDate" label="تاریخ" disabled />
                    <FileUploadWithoutWebService disabled={values.inventoryDate === "" ? true : false}  files={files} setFiles={setFiles} title="فایل موردنظر جهت آپلود را انتخاب کنید"  />

                    <CustomButton onClick={() => handleSubmit()} title="بارگزاری فایل" color="secondary" disabled={values.inventoryDate === "" ? true : false || files.length  === 0} />
                </div>
            )}
        </Formik>
    </>
  )
}

export default UploadFileInventorySepehr