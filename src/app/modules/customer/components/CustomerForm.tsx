import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from "@tanstack/react-query";
import {
    useCreateCustomer,
    useGetCustomer,
    useUpdateCustomer,
} from "../core/_hooks";
import { customerType } from "../helpers/customerType";
import { convertValueLabelCustomerValidaty } from "../helpers/convertValueLabel";
import { createValiadtion } from "../validation/createValidation";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import { useGetCustomerValidities } from "../../generic/_hooks";
import { Box, Button, Card, Checkbox, Typography } from "@mui/material";
import FormikCheckbox from "../../../../_cloner/components/FormikCheckbox";
import React from "react";
import PositionedSnackbar from "../../../../_cloner/components/Snackbar";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import { ICustomer } from "../core/_models";
import Backdrop from "../../../../_cloner/components/Backdrop";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
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
    settlementDay: "",
    settlementType: 0,
};

const CustomerForm = (props: {
    id?: string;
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
    const { mutate, data } = useCreateCustomer();
    const updateTools = useUpdateCustomer();
    const detailTools = useGetCustomer();
    const { data: customerValidityData } = useGetCustomerValidities();
    const [snackeOpen, setSnackeOpen] = useState<boolean>(false);
    const [snackeEditOpen, setSnackeEditOpen] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const isNew = !props.id;

    const fields: FieldType[][] = [
        [
            { label: "نام", name: "firstName", type: "firstName" },
            { label: "نام خانوادگی", name: "lastName", type: "productType" },
            { label: "نام پدر", name: "fatherName", type: "input" },
        ],
        [
            { label: "اسم رسمی مشتری", name: "officialName", type: "input" },
            { label: "شناسه ملی", name: "nationalId2", type: "input" },
            { label: "کدملی", name: "nationalId", type: "input" },
        ],
        [
            { label: "معرف", name: "representative", type: "input" },
            { label: "موبایل", name: "mobile", type: "input" },
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
                    <Box component="div" className="w-full flex items-center">
                        <FormikCheckbox
                            defaultChecked={detailTools?.data?.data?.isSupplier}
                            name="isSupplier"
                            label=""
                        />
                        <Typography variant="h3">
                            آیا تامین کننده می باشد؟
                        </Typography>
                    </Box>
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
                    <Box component="div" className="!w-full">
                        <Box component={"div"} className="grid grid-cols-3">
                            <Typography variant="h3" className="px-4 py-1 ">
                                تسویه حساب
                            </Typography>
                            <FormikInput
                                {...rest}
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
                        </Box>
                        <Box component={"div"} className="flex items-center">
                            <Checkbox
                                checked={isChecked || values.settlementDay}
                                onChange={(e: any) =>
                                    setIsChecked(e.target.checked)
                                }
                            />{" "}
                            <Typography variant="h3">بعد از وزن</Typography>
                        </Box>
                    </Box>
                    // <ReusableCard cardClassName="w-full">
                    // </ReusableCard>
                );
            case "description":
                return <FormikInput multiline rows={3} {...rest} />;
            case "firstName":
                return <FormikInput  {...rest} />;

            default:
                return <FormikInput {...rest} />;
        }
    };

    const getDetail = () => {
        if (props.id)
            try {
                detailTools.mutate(props.id, {
                    onSuccess: (response) => {
                        setIsChecked(
                            response.data.settlementType !== 0
                        );
                        if (!response.succeeded) {
                            setSnackeOpen(true);
                        }
                    },
                });
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
            settlementType: isChecked ? 1 : 0,
        };
        try {
            return updateTools.mutate(formData, {
                onSuccess: (response) => {
                    setSnackeEditOpen(true);
                    props.refetch();
                },
            });
        } catch (error: any) {
            setSnackeEditOpen(true);
            return error?.response;
        }
    };

    const onAdd = (values: ICustomer) => {
        const formData = {
            ...values,
            settlementType: isChecked ? 1 : 0,
        };
        try {
            return mutate(formData, {
                onSuccess: (response) => {
                    setSnackeOpen(true);
                    props.refetch();
                },
            });
        } catch (error: any) {
            setSnackeOpen(false);
            return error?.response;
        }
    };

    const handleSubmit = (values: ICustomer) => {
        if (props.id) onUpdate(values);
        else onAdd(values);
        props.refetch();
    };

    if (props.id && detailTools?.isLoading) {
        return <Typography>Loading ...</Typography>;
    }

    return (
        <>
            {updateTools.isLoading && (
                <Backdrop loading={updateTools.isLoading} />
            )}
            {snackeOpen && (
                <PositionedSnackbar
                    open={snackeOpen}
                    setState={setSnackeOpen}
                    title={data?.data?.Message || data?.message}
                />
            )}
            {snackeEditOpen && (
                <PositionedSnackbar
                    open={snackeEditOpen}
                    setState={setSnackeEditOpen}
                    title={
                        data?.data?.Message ||
                        data?.message ||
                        "ویرایش با موفقیت انجام شد"
                    }
                />
            )}
            <Formik
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
                        <Form onSubmit={handleSubmit} className="container">
                            {fields.map((rowFields) => (
                                <Box
                                    component="div"
                                    className="md:flex md:justify-between md:items-start md:gap-4 space-y-4 md:space-y-0 my-4"
                                >
                                    {rowFields.map((field) =>
                                        parseFields(field, values)
                                    )}
                                </Box>
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
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default CustomerForm;
