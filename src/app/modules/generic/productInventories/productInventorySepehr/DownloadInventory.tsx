import { Typography } from "@mui/material"
import { Formik } from "formik";
import FormikDatepicker from "../../../../../_cloner/components/FormikDatepicker";
import { exportProductInventoriesHistory } from "../_requests";
import CustomButton from "../../../../../_cloner/components/CustomButton";
import { DownloadExcelBase64File } from "../../../../../_cloner/helpers/DownloadFiles";

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
                    <div className="flex flex-col gap-y-4">
                        <Typography variant="h3" color="red">جهت آپلود فایل موجودی روزانه انبار سپهر به نکات ذیل دقت فرمائید:</Typography>
                        <ul className="flex flex-col gap-y-2">
                            <li><Typography color="primary" variant="h4">1. ابتدا تاریخ فایل موجودی را انتخاب نمایید</Typography></li>
                        </ul>
                        <FormikDatepicker name="inventoryDate" label="تاریخ" />
                        <CustomButton onClick={() => handleSubmit()} title="دانلود فایل" color="secondary" disabled={values.inventoryDate === "" ? true : false} />
                    </div>
                )}
            </Formik>
        </>
    )
}

export default DownloadInventory