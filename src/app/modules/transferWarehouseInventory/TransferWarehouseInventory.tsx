import { useState } from "react";
import { Formik } from "formik";
import { Typography } from "@mui/material";

import { AddTask, DesignServices } from "@mui/icons-material";

import moment from "moment-jalaali";
import _ from "lodash";
import { useGetWarehouses } from "../warehouse/_hooks";
import { useGetProductList } from "../products/_hooks";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import { renderAlert } from "../../../_cloner/helpers/sweetAlert";
import Backdrop from "../../../_cloner/components/Backdrop";
import CardWithIcons from "../../../_cloner/components/CardWithIcons";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import FormikWarehouseBasedOfType from "../../../_cloner/components/FormikWarehouseBasedOfType";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import { TransferRemittanceDetailForTransferColumn, TransferRemittanceDetailInventoryColumn } from "../../../_cloner/helpers/columns";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import TransferAmount from "../transferRemittance/TransferAmount";
import { usePostTransferWarehouseInventory } from "./_hooks";
import { WarehouseType } from "../../../_cloner/helpers/Enums";

const initialValues = {
    originWarehouseId: "",
    destinationWarehouseId: "",
    transferRemittanceTypeId: "",
    description: ""
}


const TransferWarehouseInventory = () => {
    // From Warehouse Module
    const warehouse = useGetWarehouses()
    const productsInventory = useGetProductList()

    //From This Module
    const transfer = usePostTransferWarehouseInventory()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [itemSelected, setItemSelected] = useState<any>({})
    const [productForTransferRemittance, setProductForTransferRemittance] = useState<any>([])

    const renderDelete = (values: any) => {
        const filtered = productForTransferRemittance.filter((item: { productBrandId: number }) => {
            return +item.productBrandId !== +values.productBrandId
        })

        setProductForTransferRemittance(filtered)
    }

    const onFilterWarehouseFrom = (values: any) => {
        const filter = {
            ByBrand: true,
            HasPurchaseInventory: true,
            WarehouseId: +values
        }
        productsInventory.mutate(filter)
    }

    const handleTransferRemittance = (values: any) => {
        const formData: any = {
            originWarehouseId: +values.originWarehouseId,
            details: _.map(productForTransferRemittance, (item) => {
                return {
                    productBrandId: +item.productBrandId,
                    transferAmount: +item.transferAmount,
                }
            }),
        }
        transfer.mutate(formData, {
            onSuccess: (response) => {
                if (response.data.Errors && response.data.Errors.length > 0) {
                    EnqueueSnackbar(response.data.Errors[0], "error")
                } else {
                    if (response.succeeded) {
                        renderAlert(`انتقال با شماره ${response.data.id} با موفقیت انجام پذیرفت`)
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
            {warehouse.isLoading && <Backdrop loading={warehouse.isLoading} />}
            {productsInventory.isLoading && <Backdrop loading={productsInventory.isLoading} />}


            <Formik initialValues={initialValues} onSubmit={handleTransferRemittance}>
                {({ handleSubmit, setFieldValue, values }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 lg:grid-cols-3 mb-4 gap-4">
                                <CardWithIcons
                                    title='شماره انتقال'
                                    icon={<DesignServices className="text-white" />}
                                    value={transfer?.data?.data?.id || 0}
                                    iconClassName='bg-[#3322D8]' />
                                <CardWithIcons
                                    title='تاریخ انتقال'
                                    icon={<AddTask className="text-white" />}
                                    value={moment(new Date(Date.now())).format('jYYYY/jMM/jDD')}
                                    iconClassName='bg-[#369BFD]' />
                                <ReusableCard cardClassName="flex flex-col gap-y-4">
                                    <FormikWarehouseBasedOfType
                                        name="originWarehouseId"
                                        label="انبار مبدا"
                                        onChange={onFilterWarehouseFrom}
                                        warehouse={warehouse?.data?.data?.filter((item: { warehouseTypeId: number }) => item.warehouseTypeId === WarehouseType.Mabadi)}
                                    />
                                    <FormikWarehouseBasedOfType
                                        name="originWarehouseId"
                                        label="انبار مقصد"
                                        warehouse={warehouse?.data?.data}
                                        disabled={true}
                                    />
                                </ReusableCard>
                            </div>
                            <ReusableCard cardClassName="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <Typography variant="h3" className="text-gray-500 pb-2">لیست کالاهای موجود در انبار</Typography>
                                    <MuiDataGrid
                                        columns={TransferRemittanceDetailInventoryColumn(setIsOpen, setItemSelected)}
                                        rows={productsInventory.data?.data || []}
                                        data={productsInventory.data?.data || []}
                                        isLoading={productsInventory.isLoading}
                                        onDoubleClick={() => { }}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h3" className="text-gray-500 pb-2">لیست کالاهای انتخاب شده جهت انتقال</Typography>
                                    <MuiDataGrid
                                        columns={TransferRemittanceDetailForTransferColumn(renderDelete)}
                                        rows={productForTransferRemittance}
                                        data={productForTransferRemittance}
                                        onDoubleClick={() => { }}
                                    />
                                </div>
                            </ReusableCard>
                            <div className="flex justify-end items-end mt-8">
                                <ButtonComponent disabled={productForTransferRemittance.length < 0}>
                                    <Typography variant="h4" className="px-4 py-2 text-white">ثبت انتقال به انبار</Typography>
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

export default TransferWarehouseInventory;
