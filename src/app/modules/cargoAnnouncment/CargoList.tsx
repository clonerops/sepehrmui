import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Edit, LayersClear, Search, Visibility } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import ReusableCard from "../../../_cloner/components/ReusableCard";
import FormikInput from "../../../_cloner/components/FormikInput";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import Pagination from "../../../_cloner/components/Pagination";
import Backdrop from "../../../_cloner/components/Backdrop";
import ConfirmDialog from "../../../_cloner/components/ConfirmDialog";

import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { useGetCargosList, useRevokeCargoById } from "./_hooks";
import { ReadyToLadingColumn } from "../../../_cloner/helpers/columns";
import FormikSearchableCustomer from "../../../_cloner/components/FormikSearchableCustomer";

const pageSize = 100

const CargoList = () => {
    const navigate = useNavigate()

    const cargoList = useGetCargosList();
    const revokeCargo = useRevokeCargoById()

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [approve, setApprove] = useState<boolean>(false);
    const [selecetdId, setSelectedId] = useState<string>("")

    useEffect(() => {
        let formData = {
            PageNumber: currentPage,
            PageSize: pageSize,
        };
        cargoList.mutate(formData);
        // eslint-disable-next-line
    }, [currentPage]);

    const handleFilter = (values: any) => {
        let formData = {
            CargoAnnounceNo: values?.cargoAnnounceNo ? values?.cargoAnnounceNo : "",
            OrderCode: values?.orderCode ? values?.orderCode : "",
            CustomerId: values?.customerId?.value ? values?.customerId?.value : "",
        };
        cargoList.mutate(formData);
    }
    
    const handleOpenApprove = (id: string) => {
        setApprove(true)
        setSelectedId(id)
      }

    const handleRevokeCargo = (id: string) => {
        revokeCargo.mutate(id, {
            onSuccess: (response) => {
                if(response.succeeded) {
                    EnqueueSnackbar("ابطال بارنامه با موفقیت انجام پذیرفت", 'success')
                    handleFilter({})
                    setApprove(false)
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
                        <LayersClear onClick={() => handleOpenApprove(item?.row?.id)} className="text-red-500" />
                    </div>
                </Tooltip>
                <Tooltip title={<Typography variant='h3'>جزئیات اعلام بار</Typography>}>
                    <Link to={`/dashboard/cargoAnnouncment/${item?.row?.id}`} className="flex gap-x-4">
                        <Visibility className="text-primary" />
                    </Link>
                </Tooltip>
            </div>
        );
    };    

    return (
        <>
            {revokeCargo?.isLoading && <Backdrop loading={revokeCargo?.isLoading} />}
            <ReusableCard>
                <Formik initialValues={{ orderCode: "", customerId: "" }} onSubmit={() => { }}>
                    {({ values }) => {
                        return (
                            <div className="flex flex-col lg:flex-row gap-4 w-full mb-4" >
                                <FormikInput name="cargoAnnounceNo" label="شماره اعلام بار" />
                                <FormikInput name="orderCode" label="شماره سفارش" />
                                <FormikSearchableCustomer label="سفارش دهنده" name="customerId" />
                                <ButtonComponent onClick={() => handleFilter(values)}>
                                    <Search className="text-white" />
                                    <Typography className="text-white"> جستجو </Typography>
                                </ButtonComponent>
                            </div>
                        );
                    }}
                </Formik>

                <MuiDataGrid
                    columns={ReadyToLadingColumn(renderAction)}
                    rows={cargoList?.data?.data}
                    data={cargoList?.data?.data}
                    isLoading={cargoList?.isLoading}
                    onDoubleClick={(item: any) => navigate(`/dashboard/cargoList/${item?.row?.id}`)}
                    hideFooter
                />
                <Pagination pageCount={+cargoList?.data?.totalCount / +pageSize || 100} onPageChange={handlePageChange} />
            </ReusableCard>
            <ConfirmDialog
                open={approve}
                hintTitle="آیا از ابطال مطمئن هستید؟"
                notConfirmText="لغو"
                confirmText={revokeCargo.isLoading ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => handleRevokeCargo(selecetdId)}

            />

        </>
    );
};

export default CargoList;
