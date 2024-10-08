import { useEffect } from "react";
import { Formik } from "formik";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, UseMutationResult } from "@tanstack/react-query";
import { Button, Typography } from "@mui/material";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { useCreateProduct, useRetrieveProduct, useUpdateProduct } from "./_hooks";
import { IProductFilters, IProducts } from "./_models";
import { createProductValidations } from "./_validations";
import { FieldType } from "../../../_cloner/components/globalTypes";

import FormikState from "../../../_cloner/components/FormikState";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import FormikInput from "../../../_cloner/components/FormikInput";
import FormikType from "../../../_cloner/components/FormikType";
import FormikStandard from "../../../_cloner/components/FormikStandard";
import Backdrop from "../../../_cloner/components/Backdrop";
import { dropdownUnit } from "../../../_cloner/helpers/dropdowns";
import { useGetUnits } from "../generic/_hooks";

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
    // productTools:  UseMutationResult<any, unknown, IProductFilters, unknown>;
}) => {
    // Fetchig
    const { mutate, isLoading: postLoading } = useCreateProduct();
    const { data: productUnit } = useGetUnits();
    const updateTools = useUpdateProduct();
    const detailTools = useRetrieveProduct()

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
                    <FormikType disabeld={!isNew} {...rest} />
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
                return <FormikInput disabled={!isNew} {...rest} />;

            default:
                return <FormikInput {...rest} />;
        }
    };

    const getDetail = () => {
        if (props.id)
            try {
                detailTools.mutate(props.id);
            } catch (error: any) {
                return error?.response;
            }
    };

    useEffect(() => {
        getDetail();
         // eslint-disable-next-line
    }, [props.id]);


    const onUpdate = (values: IProducts) => {
        try {
            return updateTools.mutate(values, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message || "ویرایش با موفقیت انجام شد", "success")
                        
                        props.setIsCreateOpen(false)
                    } else {
                        EnqueueSnackbar(response.data.Message, "error")
                    }
                    props.refetch()
                },
            });

        } catch (error: any) {
            return error?.response;
        }
    };

    const onAdd = (values: IProducts) => {
        try {
            return mutate(values, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message || "ویرایش با موفقیت انجام شد", "success")
                        props.setIsCreateOpen(false)

                    } else {
                        EnqueueSnackbar(response.data.Message, "error")
                    }
                    props.refetch()

                },
            });
        } catch (error: any) {
            return error?.response;
        }
    };

    const onSubmit = (values: IProducts) => {
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
            {postLoading && <Backdrop loading={postLoading} />}
            {updateTools.isLoading && <Backdrop loading={updateTools.isLoading} />}
            <Formik
                initialValues={
                    isNew
                        ? initialValues
                        : { ...initialValues, ...detailTools?.data?.data }
                }
                validationSchema={createProductValidations}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            {fields.map((rowFields) => (
                                <div
                                    className="md:flex md:justify-between md:items-start gap-4 md:space-y-0 space-y-4 my-4"
                                >
                                    {rowFields.map((field) =>
                                        parseFields(field)
                                    )}
                                </div>
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
                        </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default ProductForm;
