import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toAbsoulteUrl } from "../../../_cloner/helpers/assetsHelper";
import { Container } from "@mui/material";
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount";
import { useParams } from "react-router-dom";
import Backdrop from "../../../_cloner/components/Backdrop";
import { Print } from "@mui/icons-material";
import { useGetLadingLicenceById } from "../ladingLicence/_hooks";
import { useGetLadingExitPermitById } from "../exitRemittance/_hooks";

const EvacutionPrint = () => {
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
                {ladingDetailTools?.data?.data?.cargoAnnounce?.order?.invoiceTypeId === 2 &&
                    <>
                        <div className="flex flex-col justify-center items-center">
                            <img alt="sepehriranian"
                                src={toAbsoulteUrl("/media/mainlogo/logo-no-background.png")}
                                width={60}
                                className="text-center"
                            />
                        </div>
                        <h2 className="text-center font-bold text-xl print:text-lg py-2">برگه مجوز ورود و تخلیه کالا</h2>
                    </>
                }
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
                        {detailTools?.data?.data?.ladingExitPermitDetails?.map((item: any, index: number) => (
                            <tr className="!border-[1px] !border-black">
                                <td className="border-l-[1px] border-black text-center">
                                    <span className="text-[12px] py-2">{index + 1}</span>
                                </td>
                                <td className="border-l-[1px] border-black text-center">
                                    <span className="text-[12px] py-2">{item?.productName}</span>
                                </td>
                                <td className="border-l-[1px] border-black text-center">
                                    <span className="text-[12px] py-2">{separateAmountWithCommas(item?.realAmount)}</span>
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
    );
};

export default EvacutionPrint;
