import _ from "lodash";
import { useEffect, useState } from "react";
import { Formik, FormikErrors } from "formik";
import { Button, Typography } from "@mui/material";
import { FieldType } from "../../../_cloner/components/globalTypes";
import { useGetVehicleTypes, useGetWarehouses } from "../generic/_hooks";
import { useGetProductList } from "../products/_hooks";
import { renderAlert } from "../../../_cloner/helpers/sweetAlert";
import { AddTask, DesignServices } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { dropdownVehicleType } from "../../../_cloner/helpers/dropdowns";
import { useGetTransferRemitanceByIdByMutation, useUpdateTransferRemitance } from "./_hooks";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount";

import ReusableCard from "../../../_cloner/components/ReusableCard";
import RadioGroup from "../../../_cloner/components/RadioGroup";
import FormikDatepicker from "../../../_cloner/components/FormikDatepicker";
import FormikSelect from "../../../_cloner/components/FormikSelect";
import FormikInput from "../../../_cloner/components/FormikInput";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import TransferAmount from "./TransferAmount";
import FormikWarehouseBasedOfType from "../../../_cloner/components/FormikWarehouseBasedOfType";
import Backdrop from "../../../_cloner/components/Backdrop";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import CardWithIcons from "../../../_cloner/components/CardWithIcons";
import moment from "moment-jalaali";
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


const TransferRemittanceEdit = () => {
    const { id }: any = useParams()

    const vehicleList = useGetVehicleTypes()
    const warehouse = useGetWarehouses()
    const productsInventory = useGetProductList()
    const detailTools = useGetTransferRemitanceByIdByMutation()
    const updateTools = useUpdateTransferRemitance()

    const [categories, setCategoies] = useState<any>([])
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
            WarehouseId: +value,
            OrderId: itemSelected.id
        }
        productsInventory.mutate(filter, {
            onSuccess: (response) => {
                setProductForTransferRemittance([])
            }
        })
    }

    const getDetail = () => {
        try {
            detailTools.mutate(id, {
                onSuccess: (response) => {
                    setProductForTransferRemittance(response?.data.details)
                    // setCategoies(
                    //     [
                    //         { value: 1, title: "طبق برنامه", defaultChecked: response?.data?.transferRemittanceTypeId === 1 ? true : false },
                    //         { value: 2, title: "برای رزرو", defaultChecked: response?.data?.transferRemittanceTypeId === 2 ? true : false },
                    //         { value: 3, title: "برای انبار", defaultChecked: response?.data?.transferRemittanceTypeId === 3 ? true : false }
                    //     ]
                    // )
                    const filter = {
                        ByBrand: true,
                        HasPurchaseInventory: true,
                        WarehouseId: response?.data.originWarehouseId,
                        OrderId: itemSelected.id
                    }
                    productsInventory.mutate(filter, {
                        onSuccess: (response) => { }
                    })
                }
            });

        } catch (error: any) {
            return error?.response;
        }
    };

    useEffect(() => {
        getDetail();
         // eslint-disable-next-line
    }, [id]);


    const onUpdate = (values: any) => {
        const formData: any = {
            // ...values,
            originWarehouseId: values.originWarehouseId ? +values.originWarehouseId : detailTools?.data?.data?.originWarehouseId,
            fareAmount: values.fareAmount ? +values.fareAmount : detailTools?.data?.data?.fareAmount,
            destinationWarehouseId: values.destinationWarehouseId ? +values.destinationWarehouseId : detailTools?.data?.data?.destinationWarehouseId,
            transferRemittanceTypeId: 1,
            details: _.map(productForTransferRemittance, (item) => {
                return {
                    id: item.id ? +item.id : null,
                    productBrandId: +item.productBrandId,
                    transferAmount: +item.transferAmount,
                }
            }),
            description: values.description ? values.description : detailTools?.data?.data?.description,
            driverName: values.driverName ? values.driverName : detailTools?.data?.data?.driverName,
            shippingName: values.shippingName ? values.shippingName : detailTools?.data?.data?.shippingName,
            carPlaque: values.carPlaque ? values.carPlaque : detailTools?.data?.data?.carPlaque,
            vehicleTypeId: values.vehicleTypeId ? values.vehicleTypeId : detailTools?.data?.data?.vehicleTypeId === 0 ? null : detailTools?.data?.data?.vehicleTypeId,
            driverMobile: values.driverMobile ? values.driverMobile : detailTools?.data?.data?.driverMobile,
            deliverDate: values.deliverDate ? values.deliverDate : detailTools?.data?.data?.deliverDate,
            unloadingPlaceAddress: values.unloadingPlaceAddress ? values.unloadingPlaceAddress : detailTools?.data?.data?.unloadingPlaceAddress,
            id: +id,
          
        }
        updateTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.succeeded) {
                    renderAlert(response.message || "ویرایش با موفقیت انجام شد")
                } else {
                    EnqueueSnackbar(response.data.Message, "warning")
                }
            },
        });
    };

    return (
        <>
            {detailTools.isLoading && <Backdrop loading={detailTools.isLoading} />}
            {updateTools.isLoading && <Backdrop loading={updateTools.isLoading} />}
            {vehicleList.isLoading && <Backdrop loading={vehicleList.isLoading} />}
            {warehouse.isLoading && <Backdrop loading={warehouse.isLoading} />}
            {productsInventory.isLoading && <Backdrop loading={productsInventory.isLoading} />}

            <Typography color="primary" variant="h1" className="pb-8">ویرایش حواله</Typography>
            <Formik enableReinitialize initialValues={
                {
                    ...initialValues,
                    ...detailTools?.data?.data,
                }
            }
                onSubmit={onUpdate}>
                {({  setFieldValue, handleSubmit }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 lg:grid-cols-3 mb-4 gap-4">
                                <CardWithIcons title='شماره حواله' icon={<DesignServices className="text-white" />} value={detailTools?.data?.data?.id} iconClassName='bg-[#3322D8]' />
                                <CardWithIcons title='تاریخ حواله' icon={<AddTask className="text-white" />} value={moment(new Date(Date.now())).format('jYYYY/jMM/jDD')} iconClassName='bg-[#369BFD]' />
                                <ReusableCard cardClassName="flex flex-col gap-y-4">
                                    <FormikWarehouseBasedOfType
                                        name="originWarehouseId"
                                        label="انبار مبدا"
                                        onChange={onFilterWarehouseFrom}
                                        warehouse={warehouse?.data?.filter((item: { warehouseTypeId: number }) => item.warehouseTypeId === WarehouseType.Mabadi)}
                                        disabled
                                    />
                                    <FormikWarehouseBasedOfType
                                        name="destinationWarehouseId"
                                        label="انبار مقصد"
                                        onChange={onFilterWarehouseFrom}
                                        warehouse={warehouse?.data}
                                        disabled
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
                                        onDoubleClick={() => {}}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h3" className="text-gray-500 pb-2">لیست کالاهای انتخاب شده جهت انتقال حواله</Typography>
                                    <MuiDataGrid
                                        columns={TransferRemittanceDetailForTransferColumn(renderDelete)}
                                        rows={productForTransferRemittance}
                                        data={productForTransferRemittance}
                                        onDoubleClick={() => {}}
                                    />
                                </div>
                            </ReusableCard>
                            <ReusableCard cardClassName="mt-4">
                                <Typography variant="h3" className="text-gray-500 pb-2">جزئیات حمل توسط راننده</Typography>
                                {fields.map((rowFields, index) => (
                                    <div key={index} className="md:flex md:justify-between md:items-start md:gap-4 space-y-4 md:space-y-0 my-4" >
                                        {rowFields.map((field, index) => parseFields(field, setFieldValue, index))}
                                    </div>
                                ))}
                            </ReusableCard>
                            <div className="flex justify-end items-end mt-8">
                                <ButtonComponent onClick={handleSubmit} disabled={productForTransferRemittance?.length < 0}>
                                    <Typography variant="h4" className="px-4 py-2 text-white">{"ویرایش حواله"}</Typography>
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

export default TransferRemittanceEdit;
