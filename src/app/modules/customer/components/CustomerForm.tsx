import { useState, useEffect } from 'react'
import { Form, Formik } from "formik";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";
import { useCreateCustomer, useGetCustomer, useUpdateCustomer } from "../core/_hooks";
import { customerType } from "../helpers/customerType";
import { convertValueLabelCustomerValidaty } from "../helpers/convertValueLabel";
import { createValiadtion } from "../validation/createValidation";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import { useGetCustomerValidities } from "../../generic/_hooks";
import { Box, Button, Card, Typography } from "@mui/material";
import FormikCheckbox from "../../../../_cloner/components/FormikCheckbox";
import React from 'react';
import PositionedSnackbar from '../../../../_cloner/components/Snackbar';
import { FieldType } from '../../../../_cloner/components/globalTypes';
import { ICustomer } from '../core/_models';
import Backdrop from '../../../../_cloner/components/Backdrop';
import RadioCardGroup from '../../../../_cloner/components/RadioCardGroup';
import RadioCard from '../../../../_cloner/components/RadioCardGroup';
const initialValues = {
    firstName: "",
    lastName: "",
    fatherName: "",
    nationalId: "",
    nationalId2: "",
    mobile: "",
    address1: "",
    officialName: "",
    customerType: 0,
    customerValidityId: 1,
    tel1: "",
    isSupplier: false,
    tel2: "",
    address2: "",
    representative: "",
};

const CustomerForm = (props: {
    id?: string,
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}) => {
    const { mutate, data } = useCreateCustomer();
    const updateTools = useUpdateCustomer();
    const detailTools = useGetCustomer()
    const { data: customerValidityData } = useGetCustomerValidities()
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);
    const [snackeEditOpen, setSnackeEditOpen] = useState<boolean>(false);

    const isNew = !props.id;

    const radioOptions = ['تاریخ روز', '3 روز بعد از ثبت سفارش', '5 روز بعد از وزن'];
    const fields: FieldType[][] = [
        [
            { label: "نام", name: "firstName", type: "input" },
            { label: "نام خانوادگی", name: "lastName", type: "productType" },
            { label: "نام پدر", name: "fatherName", type: "input" },
        ],
        [
            { label: "اسم رسمی مشتری", name: "officialName", type: "input" },
            { label: "شناسه ملی", name: "nationalId2", type: "input" },
            { label: "کدملی", name: "nationalId", type: "input" },

        ],
        [
            { label: "معرف", name: "representative", type: "input" },
            { label: "موبایل", name: "mobile", type: "input" },
            { label: "تلفن", name: "tel1", type: "input" },
            { label: "تلفن", name: "tel2", type: "input" },

        ],
        [
            { label: "تامین؟", name: "isSupplier", type: "checkbox" },
            { label: "نوع مشتری", name: "customerType", type: "customerType" },
            { label: "نوع اعتبار", name: "customerValidityId", type: "customerValidityId" },

        ],
        [
            { label: "", name: "settlementDaysAfterExit", type: "settlementDaysAfterExit" },
            // { label: "", name: "settlementDaysBeforeExit", type: "settlementDaysBeforeExit" },
        ],
        [
            { label: "آدرس یک", name: "address1", type: "description" }
        ],
        [
            { label: "آدرس دو", name: "address2", type: "description" }
        ],
    ];

    const parseFields = (fields: FieldType) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "checkbox":
                return <Box component="div" className="w-full flex items-center">
                    <FormikCheckbox defaultChecked={detailTools?.data?.data?.isSupplier} name="isSupplier" label="" />
                    <Typography variant="h3">آیا تامین کننده می باشد؟</Typography>
                </Box>;
            case "customerType":
                return <FormikSelect options={customerType} {...rest} />;
            case "customerValidityId":
                return <FormikSelect options={convertValueLabelCustomerValidaty(customerValidityData)} {...rest} />;
            case "settlementDaysAfterExit":
                return <RadioCard options={radioOptions} title="تسویه حساب" />
            case "settlementDaysBeforeExit":
                return <RadioCard options={radioOptions} title="تسویه حساب" />
            case "description":
                return <FormikInput multiline rows={3} {...rest} />;

            default:
                return <FormikInput {...rest} />;
        }
    };

    useEffect(() => {
        if (isNew) delete fields[0][0];
    }, []);
    const getDetail = () => {
        if (props.id)
            try {
                detailTools.mutate(props.id, {
                    onSuccess: (response) => {
                        if (!response.succeeded) setSnackeOpen(true);
                    },
                });
            } catch (error: any) {
                return error?.response;
            }
    };

    useEffect(() => {
        getDetail();
    }, [props.id]);


    const onUpdate = (values: ICustomer) => {
        try {
            return updateTools.mutate(values, {
                onSuccess: (response) => {
                    setSnackeEditOpen(true);
                    props.refetch()
                },
            });
        } catch (error: any) {
            setSnackeEditOpen(true);
            return error?.response;
        }
    };

    const onAdd = (values: ICustomer) => {
        try {
            return mutate(values, {
                onSuccess: (response) => {
                    setSnackeOpen(true)
                    props.refetch()
                },
            });
        } catch (error: any) {
            setSnackeOpen(false);
            return error?.response;
        }
    };

    const handleSubmit = (values: ICustomer) => {
        if (props.id) onUpdate(values);
        else onAdd(values);
        props.refetch()
    };

    if (props.id && detailTools?.isLoading) {
        return <Typography>Loading ...</Typography>
    }

    console.log("detailTools?.data?.data", detailTools?.data?.data)
    return (
        <>
            {updateTools.isLoading && <Backdrop loading={updateTools.isLoading} />}
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        data?.data?.Message ||
                        data?.message
                    }
                />
            )}
            {snackeEditOpen && (
                <PositionedSnackbar
                    open={snackeEditOpen}
                    setState={setSnackeEditOpen}
                    title={
                        data?.data?.Message ||
                        data?.message || "ویرایش با موفقیت انجام شد"
                    }
                />
            )}
            <Formik
                initialValues={
                    isNew
                        ? initialValues
                        : { ...initialValues, ...detailTools?.data?.data }
                }
                validationSchema={createValiadtion} onSubmit={
                    handleSubmit
                    // async (values, { setStatus, setSubmitting }) => {
                    //     try {
                    //         mutate(values, {
                    //             onSuccess: (message) => {
                    //                 // setCustomerCode(message?.data.customerCode)
                    //                 // ToastComponent(message?.message || message?.data?.Message || message?.data?.message)
                    //                 setSnackeOpen(true)
                    //                 props.refetch()
                    //                 // props.setIsCreateOpen(false)
                    //             }
                    //         });
                    //     } catch (error) {
                    //         setStatus("اطلاعات ثبت مشتری نادرست می باشد");
                    //         setSubmitting(false);
                    //     }
                    // }
                }>
                {({ handleSubmit }) => {
                    return <Form onSubmit={handleSubmit} className="container">
                        {fields.map((rowFields) => (
                            <Box
                                component="div"
                                className="md:flex md:justify-between md:gap-4 space-y-4 md:space-y-0 my-4"
                            >
                                {rowFields.map((field) =>
                                    parseFields(field)
                                )}
                            </Box>
                        ))}
                        {/* <Box component="div" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormikInput title="نام" name="firstName" label="نام" />
                            <FormikInput title="نام خانوادگی" name="lastName" label="نام خانوادگی" />
                            <FormikInput title="نام پدر" name="fatherName" label="نام پدر" />
                            <FormikInput title="اسم رسمی مشتری" name="officialName" label="اسم رسمی مشتری" />
                            <FormikInput title="شناسه ملی" name="nationalId2" label="شناسه ملی" />
                            <FormikInput title="کدملی" name="nationalId" label="کدملی" />
                        </Box>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <FormikInput title="معرف" name="representative" label="معرف" />
                            <FormikInput title="موبایل" name="mobile" label="موبایل" />
                            <FormikInput title="تلفن 1" name="tel1" label="تلفن 1" />
                            <FormikInput title="تلفن 2" name="tel2" label="تلفن 2" />
                        </Box>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <Box component="div" className="flex items-center">
                                <FormikCheckbox name="isSupplier" label="" />
                                <Typography variant="h3">آیا تامین کننده می باشد؟</Typography>
                            </Box>
                            <FormikSelect options={customerType} name="customerType" label="نوع مشتری" />
                            <FormikSelect options={convertValueLabelCustomerValidaty(customerValidityData)} name="customerValidityId" label="نوع اعتبار" />
                        </Box>
                        <Box component="div" className="w-full my-2 md:col-span-3">
                            <FormikInput title="آدرس 1" name="address1" label="آدرس 1" boxClassName="my-4" />
                            <FormikInput title="آدرس 2" name="address2" label="آدرس 2" boxClassName="my-4" />
                        </Box> */}
                        <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                            <Typography variant="h3" className="px-8 py-2">
                                {isNew ? "ثبت مشتری" : "ویرایش مشتری"}
                            </Typography>
                        </Button>
                    </Form>
                }}
            </Formik>
        </>
    );
};

export default CustomerForm;