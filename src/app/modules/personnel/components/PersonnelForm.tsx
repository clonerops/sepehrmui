import { useState, useEffect } from "react";
import { Formik } from "formik";
import { Button, Typography } from "@mui/material";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import { IPersonnel, IPhoneBook } from "../core/_models";
import { useCreatePersonnel, useGetPersonnel, useUpdatePersonnel } from "../core/_hooks";
import { createValiadtion } from "../_validation";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/snackebar";

import FormikInput from "../../../../_cloner/components/FormikInput";
import Backdrop from "../../../../_cloner/components/Backdrop";
import PhoneBook from "./PhoneBook";

const initialValues = {
    firstName: "",
    lastName: "",
    fatherName: "",
    officialName: "",
    nationalId: "",
    address1: "",
    address2: "",
    email: "",
    nationalCode: "",
    nickName: "",

};

const PersonnelForm = (props: {
    id?: string | undefined;
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetch?: any;
}) => {
    const postTools = useCreatePersonnel();
    const updateTools = useUpdatePersonnel();
    const detailTools = useGetPersonnel();

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [phoneBooks, setPhoneBooks] = useState<IPhoneBook[]>([])

    const isNew = !props.id;

    const fields: FieldType[][] = [
        [
            { label: "نام", name: "firstName", type: "firstName" },
            { label: "نام خانوادگی", name: "lastName", type: "input" },
            { label: "نام پدر", name: "fatherName", type: "input" },
            { label: "شناسه ملی", name: "nationalId", type: "nationalId" },
        ],
        [
            { label: "کدملی", name: "nationalCode", type: "nationalId" },
            { label: "ایمیل", name: "email", type: "input" },
            { label: "معروف به", name: "nickName", type: "input" },
            { label: "اسم رسمی", name: "officialName", type: "input" },
        ],
        [
            { label: "دفترچه تلفن", name: "phonebook", type: "phonebook" },
        ],
        [
            { label: "آدرس یک", name: "address1", type: "description" },
            { label: "آدرس دو", name: "address2", type: "description" },
        ],  
    ];

    const parseFields = (fields: FieldType) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "description":
                return <FormikInput multiline rows={3} {...rest} />;
            case "firstName":
                return <FormikInput  {...rest} />;
            case "phonebook":
                return <PhoneBook phoneBooks={phoneBooks} setPhoneBooks={setPhoneBooks} />
            case "nationalId":
                return <FormikInput placeholder="0079999999"
                    inputProps={{ pattern: "[0-9]*", inputMode: "numeric", maxLength: 10 }}
                    onInput={(e: any) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                    {...rest} />;

            default:
                return <FormikInput {...rest} />;
        }
    };

    const getDetail = () => {
        if (props.id)
            try {
                detailTools.mutate(props.id, {
                    onSuccess: (response) => {
                        const phoneBookResponse  = response.data.phonebook.map((item: any) => (
                            {
                                phoneNumber: item.phoneNumber,
                                phoneNumberType: {
                                    value: item.phoneNumberTypeId,
                                    label: item.phoneNumberTypeDesc
                                },
                            }
                        ))
                        setPhoneBooks(phoneBookResponse)
                    }
                });
            } catch (error: any) {
                return error?.response;
            }
    };

    useEffect(() => {
        getDetail();
        // eslint-disable-next-line
    }, [props.id]);


    const onUpdate = (values: IPersonnel) => {
        const formData = {
            ...values,
            nationalId: values.nationalId?.toString(),
            phonebook: phoneBooks.map((item: any) => (
                {
                    phoneNumber: item.phoneNumber,
                    phoneNumberTypeId: item.phoneNumberType.value
                }
            ))
        };
        try {
            return updateTools.mutate(formData, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message || "ویرایش با موفقیت انجام شد", "success")
                        props.refetch()
                    } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                    }
                },
            });
        } catch (error: any) {
            return error?.response;
        }
    };

    const onAdd = (values: IPersonnel) => {
        const formData = {
            ...values,
            nationalId: values.nationalId?.toString(),
            phonebook: phoneBooks.map((item: any) => (
                {
                    phoneNumber: item.phoneNumber,
                    phoneNumberTypeId: item.phoneNumberType.value
                }
            ))
        };
        try {
            return postTools.mutate(formData, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message, "success")
                        props.setIsCreateOpen(false)
                        props.refetch()
                    } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                    }
                },
            });
        } catch (error: any) {
            return error?.response;
        }
    };

    const handleSubmit = (values: IPersonnel) => {
        if (props.id) onUpdate(values);
        else onAdd(values);
        props?.refetch();
    };

    if (props.id && detailTools?.isLoading) {
        return <Typography>Loading ...</Typography>;
    }

    return (
        <>
            {postTools.isLoading && <Backdrop loading={postTools.isLoading} />}
            {updateTools.isLoading && <Backdrop loading={updateTools.isLoading} />}
            {detailTools.isLoading && <Backdrop loading={detailTools.isLoading} />}

            <Formik
                enableReinitialize
                initialValues={
                    isNew
                        ? initialValues
                        : {
                            ...initialValues,
                            ...detailTools?.data?.data,
                        }
                }
                validationSchema={createValiadtion}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <form onSubmit={handleSubmit} className="container">
                            {fields.map((rowFields) => (
                                <div className="md:flex md:justify-between md:items-start md:gap-4 space-y-4 md:space-y-0 my-4">
                                    {rowFields.map((field) => parseFields(field))}
                                </div>
                            ))}
                            <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                <Typography variant="h3" className="px-8 py-2">
                                    {isNew ? "ثبت پرسنل" : "ویرایش پرسنل"}
                                </Typography>
                            </Button>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default PersonnelForm;
