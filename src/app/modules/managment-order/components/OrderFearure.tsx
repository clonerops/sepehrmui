import { Box, Typography } from '@mui/material'

import { orderFeatureFields } from '../helpers/fields'
import { orderFeatureRenderFields } from '../sales-order/renderFields'

import ReusableCard from "../../../../_cloner/components/ReusableCard"
import { UseMutationResult } from '@tanstack/react-query'
import { ISalesOrder } from '../core/_models'

type Props = {
    // postSaleOrder: UseMutationResult<any, unknown, ISalesOrder, unknown>,
    postSaleOrder: any,
}

const OrderFeature = (props: Props) => {
    const {postSaleOrder} = props;
  return (
    <ReusableCard>
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
                        postSaleOrder,
                        field,
                    )
                )}
            </Box>
        ))}
    </Box>
</ReusableCard>

  )
}

export default OrderFeature