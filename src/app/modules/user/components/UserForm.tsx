import * as Yup from "yup";
import {  Formik } from "formik";
import { useRegisterUser } from "../core/_hooks";
import { Box, Button, Container, Typography } from "@mui/material";
import FormikInput from "../../../../_cloner/components/FormikInput";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import { IUser } from "../core/_models";
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";

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

type Props = {
    onClose?: React.Dispatch<React.SetStateAction<boolean>> | any
    refetchUser?:  <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>> | any
}

const UserForm = (props: Props) => {
    const {onClose, refetchUser} = props;
    // const { id }: any = useParams();
    const { mutate } = useRegisterUser();
    // const detailTools = useGetUserDetail();
    // const updateTools = useUpdateUser();
    // const navigate = useNavigate();

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

    const parseFields = (fields: FieldType) => {
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
                    if(message?.succeeded) {
                        validateAndEnqueueSnackbar(message?.message, "success")
                       if(refetchUser) refetchUser()
                        onClose()
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
