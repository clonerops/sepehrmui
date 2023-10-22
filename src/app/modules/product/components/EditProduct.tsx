import { Form, Formik } from "formik";
import {
    useDisableProduct,
    useEnableProduct,
    useRetrieveProductById,
    useUpdateProduct,
} from "../core/_hooks";
import { IProducts } from "../core/_models";
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from "@tanstack/react-query";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikTextArea from "../../../../_cloner/components/FormikTextArea";
import { Box, Button, Switch, Typography } from "@mui/material";
import { useState } from "react";
import PositionedSnackbar from "../../../../_cloner/components/Snackbar";
import {
    dropdownStandard,
    dropdownState,
    dropdownTypes,
    dropdownUnit,
} from "../helpers/convertDropdowns";
import { useGetTypes } from "../../generic/productType/_hooks";
import { useGetStandards } from "../../generic/productStandard/_hooks";
import { useGetStates } from "../../generic/productState/_hooks";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import React from "react";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import FormikComboBox from "../../../../_cloner/components/FormikComboBox";
import { useGetUnits } from "../../generic/productUnit/_hooks";
import FormikStandard from "../../../../_cloner/components/FormikStandard";
import FormikState from "../../../../_cloner/components/FormikState";
import FormikType from "../../../../_cloner/components/FormikType";

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

const EditProduct = (props: {
    item: IProducts | undefined;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
    const { mutate, data: updateData } = useUpdateProduct();
    const { mutate: enableMutate, data: enableData } = useEnableProduct();

    const {
        data: product,
        isLoading: getProductLoading,
        refetch,
    } = useRetrieveProductById(props.item?.id ? props.item.id : "");
    const { data: productType } = useGetTypes();
    const { data: productStandard } = useGetStandards();
    const { data: productState } = useGetStates();
    const { data: productUnit } = useGetUnits();

    const [snackeUpdateOpen, setSnackeUpdateOpen] = useState<boolean>(false);
    const [snackeDisableOpen, setSnackeDisableOpen] = useState<boolean>(false);
    const [snackeEnableOpen, setSnackeEnableOpen] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(product?.data.isActive);

    // const initialValues = {
    //     id: props.item?.id,
    //     productName: product?.data?.productName,
    //     productTypeId: product?.data?.productTypeId,
    //     productSize: product?.data?.productSize,
    //     approximateWeight: product?.data?.approximateWeight,
    //     numberInPackage: product?.data?.numberInPackage,
    //     productThickness: product?.data?.productThickness,
    //     productStandardId: product?.data?.productStandardId,
    //     productStateId: product?.data?.productStateId,
    //     productIntegratedName: product?.data?.productIntegratedName,
    //     description: product?.data?.description,
    // };

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
            { label: "فعال", name: "", type: "switch" },
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
                    <FormikType {...rest} />
                    // <FormikComboBox
                    //     options={dropdownTypes(productType?.data)}
                    //     {...rest}
                    // />
                );
            case "productStandard":
                return (
                    <FormikStandard {...rest} />
                    // <FormikComboBox
                    //     options={dropdownStandard(productStandard?.data)}
                    //     {...rest}
                    // />
                );
            case "productState":
                return (
                    <FormikState />
                    // <FormikComboBox
                    //     options={dropdownState(productState?.data)}
                    //     {...rest}
                    // />
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

            case "switch":
                return (
                    <Box
                        component="div"
                        className="flex justify-center items-center gap-x-4"
                    >
                        <Typography variant="body1">
                            {isActive ? "فعال" : "غیر فعال"}
                        </Typography>
                        <Switch
                            checked={isActive}
                            onChange={(_, checked) => handleActive(checked)}
                        />
                    </Box>
                );

            default:
                return <FormikInput {...rest} />;
        }
    };

    const handleActive = (checked: boolean) => {
        const formData: any = {
            id: props.item?.id,
            active: checked,
        };

        enableMutate(formData, {
            onSuccess: (message: any) => {
                setSnackeEnableOpen(true);
                setIsActive(checked);
                refetch();
                props.refetch();
            },
        });
    };

    if (getProductLoading) {
        return <Typography variant="h2">در حال بارگزاری ...</Typography>;
    }

    console.log("isActive", product?.data.isActive)

    return (
        <>
            {snackeUpdateOpen && (
                <PositionedSnackbar
                    open={snackeUpdateOpen}
                    setState={setSnackeUpdateOpen}
                    title={
                        updateData?.data?.Message ||
                        updateData?.message ||
                        "ویرایش با موفقیت انجام شد"
                    }
                />
            )}
            {snackeEnableOpen && (
                <PositionedSnackbar
                    open={snackeEnableOpen}
                    setState={setSnackeEnableOpen}
                    title={enableData?.data?.Message || enableData?.message}
                />
            )}

            <Formik
                // initialValues={initialValues}
                initialValues={{...product?.data}}
                onSubmit={async (values: any, { setStatus, setSubmitting }) => {
                    try {
                        const formData = {
                            ...values,
                            approximateWeight: Number(values.approximateWeight),
                            numberInPackage: values.numberInPackage
                                ? Number(values.numberInPackage)
                                : 0,
                            productStandardId: values.productStandardId
                                ? Number(values.productStandardId)
                                : product?.data?.productStandardId,
                            productStateId: values.productStateId
                                ? Number(values.productStateId)
                                : product?.data?.productStateId,
                            productMainUnitId: values.productMainUnitId
                                ? Number(values.productMainUnitId)
                                : product?.data?.productMainUnitId,
                            productSubUnitId: values.productSubUnitId
                                ? Number(values.productSubUnitId)
                                : product?.data?.productSubUnitId,
                            exchangeRate: values.exchangeRate
                                ? Number(values.exchangeRate)
                                : product?.data?.exchangeRate,
                            maxInventory: values.maxInventory
                                ? Number(values.maxInventory)
                                : product?.data?.maxInventory,
                            minInventory: values.minInventory
                                ? Number(values.minInventory)
                                : product?.data?.minInventory,
                            inventotyCriticalPoint:
                                values.inventotyCriticalPoint
                                    ? Number(values.inventotyCriticalPoint)
                                    : product?.data?.inventotyCriticalPoint,
                        };
                        mutate(formData, {
                            onSuccess: (message) => {
                                setSnackeUpdateOpen(true);
                                refetch();
                                props.refetch();
                            },
                        });
                    } catch (error) {
                        setStatus("ویرایش ثبت کالا نادرست می باشد");
                        setSubmitting(false);
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

export default EditProduct;
