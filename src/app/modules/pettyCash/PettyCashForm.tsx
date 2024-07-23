import { useEffect } from "react";
import { Formik } from "formik";
import {QueryObserverResult,RefetchOptions,RefetchQueryFilters } from "@tanstack/react-query";
import { Button, Typography } from "@mui/material";
import { FieldType } from "../../../_cloner/components/globalTypes";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { IPettyCash } from "./_models";
import { createProductValidations } from "./_validations";
import { useGetPettyCashById, usePostPettyCash, usePutPettyCash } from "./_hooks";

import Backdrop from "../../../_cloner/components/Backdrop";
import FormikInput from "../../../_cloner/components/FormikInput";

const initialValues = {
    mobileNo: "", 
    pettyCashDescription: "", 
};

const PettyCashForm = (props: {
    id?: number | undefined
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
    // Fetchig    
    const postTools = usePostPettyCash();
    const updateTools = usePutPettyCash();
    const detailTools = useGetPettyCashById()

    const isNew = !props.id

    const fields: FieldType[][] = [
        [
            { label: "نام تنخواه گردان", name: "pettyCashDescription", type: "input" },
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
         // eslint-disable-next-line
    }, [props.id]);


    const onUpdate = (values: IPettyCash) => {
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

    const onAdd = (values: IPettyCash) => {
        try {
            return postTools.mutate(values, {
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

    const onSubmit = (values: IPettyCash) => {
        if (props.id) onUpdate(values);
        else onAdd(values);
    };

    return (
        <>
            {detailTools.isLoading && <Backdrop loading={detailTools.isLoading} />}
            {postTools.isLoading && <Backdrop loading={postTools.isLoading} />}
            {updateTools.isLoading && <Backdrop loading={updateTools.isLoading} />}
            <Formik
                enableReinitialize
                initialValues={
                    isNew
                        ? initialValues
                        : { ...initialValues, ...detailTools?.data?.data }
                }
                validationSchema={createProductValidations}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            {fields.map((rowFields) => (
                                <div className="md:flex md:justify-between md:items-start gap-4 md:space-y-0 space-y-4 my-4">
                                    {rowFields.map((field) => parseFields(field))}
                                </div>
                            ))}
                            <Button type="submit" variant="contained" color="secondary" >
                                <Typography variant="h3" className="px-8 py-2">
                                    {isNew ? "ثبت بانک" : "ویرایش بانک"}
                                </Typography>
                            </Button>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default PettyCashForm;
