import { useState } from 'react'
import { Form, Formik } from "formik";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";
import { useCreateCustomer } from "../core/_hooks";
import { customerType } from "../helpers/customerType";
import { convertValueLabelCustomerValidaty } from "../helpers/convertValueLabel";
import { createValiadtion } from "../validation/createValidation";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import { useGetCustomerValidities } from "../../generic/_hooks";
import { Box, Button, Typography } from "@mui/material";
import FormikCheckbox from "../../../../_cloner/components/FormikCheckbox";
import React from 'react';
import PositionedSnackbar from '../../../../_cloner/components/Snackbar';
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

const CreateCustomer = (props: {
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}) => {
    const { mutate, data } = useCreateCustomer();
    const { data: customerValidityData } = useGetCustomerValidities()
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);

    // const [customerCode, setCustomerCode] = useState(0)
    return (
        <>
         {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        data?.data?.Message ||
                        data?.message || "ایجاد با موفقیت انجام شد"
                    }
                />
            )}
            <Formik initialValues={initialValues} validationSchema={createValiadtion} onSubmit={
                async (values, { setStatus, setSubmitting }) => {
                    try {
                        mutate(values, {
                            onSuccess: (message) => {
                                // setCustomerCode(message?.data.customerCode)
                                // ToastComponent(message?.message || message?.data?.Message || message?.data?.message)
                                setSnackeOpen(true)
                                props.refetch()
                                // props.setIsCreateOpen(false)
                            }
                        });
                    } catch (error) {
                        setStatus("اطلاعات ثبت مشتری نادرست می باشد");
                        setSubmitting(false);
                    }
                }
            }>
                {({ handleSubmit }) => {
                    return <Form onSubmit={handleSubmit} className="container">
                        {/* <Typography variant='h3' color="primary">شماره مشتری: {customerCode}</Typography> */}
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        </Box>
                        <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                            <Typography variant="h3" className="px-8 py-2">ثبت مشتری</Typography>
                        </Button>
                    </Form>
                }}
            </Formik>
        </>
    );
};

export default CreateCustomer;