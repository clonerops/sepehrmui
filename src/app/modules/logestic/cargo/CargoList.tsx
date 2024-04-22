import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Edit, LayersClear, Search } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FormikInput from "../../../../_cloner/components/FormikInput";
import FormikSelect from "../../../../_cloner/components/FormikSelect";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";

import { useGetCustomers } from "../../customer/core/_hooks";
import { useDeleteCargoById, useGetCargosList } from "../core/_hooks";
import { dropdownCustomer } from "../../generic/_functions";
import { readyToLadingColumns } from "../../managment-order/helpers/columns";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";
import Pagination from "../../../../_cloner/components/Pagination";

const pageSize = 100

const CargoList = () => {
    const navigate = useNavigate()

    const { data: customers } = useGetCustomers();
    const cargoList = useGetCargosList();
    const deleteCargo = useDeleteCargoById()

    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        let formData = {
            PageNumber: currentPage,
            PageSize: 20,
        };
        cargoList.mutate(formData);
        // eslint-disable-next-line
    }, [currentPage]);

    const handleFilter = (values: any) => {
        let formData = {
            OrderCode: values?.orderCode ? values?.orderCode : "",
            CustomerId: values.customerId ? values.customerId : "",
        };
        cargoList.mutate(formData);
    }

    const handleDeleteCargo = (id: string) => {
        deleteCargo.mutate(id, {
            onSuccess: (response) => {
                if(response.message) {
                    EnqueueSnackbar("ابطال بارنامه با موفقیت انجام پذیرفت", 'success')
                } else {
                    EnqueueSnackbar(response.data.Message, 'error')
                }
            }
        })
    }

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };


    const renderAction = (item: any) => {
        return (
            <div className="flex flex-row items-center justify-center gap-x-4">
                <Tooltip title={<Typography variant='h3'>ویرایش</Typography>}>
                    <div className="flex gap-x-4">
                        <Link to={`/dashboard/cargoList/${item?.row?.id}`}>
                            <Edit color="secondary" />
                        </Link>
                    </div>
                </Tooltip>
                <Tooltip title={<Typography variant='h3'>ابطال اعلام بار</Typography>}>
                    <div className="flex gap-x-4">
                        <LayersClear onClick={() => handleDeleteCargo(item?.row?.id)} className="text-red-500" />
                    </div>
                </Tooltip>
            </div>
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
                    hideFooter
                />
                <Pagination pageCount={+cargoList?.data?.totalCount / +pageSize || 1} onPageChange={handlePageChange} />
            </ReusableCard>
        </>
    );
};

export default CargoList;
