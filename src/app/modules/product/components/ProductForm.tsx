import { useEffect } from "react";
import { Form, Formik } from "formik";
import { createProductValidations } from "../validations/createProduct";
import { useCreateProduct, useRetrieveProduct, useRetrieveProductById, useUpdateProduct } from "../core/_hooks";
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from "@tanstack/react-query";
import FormikInput from "../../../../_cloner/components/FormikInput";
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
import { FieldType } from "../../../../_cloner/components/globalTypes";
import { useGetUnits } from "../../generic/productUnit/_hooks";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import { IProducts } from "../core/_models";
import { IType } from "../../generic/productType/_models";
import FormikType from "../../../../_cloner/components/FormikType";
import FormikStandard from "../../../../_cloner/components/FormikStandard";
import FormikState from "../../../../_cloner/components/FormikState";

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

const ProductForm = (props: {
    id?: string | undefined
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
    const updateTools = useUpdateProduct();
    const detailTools = useRetrieveProduct()

    // States
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);
    const [snackeEditOpen, setSnackeEditOpen] = useState<boolean>(false);

    const isNew = !props.id

    const fields: FieldType[][] = [
        [
            { label: "نام کالا", name: "productName", type: "productName" },
            { label: "نوع کالا", name: "productTypeId", type: "productType" },
        ],
        [
            { label: "سایز", name: "productSize", type: "input" },
            { label: "ضخامت", name: "productThickness", type: "input" },
            { label: "وزن", name: "approximateWeight", type: "input" },
            {
                label: "تعداد در بسته",
                name: "numberInPackage",
                type: "input",
            },
        ],
        [
            {
                label: "استاندارد",
                name: "productStandardId",
                type: "productStandard",
            },
            { label: "حالت", name: "productStateId", type: "productState" },
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
        ],
        [
           
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
            }


        ],
        [
            { label: "توضیحات", name: "description", type: "input" }
        ],
    ];

    const parseFields = (fields: FieldType) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "productType":
                return (
                    <FormikType {...rest} />
                );
            case "productStandard":
                return (
                    <FormikStandard {...rest} />
                );
            case "productState":
                return (
                    <FormikState {...rest} />
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
            case "productName":
                return <FormikInput {...rest} />;

            default:
                return <FormikInput {...rest} />;
        }
    };

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


    const onUpdate = (values: IProducts) => {
        try {
            return updateTools.mutate(values, {
                onSuccess: (response) => {
                    setSnackeEditOpen(true);
                    props.refetch()
                    props.setIsCreateOpen(false)
                },
            });
        } catch (error: any) {
            setSnackeEditOpen(true);
            return error?.response;
        }
    };

    const onAdd = (values: IProducts) => {
        try {
            return mutate(values, {
                onSuccess: (response) => {
                    setSnackeOpen(true)
                    props.refetch()
                    props.setIsCreateOpen(false)
                },
            });
        } catch (error: any) {
            setSnackeOpen(false);
            return error?.response;
        }
    };

    const handleSubmit = (values: IProducts) => {
        const formData = {
            ...values,
            numberInPackage: values.numberInPackage ? values.numberInPackage : 0
        }
        if (props.id) onUpdate(formData);
        else onAdd(values);
        props.refetch()
    };

    if (props.id && detailTools?.isLoading) {
        return <Typography>Loading ...</Typography>
    }


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
                validationSchema={createProductValidations}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form>
                            {fields.map((rowFields) => (
                                <Box
                                    component="div"
                                    className="md:flex md:justify-between md:items-start gap-4 md:space-y-0 my-4"
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
                                    {isNew ? "ثبت کالا" : "ویرایش کالا"}
                                </Typography>
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default ProductForm;
