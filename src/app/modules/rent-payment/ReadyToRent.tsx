import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Button, Checkbox, Typography } from '@mui/material'

import { useGetAllRents } from "./core/_hooks";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import { rentsColumns } from "./helpers/columns";
import { Formik } from "formik";
import FormikInput from "../../../_cloner/components/FormikInput";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import { Approval, ApprovalTwoTone, Search } from "@mui/icons-material";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import RentPayment from "./RentPayment";
import { IRentPayment, IRentPaymentFields } from "./core/_models";
import RentPaymentSelected from "./RentPaymentSelected";

const initialValues = {
    refrenceCode: "",
    driverName: "",
    fromDate: "",
    toDate: "",
    orderType: ""
}

const ReadyToRent = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isOpenSelected, setIsOpenSelected] = useState<boolean>(false)
    const [item, setItem] = useState<IRentPaymentFields>()
    const [isSelectAll, setIsSelectAll] = useState<boolean>(false)
    const [selectedIdsLading, setSelectedIdsLading] = useState<any>([]);
    const [selectedIdsTransferRemittance, setSelectedIdsTransferRemittance] = useState<any>([]);

    const { mutate, data: rents, isLoading } = useGetAllRents();


    useEffect(() => {
        const formData = {}
        mutate(formData, {
            onSuccess: (response) => {
            }
        })
         // eslint-disable-next-line
    }, []);



    const renderAction = (item: any) => {
        return (
            <Button onClick={() => handleOpen(item.row)} variant="contained" color="secondary"> 
                <ApprovalTwoTone  />
            </Button>
        );
    };

    const renderCheckbox = (item: any) => {
        const isChecked = 
            isSelectAll ?
            selectedIdsLading.length === rents?.data.length :
            selectedIdsLading.includes(item.row.ladingExitPermitId) 
                && 
            isSelectAll ?
            selectedIdsTransferRemittance.length === rents?.data.length :
            selectedIdsTransferRemittance.includes(item.row.purchaseOrderTransferRemittanceUnloadingPermitId);

        return (
            <div className="flex justify-center items-center gap-x-4">
                <Checkbox
                    checked={isChecked}
                    onChange={() => {
                        if (isSelectAll) {
                            handleHeaderCheckboxClick(isChecked);
                        } else {
                            handleCheckboxClick(item.row.ladingExitPermitId ? item.row.ladingExitPermitId : item.row.purchaseOrderTransferRemittanceUnloadingPermitId);
                        }
                    }}
                />
            </div>
        );
    };


    const handleHeaderCheckboxClick = (isChecked: boolean) => {
        const allIdsLading = rents?.data.map((item: any) => item.ladingExitPermitId);
        const allIdsTransferRemittance = rents?.data.map((item: any) => item.purchaseOrderTransferRemittanceUnloadingPermitId);

        setSelectedIdsLading(isChecked ? allIdsLading : []);
        setSelectedIdsTransferRemittance(isChecked ? allIdsTransferRemittance : []);
        
        setIsSelectAll(isChecked);
    };

    useEffect(() => {
        handleHeaderCheckboxClick(isSelectAll)
        // eslint-disable-next-line
    }, [isSelectAll])


    const handleCheckboxClick = (id: any) => {
        const currentIndexLading = selectedIdsLading.indexOf(id);
        const newSelectedIdsLading = [...selectedIdsLading];

        const currentIndexTransferRemittance = selectedIdsTransferRemittance.indexOf(id);
        const newSelectedIdsTransferRemittance = [...selectedIdsTransferRemittance];

        if (currentIndexLading === -1) {
            newSelectedIdsLading.push(id);
        } else {
            newSelectedIdsLading.splice(currentIndexLading, 1);
        }

        if (currentIndexTransferRemittance === -1) {
            newSelectedIdsTransferRemittance.push(id);
        } else {
            newSelectedIdsTransferRemittance.splice(currentIndexTransferRemittance, 1);
        }

        setSelectedIdsLading(newSelectedIdsLading);
        setSelectedIdsTransferRemittance(newSelectedIdsTransferRemittance);
    };



    const handleOpen = (item: IRentPaymentFields) => {
        setItem(item)
        setIsOpen(true);
        
    }

    const handleFilterBasedofStatus = (values: any) => {
        if(+values === -1) {
            const formData = {};
            mutate(formData, {
                onSuccess: (response) => {
                },
            });

        } else {
            const formData = {};
            mutate(formData, {
                onSuccess: (response) => {
                },
            });
        }
    };


    const handleSubmit = () => {
        const formData = {
            puOrderTransRemittUnloadingPermitIds: selectedIdsTransferRemittance,
            ladingExitPermitIds: selectedIdsLading,

        }

        console.log("formData", formData)
    }

    return (
        <>
            <ReusableCard>
                <div className="mb-4">
                    <Formik initialValues={initialValues} onSubmit={() => { }}>
                        {() => {
                            return <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <FormikInput name='refrenceCode' label="شماره مرجع" />
                                <FormikInput name='driverName' label="نام راننده" />
                                <FormikSelect name='orderType' label="نوع سفارش" options={[{value: 1, label: "سفارش خرید"}, {value: 2, label: "سفارش فروش"}]} />
                                <FormikDatepicker name='fromDate' label="از تاریخ" />
                                <FormikDatepicker name='toDate' label="تا تاریخ" />
                                <ButtonComponent>
                                    <Search className="text-white" />
                                    <Typography className="text-white">جستجو</Typography>
                                </ButtonComponent>
                            </div>
                        }}
                    </Formik>
                </div>
                <MuiDataGrid
                    columns={rentsColumns(renderAction, renderCheckbox, isSelectAll, setIsSelectAll)}
                    rows={rents?.data}
                    data={rents?.data}
                    isLoading={isLoading}
                />
                <div>
                    <Button onClick={() => handleSubmit()} variant="contained" color="primary" className="!my-8">
                        <div className="flex flex-row gap-x-2 px-8">
                            <Approval className="text-white" />
                            <Typography className="text-white">ثبت کرایه</Typography>
                        </div>
                    </Button>
                </div>

            </ReusableCard>
            <TransitionsModal
                open={isOpen}
                isClose={() => setIsOpen(false)}
                title="ثبت کرایه"
                description="درصورتی که مغایرتی در اطلاعات مشتری ثبت شده وجود دارد می توانید از طریق فرم ذیل اقدام به ویرایش اطلاعات کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
            >
                <RentPayment item={item} />
            </TransitionsModal>

            <TransitionsModal
                open={isOpenSelected}
                isClose={() => setIsOpenSelected(false)}
                title="ثبت کرایه"
                description="درصورتی که مغایرتی در اطلاعات مشتری ثبت شده وجود دارد می توانید از طریق فرم ذیل اقدام به ویرایش اطلاعات کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
            >
                <RentPaymentSelected item={item} />
            </TransitionsModal>

        </>
    );
};

export default ReadyToRent;


