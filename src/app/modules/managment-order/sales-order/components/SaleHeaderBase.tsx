import React, { FC } from 'react'
import { Box, Card, Typography } from '@mui/material'
import { UseMutationResult } from '@tanstack/react-query'

import { saleBaseOrderInformation } from '../informations'
import { calculateTotalAmount } from '../../helpers/functions'
import { IOrderPayment, IOrderService, ISalesOrder } from '../../core/_models'

interface IProps {
    postSaleOrder: UseMutationResult<any, unknown, ISalesOrder, unknown>
    orders: IOrderPayment[]
    orderServices: IOrderService[]
}

const SaleHeaderBase:FC<IProps> = ({ postSaleOrder, orders, orderServices }) => {
    return (
        <Box component="div" className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
            {saleBaseOrderInformation(postSaleOrder?.data?.data[0]?.orderCode, calculateTotalAmount(orders, orderServices)).map((item: { title: string, icon: React.ReactNode, value: any }, index) => {
                return <Card key={index} className={`px-4 py-4 shadow-md !rounded-xl`}>
                    <Box key={index} component="div" className="flex justify-between items-center space-y-4">
                        <Typography variant="body1">{item.title}</Typography>
                        {item.icon}
                    </Box>
                    <Typography variant="h2">{item.value}</Typography>
                </Card>
            })}
        </Box>
    )
}

export default SaleHeaderBase