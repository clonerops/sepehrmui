import { Form, Formik } from "formik"
import { Box, Button, Typography } from "@mui/material"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query"

import { useRetrieveProducts } from "../../../product/core/_hooks"
import {  dropdownProduct } from "../../_functions"

import FormikComboBox from "../../../../../_cloner/components/FormikComboBox"
import FormikPrice from "../../../product/components/FormikPrice"
import { EnqueueSnackbar } from "../../../../../_cloner/helpers/Snackebar"

const initialValues = {
    price: "",
    productId: "",
    productBrandId: ""
}

type Props = {
    refetch?: (options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}

const CreateProductInventories = (props: Props) => {
    const { data: products } = useRetrieveProducts();

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={
                async (values: any, { setStatus, setSubmitting }) => {
                    try {
                        const formData = {
                            price: Number(values.price?.replace(/,/g, "")),
                            productId: values.productId.value,
                            productBrandId: Number(values.productBrandId)
                        }
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