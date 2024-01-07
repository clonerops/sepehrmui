import { Form, Formik } from "formik"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query"
import { Box, Button, Switch, Typography } from "@mui/material"

import { useCreateProductPrice, useRetrieveProductPriceById, useRetrieveProducts, useUpdateProductPrice } from "../core/_hooks"
import { dropdownProduct } from "../../generic/_functions"
import { createProductPriceValidations } from "../validations/createProductPrice"
import { FieldType } from "../../../../_cloner/components/globalTypes"
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions"

import FormikInput from "../../../../_cloner/components/FormikInput"
import FormikComboBox from "../../../../_cloner/components/FormikComboBox"
import FormikBrandPriceSelect from "./FormikBrandPriceSelect"
import { useEffect, useState } from "react"
import { IProductPrice } from "../core/_models"
import FormikAmount from "./FormikAmount"
import SwitchComponent from "../../../../_cloner/components/Switch"

const initialValues = {
    price: "",
    productId: "",
    productBrandId: ""
}

type Props = {
    id?: string | undefined
    items?: any
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: (options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}

const ProductPriceForm = (props: Props) => {
    const { data: products } = useRetrieveProducts()
    const { mutate } = useCreateProductPrice()

    const updateTools = useUpdateProductPrice();
    const detailTools = useRetrieveProductPriceById()

    const [checked, setChecked] = useState<boolean>(props?.items?.isActive)

    const isNew = !props.id


    const fields: FieldType[][] = [
        [
            { label: "کالا", name: "productId", type: "productId" },
        ],
        [
            { label: "برند", name: "productBrandId", type: "productBrandId" },
        ],
        [
            { label: "قیمت", name: "price", type: "price" },
        ],
    ];

    const parseFields = (fields: FieldType, values: any) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "productId":
                return <FormikComboBox disabled={!isNew} options={dropdownProduct(products?.data)} {...rest} />;
            case "productBrandId":
                return <FormikBrandPriceSelect disabled={!isNew} productId={isNew ? values.productId.value : props.items.productId} {...rest} />
                case "price":
                    return <FormikAmount {...rest} />;
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
    }, [props.id]);



    const onUpdate = (values: IProductPrice) => {
        try {
            return updateTools.mutate(values, {
                onSuccess: (response) => {
                    if(response.succeeded) {
                        validateAndEnqueueSnackbar(response.message || "ویرایش با موفقیت انجام شد", "success")
                        props.refetch()
                        props.setIsCreateOpen(false)
                    } else {
                        validateAndEnqueueSnackbar(response.data.Message, "error")
                    }
    
                },
            });

        } catch (error: any) {
            return error?.response;
        }
    };


    const onAdd = (values: IProductPrice) => {
        try {
            return mutate(values, {
                onSuccess: (response) => {
                    if(response.succeeded) {
                        validateAndEnqueueSnackbar(response.message || "ویرایش با موفقیت انجام شد", "success")
                        props.refetch()
                        props.setIsCreateOpen(false)

                    } else {
                        validateAndEnqueueSnackbar(response.data.Message, "error")
                    }

                },
            });
        } catch (error: any) {
            return error?.response;
        }
    };


    const handleSubmit = (values: IProductPrice) => {
        const formData: any = {
            id: props.id,
            price: Number(values.price),
            isActive : checked,
        }
        
        if (props.id) onUpdate(formData);
        else onAdd(values);
        props.refetch()
    };

    if (props.id && detailTools?.isLoading) {
        return <Typography>Loading ...</Typography>
    }

    console.log("checked", checked)

    return (
        <>
            <Formik 
                initialValues={
                    isNew
                        ? initialValues
                        : { ...initialValues, ...detailTools?.data?.data, productId: props.items.productName, price: detailTools?.data?.data.price.toString() }
                }
            validationSchema={createProductPriceValidations} onSubmit={handleSubmit}>
                {({ handleSubmit, values }) => {
                    return <Form onSubmit={handleSubmit}>
                        {fields.map((rowFields) => (
                            <Box
                                component="div"
                                className="md:flex md:justify-between md:gap-4 space-y-4 md:space-y-0 my-4"
                            >
                                {rowFields.map((field) =>
                                    parseFields(field, values)
                                )}
                            </Box>
                        ))}
                        <Box component="div" className="flex flex-col">
                        {!isNew &&
                        <Box component="div" className="flex flex-row items-center">

                                <SwitchComponent
                                    checked={checked}
                                    onChange={(e) => setChecked(e.target.checked)}
                                    />
                                    <Typography variant="h3">{checked ? "فعال" : "غیرفعال"}</Typography>
                        </Box>
                        }
                        <Button onClick={() => handleSubmit()} variant="contained" color="secondary" className="mt-4">
                            <Typography variant="h3" className="px-8 py-2">{isNew ? "ثبت قیمت" : "ویرایش قیمت"}</Typography>
                        </Button>

                        </Box>
                    </Form>
                }}
            </Formik>
        </>
    )
}

export default ProductPriceForm