import { useEffect } from 'react'
import { Formik } from "formik";
import { FieldType } from "../../../_cloner/components/globalTypes";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import FormikInput from "../../../_cloner/components/FormikInput";
import { useGetCustomers } from "../customer/core/_hooks";
import { customerCompanyValidation } from "./validation";
import { Button, Typography } from "@mui/material";
import { useGetCustomerCompanyMutate, usePostCustomerCompanies, useUpdateCustomerCompanies } from "./_hooks";
import { ICustomerCompany } from './_models';
import { enqueueSnackbar } from 'notistack';
import FormikMaskInput from '../../../_cloner/components/FormikMaskInput';
import Backdrop from '../../../_cloner/components/Backdrop';
import { EnqueueSnackbar } from '../../../_cloner/helpers/snackebar';
import FormikCustomer from '../../../_cloner/components/FormikCustomer';

const initialValues = {
    companyName: "",
    customerId: "",
    economicId: "",
    postalCode: "",
    nationalId: "",
    customerType: 1,
    tel1: "",
    tel2: "",
    address: "",
    isActive: true
};

const customerType = [
    { value: 1, label: "حقیقی" },
    { value: 2, label: "حقوقی" },
]

type Props = {
    refetch: any,
    id?: any,
}

const CustomerCompanyForm = (props: Props) => {
    const customerTools = useGetCustomers();
    const postTools = usePostCustomerCompanies();
    const detailTools = useGetCustomerCompanyMutate()
    const updateTools = useUpdateCustomerCompanies()

    const isNew = !props.id;

    const getDetail = () => {
        if (props.id)
            try {
                detailTools.mutate(props.id, {
                    onSuccess: () => {
                    },
                });
            } catch (error: any) {
                return error?.response;
            }
    };

    useEffect(() => {
        getDetail();
         // eslint-disable-next-line
    }, [props.id]);


    const fields: FieldType[][] = [
        [
            { label: "مشتری", name: "customerId", type: "customer" },
            { label: "شرکت", name: "companyName", type: "company" },
        ],
        [
            { label: "شناسه اقتصادی", name: "economicId", type: "economicId" },
            { label: "شناسه ملی", name: "nationalId", type: "input" },
        ],
        [
            { label: "کدپستی", name: "postalCode", type: "postal" },
            { label: "نوع شرکت", name: "customerType", type: "customerType" },
        ],
        [
            { label: "تلفن", name: "tel1", type: "input" },
            { label: "موبایل", name: "tel2", type: "input" },
        ],
        [{ label: "آدرس", name: "address", type: "address" }],
    ];

    const parseFields = (fields: FieldType) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "customer":
                return (
                    // <FormikSelect
                    //     disabled={!isNew}
                    //     options={dropdownCustomer(customerTools?.data?.data)}
                    //     {...rest}
                    // />
                    <FormikCustomer isLabelSetValue disabled={!isNew} {...rest} />
                );
            case "customerType":
                return (
                    <FormikSelect
                        options={customerType}
                        {...rest}
                    />
                );
            case "address":
                return <FormikInput multiline minRows={3} {...rest} />;
            case "company":
                return <FormikInput disabled={!isNew} {...rest} />;
            case "economicId":
                return <FormikMaskInput mask={Number} {...rest} />;
            case "postal":
                return <FormikMaskInput onInput={(e: any) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
                }} mask={Number} {...rest} />;
            default:
                return <FormikMaskInput mask={Number} {...rest} />;
        }
    };


    const onUpdate = (values: ICustomerCompany) => {
        const formData: any = {
            ...values,
            customerId: values?.customerId?.value ? values?.customerId?.value : "" 
        }
        try {
            return updateTools.mutate(formData, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        EnqueueSnackbar("ویرایش با موفقیت انجام شد", "success")
                    }
                    props.refetch();
                },
            });
        } catch (error: any) {
            return error?.response;
        }
    };

    const onAdd = (values: ICustomerCompany) => {
        const formData: any = {
            ...values,
            customerId: values?.customerId?.value ? values?.customerId?.value : ""
        }

        try {
            return postTools.mutate(formData, {
                onSuccess: (response) => {
                    if (response.succeeded) {
                        enqueueSnackbar("ایجاد با موفقیت انجام شد", {
                            variant: "success",
                            anchorOrigin: { vertical: "top", horizontal: "center" }
                        })
                    }

                    props.refetch();
                },
            });
        } catch (error: any) {
            return error?.response;
        }
    };

    const handleSubmit = (values: ICustomerCompany) => {
        if (props.id) onUpdate(values);
        else onAdd(values);
        props.refetch();
    };

    if(detailTools.isLoading) {
        return <Backdrop loading={detailTools.isLoading} />
    }

    return (
        <>
            {customerTools.isLoading && <Backdrop loading={customerTools.isLoading} />}
            {postTools.isLoading && <Backdrop loading={postTools.isLoading} />}
            {updateTools.isLoading && <Backdrop loading={updateTools.isLoading} />}
            <Formik
                enableReinitialize
                initialValues={
                    isNew
                        ? initialValues
                        : {
                            ...initialValues,
                            ...detailTools?.data?.data,
                            customerId: {label: detailTools?.data?.data?.customer || "مقدار ندارد", value: detailTools?.data?.data?.customerId}
                        }
                }
                validationSchema={customerCompanyValidation} onSubmit={() => { }}>
                {({ values }) => {
                    return (
                        <form>
                            {fields.map((rowFields) => (
                                <div className="md:flex md:justify-between md:items-start md:gap-4 space-y-4 md:space-y-0 my-4">
                                    {rowFields.map((field) =>
                                        parseFields(field)
                                    )}
                                </div>
                            ))}
                            <Button
                                onClick={() =>
                                    handleSubmit(values)
                                }
                                variant="contained"
                                color="secondary"
                            >
                                <Typography variant="h3" className="px-8 py-2" >
                                    ثبت
                                </Typography>
                            </Button>
                        </form>
                    );
                }}
            </Formik>
        </>
    )
}

export default CustomerCompanyForm