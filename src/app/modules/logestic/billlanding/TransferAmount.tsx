import { Box, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import FormikInput from "../../../../_cloner/components/FormikInput";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";

const TransferAmount = () => {
    return (
        <>
            <Box className="flex flex-row justify-between items-center flex-wrap gap-4 bg-slate-100 p-4 rounded-md mt-4">
                <Box className="flex flex-col gap-y-4">
                    <Typography variant="h4">کد کالا</Typography>
                    <Typography variant="h3" className="text-gray-500">12559</Typography>
                </Box>
                <Box className="flex flex-col gap-y-4">
                    <Typography variant="h4">نام کالا</Typography>
                    <Typography variant="h3" className="text-gray-500">نبشی 3 فوق سبک</Typography>
                </Box>
                <Box className="flex flex-col gap-y-4">
                    <Typography variant="h4">برند</Typography>
                    <Typography variant="h3" className="text-gray-500">فولاد مبارکه</Typography>
                </Box>
                <Box className="flex flex-col gap-y-4">
                    <Typography variant="h4">موجودی</Typography>
                    <Typography variant="h3" className="text-gray-500">5,000,000,000 کیلو</Typography>
                </Box>
            </Box>
            <Formik initialValues={{}} onSubmit={() => {}}>
                {({}) => {
                    return <Form className="my-4">
                        <FormikInput name="amount" label="مقدار موردنظر جهت انتقال" />
                        <Box className="flex justify-end items-end my-4">
                            <ButtonComponent onClick={() => {}}>
                                <Typography className="text-white">ثبت</Typography>
                            </ButtonComponent>
                        </Box>
                    </Form>;    
                }}
            </Formik>
        </>
    );
};

export default TransferAmount;
