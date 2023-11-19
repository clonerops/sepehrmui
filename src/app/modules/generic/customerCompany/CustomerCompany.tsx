import { useState, useEffect } from "react";
import { Box, Button, Card, Switch, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import FormikInput from "../../../../_cloner/components/FormikInput";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Fuzziesearch from "../../../../_cloner/helpers/Fuse";
import { ICustomerCompany } from "./_models";
import {
    useDeleteCustomerCompanies,
    useGetCustomerCompanies,
    usePostCustomerCompanies,
    useUpdateCustomerCompanies,
} from "./_hooks";
import DeleteGridButton from "../../../../_cloner/components/DeleteGridButton";
import PositionedSnackbar from "../../../../_cloner/components/Snackbar";
import React from "react";
import { AddCircleOutline } from "@mui/icons-material";
import * as Yup from "yup";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";
import SwitchComponent from "../../../../_cloner/components/Switch";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import { dropdownCustomer } from "../_functions";
import { useGetCustomers } from "../../customer/core/_hooks";
import TransitionsModal from "../../../../_cloner/components/ReusableModal";
import { FieldType } from "../../../../_cloner/components/globalTypes";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";

const initialValues = {
    companyName: "",
    customerId: "",
};

const companyType = [
  {value: 1, label: "حقوقی"},
  {value: 2, label: "حقیقی"},
]

const CustomerCompanies = () => {
    const {
        data: customerCompanies,
        refetch,
        isLoading: CustomerCompanyLoading,
    } = useGetCustomerCompanies("");
    const { mutate: postCustomerCompany, data: postData } =
        usePostCustomerCompanies();
    const { mutate: updateCustomerCompany, data: updateData } =
        useUpdateCustomerCompanies();
    const { mutate: deleteCustomerCompany, data: deleteData } =
        useDeleteCustomerCompanies();
    const [open, setIsOpen] = useState<boolean>(false);
    const { data: customers } = useGetCustomers();

    const [results, setResults] = useState<ICustomerCompany[]>([]);
    const [snackePostOpen, setSnackePostOpen] = useState<boolean>(false);
    const [snackeUpdateOpen, setSnackeUpdateOpen] = useState<boolean>(false);
    const [snackeDeleteOpen, setSnackeDeleteOpen] = useState<boolean>(false);
    useEffect(() => {
        setResults(customerCompanies?.data);
    }, [customerCompanies?.data]);

    const handleDelete = (id: number) => {
        if (id)
            deleteCustomerCompany(id, {
                onSuccess: (message: any) => {
                    setSnackeDeleteOpen(true);
                    refetch();
                },
            });
    };

    const onUpdateStatus = (rowData: any) => {
        try {
            const formData = {
                companyName: rowData.row.companyName,
                customerId: rowData.row.customerId,
                isActive: !rowData.row.isActive,
            };
            updateCustomerCompany(formData, {
                onSuccess: () => {
                    setSnackeUpdateOpen(true);
                    refetch();
                },
            });
        } catch (e) {
            setSnackeUpdateOpen(true);
            return e;
        }
    };

    const columns = () => {
        const col = [
            {
                field: "companyName",
                renderCell: (params: any) => {
                    return <Typography variant="h4">{params.value}</Typography>;
                },
                headerName: "نام شرکت",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "customerFullName",
                renderCell: (params: any) => {
                    console.log("params", params);
                    return (
                        <Typography variant="h4">
                            {params.row.customer.firstName +
                                " " +
                                params.row.customer.lastName}
                        </Typography>
                    );
                },
                headerName: "مشتری",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            {
                field: "customerOfficialName",
                renderCell: (params: any) => {
                    console.log("params", params);
                    return (
                        <Typography variant="h4">
                            {params.row.customer.officialName}
                        </Typography>
                    );
                },
                headerName: "اسم رسمی مشتری",
                headerClassName: "headerClassName",
                minWidth: 120,
                flex: 1,
            },
            // {
            //   field: "isActive",
            //   headerName: "وضعیت",
            //   renderCell: renderSwitch,
            //   headerClassName: "headerClassName",
            //   minWidth: 160,
            //   flex: 1,
            // },
            // { headerName: 'عملیات', flex: 1, renderCell: renderAction, headerClassName: "headerClassName", minWidth: 160 }
        ];
        return col;
    };

    const fields: FieldType[][] = [
        [
            { label: "مشتری", name: "customerId", type: "customer" },
            { label: "شرکت", name: "companyName", type: "input" },
          ],
          [
          { label: "شناسه اقتصادی", name: "fatherName", type: "input" },
            { label: "شناسه ملی", name: "customerId", type: "input" },
        ],
        [
          { label: "کدپستی", name: "lastName", type: "input" },
          { label: "تلفن", name: "fatherName", type: "input" },
          { label: "نوع شرکت", name: "fatherName", type: "companyType" },

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
            case "companyType":
                return (
                    <FormikSelect
                        options={companyType}
                        {...rest}
                    />
                );
            case "address":
                return <FormikInput multiline minRows={3} {...rest} />;
            default:
                return <FormikInput {...rest} />;
        }
    };

    const handleSubmit = async (values: any, setFieldValue: any) => {
        try {
            const formData = {
                customerId: values.customerId,
                companyName: values.companyName,
            };
            postCustomerCompany(formData, {
                onSuccess: (message: any) => {
                    setFieldValue("id", message.data.id);
                    refetch();
                    setSnackePostOpen(true);
                },
            });
        } catch (error) {
            console.log("error");
        }
    };

    if (CustomerCompanyLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {snackePostOpen && (
                <PositionedSnackbar
                    open={snackePostOpen}
                    setState={setSnackePostOpen}
                    title={postData?.data?.Message || postData?.message}
                />
            )}
            {snackeUpdateOpen && (
                <PositionedSnackbar
                    open={snackeUpdateOpen}
                    setState={setSnackeUpdateOpen}
                    title={updateData?.data?.Message || updateData?.message}
                />
            )}
            {snackeDeleteOpen && (
                <PositionedSnackbar
                    open={snackeDeleteOpen}
                    setState={setSnackeDeleteOpen}
                    title={deleteData?.data?.Message || deleteData?.message}
                />
            )}
            <ReusableCard>
                <Box
                    component="div"
                    className="md:grid md:grid-cols-2 md:gap-x-4"
                >
                    <Box component="div">
                        <Box
                            component="div"
                            className="md:flex md:justify-between md:items-center space-y-2"
                        >
                            <Box
                                component="div"
                                className="w-auto md:w-[40%] mb-2"
                            >
                                <FuzzySearch
                                    keys={["firstName", "lastName"]}
                                    data={[]}
                                    threshold={0.5}
                                    setResults={setResults}
                                />
                            </Box>
                            <Button
                                onClick={() => setIsOpen(true)}
                                variant="contained"
                                color="secondary"
                            >
                                <Typography variant="h4">تعریف شرکت</Typography>
                            </Button>
                        </Box>
                        <MuiDataGrid
                            columns={columns()}
                            rows={results}
                            data={customerCompanies?.data}
                        />
                    </Box>
                    <Box component="div">
                        <Box component="div" className="hidden md:flex md:justify-center md:items-center">
                            <Box component="img" src={toAbsoulteUrl("/media/logos/11089.jpg")} width={400}/>
                        </Box>
                    </Box>
                </Box>
            </ReusableCard>
            <TransitionsModal title="تعریف شرکت رسمی مشتری" open={open} isClose={() => setIsOpen(false)} width="w-96">
                <Formik initialValues={initialValues} onSubmit={() => {}}>
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
                                        handleSubmit(values, setFieldValue)
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
            </TransitionsModal>
        </>
    );
};

export default CustomerCompanies;
