import { MonetizationOn, AttachMoney, DateRange, ProductionQuantityLimits } from "@mui/icons-material";

import { sliceNumberPriceRial } from "../../../../_cloner/helpers/sliceNumberPrice";
import { convertToPersianWord } from "../../../../_cloner/helpers/convertPersian";

import moment from "moment-jalaali";

const saleBaseOrderInformation = (orderCode: number, totalAmount: number) => {
    return [
        { title: "شماره سفارش", icon: <ProductionQuantityLimits color="secondary" />, value: orderCode },
        { title: "تاریخ سفارش", icon: <DateRange color="secondary" />, value: moment(new Date()).format("jYYYY-jMM-jDD") },
        { title: "قیمت کل", icon: <MonetizationOn color="secondary" />, value: `${sliceNumberPriceRial(totalAmount)} ریال` },
        { title: "قیمت به حروف", icon: <AttachMoney color="secondary" />, value: `${convertToPersianWord(totalAmount)} تومان` }
    ]
}


export {
    saleBaseOrderInformation
}