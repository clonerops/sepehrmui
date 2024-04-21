import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toAbsoulteUrl } from "../../../_cloner/helpers/AssetsHelper";
import { Container } from "@mui/material";

const LadingPermitPrint = () => {
    const printComponentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => printComponentRef.current,
    });

    const RendertextValue = (props: {title: string, value: any}) => {
        return (
            <div className="flex items-center gap-x-2">
                <h4 className="font-bold print:!text-[12px]">{props.title}: </h4>
                <span className="print:!text-[12px]">{props.value}</span>
            </div>
        )
    }


    return (
        <Container>
            <button onClick={handlePrint}>پرینت</button>
            <div ref={printComponentRef} style={{ direction: "rtl" }}>
                <div className="flex flex-col justify-center items-center">
                    <img alt="sepehriranian"
                        src={toAbsoulteUrl("/media/mainlogo/2.png")}
                        width={60}
                        className="text-center"
                    />
                    <span className="font-bold text-2xl print:text-lg">بازرگانی سپهر ایرانیان</span>
                </div>
                <div className="flex justify-between items-center">
                    <h2 className="text-center font-bold text-2xl print:text-lg">حواله مجوز بارگیری</h2>
                    <div className="flex flex-col space-y-2">
                        <RendertextValue title="شماره مجوز" value={`1203022`} />
                        <RendertextValue title="شماره اعلام بار" value={`1203022`} />
                    </div>
                </div>
                <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                    <div className="grid grid-cols-1">
                        <span className="font-bold">اطلاعات راننده به شرح ذیل می باشد:</span>
                    </div>
                </div>
                <div className="border-[1px] border-b-0 px-4 py-1 border-black">

                    <div className="grid grid-cols-4 gap-y-4 print:grid-cols-2">
                        <RendertextValue title="نام و نام خانوادگی راننده" value={`ابوالفضل معصومی`} />
                        <RendertextValue title="شماره همراه راننده" value={`09217767345`} />
                        <RendertextValue title="پلاک خودرو" value={`28ج997ایران28`} />
                        <RendertextValue title="مبلغ کرایه" value={`25,000,000`} />
                    </div>
                </div>
                <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                    <div className="grid grid-cols-1">
                        <span className="font-bold">اقلام و سفارش های موجود:</span>
                    </div>
                </div>
                <table className="!w-full !border-[1px] !border-b-0 !border-black">
                        <thead>
                            <tr>
                                <th className="!border-[1px] !border-black text-center py-2 w-[15%]">
                                    <span className="!text-[12px]">ردیف</span>
                                </th>
                                <th className="!border-[1px] !border-black text-center py-2 w-[15%]">
                                    <span className="!text-[12px]">کدکالا</span>
                                </th>
                                <th className="!border-[1px] !border-black text-center py-2 w-[40%]">
                                    <span className="!text-[12px]">نام کالا</span>
                                </th>
                                <th className="!border-[1px] !border-black text-center py-2 w-[15%]">
                                    <span className="!text-[12px]">برند</span>
                                </th>
                                <th className="!border-[1px] !border-black text-center py-2 w-[15%]">
                                    <span className="!text-[12px]">مقدار بارگیری</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr className="!border-[1px] !border-black">
                            <td className="border-l-[1px] border-black py-2 text-center">
                                <span className="text-[12px]">1</span>
                            </td>
                            <td className="border-l-[1px] border-black py-2 text-center">
                                <span className="text-[12px]">6000</span>
                            </td>
                            <td className="border-l-[1px] border-black py-2 text-center">
                                <span className="text-[12px]">ناودانی 16 سبک</span>
                            </td>
                            <td className="border-l-[1px] border-black py-2 text-center">
                                <span className="text-[12px]">کوهپایه</span>
                            </td>
                            <td className="text-center">
                                <span className="text-[12px]">120000</span>
                            </td>
                        </tr> 
                        </tbody>
                </table>
                <div className="border-[1px] !px-4 border-t-0 border-black">
                        <div className="grid grid-cols-3">
                            <div className="flex flex-col gap-y-1 border-l-[1px]  border-black py-2 px-4">
                                <span className="font-bold">نام و امضا:</span>
                                <span>تحویل دهنده:</span>
                            </div>
                            <div className="flex flex-col gap-y-1 border-l-[1px]  border-black py-2 px-4">
                                <span className="font-bold">نام و امضا:</span>
                                <span>تحویل گیرنده:</span>
                            </div>
                            <div className="flex flex-col gap-y-1 py-2 px-4">
                                <span className="font-bold">نام و امضا:</span>
                                <span>تایید کننده:</span>
                            </div>
                        </div>
                </div>
            </div>

        </Container>
    );
};

export default LadingPermitPrint;
