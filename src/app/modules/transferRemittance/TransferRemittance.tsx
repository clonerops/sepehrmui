import { useState } from "react";
import { Formik, FormikErrors } from "formik";
import { Button, Typography } from "@mui/material";

import ReusableCard from "../../../_cloner/components/ReusableCard";
import FormikWarehouse from "../../../_cloner/components/FormikWarehouse";
import RadioGroup from "../../../_cloner/components/RadioGroup";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import FormikAmount from "../../../_cloner/components/FormikAmount";
import FormikInput from "../../../_cloner/components/FormikInput";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import TransferAmount from "./TransferAmount";
import Backdrop from "../../../_cloner/components/Backdrop";
import CardWithIcons from "../../../_cloner/components/CardWithIcons";
import FormikWarehouseBasedOfType from "../../../_cloner/components/FormikWarehouseBasedOfType";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";

import { FieldType } from "../../../_cloner/components/globalTypes";
import { useGetVehicleTypes, useGetWarehouses } from "../generic/_hooks";
import { useGetProductList } from "../products/_hooks";
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount";
import { renderAlert } from "../../../_cloner/helpers/sweetAlert";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { AddTask, DesignServices } from "@mui/icons-material";
import { TransferRemittanceValidation } from "./_validation";
import { dropdownVehicleType } from "../../../_cloner/helpers/dropdowns";

import moment from "moment-jalaali";
import _ from "lodash";
import { usePostTransferRemittance } from "./_hooks";
import { TransferRemittanceDetailColumn, TransferRemittanceDetailForTransferColumn } from "../../../_cloner/helpers/columns";
import { WarehouseType } from "../warehouse/_models";

const initialValues = {
    originWarehouseId: "",
    destinationWarehouseId: "",
    transferRemittanceTypeId: "",
    description: ""
}

const fields: FieldType[][] = [
    [
        { label: "راننده", name: "driverName", type: "input" },
        { label: "باربری", name: "shippingName", type: "input" },
        { label: "پلاک خودرو", name: "carPlaque", type: "input" },
        { label: "نوع خودرو", name: "vehicleTypeId", type: "select" },
    ],
    [
        { label: "شماره همراه راننده", name: "driverMobile", type: "input" },
        { label: "تاریخ تحویل", name: "deliverDate", type: "datepicker" },
        { label: "مبلغ کرایه", name: "fareAmount", type: "amount" },
    ],
    [
        { label: "آدرس محل تخلیه", name: "unloadingPlaceAddress", type: "desc" },
        { label: "توضیحات", name: "description", type: "desc" },
    ]
];

// const categories = [
//     { value: 1, title: "طبق برنامه", defaultChecked: true },
//     { value: 2, title: "برای رزرو", defaultChecked: false },
//     { value: 3, title: "برای انبار", defaultChecked: false }
// ]


const TransferRemittance = () => {
    const vehicleList = useGetVehicleTypes()
    const warehouse = useGetWarehouses()
    const productsInventory = useGetProductList()
    const transfer = usePostTransferRemittance()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [itemSelected, setItemSelected] = useState<any>({})
    const [productForTransferRemittance, setProductForTransferRemittance] = useState<any>([])

    const parseFields = (fields: FieldType, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>, index: number) => {
        const { type, ...rest } = fields;
        switch (type) {
            case "datepicker":
                return <FormikDatepicker key={index} setFieldValue={setFieldValue} boxClassName="w-full" {...rest} />
            case "select":
                return <FormikSelect key={index} options={dropdownVehicleType(vehicleList.data)} {...rest} />
            case "amount":
                return <FormikAmount key={index} {...rest} />;
            case "desc":
                return <FormikInput key={index} multiline minRows={3} {...rest} />;

            default:
                return <FormikInput key={index} {...rest} />;
        }
    };

    const renderDelete = (values: any) => {
        const filtered = productForTransferRemittance.filter((item: { productBrandId: number }) => {
            return +item.productBrandId !== +values.productBrandId
        })

        setProductForTransferRemittance(filtered)
    }

    const onFilterWarehouseFrom = (value: any) => {
        const filter = {
            ByBrand: true,
            HasPurchaseInventory: true,
            WarehouseId: +value
        }
        productsInventory.mutate(filter)
    }

    const handleTransferRemittance = (values: any) => {
        const formData: any = {
            ...values,
            originWarehouseId: +values.originWarehouseId,
            fareAmount: values.fareAmount ? +values.fareAmount : 0,
            destinationWarehouseId: +values.destinationWarehouseId.value,
            transferRemittanceTypeId: 1,
            details: _.map(productForTransferRemittance, (item) => {
                return {
                    productBrandId: +item.productBrandId,
                    transferAmount: +item.transferAmount,
                }
            }),
            description: values.description
        }

        transfer.mutate(formData, {
            onSuccess: (response) => {
                if (response.data.Errors && response.data.Errors.length > 0) {
                    EnqueueSnackbar(response.data.Errors[0], "error")
                } else {
                    if (response.succeeded) {
                        renderAlert(`حواله انتقال با شماره ${response.data.id} با موفقیت انجام پذیرفت`)
                    } else {
                        EnqueueSnackbar(response.data.Message, "error")
                    }
                }
            }
        })
    }

    return (
        <>
            {transfer.isLoading && <Backdrop loading={transfer.isLoading} />}
            {vehicleList.isLoading && <Backdrop loading={vehicleList.isLoading} />}
            {warehouse.isLoading && <Backdrop loading={warehouse.isLoading} />}
            {productsInventory.isLoading && <Backdrop loading={productsInventory.isLoading} />}

            <Formik initialValues={initialValues} validationSchema={TransferRemittanceValidation} onSubmit={handleTransferRemittance}>
                {({ setFieldValue, handleSubmit }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 lg:grid-cols-3 mb-4 gap-4">
                                <CardWithIcons
                                    title='شماره حواله'
                                    icon={<DesignServices className="text-white" />}
                                    value={transfer?.data?.data?.id || 0}
                                    iconClassName='bg-[#3322D8]' />
                                <CardWithIcons
                                    title='تاریخ حواله'
                                    icon={<AddTask className="text-white" />}
                                    value={moment(new Date(Date.now())).format('jYYYY/jMM/jDD')}
                                    iconClassName='bg-[#369BFD]' />
                                <ReusableCard cardClassName="flex flex-col gap-y-4">
                                    <FormikWarehouseBasedOfType
                                        name="originWarehouseId"
                                        label="انبار مبدا"
                                        onChange={onFilterWarehouseFrom}
                                        warehouse={warehouse?.data?.filter((item: { warehouseTypeId: number }) => item.warehouseTypeId === WarehouseType.Mabadi)}
                                    />
                                    <FormikWarehouse
                                        name="destinationWarehouseId"
                                        label="انبار مقصد"
                                    />
                                </ReusableCard>
                                {/* <ReusableCard cardClassName="flex justify-center items-center flex-col gap-y-4">
                                    <RadioGroup
                                        categories={categories}
                                        id="transferRemittanceTypeId"
                                        key="transferRemittanceTypeId"
                                        name="transferRemittanceTypeId"
                                    />
                                </ReusableCard> */}

                            </div>
                            <ReusableCard cardClassName="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <Typography variant="h3" className="text-gray-500 pb-2">لیست کالاهای موجود در انبار</Typography>
                                    <MuiDataGrid
                                        columns={TransferRemittanceDetailColumn(setIsOpen, setItemSelected)}
                                        rows={productsInventory.data?.data || []}
                                        data={productsInventory.data?.data || []}
                                        isLoading={productsInventory.isLoading}
                                        onDoubleClick={() => { }}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h3" className="text-gray-500 pb-2">لیست کالاهای انتخاب شده جهت انتقال حواله</Typography>
                                    <MuiDataGrid
                                        columns={TransferRemittanceDetailForTransferColumn(renderDelete)}
                                        rows={productForTransferRemittance}
                                        data={productForTransferRemittance}
                                        onDoubleClick={() => { }}
                                    />
                                </div>
                            </ReusableCard>
                            <ReusableCard cardClassName="mt-4">
                                <Typography variant="h3" className="text-gray-500 pb-2">جزئیات حمل توسط راننده</Typography>
                                {fields.map((rowFields, index) => (
                                    <div key={index} className="md:flex md:justify-between md:items-start md:gap-4 space-y-4 md:space-y-0 my-4">
                                        {rowFields.map((field, index) =>
                                            parseFields(field, setFieldValue, index)
                                        )}
                                    </div>
                                ))}
                            </ReusableCard>
                            <div className="flex justify-end items-end mt-8">
                                <ButtonComponent disabled={productForTransferRemittance.length < 0}>
                                    <Typography variant="h4" className="px-4 py-2 text-white">ثبت صدور حواله</Typography>
                                </ButtonComponent>
                            </div>
                        </form>
                    );
                }}
            </Formik>

            {isOpen &&
                <TransitionsModal
                    open={isOpen}
                    isClose={() => setIsOpen(false)}
                    width="50%"
                    title="مقدار انتقال"
                >
                    <TransferAmount productForTransferRemittance={productForTransferRemittance} setProductForTransferRemittance={setProductForTransferRemittance} setIsOpen={setIsOpen} item={itemSelected} />
                </TransitionsModal>
            }

        </>
    );
};

export default TransferRemittance;
