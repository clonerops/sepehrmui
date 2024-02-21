import { MonetizationOn, AttachMoney, DateRange, ProductionQuantityLimits } from "@mui/icons-material";

import { sliceNumberPriceRial } from "../../../../_cloner/helpers/sliceNumberPrice";
import { convertToPersianWord } from "../../../../_cloner/helpers/convertPersian";

import moment from "moment-jalaali";

const saleBaseOrderInformation = (orderCode: number, totalAmount: number) => {
    return [
        { title: "شماره سفارش", icon: <ProductionQuantityLimits className="text-white" />, value: orderCode, cardClassName: "!bg-[#3322D8]" },
        { title: "تاریخ سفارش", icon: <DateRange className="text-white" />, value: moment(new Date()).format("jYYYY-jMM-jDD"), cardClassName: "!bg-[#369BFD]" },
        { title: "قیمت کل", icon: <MonetizationOn className="text-white" />, value: `${sliceNumberPriceRial(totalAmount)} ریال`, cardClassName: "!bg-[#F8B30E]" },
        { title: "قیمت به حروف", icon: <AttachMoney className="text-white" />, value: `${convertToPersianWord(totalAmount)} تومان`, cardClassName: "!bg-[#EB5553]" }
    ]
}


export {
    saleBaseOrderInformation
}