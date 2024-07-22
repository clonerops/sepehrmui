import { Formik, FormikProps } from "formik"
import { Button, Typography } from "@mui/material"
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query"
import FormikPrice from "../../../../_cloner/components/FormikPrice"
import { IProducts } from "../../products/_models"
import { useEffect, useRef } from "react"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { useIncraseInventory } from "../_hooks"
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar"
import Backdrop from "../../../../_cloner/components/Backdrop"

const initialValues = {
    inventory: "",
    productName: "",
    productBrandName: 30
}

type Props = {
    refetch?: (options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined) => Promise<QueryObserverResult<any, unknown>>
    productItem: {row: IProducts} | undefined
}

const CreateProductInventories = (props: Props) => {
    const increseInventoryMethode = useIncraseInventory()
    let formikRef = useRef<FormikProps<any>>(null)
    useEffect(() => {
        formikRef.current?.setFieldValue("productName", props.productItem?.row.productName)
        formikRef.current?.setFieldValue("productBrandName", props.productItem?.row.productBrandName)
         // eslint-disable-next-line
    }, [props.productItem?.row])

    
    return (
        <>
        {increseInventoryMethode.isLoading && <Backdrop loading={increseInventoryMethode.isLoading} />}
            <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={
                async (values: any, { setStatus, setSubmitting }) => {
                    try {
                        const formData = {
                            inventory: +values.inventory?.replace(/,/g, ""),
                            productBrandId: props.productItem?.row.productBrandId && +props.productItem?.row.productBrandId
                        }
                        increseInventoryMethode.mutate(formData, {
                            onSuccess: (response) => {
                                if(response.succeeded) {
                                    EnqueueSnackbar(response.message, "success")
                                } else {
                                    EnqueueSnackbar(response.data.Message, "error")
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
                    return <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-y-4 mt-8 mb-4">
                        <Typography variant="h3" color="red">راهنما:</Typography>
                            <ul className="flex flex-col gap-y-2">
                                <li><Typography color="primary" variant="h4">جهت افزایش موجودی کافیست تا مقدار موجودی را وارد نمایید</Typography></li>
                                <li><Typography color="primary" variant="h4">2. فیلد های نام کالا و برند قابل تغییر نیستند</Typography></li>
                                <li><Typography color="primary" variant="h4">3. بعد از"ثبت موجودی" موجودی جدید جایگزین موجودی قبلی می شود</Typography></li>
                            </ul>
                            <div className="flex flex-row gap-x-4">
                                <FormikInput  disabled label="کالا" name="productName" />
                                <FormikInput disabled label="برند" name="productBrandName" />
                            </div>
                            <FormikPrice  label="مقدار موجودی" name="inventory" />
                        </div>
                        <Button onClick={() => handleSubmit()} variant="contained" color="secondary" className="mt-4">
                            <Typography variant="h3" className="px-8 py-2">ثبت موجودی</Typography>
                        </Button>
                    </form>
                }}
            </Formik>
        </>
    )
}

export default CreateProductInventories