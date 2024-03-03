import { FC, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { UseMutationResult } from '@tanstack/react-query'

import { orderFeatureFields } from '../helpers/fields'
import { ISalesOrder } from '../core/_models'
import { FieldType } from '../../../../_cloner/components/globalTypes'

import ReusableCard from "../../../../_cloner/components/ReusableCard"
import FormikOrderSend from '../../../../_cloner/components/FormikOrderSend'
import FormikInvoiceType from '../../../../_cloner/components/FormikInvoiceType'
import FormikPaymentType from '../../../../_cloner/components/FormikPaymentType'
import FormikExitType from '../../../../_cloner/components/FormikExitType'
import FormikTemporary from '../../../../_cloner/components/FormikTemporary'
import FormikDescription from '../../../../_cloner/components/FormikDescription'
import FormikInput from '../../../../_cloner/components/FormikInput'
import RadioGroup from '../../../../_cloner/components/RadioGroup'

console.log("OrderFeauture is rendered")

interface IProps {
    postOrder: any,
}

const categories = [
    {value: 1, title: "پیش فروش", defaultChecked: true},
    {value: 2, title: "فروش فوری", defaultChecked: false}
]

const orderFeatureRenderFields = (
    index: number | string,
    postOrder: UseMutationResult<any, unknown, ISalesOrder, unknown>,
    fields: FieldType) => {
    const { type, ...rest } = fields;
    switch (type) {
        case "orderSendTypeId":
            return <FormikOrderSend key={index} disabled={postOrder?.data?.succeeded} {...rest} />
        case "invoiceTypeId":
            return <FormikInvoiceType key={index} disabled={postOrder?.data?.succeeded} {...rest} />
        case "paymentTypeId":
            return <FormikPaymentType key={index} disabled={postOrder?.data?.succeeded} {...rest} />
        case "exitType":
            return <FormikExitType key={index} disabled={postOrder?.data?.succeeded} {...rest} />
        case "temporary":
            return <FormikTemporary key={index} disabled={postOrder?.data?.succeeded} {...rest} />
        case "description":
            return <FormikDescription key={index} disabled={postOrder?.data?.succeeded} {...rest} />
        case "saleType":
            return <RadioGroup
            onChange={(e: any) => () => {}}
            categories={categories}
            id="saleTotalTypeDetail"
            key="saleTotalTypeDetail"
        />

        default:
            return <FormikInput key={index} {...rest} />;
    }
};

const OrderFeature:FC<IProps> = ({postOrder}) => {

    return (
    // <ReusableCard cardClassName='bg-gradient-to-r from-gray-100'>
    <ReusableCard cardClassName=''>
        <Box component="div" className="">
            <Typography variant="h2" color="primary">خصوصیات سفارش</Typography>
            {orderFeatureFields.map((rowFields, index) => (
                <Box
                    key={index}
                    component="div"
                    className="md:flex md:justify-between md:items-center gap-4 space-y-4 md:space-y-0 mb-4 md:my-4"
                >
                    {rowFields.map((field, index) =>
                        orderFeatureRenderFields(
                            index,
                            postOrder,
                            field,
                        )
                    )}
                </Box>
            ))}
        </Box>
    </ReusableCard>

  )
}

export default memo(OrderFeature)