import React from "react";
import Inputs from "./Inputs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal } from "@mui/material";

const ResetPassword = (props: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const resetPasswordSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "تعداد کاراکتر کمتر از 3 مجاز نمی باشد")
            .max(50, "تعداد کاراکتر بیشتر از 50 مجاز نمی باشد")
            .required("نام کاربری الزامی است"),
        password: Yup.string()
            .min(3, "تعداد کاراکتر کمتر از 3 مجاز نمی باشد")
            .max(50, "تعداد کاراکتر بیشتر از 50 مجاز نمی باشد")
            .required("رمز عبور الزامی است"),
        confirmPassword: Yup.string()
            .min(3, "تعداد کاراکتر کمتر از 3 مجاز نمی باشد")
            .max(50, "تعداد کاراکتر بیشتر از 50 مجاز نمی باشد")
            .required("رمز عبور الزامی است"),
    });

    const initialValues = {
        username: "",
        password: "",
        confirmPassword: "",
    };
    const formik = useFormik({
        initialValues,
        validationSchema: resetPasswordSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            try {
                window.location.reload();
            } catch (error) {
                setStatus("اطلاعات ورود نادرست می باشد");
                setSubmitting(false);
            }
        },
    });

    return (
        <Modal
            open={props.isOpen}
            onClose={() => props.setIsOpen(false)}
        >
            <form className="tw-flex tw-justify-center tw-items-center tw-flex-col tw-mx-16 tw-my-8">
                <div className="tw-w-full">
                    <Inputs
                        type="text"
                        login={true}
                        getFieldProps={formik.getFieldProps}
                        touched={formik.touched.username}
                        errors={formik.errors.username}
                        name={"username"}
                        title="نام کاربری"
                    ></Inputs>
                </div>
                <div className="tw-w-full">
                    <Inputs
                        type="text"
                        login={true}
                        getFieldProps={formik.getFieldProps}
                        touched={formik.touched.password}
                        errors={formik.errors.password}
                        name={"password"}
                        title="کلمه عبور جدید"
                    ></Inputs>
                </div>
                <div className="tw-w-full">
                    <Inputs
                        type="text"
                        login={true}
                        getFieldProps={formik.getFieldProps}
                        touched={formik.touched.confirmPassword}
                        errors={formik.errors.confirmPassword}
                        name={"confirmPassword"}
                        title="تکرار کلمه عبور جدید"
                    ></Inputs>
                </div>
                <div className="d-grid tw-mb-10 tw-w-50">
                    <button
                        type="submit"
                        id="kt_sign_in_submit"
                        className="btn btn-primary"
                        disabled={formik.isSubmitting || !formik.isValid}
                    >
                        {/* {!loading && ( */}
                        <span className="indicator-label">تغییر کلمه عبور</span>
                        {/* )} */}
                        {/* {loading && (
                            <span
                                className="indicator-progress"
                                style={{ display: "block" }}
                            >
                                درحال پردازش...
                                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        )} */}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ResetPassword;
