import { useEffect } from "react";
import { Formik } from "formik";
import { Edit, Search } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

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
    const navigate = useNavigate()

    const { data: customers } = useGetCustomers();
    const cargoList = useGetCargosList();

    useEffect(() => {
        let formData = {
            PageNumber: 1,
            PageSize: 20,
        };
        cargoList.mutate(formData);
        // eslint-disable-next-line
    }, []);

    const handleFilter = (values: any) => {
        let formData = {
            OrderCode: values?.orderCode ? values?.orderCode : "",
            CustomerId: values.customerId ? values.customerId : "",
        };
        cargoList.mutate(formData);
    }

    const renderAction = (item: any) => {
        return (
            <Tooltip title={<Typography variant='h3'>ویرایش</Typography>}>
                <div className="flex gap-x-4">
                    <Link to={`/dashboard/cargoList/${item?.row?.id}`}>
                        <Edit color="secondary" />
                    </Link>
                </div>
            </Tooltip>
        );
    };

    return (
        <>
            <ReusableCard>
                <Formik initialValues={{
                    orderCode: "",
                    customerId: ""
                }} onSubmit={() => { }}>
                    {({ values }) => {
                        return (
                            <form>
                                <div
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
                                </div>
                            </form>
                        );
                    }}
                </Formik>

                <MuiDataGrid
                    columns={readyToLadingColumns(renderAction)}
                    rows={cargoList?.data?.data}
                    data={cargoList?.data?.data}
                    isLoading={cargoList?.isLoading}
                    onDoubleClick={(item: any) => navigate(`/dashboard/cargoList/${item?.row?.id}`)}
                />
            </ReusableCard>
        </>
    );
};

export default CargoList;
