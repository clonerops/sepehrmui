import { Form, Formik } from "formik"
import { Box, Button, Typography } from "@mui/material"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query"

import { useRetrieveProducts, useUpdateProductPrice } from "../core/_hooks"
import { IProductPrice } from "../core/_models"
import { dropdownProduct } from "../../generic/_functions"
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions"

import FormikPrice from "./FormikPrice"
import FormikSelect from "../../../../_cloner/components/FormikSelect"

type Props = {
    refetch: (options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined) => Promise<QueryObserverResult<any, unknown>>
    item: IProductPrice | undefined
}

const EditProductInventories = (props: Props) => {
    const { data: products } = useRetrieveProducts();
    const { mutate } = useUpdateProductPrice()

    const initialValues = {
        price: props.item?.price,
        productId: props.item?.productId,
        productBrandId: props.item?.productBrandId
    }

    return (
        <>

            <Formik initialValues={initialValues} onSubmit={
                async (values: any, { setStatus, setSubmitting }) => {
                    try {
                        const formData = {
                            id: props.item?.id,
                            price: Number(values.price.replace(/,/g, "")),
                            productId: values.productId,
                            productBrandId: values.productBrandId
                        }
                        mutate(formData, {
                            onSuccess: (response) => {
                                if(response.succeeded) {
                                    validateAndEnqueueSnackbar(response.message || "ویرایش با موفقیت انجام شد", "success")
                                    props.refetch()
                                  } else {
                                    validateAndEnqueueSnackbar(response.data.Message, "error",)
                                  }
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
                            <FormikPrice label="موجودی قابل فروش" name="price" />
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

export default EditProductInventories