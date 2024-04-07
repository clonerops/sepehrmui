import { useEffect } from "react";
import { Form, Formik } from "formik";
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from "@tanstack/react-query";
import FormikInput from "../../../../_cloner/components/FormikInput";
import { Box, Button, Typography } from "@mui/material";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import { ISlanderer } from "./_models";
import { createProductValidations } from "./_validations";
import Backdrop from "../../../../_cloner/components/Backdrop";
import { useGetSlandererById, usePostSlanderer, usePutSlanderer } from "./_hooks";

const initialValues = {
    mobileNo: "", 
    slandererDescription: "", 
};

const SlandererForm = (props: {
    id?: number | undefined
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
    // Fetchig
    const { mutate, isLoading: postLoading } = usePostSlanderer();
    const updateTools = usePutSlanderer();
    const detailTools = useGetSlandererById()

    const isNew = !props.id

    const fields: FieldType[][] = [
        [
            { label: "نام تنخواه گردان", name: "slandererDescription", type: "input" },
            { label: "شماره موبایل", name: "mobileNo", type: "input" },
        ],
       
    ];

    const parseFields = (fields: FieldType) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "input":
                return <FormikInput {...rest} />;

            default:
                return <FormikInput {...rest} />;
        }
    };

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


    const onUpdate = (values: ISlanderer) => {
        try {
            return updateTools.mutate(values, {
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

    const onAdd = (values: ISlanderer) => {
        try {
            return mutate(values, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message, "success")
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

    const handleSubmit = (values: ISlanderer) => {
        if (props.id) onUpdate(values);
        else onAdd(values);
    };

    if (props.id && detailTools?.isLoading) {
        return <Typography>Loading ...</Typography>
    }

    return (
        <>
            {postLoading && <Backdrop loading={postLoading} />}
            {updateTools.isLoading && <Backdrop loading={updateTools.isLoading} />}
            <Formik
                initialValues={
                    isNew
                        ? initialValues
                        : { ...initialValues, ...detailTools?.data?.data }
                }
                validationSchema={createProductValidations}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form>
                            {fields.map((rowFields) => (
                                <Box
                                    component="div"
                                    className="md:flex md:justify-between md:items-start gap-4 md:space-y-0 space-y-4 my-4"
                                >
                                    {rowFields.map((field) =>
                                        parseFields(field)
                                    )}
                                </Box>
                            ))}
                            <Button
                                onClick={() => handleSubmit()}
                                variant="contained"
                                color="secondary"
                            >
                                <Typography variant="h3" className="px-8 py-2">
                                    {isNew ? "ثبت بانک" : "ویرایش بانک"}
                                </Typography>
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default SlandererForm;
