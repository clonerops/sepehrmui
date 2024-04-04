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
import { useGetUnits } from "../productUnit/_hooks";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import FormikType from "../../../../_cloner/components/FormikType";
import FormikStandard from "../../../../_cloner/components/FormikStandard";
import FormikState from "../../../../_cloner/components/FormikState";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
// import { useCreateProduct, useRetrieveProduct, useUpdateProduct } from "./_hooks";
import { IBank } from "./_models";
import { createProductValidations } from "./_validations";
import { dropdownUnit } from "../productUnit/convertDropdown";
import Backdrop from "../../../../_cloner/components/Backdrop";

const initialValues = {
    bankName: "", 
    accountOwner: "", 
    accountNumber: "",
    branch: "",
};

const FundForm = (props: {
    id?: string | undefined
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // refetch: <TPageData>(
    //     options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    // ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
    // Fetchig
    // const { mutate, isLoading: postLoading } = useCreateProduct();
    // const { data: productUnit } = useGetUnits();
    // const updateTools = useUpdateProduct();
    // const detailTools = useRetrieveProduct()

    const isNew = !props.id

    const fields: FieldType[][] = [
        [
            { label: "نام بانک", name: "productName", type: "productName" },
            { label: "نوع بانک", name: "productTypeId", type: "productType" },
        ],
       
    ];

    const parseFields = (fields: FieldType) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "description":
                return <FormikInput {...rest} multiline rows={3} />;
            case "productName":
                return <FormikInput disabled={!isNew} {...rest} />;

            default:
                return <FormikInput {...rest} />;
        }
    };

    // const getDetail = () => {
    //     if (props.id)
    //         try {
    //             detailTools.mutate(props.id);
    //         } catch (error: any) {
    //             return error?.response;
    //         }
    // };

    // useEffect(() => {
    //     getDetail();
    // }, [props.id]);


    // const onUpdate = (values: IBank) => {
    //     try {
    //         return updateTools.mutate(values, {
    //             onSuccess: (response) => {
    //                 if (response.succeeded) {
    //                     EnqueueSnackbar(response.message || "ویرایش با موفقیت انجام شد", "success")
    //                     props.refetch()
    //                     props.setIsCreateOpen(false)
    //                 } else {
    //                     EnqueueSnackbar(response.data.Message, "error")
    //                 }

    //             },
    //         });

    //     } catch (error: any) {
    //         return error?.response;
    //     }
    // };

    // const onAdd = (values: IBank) => {
    //     try {
    //         return mutate(values, {
    //             onSuccess: (response) => {
    //                 if (response.succeeded) {
    //                     EnqueueSnackbar(response.message || "ویرایش با موفقیت انجام شد", "success")
    //                     props.refetch()
    //                     props.setIsCreateOpen(false)

    //                 } else {
    //                     EnqueueSnackbar(response.data.Message, "error")
    //                 }

    //             },
    //         });
    //     } catch (error: any) {
    //         return error?.response;
    //     }
    // };

    const handleSubmit = (values: IBank) => {
        // const formData = {
        //     // ...values,
        //     // numberInPackage: values.numberInPackage ? values.numberInPackage : 0
        // }
        // if (props.id) onUpdate(formData);
        // else onAdd(values);
        // props.refetch()
    };

    // if (props.id && detailTools?.isLoading) {
    //     return <Typography>Loading ...</Typography>
    // }


    return (
        <>
            {/* {postLoading && <Backdrop loading={postLoading} />}
            {updateTools.isLoading && <Backdrop loading={updateTools.isLoading} />} */}
            <Formik
                // initialValues={
                //     isNew
                //         ? initialValues
                //         : { ...initialValues, ...detailTools?.data?.data }
                // }
                initialValues={initialValues}
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

export default FundForm;
