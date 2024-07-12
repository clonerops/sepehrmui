import { useState, useEffect } from "react";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { Formik } from "formik";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import { dropdownCustomer } from "../../generic/_functions";
import { useGetCustomers } from "../../customer/core/_hooks";
import { Button, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Pagination from "../../../../_cloner/components/Pagination";
import { useGetCargosList } from "../core/_hooks";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import { readyToLadingColumns } from "../../managment-order/helpers/columns";

const pageSize = 20;

const ReadyToLading = () => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { data: customers } = useGetCustomers();
    const cargoList = useGetCargosList();

    useEffect(() => {
        let formData = {
            PageNumber: currentPage,
            PageSize: pageSize,
        };
        cargoList.mutate(formData);
         // eslint-disable-next-line
    }, []);

    const handleFilter = (values: any) => {
        let formData = {
            PageNumber: currentPage,
            PageSize: pageSize,
            OrderCode: values?.orderCode ? values?.orderCode : "",
            CustomerId: values.customerId ? values.customerId : "",
        };
        cargoList.mutate(formData);
    }
    
    const renderAction = (item: any) => {
        return (
            <Link to={`/dashboard/lading/${item?.row?.id}`}>
                <Button variant="contained" color="secondary">
                    <Typography>صدور مجوز</Typography>
                </Button>
            </Link>
        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    return (
        <>
            <ReusableCard>
                <Formik initialValues={{
                    orderCode: "",
                    customerId: ""
                }} onSubmit={() => {}}>
                    {({values, handleSubmit}) => {
                        return (
                            <form onSubmit={handleSubmit}>
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
                    onDoubleClick={(item: any) => navigate(`/dashboard/lading/${item?.row?.id}`)}
                />
                <Pagination
                    pageCount={cargoList?.data?.totalCount / pageSize}
                    onPageChange={handlePageChange}
                />
            </ReusableCard>
        </>
    );
};

export default ReadyToLading;
