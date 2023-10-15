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
import FormikComboBox from "../../../../_cloner/components/FormikComboBox";
import { useGetTypes } from "../../generic/productType/_hooks";
import {
    dropdownStandard,
    dropdownState,
    dropdownTypes,
} from "../helpers/convertDropdowns";
import { useGetStandards } from "../../generic/productStandard/_hooks";
import { useGetStates } from "../../generic/productState/_hooks";
import React from "react";
import { FieldType } from "../../../../_cloner/components/globalTypes";

const initialValues = {
    productName: "",
    productTypeId: "",
    productSize: "",
    approximateWeight: "",
    numberInPackage: "",
    productThickness: "",
    productStandardId: "",
    productStateId: "",
    description: "",
};

const CreateProduct = (props: {
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
    // Fetchig
    const { mutate, data } = useCreateProduct();
    const { data: productType } = useGetTypes();
    const { data: productStandard } = useGetStandards();
    const { data: productState } = useGetStates();
    // States
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);

    const fields: FieldType[][] = [
        [
            { label: "نام کالا", name: "productName", type: "input" },
            { label: "نوع کالا", name: "productTypeId", type: "productType" },
            { label: "سایز", name: "productSize", type: "input" },
            { label: "ضخامت", name: "productThickness", type: "input" },
        ],
        [
            { label: "وزن", name: "approximateWeight", type: "input" },
            {
                label: "تعداد در بسته",
                name: "numberInPackage",
                type: "input",
            },
            {
                label: "استاندارد",
                name: "productStandardId",
                type: "productStandard",
            },
            { label: "حالت", name: "productStateId", type: "productState" },
        ],
        [{ label: "توضیحات", name: "description", type: "description" }],
    ];

    const parseFields = (fields: FieldType) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "productType":
                return (
                    <FormikComboBox
                        options={dropdownTypes(productType?.data)}
                        {...rest}
                    />
                );
            case "productStandard":
                return (
                    <FormikComboBox
                        options={dropdownStandard(productStandard?.data)}
                        {...rest}
                    />
                );
            case "productState":
                return (
                    <FormikComboBox
                        options={dropdownState(productState?.data)}
                        {...rest}
                    />
                );
            case "description":
                return (
                    <FormikInput
                        {...rest}
                        multiline
                        rows={3}
                    />
                );

            default:
                return <FormikInput {...rest} />;
        }
    };

    return (
        <>
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        data?.data?.Message ||
                        data?.message ||
                        "ایجاد با موفقیت انجام شد"
                    }
                />
            )}
            <Formik
                initialValues={initialValues}
                validationSchema={createProductValidations}
                onSubmit={async (values: any, { setStatus, setSubmitting }) => {
                    try {
                        const formData = {
                            ...values,
                            productTypeId: Number(values.productTypeId.value),
                            approximateWeight: Number(values.approximateWeight),
                            numberInPackage: values.numberInPackage
                                ? Number(values.numberInPackage)
                                : 0,
                            productStandardId: values.productStandardId.value
                                ? Number(values.productStandardId.value)
                                : null,
                            productStateId: values.productStateId.value
                                ? Number(values.productStateId.value)
                                : null,
                        };
                        mutate(formData, {
                            onSuccess: () => {
                                setSnackeOpen(true);
                                props.refetch();
                                props.setIsCreateOpen(false);
                            },
                        });
                    } catch (error) {
                        setStatus("اطلاعات ثبت کالا نادرست می باشد");
                        setSubmitting(false);
                        setSnackeOpen(true);
                    }
                }}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit} className="container">
                            {fields.map((rowFields) => (
                                <Box component="div" className="md:flex md:justify-between md:gap-4 space-y-4 md:space-y-0 my-4">
                                    {rowFields.map((field) => (
                                        parseFields(field)
                                    ))}
                                </Box>
                            ))}

                            {/* <Box component="div" className="grid grid-cols-1 md:grid-cols-8 gap-8">
                                <FormikInput
                                    name="productName"
                                    label="نام کالا"
                                    type="text"
                                    autoFocus={true}
                                    boxClassName="col-span-4"
                                />
                                <FormikComboBox
                                    name="productTypeId"
                                    label="نوع کالا"
                                    options={dropdownTypes(productType?.data)}
                                    boxClassName="col-span-2"
                                />
                                <FormikInput
                                    name="productSize"
                                    label="سایز"
                                    type="text"
                                />
                                <FormikInput
                                    name="productThickness"
                                    label="ضخامت"
                                    type="text"
                                />

                            </Box>
                            <Box component="div" className="grid grid-cols-1 md:grid-cols-4 gap-8 my-4">
                                <FormikInput
                                    name="approximateWeight"
                                    label="وزن"
                                    type="text"
                                />
                                <FormikInput
                                    name="numberInPackage"
                                    label="تعداد در بسته"
                                    type="text"
                                />
                                <FormikComboBox
                                    name="productStandardId"
                                    label="استاندارد"
                                    options={dropdownStandard(productStandard?.data)}
                                />
                                <FormikComboBox
                                    name="productStateId"
                                    label="حالت"
                                    options={dropdownState(productState?.data)}
                                />
                            </Box>
                            <Box component="div" className="grid grid-cols-1 md:grid-cols-1 gap-8 my-4">
                                <FormikTextArea
                                    name="description"
                                    label="توضیحات"
                                />
                            </Box> */}
                            <Button
                                onClick={() => handleSubmit()}
                                variant="contained"
                                color="secondary"
                            >
                                <Typography variant="h3" className="px-8 py-2">
                                    ثبت کالا
                                </Typography>
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default CreateProduct;
