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
    dropdownUnit,
} from "../helpers/convertDropdowns";
import { useGetStandards } from "../../generic/productStandard/_hooks";
import { useGetStates } from "../../generic/productState/_hooks";
import React from "react";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import { useGetUnits } from "../../generic/productUnit/_hooks";
import FormikSelect from "../../../../_cloner/components/FormikSelect";

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
    productMainUnitId: "",
    productSubUnitId: "",
    exchangeRate: "",
    maxInventory: "",
    minInventory: "",
    inventotyCriticalPoint: "",
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
    const { data: productUnit } = useGetUnits();
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
        [
            {
                label: "واحد اصلی",
                name: "productMainUnitId",
                type: "productMainUnit",
            },
            {
                label: "واحد فرعی",
                name: "productSubUnitId",
                type: "productSubUnit",
            },
            {
                label: "نرخ تبدیل",
                name: "exchangeRate",
                type: "input",
            },
            { label: "حداکثر موجودی", name: "maxInventory", type: "input" },
            { label: "حداقل موجودی", name: "minInventory", type: "input" },
            {
                label: "نقطه بحرانی",
                name: "inventotyCriticalPoint",
                type: "input",
            },
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
            case "productMainUnit":
                return (
                    <FormikSelect
                        options={dropdownUnit(productUnit)}
                        {...rest}
                    />
                );
            case "productSubUnit":
                return (
                    <FormikSelect
                        options={dropdownUnit(productUnit)}
                        {...rest}
                    />
                );
            case "description":
                return <FormikInput {...rest} multiline rows={3} />;

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
                            productMainUnitId: values.productMainUnitId
                                ? Number(values.productMainUnitId)
                                : null,
                            productSubUnitId: values.productSubUnitId
                                ? Number(values.productSubUnitId)
                                : null,
                            exchangeRate: values.exchangeRate
                                ? Number(values.exchangeRate)
                                : 0,
                            maxInventory: values.maxInventory
                                ? Number(values.maxInventory)
                                : 0,
                            minInventory: values.minInventory
                                ? Number(values.minInventory)
                                : 0,
                            inventotyCriticalPoint:
                                values.inventotyCriticalPoint
                                    ? Number(values.inventotyCriticalPoint)
                                    : 0,
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
                                <Box
                                    component="div"
                                    className="md:flex md:justify-between md:gap-4 space-y-4 md:space-y-0 my-4"
                                >
                                    {rowFields.map((field) =>
                                        parseFields(field)
                                    )}
                                </Box>
                            ))}
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
