import { useEffect, useState } from "react"
import { Formik } from "formik"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query"
import { Button, Typography } from "@mui/material"

import { FieldType } from "../../../_cloner/components/globalTypes"
import { EnqueueSnackbar } from "../../../_cloner/helpers/Snackebar"
import { IProductPrice } from "./_models"
import { createProductPriceValidations } from "./_validation"
import { useCreateProductPrice, useRetrieveProductPriceById, useUpdateProductPrice } from "./_hooks"
// import { useRetrieveProducts } from "../products/_hooks"

import FormikInput from "../../../_cloner/components/FormikInput"
import FormikComboBox from "../../../_cloner/components/FormikComboBox"
import FormikBrandPriceSelect from "../../../_cloner/components/FormikBrandPriceSelect"
import FormikAmount from "../../../_cloner/components/FormikAmount"
import SwitchComponent from "../../../_cloner/components/Switch"
import Backdrop from "../../../_cloner/components/Backdrop"
import { dropdownProduct } from "../../../_cloner/helpers/Dropdowns"
import { useGetProductList } from "../products/_hooks"

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
    // const { data: products } = useRetrieveProducts()
    const { data: products } = useGetProductList()
    const { mutate, isLoading: postLoading } = useCreateProductPrice()

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
         // eslint-disable-next-line
    }, [props.id]);



    const onUpdate = (values: IProductPrice) => {
        try {
            return updateTools.mutate(values, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message || "ویرایش با موفقیت انجام شد", "success")
                        props.refetch()
                        props.setIsCreateOpen(false)
                    } else {
                        EnqueueSnackbar(response.data.Message, "error")
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
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message || "ویرایش با موفقیت انجام شد", "success")
                        props.refetch()
                        props.setIsCreateOpen(false)

                    } else {
                        EnqueueSnackbar(response.data.Message, "error")
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
            isActive: checked,
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
                        : { ...initialValues, ...detailTools?.data?.data, productId: props.items.productName, price: detailTools?.data?.data.price.toString() }
                }
                validationSchema={createProductPriceValidations} onSubmit={handleSubmit}>
                {({ handleSubmit, values }) => {
                    return <form onSubmit={handleSubmit}>
                        {fields.map((rowFields) => (
                            <div
                                className="md:flex md:justify-between md:gap-4 space-y-4 md:space-y-0 my-4"
                            >
                                {rowFields.map((field) =>
                                    parseFields(field, values)
                                )}
                            </div>
                        ))}
                        <div className="flex flex-col">
                            {!isNew &&
                                <div className="flex flex-row items-center">

                                    <SwitchComponent
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                    />
                                    <Typography variant="h3">{checked ? "فعال" : "غیرفعال"}</Typography>
                                </div>
                            }
                            <Button type="submit" variant="contained" color="secondary" className="mt-4">
                                <Typography variant="h3" className="px-8 py-2">{isNew ? "ثبت قیمت" : "ویرایش قیمت"}</Typography>
                            </Button>

                        </div>
                    </form>
                }}
            </Formik>
        </>
    )
}

export default ProductPriceForm