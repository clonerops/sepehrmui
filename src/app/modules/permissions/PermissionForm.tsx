import { useEffect } from "react";
import {  Formik } from "formik";
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from "@tanstack/react-query";
import FormikInput from "../../../_cloner/components/FormikInput";
import { IconButton } from "@mui/material";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { useGetPermission, usePostPermissions, useUpdatePermissions } from "./_hooks";
import { IPermission } from "./_models";
import { AddCircleOutline, Edit } from "@mui/icons-material";
import FormikApplicationMenu from "../../../_cloner/components/FormikApplicarionMenu";
import Backdrop from "../../../_cloner/components/Backdrop";

const initialValues = {
    name: "",
    description: "",
    applicationMenuId: ""
};

const PermissionForm = (props: {
    id?: any
    onClose?: any;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
    // Fetchig
    const postPermissions = usePostPermissions();
    const updateTools = useUpdatePermissions();
    const detailTools = useGetPermission()

    // States

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


    const onUpdate = (values: IPermission) => {
        try {
            return updateTools.mutate(values, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response?.message || "ویرایش با موفقیت انجام شد", "success")
                        props.refetch()
                        props.onClose()
                    } else {
                        EnqueueSnackbar(response?.data?.Message, "error")
                    }
                },
            });
        } catch (error: any) {
            return error?.response;
        }
    };

    const onAdd = (values: IPermission) => {
        try {
            return postPermissions.mutate(values, {
                onSuccess: (message: any) => {
                    if (message.succeeded) {
                        EnqueueSnackbar(message?.message, "success")
                        props.refetch();
                    } else {
                        EnqueueSnackbar(message?.data?.Message, "error")
                    }
                },
            });
    
        } catch (error: any) {
            return error?.response;
        }
    };

    const handleSubmit = (values: IPermission) => {
        if (props.id) onUpdate(values);
        else onAdd(values);
        props.refetch()
    };

    if (props.id && detailTools?.isLoading) {
        return <Backdrop loading={detailTools?.isLoading} />
    }


    return (
        <>
        {(postPermissions.isLoading || updateTools.isLoading) && <Backdrop loading={postPermissions.isLoading || updateTools.isLoading} />}
            <Formik
                initialValues={
                    isNew
                        ? initialValues
                        : { ...initialValues, ...detailTools?.data?.data, name: detailTools?.data?.data.name }
                }
                // validationSchema={createPermissionValidation}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <form
                            onSubmit={handleSubmit}
                            className="mb-4"
                                    >
                                        <div
                                            className={`${isNew ? "md:flex md:justify-start md:items-start gap-x-4 " : "md:flex md:flex-col mt-8 gap-8"}`}
                                        >
                                            <FormikInput
                                                name="name"
                                                label="عنوان مجوز"
                                                autoFocus={true}
                                                disabled={!isNew}
                                                boxClassName=" mt-2 md:mt-0"
                                            />
                                            <FormikInput
                                                name="description"
                                                label="توضیحات"
                                                boxClassName=" mt-2 md:mt-0"
                                            />
                                            <FormikApplicationMenu
                                                name="applicationMenuId"
                                                label="منو"
                                                boxClassName=" mt-2 md:mt-0"
                                            />
                                            {/* <FormikInput
                                                name="description"
                                                label="توضیحات"
                                                boxClassName=" mt-2 md:mt-0"
                                            /> */}
                                            <div
                                                className="mt-2 md:mt-0"
                                            >
                                                {updateTools.isLoading || postPermissions.isLoading ? "درحال پردازش ..." :
                                                    <IconButton
                                                        onClick={() =>
                                                            handleSubmit()
                                                        }
                                                        className="!bg-[#fcc615]"
                                                    >
                                                        {isNew ? <AddCircleOutline color="primary" /> : <Edit color="primary" />}
                                                    </IconButton>
                                                }
                                            </div>
                                        </div>
                                    </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default PermissionForm;
