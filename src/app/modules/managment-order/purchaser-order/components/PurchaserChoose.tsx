import React, { FC, memo } from 'react'
import moment from 'moment-jalaali'
import { FormikProps } from 'formik'
import { Button, Typography } from '@mui/material'

import FormikCompany from '../../../../../_cloner/components/FormikCompany'

import { UseMutationResult } from '@tanstack/react-query'
import { IPurchaserOrder } from '../../core/_models'
import { useGetCustomer } from '../../../customer/core/_hooks'
import Backdrop from '../../../../../_cloner/components/Backdrop'
import FormikWarehouse from '../../../../../_cloner/components/FormikWarehouse'
import FormikWarehouseBasedOfType from '../../../../../_cloner/components/FormikWarehouseBasedOfType'
import { useGetWarehouses } from '../../../generic/_hooks'
import FormikSearchableCustomer from '../../../../../_cloner/components/FormikSearchableCustomer'
import { WarehouseType } from '../../../../../_cloner/helpers/Enums'
import { Add, Person } from '@mui/icons-material'

interface IProps {
    postSaleOrder: UseMutationResult<any, unknown, IPurchaserOrder, unknown>
    formikRef: React.RefObject<FormikProps<any>>
    openModalState: React.Dispatch<React.SetStateAction<boolean>>
    openModalStateCustomerFeatcure: React.Dispatch<React.SetStateAction<boolean>>
    detailCustomer: UseMutationResult<any, unknown, string, unknown>
}

const PurchaserChoose: FC<IProps> = ({ postSaleOrder, formikRef, openModalState, openModalStateCustomerFeatcure, detailCustomer }) => {

    const warehouse = useGetWarehouses()

    const changeCustomerFunction = (item: { value: string, label: string, customerValidityColorCode: string }) => {
        if (item?.value) {
            detailCustomer?.mutate(item?.value, {
                onSuccess: (result) => {
                    formikRef.current?.setFieldValue("customerID", result.data.id)
                    formikRef.current?.setFieldValue("number", result.data.settlementDay)
                    formikRef.current?.setFieldValue("settlement", moment(Date.now()).add(+result.data.settlementDay, "days").format('jYYYY/jMM/jDD'))
                    if (!result?.data) {
                        formikRef.current?.setFieldValue("number", "")
                        formikRef.current?.setFieldValue("settlement", "")
                    }
                }
            })
        } else {
            if (detailCustomer?.data?.data)
                detailCustomer.data.data = {}
        }
    };


    return (
        <>
            {detailCustomer.isLoading && <Backdrop loading={detailCustomer.isLoading} />}
            <div className="flex flex-col space-y-4">
                <Typography variant="h2">انتخاب فروشنده و انبار</Typography>
                <Typography variant="body1" className='text-violet-800'>از طریق لیست زیر، فروشنده ای که قصد خرید کالا از آن دارید را انتخاب نمایید</Typography>
                <div className="flex gap-x-2 w-full md:col-span-4">
                    <FormikSearchableCustomer
                        disabled={postSaleOrder?.data?.succeeded}
                        onChange={changeCustomerFunction}
                        isLabelSetValue
                        name="customerId"
                        label="فروشنده" />
                </div>
                <FormikCompany disabled={postSaleOrder?.data?.succeeded} customerid={formikRef.current?.values.customerId?.value} name="customerOfficialCompanyId" label="اسم رسمی شرکت فروشنده" />
                <div className='flex flex-row gap-x-4'>
                    <FormikWarehouseBasedOfType
                        name="originWarehouseId"
                        label="انبار مبدا"
                        warehouse={warehouse?.data?.filter((item: { warehouseTypeId: number }) => item.warehouseTypeId === WarehouseType.Mabadi)}
                    />
                    <FormikWarehouse name="destinationWarehouseId" label="انبار مقصد" />
                </div>
                <div className='mt-4 flex flex-col space-y-4 lg:space-y-0 lg:flex-row justify-end items-end gap-x-8'>
                    <Button disabled={postSaleOrder?.data?.succeeded} onClick={() => openModalState(true)} variant="contained" className="w-full">
                        <Add />
                        <Typography>ایجاد مشتری جدید</Typography>
                    </Button>
                    <Button disabled={postSaleOrder?.data?.succeeded} onClick={() => openModalStateCustomerFeatcure(true)} variant="contained" className="w-full" color='secondary'>
                        <Person />
                        <Typography>نمایش ویژگی های مشتری </Typography>
                    </Button>
                </div>

            </div>
        </>
    )
}

export default memo(PurchaserChoose)