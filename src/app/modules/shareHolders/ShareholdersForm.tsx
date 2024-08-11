import FormikInput from "../../../_cloner/components/FormikInput";
import Backdrop from "../../../_cloner/components/Backdrop";

import { useEffect } from "react";
import { Formik } from "formik";
import {  Button, Typography } from "@mui/material";
import { FieldType } from "../../../_cloner/components/globalTypes";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { IShareholder } from "./_models";
import { createShareHolderValidations } from "./_validations";
import { useGetShareHolderById, usePostShareHolder, usePutShareHolder } from "./_hooks";
import { renderAlert } from "../../../_cloner/helpers/sweetAlert";

const initialValues = {
    firstName: "", 
    lastName: "", 
    fatherName: "",
    mobileNo: "",
};

const ShareholdersForm = (props: {
    id?: string | undefined
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    getLists: () => void
}) => {
    // Fetchig
    const postTools = usePostShareHolder();
    const updateTools = usePutShareHolder();
    const detailTools = useGetShareHolderById()

    const isNew = !props.id

    const fields: FieldType[][] = [
        [
            { label: "نام سهامدار", name: "firstName", type: "productName" },
            { label: "نام خانوادگی سهامدار", name: "lastName", type: "productType" },
        ],
        [
            { label: "نام پدر", name: "fatherName", type: "productType" },
            { label: "شماره همراه", name: "mobileNo", type: "productType" },
        ]
       
    ];

    const parseFields = (fields: FieldType) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "description":
                return <FormikInput {...rest} multiline rows={3} />;
            case "productName":
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


    const onUpdate = (values: IShareholder) => {
        try {
            return updateTools.mutate(values, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message || "ویرایش با موفقیت انجام شد", "success")
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

    const onAdd = (values: IShareholder) => {
        try {
            return postTools.mutate(values, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message, "success")
                        renderAlert(`سهامدار با موفقیت ایجاد گردید کد سهامدار: ${response?.data?.shareHolderCode}`)
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

    const onSubmit = (values: IShareholder) => {
        if (props.id) onUpdate(values);
        else onAdd(values);
        props.getLists()

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
                validationSchema={createShareHolderValidations}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <form>
                            {fields.map((rowFields) => (
                                <div
                                    className="md:flex md:justify-between md:items-start gap-4 md:space-y-0 space-y-4 my-4"
                                >
                                    {rowFields.map((field) =>
                                        parseFields(field)
                                    )}
                                </div>
                            ))}
                            <Button
                                onClick={() => handleSubmit()}
                                variant="contained"
                                color="secondary"
                            >
                                <Typography variant="h3" className="px-8 py-2">
                                    {isNew ? "ثبت سهامدار" : "ویرایش سهامدار"}
                                </Typography>
                            </Button>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default ShareholdersForm;
