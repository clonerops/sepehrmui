import React, { FC, memo } from 'react'
import moment from 'moment-jalaali'
import { FormikProps } from 'formik'
import { Box, Typography } from '@mui/material'

import ReusableCard from '../../../../../_cloner/components/ReusableCard'
import FormikCustomer from '../../../../../_cloner/components/FormikCustomer'
import FormikCompany from '../../../../../_cloner/components/FormikCompany'

import { UseMutationResult } from '@tanstack/react-query'
import { IPurchaserOrder } from '../../core/_models'
import { useGetCustomer } from '../../../customer/core/_hooks'
import Backdrop from '../../../../../_cloner/components/Backdrop'

interface IProps {
    postSaleOrder: UseMutationResult<any, unknown, IPurchaserOrder, unknown>
    formikRef: React.RefObject<FormikProps<any>>
    openModalState: React.Dispatch<React.SetStateAction<boolean>>
}

interface IRenderInfoProps {
    title: string
    value: any
    valueClassName?: string
}

const PurchaserChoose: FC<IProps> = ({ postSaleOrder, formikRef, openModalState }) => {

    const detailCustomer = useGetCustomer();

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
            <Box component="div" className="grid grid-cols-2 gap-4">
                <ReusableCard cardClassName="col-span-2 flex flex-col gap-y-8">
                    <Typography variant="h2">انتخاب فروشنده</Typography>
                    <Typography variant="body1" className='text-violet-800'>از طریق لیست زیر، فروشنده ای که قصد خرید کالا از آن دارید را انتخاب نمایید</Typography>
                    <Box component="div" className="">
                        <Box component="div" className="flex gap-x-2 w-full md:col-span-4">
                            <FormikCustomer
                                disabled={postSaleOrder?.data?.succeeded}
                                onChange={(value: any) => changeCustomerFunction(value)}
                                name="customerId"
                                label="مشتری" />
                            <FormikCompany customerid={formikRef.current?.values.customerID} name="customerOfficialCompanyId" label="اسم رسمی شرکت مشتری" />
                        </Box>
                    </Box>
                </ReusableCard>
            </Box>
        </>
    )
}

export default memo(PurchaserChoose)