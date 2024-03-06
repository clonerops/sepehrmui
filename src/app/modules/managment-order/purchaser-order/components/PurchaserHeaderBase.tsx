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
    orders: any
    orderServices: IOrderService[]
}

const PurchaserHeaderBase:FC<IProps> = ({ postSaleOrder, orders, orderServices }) => {
    console.log("postSaleOrder?.data?.data?.orderCode", postSaleOrder?.data?.data?.orderCode)
    return (
        <div className="flex flex-col lg:flex-row flex-warp  gap-4">
            {saleBaseOrderInformation(postSaleOrder?.data?.data?.orderCode, calculateTotalAmount(orders, orderServices)).map((item: any, index: number) => {
                return <CardWithIcons 
                title={item.title} 
                icon={item.icon}
                value={item.value}
                iconClassName={item.cardClassName} />
            })}
        </div>
    )
}

export default memo(PurchaserHeaderBase)
