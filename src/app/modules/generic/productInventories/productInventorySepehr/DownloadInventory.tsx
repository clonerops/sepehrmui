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
import { DownloadExcelBase64File } from "../../../../../_cloner/helpers/DownloadFiles";
import { exportProductInventoriesHistory } from "../_requests";

const initialValues = {
    inventoryDate: ""
}

const DownloadInventory = () => {

    const onSubmit = async (values: any) => {
        const filter = { uploadedDate: values.inventoryDate }
        try {
            const response: any = await exportProductInventoriesHistory(filter);
            const outputFilename = `ProductInventories${Date.now()}.csv`;
            DownloadExcelBase64File(response?.data, outputFilename);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ values, handleSubmit }) => (
                    <Box className="flex flex-col gap-y-4">
                        <Typography variant="h3" color="red">جهت آپلود فایل موجودی روزانه انبار سپهر به نکات ذیل دقت فرمائید:</Typography>
                        <ul className="flex flex-col gap-y-2">
                            <li><Typography color="primary" variant="h4">1. ابتدا تاریخ فایل موجودی را انتخاب نمایید</Typography></li>
                        </ul>
                        <FormikDatepicker name="inventoryDate" label="تاریخ" />
                        <CustomButton onClick={() => handleSubmit()} title="دانلود فایل" color="secondary" disabled={values.inventoryDate === "" ? true : false} />
                    </Box>
                )}
            </Formik>
        </>
    )
}

export default DownloadInventory