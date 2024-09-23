import { useEffect } from "react";
import { Formik } from "formik";
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from "@tanstack/react-query";
import FormikInput from "../../../_cloner/components/FormikInput";
import { Button, Typography } from "@mui/material";
import { FieldType } from "../../../_cloner/components/globalTypes";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { IOrganizationBank } from "./_models";
import { createOrganizationBankValidations } from "./_validations";
import Backdrop from "../../../_cloner/components/Backdrop";
import FormikOfficialBank from "../../../_cloner/components/FormikOfficialBank";
import { useGetOrganizationBankById, usePostOrganizationBank, usePutOrganizationBank } from "./_hooks";

const initialValues = {
    bankId: "",
    accountOwner: "",
    accountNo: "",
    branchName: "",
};

const OrganizationBankForm = (props: {
    id?: number | undefined
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
    // Fetchig
    const postTools = usePostOrganizationBank();

    const updateTools = usePutOrganizationBank();
    const detailTools = useGetOrganizationBankById()

    const isNew = !props.id

    const fields: FieldType[][] = [
        [
            { label: "نام بانک", name: "bankId", type: "bankId" },
            { label: "صاحب حساب", name: "accountOwner", type: "input" },
        ],
        [
            { label: "شماره حساب", name: "accountNo", type: "input" },
            { label: "شعبه", name: "branchName", type: "input" },
        ],

    ];

    const parseFields = (fields: FieldType) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "bankId":
                return <FormikOfficialBank {...rest} />;
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


    const onUpdate = (values: IOrganizationBank) => {
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

    const onAdd = (values: IOrganizationBank) => {
        console.log("jkahdfkahdkahs")
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

    const onSubmit = (values: IOrganizationBank) => {
        const formData = {
            ...values,
            bankId: values.bankId ? values.bankId : detailTools?.data?.data?.bank?.bankId
        }
        if (props.id) onUpdate(formData);
        else onAdd(values);
    };

    if(detailTools.isLoading)
        return <Backdrop loading={detailTools.isLoading} />

    return (
        <>
            {postTools.isLoading && <Backdrop loading={postTools.isLoading} />}
            {updateTools.isLoading && <Backdrop loading={updateTools.isLoading} />}
            <Formik
                enableReinitialize
                initialValues={
                    isNew
                        ? initialValues
                        : { ...initialValues, ...detailTools?.data?.data }
                }
                validationSchema={createOrganizationBankValidations}
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
                            <Button
                                onClick={() => handleSubmit()}
                                variant="contained"
                                color="secondary"
                            >
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

export default OrganizationBankForm;
