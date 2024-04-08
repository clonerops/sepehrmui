import { useState, useEffect } from "react";
import { Formik } from "formik";
import { useCreateCustomer, useGetCustomer, useUpdateCustomer } from "../core/_hooks";
import { customerType } from "../helpers/customerType";
import { convertValueLabelCustomerValidaty } from "../helpers/convertValueLabel";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import { useGetCustomerValidities } from "../../generic/_hooks";
import { Button, Checkbox, Typography } from "@mui/material";
import FormikCheckbox from "../../../../_cloner/components/FormikCheckbox";
import React from "react";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import { ICustomer } from "../core/_models";
import Backdrop from "../../../../_cloner/components/Backdrop";
import { createValiadtion } from "../validation/validation";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";

const initialValues = {
    firstName: "",
    lastName: "",
    fatherName: "",
    nationalId: "",
    nationalId2: "",
    mobile: "",
    address1: "",
    officialName: "",
    customerType: 0,
    customerValidityId: 1,
    tel1: "",
    isSupplier: false,
    tel2: "",
    address2: "",
    representative: "",
    settlementDay: "0",
    settlementType: 0,
};

const CustomerForm = (props: {
    id?: string | undefined;
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // refetch?: <TPageData>(
    //     options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    // ) => Promise<QueryObserverResult<any, unknown>>;
    refetch?: any;
}) => {
    const { mutate, isLoading: postLoading } = useCreateCustomer();
    const updateTools = useUpdateCustomer();
    const detailTools = useGetCustomer();
    const { data: customerValidityData } = useGetCustomerValidities();
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const isNew = !props.id;

    const fields: FieldType[][] = [
        [
            { label: "نام", name: "firstName", type: "firstName" },
            { label: "نام خانوادگی", name: "lastName", type: "productType" },
            { label: "نام پدر", name: "fatherName", type: "input" },
        ],
        [
            { label: "شناسه ملی", name: "nationalId2", type: "number" },
            { label: "کدملی", name: "nationalId", type: "nationalId" },
        ],
        [
            { label: "معرف", name: "representative", type: "input" },
            { label: "موبایل", name: "mobile", type: "mobile" },
            { label: "تلفن", name: "tel1", type: "input" },
            { label: "تلفن", name: "tel2", type: "input" },
        ],
        [
            { label: "تامین؟", name: "isSupplier", type: "checkbox" },
            { label: "نوع مشتری", name: "customerType", type: "customerType" },
            {
                label: "نوع اعتبار",
                name: "customerValidityId",
                type: "customerValidityId",
            },
        ],
        [
            { label: "آدرس یک", name: "address1", type: "description" },
            { label: "آدرس دو", name: "address2", type: "description" },
            {
                label: "",
                name: "settlementDay",
                type: "settlementDay",
            },
        ],
    ];

    const parseFields = (fields: FieldType, values: any) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "checkbox":
                return (
                    <div className="w-full flex items-center">
                        <FormikCheckbox
                            defaultChecked={detailTools?.data?.data?.isSupplier}
                            name="isSupplier"
                            label=""
                        />
                        <Typography variant="h3">
                            آیا تامین کننده می باشد؟
                        </Typography>
                    </div>
                );
            case "customerType":
                return <FormikSelect options={customerType} {...rest} />;
            case "customerValidityId":
                return (
                    <FormikSelect
                        options={convertValueLabelCustomerValidaty(
                            customerValidityData
                        )}
                        {...rest}
                    />
                );
            case "settlementDay":
                return (
                    <div className="!w-full">
                        <div className="grid grid-cols-3">
                            <Typography variant="h3" className="px-4 py-1 ">
                                تسویه حساب
                            </Typography>
                            <FormikInput
                                {...rest}
                                onInput={(e: any) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
                                }}
                                type="number"
                                boxClassName=""
                                InputProps={{
                                    inputProps: {
                                        style: {
                                            textAlign: "center",
                                            fontWeight: "bold",
                                        },
                                    },
                                }}
                            />{" "}
                            <Typography variant="h3" className="px-4 py-1 ">
                                روز
                            </Typography>
                        </div>
                        <div className="flex items-center">
                            <Checkbox
                                checked={isChecked || values.settlementDay}
                                onChange={(e: any) =>
                                    setIsChecked(e.target.checked)
                                }
                            />{" "}
                            <Typography variant="h3">بعد از وزن</Typography>
                        </div>
                    </div>
                );
            case "description":
                return <FormikInput multiline rows={3} {...rest} />;
            case "firstName":
                return <FormikInput  {...rest} />;
            case "nationalId":
                return <FormikInput placeholder="0079999999" {...rest} />;
            case "mobile":
                return <FormikInput placeholder="09129999999" {...rest} />;

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


    const onUpdate = (values: ICustomer) => {
        const formData = {
            ...values,
            nationalId: values.nationalId?.toString(),
            customerType: +values.customerType,
            settlementType: isChecked ? 1 : 0,
        };
        try {
            return updateTools.mutate(formData, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message || "ویرایش با موفقیت انجام شد", "success")
                        props.refetch()
                    } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                    }
                },
            });
        } catch (error: any) {
            return error?.response;
        }
    };

    const onAdd = (values: ICustomer) => {
        const formData = {
            ...values,
            nationalId: values.nationalId?.toString(),
            customerType: +values.customerType,
            settlementType: isChecked ? 1 : 0,
        };
        try {
            return mutate(formData, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar(response.message, "success")
                        props.setIsCreateOpen(false)
                        props.refetch()
                    } else {
                        EnqueueSnackbar(response.data.Message, "warning")
                    }
                },
            });
        } catch (error: any) {
            return error?.response;
        }
    };

    const handleSubmit = (values: ICustomer) => {
        if (props.id) onUpdate(values);
        else onAdd(values);
        props?.refetch();
    };

    if (props.id && detailTools?.isLoading) {
        return <Typography>Loading ...</Typography>;
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
                        }
                }
                validationSchema={createValiadtion}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, values }) => {
                    return (
                        <form onSubmit={handleSubmit} className="container">
                            {fields.map((rowFields) => (
                                <div
                                    className="md:flex md:justify-between md:items-start md:gap-4 space-y-4 md:space-y-0 my-4"
                                >
                                    {rowFields.map((field) =>
                                        parseFields(field, values)
                                    )}
                                </div>
                            ))}
                            <Button
                                onClick={() => handleSubmit()}
                                variant="contained"
                                color="secondary"
                            >
                                <Typography variant="h3" className="px-8 py-2">
                                    {isNew ? "ثبت مشتری" : "ویرایش مشتری"}
                                </Typography>
                            </Button>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default CustomerForm;
