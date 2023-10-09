import * as Yup from "yup";
import { useState } from "react";
import { Form, Formik } from "formik";
import { useRegisterUser } from "../core/_hooks";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import FormikInput from "../../../../_cloner/components/FormikInput";
import PositionedSnackbar from "../../../../_cloner/components/Snackbar";
import React from "react";

const CreateUser = () => {
    const loginSchema = Yup.object().shape({
        firstName: Yup.string().required("نام الزامی است"),
        lastName: Yup.string().required("نام خانوادگی الزامی است"),
        email: Yup.string().required("ایمیل الزامی است"),
        userName: Yup.string().required("نام کاربری الزامی است"),
        password: Yup.string().required("کلمه عبور الزامی است"),
        confirmPassword: Yup.string().required("تکرار کلمه عبور الزامی است"),
    });

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
    };

    const { mutate, data } = useRegisterUser();
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);
    return (
        <>
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        data?.data?.errors?.ConfirmPassword[0] || 
                        data?.data?.errors?.Password[0] ||
                        data?.data?.errors?.Email[0] ||
                        data?.data?.errors?.UserName[0] ||
                        data?.data?.Message ||
                        data?.message || "ایجاد کاربر با موفقیت انجام شد"
                    }
                />
            )}
            <Container>
                <Card className="p-8">
                    <Typography color="secondary" variant="h1" className="pb-8">ایجاد کاربر جدید</Typography>
                    <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={async (values, { setStatus, setSubmitting }) => {
                        try {
                            mutate(values, {
                                onSuccess: (message) => {
                                    setSnackeOpen(true)
                                },
                            });
                        } catch (error) {
                            setStatus("اطلاعات ورود نادرست می باشد");
                            setSubmitting(false);
                        }
                    }}>
                        {({ handleSubmit }) => {
                            return <Form onSubmit={handleSubmit}>
                                <Box component="div" className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
                                    <FormikInput boxClassName="m-2" name="firstName" label="نام" />
                                    <FormikInput boxClassName="m-2" name="lastName" label="نام خانوادگی" />
                                </Box>
                                <FormikInput boxClassName="m-2" name="email" label="ایمیل" />
                                <FormikInput boxClassName="m-2" name="userName" label="نام کاربری" />
                                <Box component="div" className="grid gap-4 grid-cols-1 md:grid-cols-2">
                                    <FormikInput boxClassName="m-2" name="password" label="کلمه عبور" type="password" />
                                    <FormikInput boxClassName="m-2" name="confirmPassword" label="تکرار کلمه عبور" type="password" />
                                </Box>
                                <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                    <Typography variant="h3" className="px-8 py-2">ثبت کاربر</Typography>
                                </Button>
                            </Form>
                        }}
                    </Formik>
                </Card>
            </Container>
        </>
    );
};

export default CreateUser;
