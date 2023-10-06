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

const EditProduct = (props: {
    item: IProducts | undefined;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
    const { mutate, data: updateData } = useUpdateProduct();
    const { mutate: disableMutate, data: disableData } = useDisableProduct();
    const { mutate: enableMutate, data: enableData } = useEnableProduct();

    const { data: product, isLoading: getProductLoading } = useRetrieveProductById(props.item?.id ? props.item.id : "")
    const { data: productType } = useGetTypes()
    const { data: productStandard } = useGetStandards()
    const { data: productState } = useGetStates()

    const [snackeUpdateOpen, setSnackeUpdateOpen] = useState<boolean>(false);
    const [snackeDisableOpen, setSnackeDisableOpen] = useState<boolean>(false);
    const [snackeEnableOpen, setSnackeEnableOpen] = useState<boolean>(false);



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

    if (getProductLoading) {
        return <Typography variant="h2">در حال بارگزاری ...</Typography>
    }


    const handleDisableProduct = () => {
        if (props.item?.id) disableMutate(props.item?.id, {
            onSuccess: () => {
                setSnackeDisableOpen(true)
            }
        });
    };
    const handleEnableProduct = () => {
        if (props.item?.id) enableMutate(props.item?.id, {
            onSuccess: () => {
                setSnackeEnableOpen(true)
            }
        });
    };

    const handleActive = (checked: boolean) => {
        // handleEnableProduct()
        if (checked) {
            handleDisableProduct()
        } else {
            handleEnableProduct()
        }
    }

console.log(product?.data)

    return (
        <>
            {snackeUpdateOpen && (<PositionedSnackbar open={snackeUpdateOpen} setState={setSnackeUpdateOpen} title={updateData?.data?.Message || updateData?.message} />)}
            {snackeEnableOpen && (<PositionedSnackbar open={snackeEnableOpen} setState={setSnackeEnableOpen} title={enableData?.data?.Message || enableData?.message} />)}
            {snackeDisableOpen && (<PositionedSnackbar open={snackeDisableOpen} setState={setSnackeDisableOpen} title={disableData?.data?.Message || disableData?.message} />)}

            <Formik
                initialValues={initialValues}
                onSubmit={async (values: any, { setStatus, setSubmitting }) => {
                    try {
                        const formData = {
                            ...values,
                            approximateWeight: Number(values.approximateWeight),
                            numberInPackage: values.numberInPackage ? Number(values.numberInPackage) : 0,
                            productStandardId: values.productStandardId.value ? Number(values.productStandardId.value) : product?.data?.productStandardId,
                            productStateId: values.productStateId.value ? Number(values.productStateId.value) : product?.data?.productStateId,
                        }
                        mutate(formData, {
                            onSuccess: (message) => {
                                setSnackeUpdateOpen(true)
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
                                        {product?.data.isActive ? "فعال" : "غیر فعال"}
                                    </Typography>
                                    <Switch checked={product?.data.isActive} onChange={(_, checked) => handleActive(checked)} />
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
