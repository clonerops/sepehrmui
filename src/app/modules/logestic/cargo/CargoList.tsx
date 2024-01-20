import { useEffect } from "react";
import { Form, Formik } from "formik";
import { Edit, Search } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";

import { useGetCustomers } from "../../customer/core/_hooks";
import { useGetCargosList } from "../core/_hooks";
import { dropdownCustomer } from "../../generic/_functions";
import { readyToLadingColumns } from "../../managment-order/helpers/columns";


const CargoList = () => {

    const { data: customers } = useGetCustomers();
    const cargoList = useGetCargosList();

    useEffect(() => {
        let formData = {
            PageNumber: 1,
            PageSize: 20,
        };
        cargoList.mutate(formData);
    }, []);

    const handleFilter = (values: any) => {
        let formData = {
            OrderCode: values.orderCode ? values.orderCode : "",
            CustomerId: values.customerId ? values.customerId : "",
        };
        cargoList.mutate(formData);
    }
    
    const renderAction = (item: any) => {
        return (
            <Link to={`/dashboard/cargoList/${item?.row?.id}`}>
                <Button variant="contained" color="secondary">
                    <Edit />
                </Button>
            </Link>
        );
    };

    return (
        <>
            <ReusableCard>
                <Formik initialValues={{
                    orderCode: "",
                    customerId: ""
                }} onSubmit={() => {}}>
                    {({values}) => {
                        return (
                            <Form>
                                <Box
                                    component="div"
                                    className="flex gap-4 w-[50%] mb-4"
                                >
                                    <FormikInput
                                        name="orderCode"
                                        label="شماره سفارش"
                                    />
                                    <FormikSelect
                                        options={dropdownCustomer(
                                            customers?.data
                                        )}
                                        label="مشتری"
                                        name="customerId"
                                    />
                                    <ButtonComponent onClick={() => handleFilter(values)}>
                                        <Typography>
                                            <Search />
                                        </Typography>
                                    </ButtonComponent>
                                </Box>
                            </Form>
                        );
                    }}
                </Formik>

                <MuiDataGrid
                    columns={readyToLadingColumns(renderAction)}
                    rows={cargoList?.data?.data}
                    data={cargoList?.data?.data}
                    isLoading={cargoList?.isLoading}
                />
            </ReusableCard>
        </>
    );
};

export default CargoList;
