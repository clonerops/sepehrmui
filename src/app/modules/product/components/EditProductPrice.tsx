import { Form, Formik } from "formik"
import { useRetrieveBrands, useRetrieveProducts, useUpdateProductPrice } from "../core/_hooks"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query"
import { IProductPrice } from "../core/_models"
import FormikSelect from "../../../../_cloner/components/FormikSelect"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { dropdownBrand, dropdownProduct } from "../../generic/_functions"
import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import PositionedSnackbar from "../../../../_cloner/components/Snackbar"
import React from "react"

type Props = {
    refetch: (options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined) => Promise<QueryObserverResult<any, unknown>>
    item: IProductPrice | undefined
}

const EditProductPrice = (props: Props) => {
    const { data: products } = useRetrieveProducts();
    const { data: brands } = useRetrieveBrands();
    const { mutate, data } = useUpdateProductPrice()
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);


    const initialValues = {
        price: props.item?.price,
        productId: props.item?.productId,
        productBrandId: props.item?.productBrandId
    }

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


            <Formik initialValues={initialValues} onSubmit={
                async (values, { setStatus, setSubmitting }) => {
                    try {
                        const formData = {
                            id: props.item?.id,
                            price: Number(values.price),
                            productId: values.productId,
                            productBrandId: values.productBrandId
                        }
                        mutate(formData, {
                            onSuccess: () => {
                                setSnackeOpen(true)
                                props.refetch()
                            }
                        })
                    } catch (error) {
                        setStatus("اطلاعات ثبت نادرست می باشد");
                        setSubmitting(false);
                    }
                }
            }>
                {({ handleSubmit }) => {
                    return <Form onSubmit={handleSubmit}>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormikSelect defaultValue={{ value: props.item?.product?.id, label: props.item?.product?.productName }} name="productId" options={dropdownProduct(products?.data)} label="کالا" />
                            <FormikSelect defaultValue={{ value: props.item?.productBrandId, label: props.item?.brandName }} name="productBrandId" options={dropdownBrand(brands)} label="برند" />
                            <FormikInput name="price" type="text" label="قیمت" />
                        </Box>
                        <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                            <Typography variant="h3" className="px-8 py-2">ویرایش قیمت کالا</Typography>
                        </Button>
                    </Form>
                }}
            </Formik>
        </>
    )
}

export default EditProductPrice