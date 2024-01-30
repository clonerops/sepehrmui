import React, { FC } from 'react'
import moment from 'moment-jalaali'
import { FormikProps } from 'formik'
import { Box, IconButton, Typography } from '@mui/material'
import { AddCircle } from '@mui/icons-material'

import ReusableCard from '../../../../../_cloner/components/ReusableCard'
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
    return <Box component="div" className="flex flex-row pt-2">
        <Typography variant="h4" className="text-gray-500">{title}: </Typography>
        <Typography variant="h3" className={`px-4 ${valueClassName}`}>{value} </Typography>
    </Box>

}

const CustomerChoose: FC<IProps> = ({ postSaleOrder, formikRef, openModalState }) => {

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
                <ReusableCard cardClassName="col-span-2">
                    <Box component="div" className="">
                        <Box component="div" className="flex gap-x-2 w-full md:col-span-4">
                            <FormikCustomer
                                disabled={postSaleOrder?.data?.succeeded}
                                onChange={(value: any) => changeCustomerFunction(value)}
                                name="customerId"
                                label="مشتری" />
                            <IconButton onClick={() => openModalState(true)} className="flex justify-center items-center cursor-pointer text-xl">
                                <AddCircle color="secondary" />
                            </IconButton>
                            <FormikCompany customerid={formikRef.current?.values.customerID} name="customerOfficialCompanyId" label="اسم رسمی شرکت مشتری" />
                        </Box>
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-2 space-y-4 md:space-y-0 mt-4">
                            <RenderInformation
                                title='معرف'
                                value={detailCustomer.data?.data?.representative} />
                            <Box component="div" className="flex flex-row pt-2">
                                <Typography
                                    sx={{ backgroundColor: `#${detailCustomer.data?.data?.customerValidityColorCode}` }}
                                    variant="h3"
                                    className={`text-white px-4 rounded-md py-1`}>
                                    {detailCustomer.data?.data?.customerValidityDesc}
                                </Typography>
                            </Box>
                            <RenderInformation
                                title='بدهی جاری(ریال)'
                                valueClassName='text-red-500'
                                value={detailCustomer.data?.data?.customerCurrentDept ? separateAmountWithCommas(Number(detailCustomer.data?.data?.customerCurrentDept)) : 0} />
                            <RenderInformation
                                title='بدهی کل(ریال)'
                                valueClassName='text-red-500'
                                value={detailCustomer.data?.data?.customerDept ? separateAmountWithCommas(Number(detailCustomer.data?.data?.customerDept)) : 0} />
                        </Box>
                    </Box>
                </ReusableCard>
            </Box>
        </>
    )
}

export default CustomerChoose