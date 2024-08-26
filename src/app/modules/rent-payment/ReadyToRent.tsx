import { useEffect, useState } from "react";
import { Button, Checkbox, Tooltip, Typography } from '@mui/material'

import { Approval, ApprovalTwoTone, Search } from "@mui/icons-material";
import { IRentPaymentFields } from "./core/_models";
import { RentsColumns } from "../../../_cloner/helpers/columns";
import { Formik } from "formik";
import { useGetAllRents } from "./core/_hooks";

import ReusableCard from "../../../_cloner/components/ReusableCard";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import FormikInput from "../../../_cloner/components/FormikInput";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import RentPayment from "./components/RentPayment";
import RentPaymentSelected from "./components/RentPaymentSelected";
import Backdrop from "../../../_cloner/components/Backdrop";

const initialValues = {
    referenceCode: "",
    driverName: "",
    fromDate: null,
    toDate: null,
    orderType: ""
}

const ReadyToRent = () => {
    const rentTools = useGetAllRents();

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isOpenSelected, setIsOpenSelected] = useState<boolean>(false)
    const [item, setItem] = useState<IRentPaymentFields>()
    // const [isSelectAll, setIsSelectAll] = useState<boolean>(false)

    const [selectedLadingIds, setSelectedLadingIds] = useState<any>([]);
    const [selectedTransferRemittanceIds, setSelectedTransferRemittanceIds] = useState<any>([]);



    useEffect(() => {
        const formData = {
            fromDate: null,
            toDate: null,
        }
        rentTools.mutate(formData)
        // eslint-disable-next-line
    }, []);



    const renderAction = (item: any) => {
        return (
            <Button onClick={() => handleOpen(item.row)} variant="contained" size="small" color="secondary">
                <Typography>
                    پرداخت کرایه
                </Typography>
            </Button>
        );
    };

    const renderCheckbox = (item: any) => {
        // const isLadingChecked =
        //     isSelectAll ?
        //         selectedLadingIds.length === rentTools?.data?.data.length :
        //         selectedLadingIds.includes(item.row.ladingExitPermitId);
        const isLadingChecked = selectedLadingIds.includes(item.row.ladingExitPermitId);

        // const isTransferRemittanceChecked =
        //     isSelectAll ?
        //         selectedTransferRemittanceIds.length === rentTools?.data?.data.length :
        //         selectedTransferRemittanceIds.includes(item.row.unloadingPermitId);
        const isTransferRemittanceChecked = selectedTransferRemittanceIds.includes(item.row.unloadingPermitId);

        const id = item.row.ladingExitPermitId === null ? item.row.unloadingPermitId : item.row.ladingExitPermitId;

        return (
            <div className="flex justify-center items-center gap-x-4">
                <Checkbox
                    // checked={isSelectAll ? true : isLadingChecked || isTransferRemittanceChecked}
                    checked={isLadingChecked || isTransferRemittanceChecked}
                    onChange={() => {
                        handleCheckboxClick(id, item.row.ladingExitPermitId);

                        // if (isSelectAll) {
                        //     handleHeaderCheckboxClick(isLadingChecked || isTransferRemittanceChecked);
                        // } else {
                        //     handleCheckboxClick(id, item.row.ladingExitPermitId);
                        // }
                    }}
                />
            </div>
        );
    };

    // const handleHeaderCheckboxClick = (isChecked: boolean) => {
    //     const ladingIds = rentTools?.data?.data
    //         .filter((item: { ladingExitPermitId: string }) => item.ladingExitPermitId !== null)
    //         .map((item: { ladingExitPermitId: string }) => item.ladingExitPermitId);

    //     const transferRemittanceIds = rentTools?.data?.data
    //         .filter((item: { purchaseOrderTransferRemittanceUnloadingPermitId: string }) => item.purchaseOrderTransferRemittanceUnloadingPermitId !== null)
    //         .map((item: { purchaseOrderTransferRemittanceUnloadingPermitId: string }) => item.purchaseOrderTransferRemittanceUnloadingPermitId);

    //     setSelectedLadingIds(isChecked ? ladingIds : []);
    //     setSelectedTransferRemittanceIds(isChecked ? transferRemittanceIds : []);
    //     setIsSelectAll(isChecked);
    // };



    // useEffect(() => {
    //     handleHeaderCheckboxClick(isSelectAll)
    //     // eslint-disable-next-line
    // }, [isSelectAll])

    const handleCheckboxClick = (id: any, ladingExitPermitId: any) => {
        if (ladingExitPermitId === null) {
            const currentIndex = selectedTransferRemittanceIds.indexOf(id);
            const newSelectedIds = [...selectedTransferRemittanceIds];
            console.log(newSelectedIds)

            if (currentIndex === -1) {
                newSelectedIds.push(id);
            } else {
                newSelectedIds.splice(currentIndex, 1);
            }

            setSelectedTransferRemittanceIds(newSelectedIds);
        } else {
            const currentIndex = selectedLadingIds.indexOf(id);
            const newSelectedIds = [...selectedLadingIds];

            if (currentIndex === -1) {
                newSelectedIds.push(id);
            } else {
                newSelectedIds.splice(currentIndex, 1);
            }

            setSelectedLadingIds(newSelectedIds);
        }
    };

    const handleOpen = (item: IRentPaymentFields) => {
        setItem(item)
        setIsOpen(true);

    }

    const handleFilterBasedofStatus = (values: any) => {
        rentTools.mutate(values);
    };

    console.log("selectedTransferRemittanceIds", selectedTransferRemittanceIds)
    // console.log("selectedLadingIds", selectedLadingIds)

    return (
        <>
            {rentTools.isLoading && <Backdrop loading={rentTools.isLoading} />}
            <ReusableCard>
                <div className="mb-4">
                    <Formik initialValues={initialValues} onSubmit={handleFilterBasedofStatus}>
                        {({ handleSubmit }) => {
                            return <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <FormikInput name='referenceCode' label="شماره مرجع" />
                                <FormikInput name='driverName' label="نام راننده" />
                                <FormikSelect name='orderType' label="نوع سفارش" options={[{ value: 1, label: "سفارش فروش" }, { value: 2, label: "سفارش خرید" }]} />
                                <FormikDatepicker name='fromDate' label="از تاریخ" />
                                <FormikDatepicker name='toDate' label="تا تاریخ" />
                                <ButtonComponent onClick={() => handleSubmit()}>
                                    <Search className="text-white" />
                                    <Typography className="text-white">جستجو</Typography>
                                </ButtonComponent>
                            </div>
                        }}
                    </Formik>
                </div>
                <MuiDataGrid
                    // columns={RentsColumns(renderAction, renderCheckbox, isSelectAll, setIsSelectAll)}
                    columns={RentsColumns(renderAction, renderCheckbox)}
                    rows={rentTools?.data?.data}
                    data={rentTools?.data?.data}
                    isLoading={rentTools.isLoading}
                    onDoubleClick={(item: any) => handleOpen(item.row)}
                />
                <div>
                    <Button onClick={() => setIsOpenSelected(true)} variant="contained" color="primary" className="!my-8">
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
                <RentPayment item={item} setIsOpen={setIsOpen} />
            </TransitionsModal>

            <TransitionsModal
                open={isOpenSelected}
                isClose={() => setIsOpenSelected(false)}
                title="ثبت کرایه"
                description="درصورتی که مغایرتی در اطلاعات مشتری ثبت شده وجود دارد می توانید از طریق فرم ذیل اقدام به ویرایش اطلاعات کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
            >
                <RentPayment
                    item={item}
                    isOpenSelected={isOpenSelected}
                    setIsOpen={setIsOpen}
                    setIsOpenSelected={setIsOpenSelected}
                    selectedLadingIds={selectedLadingIds}
                    selectedTransferRemittanceIds={selectedTransferRemittanceIds} />
            </TransitionsModal>

        </>
    );
};

export default ReadyToRent;


