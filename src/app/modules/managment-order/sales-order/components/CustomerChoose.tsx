import React, { FC, memo, useMemo } from 'react'
import moment from 'moment-jalaali'
import { FormikProps } from 'formik'
import { Button, Typography } from '@mui/material'
import { AddCircle } from '@mui/icons-material'

import FormikCustomer from '../../../../../_cloner/components/FormikCustomer'
import FormikCompany from '../../../../../_cloner/components/FormikCompany'

import { UseMutationResult } from '@tanstack/react-query'
import { ISalesOrder } from '../../core/_models'
import { useGetCustomer } from '../../../customer/core/_hooks'
import { separateAmountWithCommas } from '../../../../../_cloner/helpers/SeprateAmount'
import Backdrop from '../../../../../_cloner/components/Backdrop'

interface IProps {
    postSaleOrder: UseMutationResult<any, unknown, ISalesOrder, unknown>
    formikRef: React.RefObject<FormikProps<any>>
    openModalState: React.Dispatch<React.SetStateAction<boolean>>
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

const CustomerChoose: FC<IProps> = ({ postSaleOrder, formikRef, openModalState }) => {

    const detailCustomer = useGetCustomer();

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
                                isLabelSetValue
                                name="customerId"
                                label="مشتری" />
                        </div>
                        <FormikCompany disabled={postSaleOrder?.data?.succeeded} customerid={formikRef.current?.values.customerId} name="customerOfficialCompanyId" label="اسم رسمی شرکت مشتری" />
                    </div>
                    <div className='mt-4 flex justify-end items-end'>
                        <Button disabled={postSaleOrder?.data?.succeeded} onClick={() => openModalState(true)} variant="contained" className="w-full">
                            <Typography>ایجاد مشتری</Typography>
                        </Button>
                    </div>
                    <div className='flex flex-col space-y-4 mt-8'>
                        <div className='flex flex-row justify-between items-center'>
                            <RenderInformation
                                title='معرف'
                                value={detailCustomer.data?.data?.representative} />
                            <div className="flex flex-row pt-2">
                                <Typography
                                    sx={{ backgroundColor: `#${detailCustomer.data?.data?.customerValidityColorCode}` }}
                                    variant="h3"
                                    className={`text-white px-4 rounded-md py-1`}>
                                    {detailCustomer.data?.data?.customerValidityDesc}
                                </Typography>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-4 w-full'>
                            <RenderInformation
                                title='بدهی جاری(ریال)'
                                valueClassName='text-red-500'
                                value={detailCustomer.data?.data?.customerCurrentDept ? customerCurrentDept : 0} />
                            <RenderInformation
                                title='بدهی کل(ریال)'
                                valueClassName='text-red-500'
                                value={detailCustomer.data?.data?.customerDept ? customerDept : 0} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(CustomerChoose)