import { Form, Formik, FormikProps } from "formik"
import { Box, Button, Typography } from "@mui/material"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query"

import {  dropdownProduct } from "../../_functions"

import FormikPrice from "../../../../../_cloner/components/FormikPrice"
import { useRetrieveProducts } from "../../products/_hooks"
import { IProducts } from "../../products/_models"
import { useEffect, useRef } from "react"
import FormikSelect from "../../../../../_cloner/components/FormikSelect"

const initialValues = {
    price: "",
    productId: "",
    productBrandId: 30
}

type Props = {
    refetch?: (options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined) => Promise<QueryObserverResult<any, unknown>>
    productItem: {row: IProducts} | undefined
}

const CreateProductInventories = (props: Props) => {
    const { data: products } = useRetrieveProducts();
    let formikRef = useRef<FormikProps<any>>(null)
    useEffect(() => {
        formikRef.current?.setFieldValue("productId", props.productItem?.row.id)
        formikRef.current?.setFieldValue("productBrandId", props.productItem?.row.productBrandId)
    }, [props.productItem?.row])
    return (
        <>
            <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={
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
                        <Box component="div" className="flex flex-col gap-y-4 mt-8">
                            <Box className="flex flex-row gap-x-4">
                                <FormikSelect disabled label="کالا" name="productId" options={dropdownProduct(products?.data)} />
                                {/* <FormikBrand disabled label="برند" name="productBrandId" /> */}
                            </Box>
                            <FormikPrice  label="موجودی قابل فروش" name="price" />
                        </Box>
                        <Button onClick={() => handleSubmit()} variant="contained" color="secondary" className="mt-4">
                            <Typography variant="h3" className="px-8 py-2">ثبت موجودی</Typography>
                        </Button>
                    </Form>
                }}
            </Formik>
        </>
    )
}

export default CreateProductInventories