import { Formik } from "formik";
import { Button, Typography } from "@mui/material";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";


import FormikInput from "../../../_cloner/components/FormikInput";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import moment from "moment-jalaali";
import Backdrop from "../../../_cloner/components/Backdrop";

import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { useCreateSupplier, useRetrieveSupplierById, useUpdateSupplier } from "./_hooks";
import { createSupplierValidations } from "./_validations";
import { useEffect } from "react";
import { ISuppliers } from "./_models";
import FormikProduct from "../../../_cloner/components/FormikProductComboSelect";
import FormikCustomer from "../../../_cloner/components/FormikCustomer";

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
    const postTools = useCreateSupplier();
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
         // eslint-disable-next-line
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
        const formData = {
            ...values,
            productId: values.productId.value,
            customerId: values.customerId.value,
        }
        try {
            return postTools.mutate(formData, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message || "ویرایش با موفقیت انجام شد", "success")
                        props.setIsCreateOpen(false)
                        
                    } else {
                        EnqueueSnackbar(response.data.Message, "error")
                    }
                    props.refetch()
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
            customerId: values.customerId.value,
            productId: values.productId.value,
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
            {postTools.isLoading && <Backdrop loading={postTools.isLoading} />}
            <Formik
                enableReinitialize
                initialValues={
                    isNew
                        ? initialValues
                        : {
                            ...initialValues,
                            ...detailTools?.data?.data,
                            priceDate: moment(detailTools?.data?.data.priceDate).format('jYYYY/jMM/jDD'),
                            customerId: {label: `${detailTools?.data?.data?.customer.firstName} ${detailTools?.data?.data?.customer.lastName}`, value: detailTools?.data?.data?.customerId},
                            productId: {label: `${detailTools?.data?.data?.product?.productName}`, value: detailTools?.data?.data?.productId}
                        }
                }
                validationSchema={createSupplierValidations} onSubmit={handleSubmit}>
                {({ handleSubmit, setFieldValue }) => {
                    return <form onSubmit={handleSubmit} className="container">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-4">
                            <FormikCustomer name={"customerId"} label="مشتری" />
                            <FormikProduct name={"productId"} label="کالا" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-4">
                            <FormikInput name="price" label="قیمت" type="text" />
                            <FormikInput name="overPrice" label="قیمت تمام شده" type="text" />
                            <FormikDatepicker name="priceDate" label="تاریخ قیمت" setFieldValue={setFieldValue} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 my-4">
                            <FormikInput name="rentAmount" label="کرایه" type="text" />
                            <FormikInput name="rate" label="امتیاز" type="text" />
                        </div>
                        <Button onClick={() => handleSubmit()} variant="contained" color="secondary">
                            <Typography variant="h3" className="px-8 py-2">{isNew ? "ثبت تامین کننده" : "ویرایش تامین کننده"}</Typography>
                        </Button>
                    </form>
                }}
            </Formik>
        </>
    );
};

export default SupplierForm;