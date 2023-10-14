import { Form, Formik } from "formik"
import { useCreateProductPrice, useRetrieveBrands, useRetrieveProducts } from "../core/_hooks"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query"
import FormikSelect from "../../../../_cloner/components/FormikSelect"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { dropdownBrand, dropdownProduct } from "../../generic/_functions"
import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import PositionedSnackbar from "../../../../_cloner/components/Snackbar"
import { createProductPriceValidations } from "../validations/createProductPrice"
import React from "react"
import FormikComboBox from "../../../../_cloner/components/FormikComboBox"
import FormikPrice from "./FormikPrice"

const initialValues = {
    price: "",
    productId: "",
    productBrandId: ""
}

type Props = {
    refetch: (options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}

const CreateProductInventories = (props: Props) => {
    const { data: products } = useRetrieveProducts();
    const { data: brands } = useRetrieveBrands();
    const { mutate, data } = useCreateProductPrice()

    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);


    return (
        <>
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={
                        data?.data?.Message ||
                        data?.message || "ایجاد با موفقیت انجام شد"
                    }
                />
            )}

            <Formik initialValues={initialValues} validationSchema={createProductPriceValidations} onSubmit={
                async (values: any, { setStatus, setSubmitting }) => {
                    console.log(values)
                    try {
                        const formData = {
                            price: Number(values.price?.replace(/,/g, "")),
                            productId: values.productId.value,
                            productBrandId: Number(values.productBrandId)
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
                            <FormikComboBox label="کالا" name="productId" options={dropdownProduct(products?.data)} />
                            <FormikPrice  label="موجودی قابل فروش" name="price" />
                        </Box>
                        <Button onClick={() => handleSubmit()} variant="contained" color="secondary" className="mt-4">
                            <Typography variant="h3" className="px-8 py-2">ثبت قیمت</Typography>
                        </Button>
                    </Form>
                }}
            </Formik>
        </>
    )
}

export default CreateProductInventories