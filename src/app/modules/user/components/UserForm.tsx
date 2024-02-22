import * as Yup from "yup";
import {  Formik } from "formik";
import { useGetUpdateUser, useGetUserDetail, useRegisterUser } from "../core/_hooks";
import { Box, Button, Container, Typography } from "@mui/material";
import FormikInput from "../../../../_cloner/components/FormikInput";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import { IUser } from "../core/_models";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";
import { useEffect } from "react";
import Backdrop from "../../../../_cloner/components/Backdrop";

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
    // roleId: []
};

type Props = {
    id?: any
    onClose?: React.Dispatch<React.SetStateAction<boolean>> | any
    refetchUser?:  <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>> | any
}

const UserForm = (props: Props) => {
    const {id, onClose, refetchUser} = props;
    const { mutate, isLoading } = useRegisterUser();
    const detailTools = useGetUserDetail();
    const updateTools = useGetUpdateUser();

    const isNew = !id;

    useEffect(() => {
        detailTools.mutate(id)
    }, [id])

    const fields: FieldType[][] = [
        [
            { label: "نام", name: "firstName", type: "input" },
            { label: "نام خانوادگی", name: "lastName", type: "input" },
        ],
        [
            { label: "ایمیل", name: "email", type: "email" },
            { label: "موبایل", name: "mobileNo", type: "mobile" },
            { label: "نام کاربری", name: "userName", type: "username" }
        ],
        [
            { label: "رمز عبور", name: "password", type: "password" },
            {
                label: "تکرار رمز عبور",
                name: "confirmPassword",
                type: "password",
            },
        ], 
    ];

    const parseFields = (fields: FieldType) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "password":
                return <FormikInput type="password" disabled={!isNew} {...rest} />;
            case "email":
                return <FormikInput placeholder="example@gmail.com" {...rest} />;
            case "mobile":
                return <FormikInput placeholder="091299999999" {...rest} />;
            default:
                return <FormikInput {...rest} />;
        }
    };


    const onAdd = (values: IUser) => {
        const formData = {
            ...values,
            userRoles: values?.roleId?.map((item: string) => (
                {roleId: item}
            ))
            
        }
        try {
            mutate(formData, {
                onSuccess: (message) => {
                    if(message?.succeeded) {
                        EnqueueSnackbar(message?.message, "success")
                       if(refetchUser) refetchUser()
                        onClose()
                    } else {
                        EnqueueSnackbar(message?.data.Message, "error")
                    }
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onUpdate = (values: IUser) => {
        const formData = {
            ...values,
            userRoles: values?.roleId?.map((item: string) => (
                
                {
                    roleId: item,
                    userId: id 
                }
            ))
        }
        try {
            updateTools.mutate(formData, {
                onSuccess: (message) => {
                    if(message?.succeeded) {
                        EnqueueSnackbar("ویرایش با موفقیت انجام شد.", "success")
                       if(refetchUser) refetchUser()
                        onClose()
                    } else {
                        EnqueueSnackbar(message?.data.Message, "error")
                    }
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (values: IUser) => {
        if (id) onUpdate(values);
        else onAdd(values);
    };

    return (
        <>
            {isLoading || updateTools.isLoading && <Backdrop loading={isLoading || updateTools.isLoading} />}
            <Container>
                <ReusableCard>
                    {detailTools.isLoading ? (<Typography>درحال بارگزاری ....</Typography>) : (
                        <>
                            <Typography color="primary" variant="h2" className="pb-8">
                                {isNew ? "ثبت کاربر جدید" : "ویرایش کاربر"}
                            </Typography>
                            <Formik
                                enableReinitialize
                                initialValues={isNew ? initialValues : {...initialValues, ...detailTools?.data?.data, 
                                    roleId:  detailTools?.data?.data.userRoles.map((item: {roleId: string}) => item.roleId) || [] 
                                }}
                                validationSchema={isNew && registerValidation}
                                onSubmit={handleSubmit}
                            >
                                {({ handleSubmit }) => {
                                    return (
                                        <>
                                            {fields.map((rowFields) => (
                                                <Box
                                                    component="div"
                                                    className="flex items-start gap-x-4 my-4 justify-between"
                                                >
                                                    {rowFields.map((field) =>
                                                        parseFields(field)
                                                    )}
                                                </Box>
                                            ))}
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
                                                        {isNew ? "ثبت کاربر جدید" : "ویرایش کاربر"}
                                                    </Typography>
                                                </Button>
                                            </Box>
                                        </>
                                    );
                                }}
                            </Formik>
                        </>
                    )}
                </ReusableCard>
            </Container>
        </>
    );
};

export default UserForm;
