import React, { FC, memo } from 'react'
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

console.log("Header component is rendered")


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

export default memo(SaleHeaderBase)

// , (prevProps: Readonly<IProps>, nextProps: Readonly<IProps>) => {
//     console.log("header order props", prevProps.orders === nextProps.orders)
//     console.log('"header postSaleOrder props"',prevProps.postSaleOrder === nextProps.postSaleOrder)
//     console.log('"header orderServices props"',prevProps.orderServices === nextProps.orderServices)
//     return true
// }