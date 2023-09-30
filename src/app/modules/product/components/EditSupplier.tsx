import { Form, Formik } from "formik";
import { useRetrieveProducts, useUpdateSupplier } from "../core/_hooks";
import { ISuppliers } from "../core/_models";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";
import { useGetCustomers } from "../../customer/core/_hooks";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker";
import { dropdownCustomer, dropdownProduct } from "../../generic/_functions";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import PositionedSnackbar from "../../../../_cloner/components/Snackbar";

const EditSupplier = (props: {
    item: ISuppliers | undefined,
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}) => {
    // Fetching Data
    const { mutate, data, isLoading } = useUpdateSupplier();
    const { data: customers } = useGetCustomers()
    const { data: products } = useRetrieveProducts()
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);

    // States
    const initialValues = {
        id: props.item?.id,
        customerId: props.item?.customerId,
        productId: props.item?.productId,
        price: props.item?.price,
        rentAmount: props.item?.rentAmount,
        overPrice: props.item?.overPrice,
        priceDate: props.item?.priceDate,
        rate: props.item?.rate
    };
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
                        mutate(values, {
                            onSuccess: () => {
                                setSnackeOpen(true)
                                props.refetch()
                            }
                        });
                    } catch (error) {
                        setStatus("اطلاعات ویرایش محصول نادرست می باشد");
                        setSubmitting(false);
                    }
                }
            }>
                {({ handleSubmit, setFieldValue }) => {
                    return <Form onSubmit={handleSubmit} className="container">
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-2 gap-8 my-4">
                            <FormikSelect label="مشتری" defaultValue={{ value: props.item?.customerId, label: `${props.item?.customerFirstName + " " + props.item?.customerLastName}` }} name={"customerId"}  options={dropdownCustomer(customers?.data)} />
                            <FormikSelect label="محصول" defaultValue={{value: props.item?.productId, label: props.item?.productName}} name={"productId"}  options={dropdownProduct(products?.data)} />
                        </Box>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-3 gap-8 my-4">
                            <FormikInput label="قیمت" name="price"  type="text" />
                            <FormikDatepicker label="تاریخ قیمت" name="priceDate"  setFieldValue={setFieldValue} />
                            <FormikInput label="قیمت تمام شده" name="overPrice"  type="text" />
                        </Box>
                        <Box component="div" className="grid grid-cols-2 md:grid-cols-2 gap-8 my-4">
                            <FormikInput label="کرایه" name="rentAmount" type="text" />
                            <FormikInput label="امتیاز" name="rate"  type="text" />
                        </Box>
                        <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                            <Typography variant="h3" className="px-8 py-2">ویرایش تامین کننده</Typography>
                        </Button>
                    </Form>
                }}
            </Formik>
        </>
    );
};

export default EditSupplier;