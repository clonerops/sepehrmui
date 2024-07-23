import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toAbsoulteUrl } from "../../../_cloner/helpers/AssetsHelper";
import { Container } from "@mui/material";
import { separateAmountWithCommas } from "../../../_cloner/helpers/SeprateAmount";
import { useParams } from "react-router-dom";
import Backdrop from "../../../_cloner/components/Backdrop";
import { Print } from "@mui/icons-material";
import { useGetLadingLicenceById } from "../ladingLicence/_hooks";
import { useGetLadingExitPermitById } from "../exitRemittance/_hooks";

const LadingExitPermitPrint = () => {
    const { id, ladingCode, ladingDateYear, ladingDateMonth, ladingDateDay}: any = useParams()
    const detailTools = useGetLadingExitPermitById(id)
    const ladingDetailTools = useGetLadingLicenceById(detailTools?.data?.data?.ladingPermitId || "")
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

    if (detailTools?.isLoading) {
        return <Backdrop loading={detailTools?.isLoading} />
    }
    if (ladingDetailTools?.isLoading) {
        return <Backdrop loading={ladingDetailTools?.isLoading} />
    }

    return (
        <Container>
            <button className="bg-green-500 px-4 py-2 mb-8 rounded-md" onClick={handlePrint}>
                <span className="pl-2 text-white">
                    <Print />
                </span>
                <span className="text-white">پرینت</span>
            </button>
            <div ref={printComponentRef} style={{ direction: "rtl", paddingLeft: "8px", paddingRight: "8px" }}>
                <div className="flex flex-col justify-center items-center">
                    <img alt="sepehriranian"
                        src={toAbsoulteUrl("/media/mainlogo/2.png")}
                        width={60}
                        className="text-center"
                    />
                </div>
                <h2 className="text-center font-bold text-xl print:text-lg py-2">حواله مجوز خروج</h2>
                <div className="border-[1px] border-b-0 px-4 border-black">
                    <div className="grid grid-cols-2 gap-y-4 print:grid-cols-2">
                        <div className="border-l-[1px] border-black py-1">
                            <RendertextValue title="شماره مجوز" value={ladingCode} />
                        </div>
                        <div className="px-4 py-1">
                            <RendertextValue title="تاریخ مجوز" value={`${ladingDateYear}/${ladingDateMonth}/${ladingDateDay}`} />
                        </div>
                    </div>
                </div>
                <div className="border-[1px] border-b-0 px-4 border-black">
                    <div className="grid grid-cols-3 gap-y-4 print:grid-cols-2">
                        <div className="border-l-[1px] border-black py-1">
                            <RendertextValue title="شماره سفارش فروش" value={ladingDetailTools?.data?.data?.cargoAnnounce?.order?.orderCode} />
                        </div>
                        <div className="border-l-[1px] border-black px-4 py-1">
                            <RendertextValue title="شماره اعلام بار" value={ladingDetailTools?.data?.data?.cargoAnnounce?.cargoAnnounceNo} />
                        </div>
                        <div className="px-4 py-1">
                            <RendertextValue title="شماره مجوز بارگیری" value={detailTools?.data?.data?.ladingPermitId} />
                        </div>
                    </div>
                </div>
                <div className="border-[1px] border-b-0 px-4 border-black">
                    <div className="grid grid-cols-4 gap-y-4 print:grid-cols-2">
                        <div className="border-l-[1px] print:border-0 border-black py-1">
                            <RendertextValue title="نام و نام خانوادگی راننده" value={ladingDetailTools?.data?.data?.cargoAnnounce?.driverName} />
                        </div>
                        <div className="border-l-[1px] print:border-0 border-black px-4 py-1">
                            <RendertextValue title="شماره همراه راننده" value={ladingDetailTools?.data?.data?.cargoAnnounce?.driverMobile} />
                        </div>
                        <div className="border-l-[1px] print:border-0 border-black px-4 py-1">
                            <RendertextValue title="پلاک خودرو" value={ladingDetailTools?.data?.data?.cargoAnnounce?.carPlaque} />
                        </div> 
                        <div className="px-4 py-1">
                            <RendertextValue title="مبلغ کرایه(ریال)" value={separateAmountWithCommas(ladingDetailTools?.data?.data?.cargoAnnounce?.fareAmount)} />
                        </div>
                    </div>
                </div>
                <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                    <div className="grid grid-cols-1">
                        <RendertextValue title="توضیحات" value={detailTools?.data?.data?.exitPermitDescription} />
                    </div>
                </div>
                <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                    <div className="grid grid-cols-1">
                        <span className="font-bold text-center">اقلام قابل بارگیری</span>
                    </div>
                </div>
                <table className="!w-full !border-[1px] !border-b-0 !border-black">
                    <thead>
                        <tr>
                            <th className="!border-[1px] !border-black text-center">
                                <span className="!text-[12px]">ردیف</span>
                            </th>
                            <th className="!border-[1px] !border-black text-center ">
                                <span className="!text-[12px]">کدکالا</span>
                            </th>
                            <th className="!border-[1px] !border-black text-center ">
                                <span className="!text-[12px]">نام کالا</span>
                            </th>
                            <th className="!border-[1px] !border-black text-center ">
                                <span className="!text-[12px]">برند</span>
                            </th>
                            <th className="!border-[1px] !border-black text-center ">
                                <span className="!text-[12px]">مقدار بارگیری</span>
                            </th>
                            <th className="!border-[1px] !border-black text-center ">
                                <span className="!text-[12px]">واحد اندازه گیری</span>
                            </th>
                            <th className="!border-[1px] !border-black text-center ">
                                <span className="!text-[12px]">وزن باسکول</span>
                            </th>
                            <th className="!border-[1px] !border-black text-center ">
                                <span className="!text-[12px]">تعداد بسته</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {detailTools?.data?.data?.ladingExitPermitDetails?.map((item: any, index: number) => (

                            <tr className="!border-[1px] !border-black">
                                <td className="border-l-[1px] border-black text-center">
                                    <span className="text-[12px]">{index + 1}</span>
                                </td>
                                <td className="border-l-[1px] border-black text-center">
                                    <span className="text-[12px]">{item?.productCode}</span>
                                </td>
                                <td className="border-l-[1px] border-black text-center">
                                    <span className="text-[12px]">{item?.productName}</span>
                                </td>
                                <td className="border-l-[1px] border-black text-center">
                                    <span className="text-[12px]">{item?.productBrandName}</span>
                                </td>
                                <td className="border-l-[1px] border-black text-center">
                                    <span className="text-[12px]">{separateAmountWithCommas(+item?.ladingAmount)}</span>
                                </td>
                                <td className="border-l-[1px] border-black text-center">
                                    <span className="text-[12px]">{item?.productMainUnitDesc}</span>
                                </td>
                                <td className="border-l-[1px] border-black text-center">
                                    <span className="text-[12px]">{separateAmountWithCommas(item?.realAmount)}</span>
                                </td>
                                <td className="text-center">
                                    <span className="text-[12px]">{separateAmountWithCommas(item?.productSubUnitAmount)}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="border-[1px] !px-4 border-t-0 border-black">
                        <div className="grid grid-cols-3">
                            <div className="flex flex-col gap-y-1 border-l-[1px]  border-black px-4">
                                <span className="font-bold">نام و امضا:</span>
                                <span>تحویل دهنده:</span>
                            </div>
                            <div className="flex flex-col gap-y-1 border-l-[1px]  border-black px-4">
                                <span className="font-bold">نام و امضا:</span>
                                <span>تحویل گیرنده:</span>
                            </div>
                            <div className="flex flex-col gap-y-1 px-4">
                                <span className="font-bold">نام و امضا:</span>
                                <span>تایید کننده:</span>
                            </div>
                        </div>
                </div>
            </div>

        </Container>
    );
};

export default LadingExitPermitPrint;
