import * as Yup from "yup";
import { Formik } from "formik";
import { useRegisterUser } from "../core/_hooks";
import { Button, Container, Typography } from "@mui/material";
import FormikInput from "../../../../_cloner/components/FormikInput";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";

const CreateUser = () => {
    const loginSchema = Yup.object().shape({
        firstName: Yup.string().required("نام الزامی است"),
        lastName: Yup.string().required("نام خانوادگی الزامی است"),
        email: Yup.string().email("فرمت ایمیل نمی باشد").required("ایمیل الزامی است"),
        userName: Yup.string().min(6).required("نام کاربری الزامی است"),
        password: Yup.string().matches(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'کلمه عبور با شامل عدد، حروف و کاراکتر های خاص باشد '
          ).required("کلمه عبور الزامی است"),
        confirmPassword: Yup.string().matches(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'کلمه عبور با شامل عدد، حروف و کاراکتر های خاص باشد '
          ).required("تکرار کلمه عبور الزامی است").oneOf([Yup.ref('password')], 'تکرار کلمه عبور صحیح نمی باشد'),
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
    return (
        <>
            <Container>
                <ReusableCard>
                    <Typography color="primary" variant="h2" className="pb-8">ایجاد کاربر جدید</Typography>
                    <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={async (values, { setStatus, setSubmitting }) => {
                        try {
                            mutate(values, {
                                onSuccess: (response) => {
                                    if(response.succeeded) {
                                        EnqueueSnackbar(
                                            response?.data?.errors?.ConfirmPassword[0] || 
                                            response?.data?.errors?.Password[0] ||
                                            response?.data?.errors?.Email[0] ||
                                            response?.data?.errors?.UserName[0] ||
                                            response?.data?.Message ||
                                            response?.message || "ایجاد کاربر با موفقیت انجام شد", "success")
                                      } else {
                                        EnqueueSnackbar(response.data.Message, "error",)
                                      }
                                    },
                            });
                        } catch (error) {
                            setStatus("اطلاعات ورود نادرست می باشد");
                            setSubmitting(false);
                        }
                    }}>
                        {({ handleSubmit }) => {
                            return <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
                                    <FormikInput boxClassName="m-2" name="firstName" label="نام" />
                                    <FormikInput boxClassName="m-2" name="lastName" label="نام خانوادگی" />
                                    <FormikInput boxClassName="m-2" name="email" label="ایمیل" />
                                    <FormikInput boxClassName="m-2" name="userName" label="نام کاربری" />
                                    <FormikInput boxClassName="m-2" name="password" label="کلمه عبور" type="password" />
                                    <FormikInput boxClassName="m-2" name="confirmPassword" label="تکرار کلمه عبور" type="password" />
                                </div>
                                <div className="flex justify-end items-end">
                                    <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                        <Typography variant="h3" className="px-8 py-1">ثبت کاربر</Typography>
                                    </Button>
                                </div>
                            </form>
                        }}
                    </Formik>
                </ReusableCard>
            </Container>
        </>
    );
};

export default CreateUser;
