import { useState, useEffect } from "react";
import { Formik } from "formik";
import { Button, Checkbox, Typography } from "@mui/material";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import { ICustomer, IPhoneBook } from "../core/_models";
import { useCreateCustomer, useGetCustomer, useUpdateCustomer } from "../core/_hooks";
import { createValiadtion } from "../_validation";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/snackebar";

import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikCheckbox from "../../../../_cloner/components/FormikCheckbox";
import Backdrop from "../../../../_cloner/components/Backdrop";
import PhoneBook from "./PhoneBook";
import FormikCustomerType from "../../../../_cloner/components/FormikCustomerType";
import FormikValidity from "../../../../_cloner/components/FormikValidity";

const initialValues = {
    firstName: "",
    lastName: "",
    fatherName: "",
    nationalId: "",
    nationalId2: "",
    address1: "",
    officialName: "",
    customerType: "0",
    customerValidityId: 1,
    isSupplier: false,
    address2: "",
    representative: "",
    settlementDay: "",
    settlementType: 0,
    customerCharacteristics: ""
};

const CustomerForm = (props: {
    id?: string | undefined;
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetch?: any;
}) => {
    const postTools = useCreateCustomer();
    const updateTools = useUpdateCustomer();
    const detailTools = useGetCustomer();

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [phoneBooks, setPhoneBooks] = useState<IPhoneBook[]>([])

    const isNew = !props.id;

    const fields: FieldType[][] = [
        [
            { label: "نام", name: "firstName", type: "firstName" },
            { label: "نام خانوادگی", name: "lastName", type: "productType" },
            { label: "نام پدر", name: "fatherName", type: "input" },
            { label: "کدملی", name: "nationalId", type: "nationalId" },
        ],
        [
            // { label: "شناسه ملی", name: "nationalId2", type: "number" },
            { label: "تامین؟", name: "isSupplier", type: "checkbox" },
            { label: "معرف", name: "representative", type: "input" },
            { label: "نوع مشتری", name: "customerType", type: "customerType" },
            { label: "نوع اعتبار", name: "customerValidityId", type: "customerValidityId" },
        ],
        [

            // { label: "موبایل", name: "mobile", type: "mobile" },
            // { label: "تلفن", name: "tel1", type: "input" },
            // { label: "تلفن", name: "tel2", type: "input" },
        ],
        [
            { label: "دفترچه تلفن", name: "phonebook", type: "phonebook" },
            { label: "", name: "settlementDay", type: "settlementDay", },
        ],
        [
            { label: "آدرس یک", name: "address1", type: "description" },
            { label: "آدرس دو", name: "address2", type: "description" },
            { label: "ویژگی های مشتری", name: "customerCharacteristics", type: "description" },
        ],  
    ];

    const parseFields = (fields: FieldType) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "checkbox":
                return (
                    <div className="w-full flex items-center">
                        <FormikCheckbox
                            defaultChecked={detailTools?.data?.data?.isSupplier}
                            name="isSupplier"
                            label=""
                        />
                        <Typography variant="h3">
                            آیا تامین کننده می باشد؟
                        </Typography>
                    </div>
                );
            case "customerType":
                return <FormikCustomerType {...rest} />;
            case "customerValidityId":
                return <FormikValidity  {...rest} />
            case "settlementDay":
                return (
                    <div className="!w-full">
                        <div className="flex flex-row items-center justify-center">
                            <div className="flex flex-col lg:w-full px-4 py-2">
                                <Typography variant="h3" className="py-1 ">
                                    تسویه حساب
                                </Typography>
                                <FormikInput
                                    {...rest}
                                    onInput={(e: any) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
                                    }}
                                    type="number"
                                    boxClassName=""
                                    InputProps={{
                                        inputProps: {
                                            style: {
                                                textAlign: "center",
                                                fontWeight: "bold",
                                            },
                                        },
                                    }}
                                />

                            </div>
                            <Typography  variant="h3" className="flex flex-col justify-center lg:w-full px-4 pt-4">
                                روز
                            </Typography>
                        </div>
                        <div className="flex items-center">
                            <Checkbox
                                // checked={isChecked || values.settlementDay}
                                checked={isChecked}
                                onChange={(e: any) =>
                                    setIsChecked(e.target.checked)
                                }
                            />{" "}
                            <Typography variant="h3">بعد از وزن</Typography>
                        </div>
                    </div>
                );
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
            // case "mobile":
            //     return <FormikInput placeholder="09129999999" inputProps={{ maxLength: 11 }} {...rest} />;

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


    const onUpdate = (values: ICustomer) => {
        const formData = {
            ...values,
            nationalId: values.nationalId?.toString(),
            customerType: +values.customerType,
            settlementType: isChecked ? 1 : 0,
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

    const onAdd = (values: ICustomer) => {
        const formData = {
            ...values,
            nationalId: values.nationalId?.toString(),
            customerType: +values.customerType,
            settlementType: isChecked ? 1 : 0,
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

    const handleSubmit = (values: ICustomer) => {
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
                            customerType: detailTools?.data?.data?.customerType.toString()
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
                                    {isNew ? "ثبت مشتری" : "ویرایش مشتری"}
                                </Typography>
                            </Button>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default CustomerForm;
