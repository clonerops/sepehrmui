import React, { FC, memo } from 'react'
import moment from 'moment-jalaali'
import { FormikProps } from 'formik'
import { Typography } from '@mui/material'

import FormikCompany from '../../../../../_cloner/components/FormikCompany'

import { UseMutationResult } from '@tanstack/react-query'
import { IPurchaserOrder } from '../../core/_models'
import { useGetCustomer } from '../../../customer/core/_hooks'
import Backdrop from '../../../../../_cloner/components/Backdrop'
import FormikWarehouse from '../../../../../_cloner/components/FormikWarehouse'
import FormikWarehouseBasedOfType from '../../../../../_cloner/components/FormikWarehouseBasedOfType'
import { useGetWarehouses } from '../../../generic/_hooks'
import { WarehouseType } from '../../../warehouse/_models'
import FormikSearchableCustomer from '../../../../../_cloner/components/FormikSearchableCustomer'

interface IProps {
    postSaleOrder: UseMutationResult<any, unknown, IPurchaserOrder, unknown>
    formikRef: React.RefObject<FormikProps<any>>
    openModalState: React.Dispatch<React.SetStateAction<boolean>>
}

const PurchaserChoose: FC<IProps> = ({ postSaleOrder, formikRef, openModalState }) => {

    const detailCustomer = useGetCustomer();
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
                <FormikWarehouseBasedOfType
                    name="originWarehouseId"
                    label="انبار مبدا"
                    warehouse={warehouse?.data?.filter((item: {warehouseTypeId: number}) => item.warehouseTypeId === WarehouseType.Mabadi)}
                />
                <FormikWarehouse name="destinationWarehouseId" label="انبار مقصد" />
            </div>
        </>
    )
}

export default memo(PurchaserChoose)