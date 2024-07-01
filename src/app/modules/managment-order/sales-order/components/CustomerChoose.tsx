import React, { FC, memo, useEffect, useMemo, useState } from 'react'
import moment from 'moment-jalaali'
import { FormikProps } from 'formik'
import { Button, Typography } from '@mui/material'

import FormikCustomer from '../../../../../_cloner/components/FormikCustomer'
import FormikCompany from '../../../../../_cloner/components/FormikCompany'

import { UseMutationResult } from '@tanstack/react-query'
import { ISalesOrder } from '../../core/_models'
import { useGetCustomer } from '../../../customer/core/_hooks'
import { separateAmountWithCommas } from '../../../../../_cloner/helpers/SeprateAmount'
import Backdrop from '../../../../../_cloner/components/Backdrop'
import { Add, Person } from '@mui/icons-material'

interface IProps {
    postSaleOrder: UseMutationResult<any, unknown, ISalesOrder, unknown>
    formikRef: React.RefObject<FormikProps<any>>
    openModalState: React.Dispatch<React.SetStateAction<boolean>>
    openModalStateCustomerFeatcure: React.Dispatch<React.SetStateAction<boolean>>
    detailCustomer: UseMutationResult<any, unknown, string, unknown>

}

interface IRenderInfoProps {
    title: string
    value: any
    valueClassName?: string
}

const RenderInformation: FC<IRenderInfoProps> = ({ title, value, valueClassName }) => {
    return <div className="flex flex-row pt-2 ">
        <Typography variant="h4" className="text-gray-500">{title}: </Typography>
        <Typography variant="h3" className={`px-4 ${valueClassName}`}>{value} </Typography>
    </div>

}

const CustomerChoose: FC<IProps> = ({ postSaleOrder, formikRef, openModalState, openModalStateCustomerFeatcure,  detailCustomer }) => {

    const changeCustomerFunction = (item: { value: string, label: string, customerValidityColorCode: string }) => {
        if (item?.value) {
            detailCustomer?.mutate(item?.value, {
                onSuccess: (result) => {
                    formikRef.current?.setFieldValue("customerId", result.data.id)
                    formikRef.current?.setFieldValue("orderPaymentDaysAfterExit", result.data.settlementDay)
                    formikRef.current?.setFieldValue("orderPaymentDate", moment(Date.now()).add(+result.data.settlementDay, "days").format('jYYYY/jMM/jDD'))
                    if (!result?.data) {
                        formikRef.current?.setFieldValue("orderPaymentDaysAfterExit", "")
                        formikRef.current?.setFieldValue("orderPaymentDate", "")
                    }
                }
            })
        } else {
            if (detailCustomer?.data?.data)
                detailCustomer.data.data = {}
        }
    };

    let customerCurrentDept = useMemo(() => separateAmountWithCommas(+detailCustomer.data?.data?.customerCurrentDept), [detailCustomer.data?.data])
    let customerDept = useMemo(() => separateAmountWithCommas(+detailCustomer.data?.data?.customerDept), [detailCustomer.data?.data])

    return (
        <>
            {detailCustomer.isLoading && <Backdrop loading={detailCustomer.isLoading} />}
            <div className="">
                <div>
                    <div className="flex flex-col space-y-4">
                        <div className="flex gap-x-2 w-full md:col-span-4">
                            <FormikCustomer
                                disabled={postSaleOrder?.data?.succeeded}
                                onChange={changeCustomerFunction}
                                isLabelSetValue={true}
                                name="customerId"
                                label="مشتری" />
                        </div>
                        <FormikCompany disabled={postSaleOrder?.data?.succeeded} customerid={formikRef.current?.values.customerId} name="customerOfficialCompanyId" label="اسم رسمی شرکت مشتری" />
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
                    <div className='flex flex-col space-y-4 mt-8'>
                        <div className='flex flex-row justify-between items-center'>
                            <RenderInformation
                                title='معرف'
                                valueClassName={postSaleOrder?.data?.succeeded && "!text-gray-300"}
                                value={detailCustomer.data?.data?.representative} />
                            <div className="flex flex-row pt-2">
                                <Typography
                                    sx={{ backgroundColor: `#${detailCustomer.data?.data?.customerValidityColorCode}` }}
                                    variant="h3"
                                    className={`text-white ${postSaleOrder?.data?.succeeded && "!text-gray-300"} px-4 rounded-md py-1`}>
                                    {detailCustomer.data?.data?.customerValidityDesc}
                                </Typography>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-4 w-full'>
                            <RenderInformation
                                title='بدهی جاری(ریال)'
                                valueClassName={postSaleOrder?.data?.succeeded ? "!text-gray-300" : "text-red-500"}
                                value={detailCustomer.data?.data?.customerCurrentDept ? customerCurrentDept : 0} />
                            <RenderInformation
                                title='بدهی کل(ریال)'
                                valueClassName={postSaleOrder?.data?.succeeded ? "!text-gray-300" : "text-red-500"}
                                value={detailCustomer.data?.data?.customerDept ? customerDept : 0} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(CustomerChoose)