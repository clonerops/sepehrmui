import React, { FC, memo, useMemo } from 'react'
import { UseMutationResult } from '@tanstack/react-query'

import { calculateTotalAmount } from '../../helpers/functions'
import { IOrderService, ISalesOrder } from '../../core/_models'
import CardWithIcons from '../../../../../_cloner/components/CardWithIcons'
import { AttachMoney, DateRange, MonetizationOn, ProductionQuantityLimits } from '@mui/icons-material'
import moment from 'moment-jalaali'
import { sliceNumberPriceRial } from '../../../../../_cloner/helpers/sliceNumberPrice'
import { convertToPersianWord } from '../../../../../_cloner/helpers/convertPersian'

interface IProps {
    postSaleOrder: UseMutationResult<any, unknown, ISalesOrder, unknown>
    orders: any 
    orderServices: IOrderService[]
}

const saleBaseOrderInformation = (orderCode: number, totalAmount: number) => {
    return [
        { title: "شماره سفارش", icon: <ProductionQuantityLimits className="text-white" />, value: orderCode, cardClassName: "!bg-[#3322D8]" },
        { title: "تاریخ سفارش", icon: <DateRange className="text-white" />, value: moment(new Date()).format("jYYYY/jMM/jDD"), cardClassName: "!bg-[#369BFD]" },
        { title: "قیمت کل", icon: <MonetizationOn className="text-white" />, value: `${sliceNumberPriceRial(totalAmount)} ریال`, cardClassName: "!bg-[#F8B30E]" },
        { title: "قیمت به حروف", icon: <AttachMoney className="text-white" />, value: `${convertToPersianWord(totalAmount)} تومان`, cardClassName: "!bg-[#EB5553]" }
    ]
}


const SaleHeaderBase:FC<IProps> = ({ postSaleOrder, orders, orderServices }) => {
    let totalAmount = useMemo(() => calculateTotalAmount(orders, orderServices), [orders, orderServices])
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {saleBaseOrderInformation(
                postSaleOrder?.data?.data?.orderCode, 
                totalAmount)
                .map((item: { title: string, icon: React.ReactNode, value: any, cardClassName: string }) => {
                return <CardWithIcons 
                title={item.title} 
                icon={item.icon}
                value={item.value}
                iconClassName={item.cardClassName} />
            })}
        </div>
    )
}

export default memo(SaleHeaderBase)
