import { useEffect } from 'react'
import { Form, Formik } from "formik";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import { dropdownCustomer } from "../_functions";
import FormikInput from "../../../../_cloner/components/FormikInput";
import { useGetCustomers } from "../../customer/core/_hooks";
import { customerCompanyValidation } from "./validation";
import { Box, Button, Typography } from "@mui/material";
import { useGetCustomerCompanyMutate, usePostCustomerCompanies, useUpdateCustomerCompanies } from "./_hooks";
import { ICustomerCompany } from './_models';

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
    id?: any
}

const CustomerCompanyForm = (props: Props) => {
    const { data: customers } = useGetCustomers();
    const { mutate: postCustomerCompany, data: postData } = usePostCustomerCompanies();
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
    }, [props.id]);


    const fields: FieldType[][] = [
        [
            { label: "مشتری", name: "customerId", type: "customer" },
            { label: "شرکت", name: "companyName", type: "input" },
        ],
        [
            { label: "شناسه اقتصادی", name: "economicId", type: "input" },
            { label: "شناسه ملی", name: "nationalId", type: "input" },
        ],
        [
            { label: "کدپستی", name: "postalCode", type: "input" },
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
                    <FormikSelect
                        options={dropdownCustomer(customers?.data)}
                        {...rest}
                    />
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
            default:
                return <FormikInput {...rest} />;
        }
    };


    const onUpdate = (values: ICustomerCompany) => {
        try {
            return updateTools.mutate(values, {
                onSuccess: (response) => {
                    props.refetch();
                },
            });
        } catch (error: any) {
            return error?.response;
        }
    };

    const onAdd = (values: ICustomerCompany) => {
        try {
            return postCustomerCompany(values, {
                onSuccess: (response) => {
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


    if (props.id && detailTools?.isLoading) {
        return <Typography>Loading ...</Typography>;
    }

    return (
        <Formik
            initialValues={
                isNew
                    ? initialValues
                    : {
                        ...initialValues,
                        ...detailTools?.data?.data,
                    }
            }
            validationSchema={customerCompanyValidation} onSubmit={() => { }}>
            {({ values, setFieldValue }) => {
                return (
                    <Form>
                        {fields.map((rowFields) => (
                            <Box
                                component="div"
                                className="md:flex md:justify-between md:items-start md:gap-4 space-y-4 md:space-y-0 my-4"
                            >
                                {rowFields.map((field) =>
                                    parseFields(field)
                                )}
                            </Box>
                        ))}
                        <Button
                            onClick={() =>
                                handleSubmit(values)
                            }
                            variant="contained"
                            color="secondary"
                        >
                            <Typography
                                variant="h3"
                                className="px-8 py-2"
                            >
                                ثبت
                            </Typography>
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default CustomerCompanyForm