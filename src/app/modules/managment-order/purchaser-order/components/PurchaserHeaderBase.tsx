import React, { FC, memo } from 'react'
import { Box, Card, Typography } from '@mui/material'
import { UseMutationResult } from '@tanstack/react-query'

import { saleBaseOrderInformation } from '../informations'
import { calculateTotalAmount } from '../../helpers/functions'
import { IOrderPayment, IOrderService, IPurchaserOrder } from '../../core/_models'
import ReusableCard from '../../../../../_cloner/components/ReusableCard'
import CardWithIcons from '../../../../../_cloner/components/CardWithIcons'

interface IProps {
    postSaleOrder: UseMutationResult<any, unknown, IPurchaserOrder, unknown>
    orders: IOrderPayment[]
    orderServices: IOrderService[]
}

const PurchaserHeaderBase:FC<IProps> = ({ postSaleOrder, orders, orderServices }) => {
    return (
        <Box component="div" className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
            {saleBaseOrderInformation(postSaleOrder?.data?.data[0]?.orderCode, calculateTotalAmount(orders, orderServices)).map((item: any, index: number) => {
                return <CardWithIcons 
                title={item.title} 
                icon={item.icon}
                value={item.value}
                iconClassName={item.cardClassName} />
                // <ReusableCard key={index} >
                //     <Box key={index} component="div" className="flex justify-between items-center space-y-4">
                //         <Typography variant="body1">{item.title}</Typography>
                //         {item.icon}
                //     </Box>
                //     <Typography variant="h2">{item.value}</Typography>
                // </ReusableCard>
            })}
        </Box>
    )
}

export default memo(PurchaserHeaderBase)
