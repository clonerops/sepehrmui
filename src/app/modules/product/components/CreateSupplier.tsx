import { Form, Formik } from "formik";
import { Box, Button, Typography } from "@mui/material";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";

import { useCreateSupplier, useRetrieveProducts } from "../core/_hooks";
import { useGetCustomers } from "../../customer/core/_hooks";
import { createSupplierValidations } from "../validations/createSupplier";
import { dropdownCustomer, dropdownProduct } from "../../generic/_functions";

import FormikSelect from "../../../../_cloner/components/FormikSelect";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";

const CreateSupplier = (props: {
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}) => {
    // fetching Data
    const { mutate } = useCreateSupplier();
    const { data: customers } = useGetCustomers()
    const { data: products } = useRetrieveProducts()

    const initialValues = {
        price: "",
        rentAmount: "",
        overPrice: "",
        rate: "",
        customerId: "",
        productId: "",
        priceDate: ""
    };
    return (
        <>

            <Formik validationSchema={createSupplierValidations} initialValues={initialValues} onSubmit={
                async (values, { setStatus, setSubmitting }) => {
                    try {
                        const formData = {
                            price: Number(values.price),
                            rentAmount: Number(values.rentAmount),
                            overPrice: Number(values.overPrice),
                            rate: Number(values.rate),
                            customerId: values.customerId,
                            productId: values.productId,
                            priceDate: values.priceDate
                        }

                        mutate(formData, {
                            onSuccess: (response) => {
                                if(response.succeeded) {
                                    EnqueueSnackbar(response.message || "ایجاد با موفقیت انجام شد", "success")
                                    props.refetch()
                                  } else {
                                    EnqueueSnackbar(response.data.Message, "error",)
                                  }
                            }
                        });
                    } catch (error) {
                        setStatus("اطلاعات ثبت تامین کنندگان نادرست می باشد");
                        setSubmitting(false);
                    }
                }
            }>
                {({ handleSubmit, setFieldValue }) => {
                    return <Form onSubmit={handleSubmit} className="container">
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-2 gap-8 my-4">
                            <FormikSelect name={"customerId"} label="مشتری" options={dropdownCustomer(customers?.data)} />
                            <FormikSelect name={"productId"} label="کالا" options={dropdownProduct(products?.data)} />
                        </Box>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-3 gap-8 my-4">
                            <FormikInput name="price" label="قیمت" type="text" />
                            <FormikInput name="overPrice" label="قیمت تمام شده" type="text" />
                            <FormikDatepicker name="priceDate" label="تاریخ قیمت" setFieldValue={setFieldValue} />
                        </Box>
                        <Box component="div" className="grid grid-cols-2 md:grid-cols-2 gap-8 my-4">
                            <FormikInput name="rentAmount" label="کرایه" type="text" />
                            <FormikInput name="rate" label="امتیاز" type="text" />
                        </Box>
                        <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                            <Typography variant="h3" className="px-8 py-2">ثبت تامبن کننده</Typography>
                        </Button>
                    </Form>
                }}
            </Formik>
        </>
    );
};

export default CreateSupplier;