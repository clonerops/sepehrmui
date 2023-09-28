import { Form, Formik } from "formik";
import { createProductValidations } from "../validations/createProduct";
import { useCreateProduct } from "../core/_hooks";
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from "@tanstack/react-query";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikTextArea from "../../../../_cloner/components/FormikTextArea";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import PositionedSnackbar from "../../../../_cloner/components/Snackbar";

const CreateProduct = (props: {
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
    // Fetchig
    const { mutate, data, isLoading } = useCreateProduct();
    // States
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);

    const initialValues = {
        productName: "",
        warehouseId: 1,
        productSize: "",
        approximateWeight: "",
        numberInPackage: "",
        size: "",
        standard: "",
        productState: "",
        description: "",
    };

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
            <Formik
                initialValues={initialValues}
                validationSchema={createProductValidations}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                    try {
                        mutate(values, {
                            onSuccess: (message) => {
                                setSnackeOpen(true)
                                props.refetch();
                                props.setIsCreateOpen(false);
                            },
                        });
                    } catch (error) {
                        setStatus("اطلاعات ثبت کالا نادرست می باشد");
                        setSubmitting(false);
                        setSnackeOpen(true)
                    }
                }}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit} className="container">
                            <Box component="div" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormikInput
                                    name="productName"
                                    label="نام کالا"
                                    type="text"
                                    autoFocus={true}
                                />
                                <FormikInput
                                    name="productSize"
                                    label="سایز"
                                    type="text"
                                />
                            </Box>
                            <Box component="div" className="grid grid-cols-1 md:grid-cols-5 gap-8 my-4">
                                <FormikInput
                                    name="approximateWeight"
                                    label="وزن تقریبی"
                                    type="text"
                                />
                                <FormikInput
                                    name="numberInPackage"
                                    label="تعداد در بسته"
                                    type="text"
                                />
                                <FormikInput
                                    name="size"
                                    label="اندازه ضخامت"
                                    type="text"
                                />
                                <FormikInput
                                    name="standard"
                                    label="استاندارد"
                                    type="text"
                                />
                                <FormikInput
                                    name="productState"
                                    label="حالت"
                                    type="text"
                                />
                            </Box>
                            <Box component="div" className="grid grid-cols-1 md:grid-cols-1 gap-8 my-4">
                                <FormikTextArea
                                    name="description"
                                    label="توضیحات"
                                />
                            </Box>
                            <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                <Typography variant="h3" className="px-8 py-2">ثبت محصول</Typography>
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default CreateProduct;
