import * as Yup from "yup";
import { useState } from "react";
import {  Formik } from "formik";
import { useRegisterUser } from "../core/_hooks";
import { Box, Button, Container, Typography } from "@mui/material";
import FormikInput from "../../../../_cloner/components/FormikInput";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import { IUser } from "../core/_models";
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions";

const registerValidation = Yup.object().shape({
    firstName: Yup.string().required("نام الزامی است"),
    lastName: Yup.string().required("نام خانوادگی الزامی است"),
    email: Yup.string()
        .email("فرمت ایمیل نمی باشد")
        .required("ایمیل الزامی است"),
    userName: Yup.string().min(6).required("نام کاربری الزامی است"),
    mobileNo: Yup.string().min(11).max(11).required("موبایل الزامی است"),
    password: Yup.string()
        .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "کلمه عبور با شامل عدد، حروف و کاراکتر های خاص باشد "
        )
        .required("کلمه عبور الزامی است"),
    confirmPassword: Yup.string()
        .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "کلمه عبور با شامل عدد، حروف و کاراکتر های خاص باشد "
        )
        .required("تکرار کلمه عبور الزامی است")
        .oneOf([Yup.ref("password")], "تکرار کلمه عبور صحیح نمی باشد"),
});

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    userName: "",
    password: "",
    confirmPassword: "",
};

const UserForm = () => {
    // const { id }: any = useParams();
    const { mutate, data } = useRegisterUser();
    // const detailTools = useGetUserDetail();
    // const updateTools = useUpdateUser();
    // const navigate = useNavigate();
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);

    const fields: FieldType[][] = [
        [
            { label: "نام", name: "firstName", type: "input" },
            { label: "نام خانوادگی", name: "lastName", type: "input" },
        ],
        [
            { label: "ایمیل", name: "email", type: "input" },
            { label: "موبایل", name: "mobileNo", type: "input" },
        ],
        [{ label: "نام کاربری", name: "userName", type: "username" }],
        [
            { label: "رمز عبور", name: "password", type: "password" },
            {
                label: "تکرار رمز عبور",
                name: "confirmPassword",
                type: "password",
            },
        ],
    ];

    const parseFields = (fields: FieldType, values: any) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "password":
                return <FormikInput type="password" {...rest} />;
            default:
                return <FormikInput {...rest} />;
        }
    };


    const onAdd = (values: IUser) => {
        try {
            mutate(values, {
                onSuccess: (message) => {
                    if(message?.successed) {
                        validateAndEnqueueSnackbar("کاربر با موفقیت ایجاد گردید", "success")
                    } else {
                        validateAndEnqueueSnackbar(message?.data.Message, "error")
                    }
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (values: IUser) => {
        // if (id) onUpdate(values);
        // else onAdd(values);
        onAdd(values);
    };



    return (
        <>
            {/* {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        data?.data?.errors?.ConfirmPassword[0] ||
                        data?.data?.errors?.Password[0] ||
                        data?.data?.errors?.Email[0] ||
                        data?.data?.errors?.UserName[0] ||
                        data?.data?.Message ||
                        data?.message ||
                        "ایجاد کاربر با موفقیت انجام شد"
                    }
                />
            )} */}
            <Container>
                <ReusableCard>
                    <Typography color="primary" variant="h2" className="pb-8">
                        ایجاد کاربر جدید
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={registerValidation}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit, values }) => {
                            return (
                                <>
                                    {fields.map((rowFields) => (
                                        <Box
                                            component="div"
                                            className="flex items-start gap-x-4 my-4 justify-between"
                                        >
                                            {rowFields.map((field) =>
                                                parseFields(field, values)
                                            )}
                                        </Box>
                                    ))}

                                    {/* <Box
                                        component="div"
                                        className="grid grid-cols-1 gap-x-4 md:grid-cols-2"
                                    >
                                        <FormikInput
                                            boxClassName="m-2"
                                            name="firstName"
                                            label="نام"
                                        />
                                        <FormikInput
                                            boxClassName="m-2"
                                            name="lastName"
                                            label="نام خانوادگی"
                                        />
                                        <FormikInput
                                            boxClassName="m-2"
                                            name="email"
                                            label="ایمیل"
                                        />
                                        <FormikInput
                                            boxClassName="m-2"
                                            name="userName"
                                            label="نام کاربری"
                                        />
                                        <FormikInput
                                            boxClassName="m-2"
                                            name="password"
                                            label="کلمه عبور"
                                            type="password"
                                        />
                                        <FormikInput
                                            boxClassName="m-2"
                                            name="confirmPassword"
                                            label="تکرار کلمه عبور"
                                            type="password"
                                        />
                                    </Box> */}
                                    <Box
                                        component="div"
                                        className="flex justify-end items-end"
                                    >
                                        <Button
                                            onClick={() => handleSubmit()}
                                            variant="contained"
                                            color="secondary"
                                        >
                                            <Typography
                                                variant="h3"
                                                className="px-8 py-1"
                                            >
                                                ثبت کاربر
                                            </Typography>
                                        </Button>
                                    </Box>
                                </>
                            );
                        }}
                    </Formik>
                </ReusableCard>
            </Container>
        </>
    );
};

export default UserForm;
