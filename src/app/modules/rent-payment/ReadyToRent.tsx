import { useEffect, useState } from "react";
import { Button, Checkbox, Tooltip, Typography } from '@mui/material'

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
import { IRentPaymentFields } from "./core/_models";
import RentPaymentSelected from "./RentPaymentSelected";
import moment from "moment-jalaali";

const initialValues = {
    referenceCode: "",
    driverName: "",
    // fromDate: "",
    // toDate: "",
    fromDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
    toDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
    orderType: ""
}

const ReadyToRent = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isOpenSelected, setIsOpenSelected] = useState<boolean>(false)
    const [item, setItem] = useState<IRentPaymentFields>()
    const [isSelectAll, setIsSelectAll] = useState<boolean>(false)

    const [selectedLadingIds, setSelectedLadingIds] = useState<any>([]);
    const [selectedTransferRemittanceIds, setSelectedTransferRemittanceIds] = useState<any>([]);

    const { mutate, data: rents, isLoading } = useGetAllRents();


    useEffect(() => {
        const formData = {
            fromDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),
            toDate: moment(new Date(Date.now())).format('jYYYY/jMM/jDD'),        
        }
        mutate(formData, {
            onSuccess: (response) => {
            }
        })
        // eslint-disable-next-line
    }, []);



    const renderAction = (item: any) => {
        return (
            <Tooltip title={<Typography variant='h3'>  مشاهده جزئیات و تایید</Typography>}>
                <Typography onClick={() => handleOpen(item.row)}>
                    <ApprovalTwoTone className="!text-yellow-500" />
                </Typography>
            </Tooltip>
        );
    };

    // const renderCheckbox = (item: any) => {
    //     const isLadingChecked =
    //     isSelectAll ?
    //         selectedLadingIds.length === rents?.data.length :
    //         selectedLadingIds.includes(item.row.ladingExitPermitId);

    //     const isTransferRemittanceChecked =
    //         isSelectAll ?
    //             selectedTransferRemittanceIds.length === rents?.data.length :
    //             selectedTransferRemittanceIds.includes(item.row.purchaseOrderTransferRemittanceUnloadingPermitId);

    //     const id = item.row.ladingExitPermitId === null ? item.row.purchaseOrderTransferRemittanceUnloadingPermitId : item.row.ladingExitPermitId;

    //     return (
    //         <div className="flex justify-center items-center gap-x-4">
    //             <Checkbox
    //                 checked={isLadingChecked || isTransferRemittanceChecked}
    //                 onChange={() => {
    //                     if (isSelectAll) {
    //                         handleHeaderCheckboxClick(isLadingChecked || isTransferRemittanceChecked);
    //                     } else {
    //                         handleCheckboxClick(id, item.row.ladingExitPermitId, item.row.purchaseOrderTransferRemittanceUnloadingPermitId);
    //                     }
    //                 }}
    //             />
    //         </div>
    //     );
    // };


    const renderCheckbox = (item: any) => {
        const isLadingChecked =
            isSelectAll ?
                selectedLadingIds.length === rents?.data.length :
                selectedLadingIds.includes(item.row.ladingExitPermitId);

        const isTransferRemittanceChecked =
            isSelectAll ?
                selectedTransferRemittanceIds.length === rents?.data.length :
                selectedTransferRemittanceIds.includes(item.row.purchaseOrderTransferRemittanceUnloadingPermitId);

        const id = item.row.ladingExitPermitId === null ? item.row.purchaseOrderTransferRemittanceUnloadingPermitId : item.row.ladingExitPermitId;

        return (
            <div className="flex justify-center items-center gap-x-4">
                <Checkbox
                    checked={isSelectAll ? true : isLadingChecked || isTransferRemittanceChecked}
                    onChange={() => {
                        if (isSelectAll) {
                            handleHeaderCheckboxClick(isLadingChecked || isTransferRemittanceChecked);
                        } else {
                            handleCheckboxClick(id, item.row.ladingExitPermitId, item.row.purchaseOrderTransferRemittanceUnloadingPermitId);
                        }
                    }}
                />
            </div>
        );
    };

    const handleHeaderCheckboxClick = (isChecked: boolean) => {
        const ladingIds = rents?.data
            .filter((item: { ladingExitPermitId: string }) => item.ladingExitPermitId !== null)
            .map((item: { ladingExitPermitId: string }) => item.ladingExitPermitId);

        const transferRemittanceIds = rents?.data
            .filter((item: { purchaseOrderTransferRemittanceUnloadingPermitId: string }) => item.purchaseOrderTransferRemittanceUnloadingPermitId !== null)
            .map((item: { purchaseOrderTransferRemittanceUnloadingPermitId: string }) => item.purchaseOrderTransferRemittanceUnloadingPermitId);

        setSelectedLadingIds(isChecked ? ladingIds : []);
        setSelectedTransferRemittanceIds(isChecked ? transferRemittanceIds : []);
        setIsSelectAll(isChecked);
    };



    useEffect(() => {
        handleHeaderCheckboxClick(isSelectAll)
        // eslint-disable-next-line
    }, [isSelectAll])


    // const handleCheckboxClick = (id: any) => {
    //     const currentIndex = selectedIds.indexOf(id);
    //     const newSelectedIds = [...selectedIds];
    //     console.log("newSelectedIds", newSelectedIds)
    //     // const currentIndexTransferRemittance = selectedIdsTransferRemittance.indexOf(id);
    //     // const newSelectedIdsTransferRemittance = [...selectedIdsTransferRemittance];

    //     if (currentIndex === -1) {
    //         newSelectedIds.push(id);
    //     } else {
    //         newSelectedIds.splice(currentIndex, 1);
    //     }

    //     // if (currentIndexTransferRemittance === -1) {
    //     //     newSelectedIdsTransferRemittance.push(id);
    //     // } else {
    //     //     newSelectedIdsTransferRemittance.splice(currentIndexTransferRemittance, 1);
    //     // }

    //     setSelectedIds(newSelectedIds);
    //     // setSelectedIdsTransferRemittance(newSelectedIdsTransferRemittance);
    // };


    const handleCheckboxClick = (id: any, ladingExitPermitId: any, purchaseOrderTransferRemittanceUnloadingPermitId: any) => {
        if (ladingExitPermitId === null) {
            const currentIndex = selectedTransferRemittanceIds.indexOf(id);
            const newSelectedIds = [...selectedTransferRemittanceIds];

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
        mutate(values, {
            onSuccess: (response) => {
            },
        });
    };

    return (
        <>
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
                    columns={rentsColumns(renderAction, renderCheckbox, isSelectAll, setIsSelectAll)}
                    rows={rents?.data}
                    data={rents?.data}
                    isLoading={isLoading}
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
                <RentPaymentSelected
                    selectedLadingIds={selectedLadingIds}
                    selectedTransferRemittanceIds={selectedTransferRemittanceIds}
                    setIsOpenSelected={setIsOpenSelected}
                    item={item} />
            </TransitionsModal>

        </>
    );
};

export default ReadyToRent;


