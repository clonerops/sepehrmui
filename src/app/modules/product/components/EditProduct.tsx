import { Form, Formik } from "formik";
import { useUpdateProduct } from "../core/_hooks";
import { IProducts } from "../core/_models";
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

const EditProduct = (props: {
    item: IProducts | undefined;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
    const { mutate, data, isLoading } = useUpdateProduct();
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);


    const initialValues = {
        id: props.item?.id,
        productName: props.item?.productName,
        warehouseId: props.item?.warehouseId,
        productSize: props.item?.productSize,
        approximateWeight: props.item?.approximateWeight,
        numberInPackage: props.item?.numberInPackage,
        size: props.item?.size,
        standard: props.item?.standard,
        productState: props.item?.productState,
        productIntegratedName: props.item?.productIntegratedName,
        description: props.item?.description,
    };

    return (
        <>
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        data?.data?.Message ||
                        data?.message || "ویرایش با موفقیت انجام شد"
                    }
                />
            )}

            <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                    try {
                        mutate(values, {
                            onSuccess: (message) => {
                                setSnackeOpen(true)
                                props.refetch();
                            },
                        });
                    } catch (error) {
                        setStatus("ویرایش ثبت محصول نادرست می باشد");
                        setSubmitting(false);
                    }
                }}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit} className="container">
                            <Box component="div" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormikInput
                                    name="productName"
                                    label="نام محصول"
                                    type="text"
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
                                    title="استاندارد"
                                    type="text"
                                />
                                <FormikInput
                                    name="productState"
                                    label="حالت"
                                    type="text"
                                />
                            </Box>
                            <Box component="div" className="grid grid-cols-1 md:grid-cols- gap-8 my-4">
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

export default EditProduct;
