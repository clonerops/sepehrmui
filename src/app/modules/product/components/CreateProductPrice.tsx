import { Form, Formik } from "formik"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query"
import { Box, Button, Typography } from "@mui/material"

import { useCreateProductPrice, useRetrieveProducts } from "../core/_hooks"
import { dropdownProduct } from "../../generic/_functions"
import { createProductPriceValidations } from "../validations/createProductPrice"
import { FieldType } from "../../../../_cloner/components/globalTypes"
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions"

import FormikInput from "../../../../_cloner/components/FormikInput"
import FormikComboBox from "../../../../_cloner/components/FormikComboBox"
import FormikBrandPriceSelect from "./FormikBrandPriceSelect"

const initialValues = {
    price: "",
    productId: "",
    productBrandId: ""
}

type Props = {
    refetch: (options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}

const CreateProductPrice = (props: Props) => {
    const { data: products } = useRetrieveProducts()
    const { mutate } = useCreateProductPrice()

    const fields: FieldType[][] = [
        [
            { label: "کالا", name: "productId", type: "productId" },
        ],
        [
            { label: "برند", name: "productBrandId", type: "productBrandId" },
        ],
        [
            { label: "قیمت", name: "price", type: "input" },
        ],
    ];

    const parseFields = (fields: FieldType, values: any) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "productId":
                return <FormikComboBox options={dropdownProduct(products?.data)} {...rest} />;
            case "productBrandId":
                return <FormikBrandPriceSelect productId={values.productId.value} {...rest} />
            default:
                return <FormikInput {...rest} />;
        }
    };

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={createProductPriceValidations} onSubmit={
                async (values: any, { setStatus, setSubmitting }) => {
                    try {
                        const formData = {
                            price: Number(values.price?.replace(/,/g, "")),
                            // productId: values.productId.value,
                            productBrandId: Number(values.productBrandId)
                        }
                        mutate(formData, {
                            onSuccess: (response) => {
                                if(response.succeeded) {
                                    validateAndEnqueueSnackbar(response.message || "ایجاد با موفقیت انجام شد", "success")
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
                        <Button onClick={() => handleSubmit()} variant="contained" color="secondary" className="mt-4">
                            <Typography variant="h3" className="px-8 py-2">ثبت قیمت</Typography>
                        </Button>

                        {/* <Box component="div" className="flex flex-col gap-y-4 mb-4">
                            <FormikComboBox label="کالا" name="productId" options={dropdownProductBrandName(productBrandListTools?.data?.data)} />
                            <FormikSelect label="برند" name="productBrandId" options={dropdownBrand(productBrandTools?.data?.data)} />
                            <FormikPrice  label="قیمت" name="price" />
                        </Box>
                        <Button onClick={() => handleSubmit()} variant="contained" color="secondary" className="mt-4">
                            <Typography variant="h3" className="px-8 py-2">ثبت قیمت</Typography>
                        </Button> */}
                    </Form>
                }}
            </Formik>
        </>
    )
}

export default CreateProductPrice