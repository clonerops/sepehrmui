import { Form, Formik } from "formik";
import { Box, Button, Typography } from "@mui/material";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";

import { useGetCustomers } from "../../customer/core/_hooks";
import { dropdownCustomer, dropdownProduct } from "../../generic/_functions";

import FormikSelect from "../../../../_cloner/components/FormikSelect";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikDatepicker from "../../../../_cloner/components/FormikDatepicker";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import { useCreateSupplier, useRetrieveSupplierById, useUpdateSupplier } from "./_hooks";
import { createSupplierValidations } from "./_validations";
import { useEffect } from "react";
import { ISuppliers } from "./_models";
import moment from "moment-jalaali";
import { useRetrieveProducts } from "../products/_hooks";
import Backdrop from "../../../../_cloner/components/Backdrop";
const initialValues = {
    price: "",
    rentAmount: "",
    overPrice: "",
    rate: "",
    customerId: "",
    productId: "",
    priceDate: ""
};

const SupplierForm = (props: {
    id?: string | undefined
    items?: any
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}) => {
    // fetching Data
    const { mutate, isLoading: postLoading } = useCreateSupplier();
    const { data: customers } = useGetCustomers()
    const { data: products } = useRetrieveProducts()
    const detailTools = useRetrieveSupplierById()
    const updateTools = useUpdateSupplier();


    const isNew = !props.id

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

    const onUpdate = (values: ISuppliers) => {
        const formData = {
            ...values, id: props.id
        }
        try {
            return updateTools.mutate(formData, {
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


    const onAdd = (values: ISuppliers) => {
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


    const handleSubmit = (values: ISuppliers) => {
        const formData = {
            price: Number(values.price),
            rentAmount: Number(values.rentAmount),
            overPrice: Number(values.overPrice),
            rate: Number(values.rate),
            customerId: values.customerId,
            productId: values.productId,
            priceDate: values.priceDate
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
            {updateTools.isLoading && <Backdrop loading={updateTools.isLoading} />}
            {postLoading && <Backdrop loading={postLoading} />}
            <Formik
                enableReinitialize
                initialValues={
                    isNew
                        ? initialValues
                        : {
                            ...initialValues,
                            ...detailTools?.data?.data,
                            priceDate: moment(detailTools?.data?.data.priceDate).format('jYYYY/jMM/jDD')
                        }
                }
                validationSchema={createSupplierValidations} onSubmit={handleSubmit}>
                {({ handleSubmit, setFieldValue }) => {
                    return <Form onSubmit={handleSubmit} className="container">
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-2 gap-8 my-4">
                            <FormikSelect name={"customerId"} label="مشتری" options={dropdownCustomer(customers?.data)} />
                            <FormikSelect name={"productId"} label="کالا" options={dropdownProduct(products?.data)} />
                        </Box>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-3 gap-8 my-4">
                            <FormikInput name="price" label="قیمت" type="text" />
                            <FormikInput name="overPrice" label="قیمت تمام شده" type="text" />
                            <FormikDatepicker name="priceDate" label="تاریخ قیمت" setFieldValue={setFieldValue} />
                        </Box>
                        <Box component="div" className="grid grid-cols-2 md:grid-cols-2 gap-8 my-4">
                            <FormikInput name="rentAmount" label="کرایه" type="text" />
                            <FormikInput name="rate" label="امتیاز" type="text" />
                        </Box>
                        <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                            <Typography variant="h3" className="px-8 py-2">{isNew ? "ثبت تامین کننده" : "ویرایش تامین کننده"}</Typography>
                        </Button>
                    </Form>
                }}
            </Formik>
        </>
    );
};

export default SupplierForm;