import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Container } from "@mui/material";
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount";
import { useParams } from "react-router-dom";
import Backdrop from "../../../_cloner/components/Backdrop";
import { Print } from "@mui/icons-material";
import { useGetEntrancePermit } from "../entrancePermit/_hooks";
import { useGetTransferRemitanceById } from "../transferRemittance/_hooks";

const EntranceAndUnloadingPrint = () => {
    const { id, entranceCode, entranceDateYear, entranceDateMonth, entranceDateDay }: any = useParams()
    const detailTools = useGetEntrancePermit(id)
    const detailsTransferRemittance = useGetTransferRemitanceById(detailTools?.data?.data?.transferRemitance?.id)
    const printComponentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => printComponentRef.current,
    });

    const RendertextValue = (props: { title: string, value: any }) => {
        return (
            <div className="flex items-center gap-x-2">
                <h4 className="print:!text-[12px]">{props.title}: </h4>
                <span className="font-bold print:!text-[12px]">{props.value}</span>
            </div>
        )
    }

    console.log("detailTools?.data?.data", detailTools?.data?.data)
    console.log("detailsTransferRemittance?.data?.data", detailsTransferRemittance?.data?.data)
    console.log("detailTools?.data?.data?.transferRemitance?.id", detailTools?.data?.data?.transferRemitance?.id)

    if (detailTools?.isLoading) {
        return <Backdrop loading={detailTools?.isLoading} />
    }
    if (detailsTransferRemittance.isLoading) {
        return <Backdrop loading={detailsTransferRemittance.isLoading} />
    }

    return (
        <>
            <Container>
                <button className="bg-green-500 px-4 py-2 mb-8 rounded-md" onClick={handlePrint}>
                    <span className="pl-2 text-white">
                        <Print />
                    </span>
                    <span className="text-white">پرینت</span>
                </button>
                <div ref={printComponentRef} style={{ direction: "rtl", paddingLeft: "8px", paddingRight: "8px" }}>
                    <div className="border-[1px] border-b-0 px-4 border-black">
                        <div className="grid grid-cols-2 gap-y-4 print:grid-cols-2">
                            <div className="border-l-[1px] border-black py-1">
                                <RendertextValue title="شماره مجوز" value={entranceCode} />
                            </div>
                            <div className="px-4 py-1">
                                <RendertextValue title="تاریخ مجوز" value={`${entranceDateYear}/${entranceDateMonth}/${entranceDateDay}`} />
                            </div>
                        </div>
                    </div>
                    <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                        <div className="grid grid-cols-1">
                            <span className="font-bold text-center">لطفا کالاها به شرح ذیل از نظر کمی و کیفی بررسی شده و درصورت صحت و سلامت بار، در انبار تخلیه گردد</span>
                        </div>
                    </div>
                    <table className="!w-full !border-[1px] !border-b-0 !border-black">
                        <thead>
                            <tr>
                                <th className="!border-[1px] !border-black text-center">
                                    <span className="!text-[12px]">ردیف</span>
                                </th>
                                <th className="!border-[1px] !border-black text-center ">
                                    <span className="!text-[12px]">شهر مبدا</span>
                                </th>
                                <th className="!border-[1px] !border-black text-center ">
                                    <span className="!text-[12px]">شرح کالا</span>
                                </th>
                                <th className="!border-[1px] !border-black text-center ">
                                    <span className="!text-[12px]">برند</span>
                                </th>
                                <th className="!border-[1px] !border-black text-center ">
                                    <span className="!text-[12px]">وزن مبدا</span>
                                </th>
                                <th className="!border-[1px] !border-black text-center ">
                                    <span className="!text-[12px]">وزن خودمان</span>
                                </th>
                                <th className="!border-[1px] !border-black text-center ">
                                    <span className="!text-[12px]">توضیحات</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailsTransferRemittance?.data?.data?.details?.map((item: any, index: number) => (
                                <tr className="!border-[1px] !border-black">
                                    <td className="border-l-[1px] border-black text-center">
                                        <span className="text-[12px] py-2">{index + 1}</span>
                                    </td>
                                    <td className="border-l-[1px] border-black text-center">
                                        <span className="text-[12px] py-2">{detailsTransferRemittance?.data?.data?.originWarehouseName}</span>
                                    </td>
                                    <td className="border-l-[1px] border-black text-center">
                                        <span className="text-[12px] py-2">{item?.productName}</span>
                                    </td>
                                    <td className="border-l-[1px] border-black text-center">
                                        <span className="text-[12px] py-2">{item?.brandName}</span>
                                    </td>
                                    <td className="border-l-[1px] border-black text-center">
                                        <span className="text-[12px] py-2">{item?.transferAmount}</span>
                                    </td>
                                    <td className="border-l-[1px] border-black text-center">
                                        <span className="text-[12px] py-2"></span>
                                    </td>
                                    <td className="border-l-[1px] border-black text-center">
                                        <span className="text-[12px] py-2"></span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex flex-col mt-4">
                        <p className="text-lg print:text-[14px]">
                            گواهی می گردد بار تخلیه شده از نظر کمی و کیفی مورد تایید اینجانب ................ می باشد
                        </p>
                        <p className="flex justify-end items-end font-bold text-lg print:text-[14px]">امضا سرپرست انبار</p>
                    </div>
                </div>

            </Container>
        </>
    );
};

export default EntranceAndUnloadingPrint;
