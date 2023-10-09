import { Form, Formik } from "formik";
import { useDisableProduct, useEnableProduct, useRetrieveProductById, useUpdateProduct } from "../core/_hooks";
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
import { dropdownStandard, dropdownState, dropdownTypes } from "../helpers/convertDropdowns";
import { useGetTypes } from "../../generic/productType/_hooks";
import { useGetStandards } from "../../generic/productStandard/_hooks";
import { useGetStates } from "../../generic/productState/_hooks";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import React from "react";

const EditProduct = (props: {
    item: IProducts | undefined;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
    const { mutate, data: updateData } = useUpdateProduct();
    const { mutate: enableMutate, data: enableData } = useEnableProduct();

    const { data: product, isLoading: getProductLoading, refetch } = useRetrieveProductById(props.item?.id ? props.item.id : "")
    const { data: productType } = useGetTypes()
    const { data: productStandard } = useGetStandards()
    const { data: productState } = useGetStates()

    const [snackeUpdateOpen, setSnackeUpdateOpen] = useState<boolean>(false);
    const [snackeDisableOpen, setSnackeDisableOpen] = useState<boolean>(false);
    const [snackeEnableOpen, setSnackeEnableOpen] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(product?.data.isActive);

    const initialValues = {
        id: props.item?.id,
        productName: product?.data?.productName,
        productTypeId: product?.data?.productTypeId,
        productSize: product?.data?.productSize,
        approximateWeight: product?.data?.approximateWeight,
        numberInPackage: product?.data?.numberInPackage,
        productThickness: product?.data?.productThickness,
        productStandardId: product?.data?.productStandardId,
        productStateId: product?.data?.productStateId,
        productIntegratedName: product?.data?.productIntegratedName,
        description: product?.data?.description,
    };


    const handleActive = (checked: boolean) => {
        const formData: any = {
            id: props.item?.id,
            active: checked,
        };

        enableMutate(formData, {
            onSuccess: (message: any) => {
                setSnackeEnableOpen(true);
                setIsActive(checked)
                refetch();
                props.refetch()
            },
        });
    };

    if (getProductLoading) {
        return <Typography variant="h2">در حال بارگزاری ...</Typography>
    }

    return (
        <>
            {snackeUpdateOpen && (<PositionedSnackbar open={snackeUpdateOpen} setState={setSnackeUpdateOpen} title={updateData?.data?.Message || updateData?.message || "ویرایش با موفقیت انجام شد"} />)}
            {snackeEnableOpen && (<PositionedSnackbar open={snackeEnableOpen} setState={setSnackeEnableOpen} title={enableData?.data?.Message || enableData?.message} />)}

            <Formik
                initialValues={initialValues}
                onSubmit={async (values: any, { setStatus, setSubmitting }) => {
                    try {
                        const formData = {
                            ...values,
                            approximateWeight: Number(values.approximateWeight),
                            numberInPackage: values.numberInPackage ? Number(values.numberInPackage) : 0,
                            productStandardId: values.productStandardId ? Number(values.productStandardId) : product?.data?.productStandardId,
                            productStateId: values.productStateId ? Number(values.productStateId) : product?.data?.productStateId,
                        }
                        mutate(formData, {
                            onSuccess: (message) => {
                                setSnackeUpdateOpen(true)
                                refetch();
                                props.refetch()
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
                            <Box component="div" className="grid grid-cols-1 md:grid-cols-8 gap-8">
                                <FormikInput
                                    name="productName"
                                    label="نام کالا"
                                    type="text"
                                    disabled={true}
                                    boxClassName="col-span-4"
                                />
                                <FormikSelect
                                    name="productTypeId"
                                    label="نوع کالا"
                                    disabled={true}
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
                            <Box component="div" className="grid grid-cols-1 md:grid-cols-5 gap-8 my-4">

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
                                <FormikSelect
                                    name="productStandardId"
                                    label="استاندارد"
                                    options={dropdownStandard(productStandard?.data)}
                                />
                                <FormikSelect
                                    name="productStateId"
                                    label="حالت"
                                    options={dropdownState(productState?.data)}
                                />
                                <Box component="div" className="flex justify-center items-center gap-x-4">
                                    <Typography variant="body1">
                                        {isActive ? "فعال" : "غیر فعال"}
                                    </Typography>
                                    <Switch checked={isActive} onChange={(_, checked) => handleActive(checked)} />
                                </Box>
                            </Box>
                            <Box component="div" className="grid grid-cols-1 md:grid-cols- gap-8 my-4">
                                <FormikTextArea
                                    name="description"
                                    label="توضیحات"
                                />
                            </Box>
                            <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                                <Typography variant="h3" className="px-8 py-2">ثبت کالا</Typography>
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default EditProduct;
