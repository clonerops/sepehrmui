import  { FC, memo } from 'react'
import { UseMutationResult } from '@tanstack/react-query'

import { saleBaseOrderInformation } from '../informations'
import { calculateTotalAmount } from '../../helpers/functions'
import { IOrderService, IPurchaserOrder } from '../../core/_models'
import CardWithIcons from '../../../../../_cloner/components/CardWithIcons'

interface IProps {
    postSaleOrder: UseMutationResult<any, unknown, IPurchaserOrder, unknown>
    orders: any
    orderServices: IOrderService[]
}

const PurchaserHeaderBase:FC<IProps> = ({ postSaleOrder, orders, orderServices }) => {

    return (
        // <div className="flex flex-col lg:flex-row flex-warp  gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
