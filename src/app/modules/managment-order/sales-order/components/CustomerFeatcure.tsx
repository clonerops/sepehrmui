import { UseMutationResult } from "@tanstack/react-query";
import { FC } from "react";
import TextwithValue from "../../../../../_cloner/components/TextwithValue";

interface IProps {
    detailCustomer: UseMutationResult<any, unknown, string, unknown> ;
}

const CustomerFeatcure: FC<IProps> = ({ detailCustomer }) => {
    console.log(detailCustomer.data)
    if(
        !detailCustomer.data?.data || 
        detailCustomer.data?.data === null || 
        detailCustomer.data?.data === undefined || 
        Object.keys(detailCustomer.data?.data).length === 0 ) {
        return <span className="font-bold text-center">لطفا برای نمایش ویژگی ها یک مشتری را انتخاب نمایید</span>
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TextwithValue title="نام و نام خانوادگی" value={detailCustomer.data?.data?.firstName + " " + detailCustomer.data?.data?.lastName} />
            <TextwithValue title="معرف" value={detailCustomer.data?.data?.representative} />
            <div  className="lg:col-span-2">
                <TextwithValue
                    title="ویژگی ها"
                    value={"خوش حساب، یکم خالی بند"}
                />
            </div>
        </div>
    );
};

export default CustomerFeatcure;
