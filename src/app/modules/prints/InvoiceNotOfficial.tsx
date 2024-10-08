import { Print } from "@mui/icons-material";
import { toAbsoulteUrl } from "../../../_cloner/helpers/assetsHelper";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, Container } from "@mui/material";
import NumberDisplay from "../../../_cloner/components/NumberWithBorder";
import { useRetrieveOrder } from "../managment-order/core/_hooks";
import { useParams } from "react-router-dom";
import Backdrop from "../../../_cloner/components/Backdrop";
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount";

const RendertextValue = (props: { title: string; value: any }) => {
    return (
        <div className="flex items-center gap-x-2">
            <h4 className="print:!text-[10px] font-bold text-gray-600">
                {props.title}:{" "}
            </h4>
            <span className="font-bold print:!text-[12px]">{props.value}</span>
        </div>
    );
};

const InvoiceNotOfficial = () => {
    const { id } = useParams()
    const { data, isLoading } = useRetrieveOrder(id)

    const printComponentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => printComponentRef.current,
    });

    if (isLoading) {
        return <Backdrop loading={isLoading} />
    }

    return (
        <>
            <button
                className="bg-green-500 px-4 py-2 mb-8 rounded-md"
                onClick={handlePrint}
            >
                <span className="pl-2 text-white">
                    <Print />
                </span>
                <span className="text-white">پرینت</span>
            </button>
            <Container>
                <Card>
                    <div
                        ref={printComponentRef}
                        style={{ 
                            direction: "rtl", 
                            width: "100%",
                            flexGrow: 1,
                            padding: 3}}
                    >
                        <div className="relative">
                            <header>
                                <img
                                    src={toAbsoulteUrl(
                                        "/media/mainlogo/invoiceHeader2.png"
                                    )}
                                    className="!w-full"
                                />
                            </header>
                            <strong className="block text-center print:text-[14px]">
                                صورت حساب فروش کالا و خدمات
                            </strong>
                            <main className="flex flex-col space-y-2 px-4">
                                {/* Main Purchaser */}
                                <section className="flex flex-col justify-center items-center">
                                    <div className="trapezoid">
                                        <span className="font-bold text-white">
                                            مشخصات خریدار
                                        </span>
                                    </div>
                                    <section className="boxInfo border-2 w-full border-black rounded-md bg-gradient-to-l from-[#ebebeb]">
                                        <div className="flex flex-col flex-wrap gap-x-8 gap-y-4 px-4 py-2">
                                            <div className="col-span-2">
                                                <RendertextValue
                                                    title="نام خریدار"
                                                    value={`${data?.data?.customer?.firstName} ${data?.data?.customer?.lastName}`}
                                                />
                                            </div>
                                            <RendertextValue
                                                title="تلفن/نمابر"
                                                value={data?.data?.customer?.tel1}
                                            />
                                        </div>
                                    </section>
                                </section>
                                {/* Products */}
                                <section className="flex flex-col justify-center items-center">
                                    <div className="flex flex-row flex-wrap gap-x-8 gap-y-4 px-4">
                                        <div className="trapezoidColor">
                                            <span className="font-bold">
                                                مشخصات کالا یا خدمات مورد معامله
                                            </span>
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td className="print:text-[10px] border border-black text-center -rotate-90 !w-[2%]">ردیف</td>
                                                <td className="print:text-[10px] border border-black bg-slate-100 text-center w-[5%]">کدکالا</td>
                                                <td className="print:text-[10px] border border-black bg-slate-100 text-center w-[14%]">شرح کالا یا خدمات</td>
                                                <td className="print:text-[10px] border border-black bg-slate-100 text-center w-[8%]">تعداد</td>
                                                <td className="print:text-[10px] border border-black bg-slate-100 text-center w-[8%]">واحد</td>
                                                <td className="print:text-[10px] border border-black bg-slate-100 text-center w-[9%]">مبلغ واحد(ریال)</td>
                                                <td className="print:text-[10px] border border-black bg-slate-100 text-center w-[12%]">مبلغ کل(ریال)</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.data?.details?.map((item: any, index: number) => (
                                                <tr>
                                                    <td className="print:text-[10px] border border-black bg-white text-center w-[5%]">{index + 1}</td>
                                                    <td className="print:text-[10px] border border-black bg-white text-center w-[5%]">{item?.product?.productCode}</td>
                                                    <td className="print:text-[10px] border border-black bg-white text-center w-[14%]">{`${item?.product?.productName}`}</td>
                                                    <td className="print:text-[10px] border border-black bg-white text-center w-[8%]">{separateAmountWithCommas(item?.proximateAmount)}</td>
                                                    <td className="print:text-[10px] border border-black bg-white text-center w-[8%]">{item?.product?.productMainUnitDesc}</td>
                                                    <td className="print:text-[10px] border border-black bg-white text-center w-[9%]">{separateAmountWithCommas(item?.price)}</td>
                                                    <td className="print:text-[10px] border border-black bg-white text-center w-[12%]">{separateAmountWithCommas((+item?.proximateAmount) * (+item?.price))}</td>
                                                </tr>
                                            ))}
                                                <tr>
                                                    <td className="print:text-[10px] border border-black bg-white" rowSpan={6} colSpan={6}>جمع کل</td>
                                                    <td className="print:text-[10px] border border-black bg-white text-center w-[7%] font-bold">{separateAmountWithCommas(+data?.data?.totalAmount)}</td>
                                                </tr>

                                        </tbody>
                                    </table>
                                </section>
                            </main>
                            <footer>
                                <img
                                    src={toAbsoulteUrl(
                                        "/media/mainlogo/footerInvoice2.png"
                                    )}
                                    className="!w-full"
                                />
                            </footer>
                        </div>
                    </div>
                </Card>
            </Container>
        </>
    );
};

export default InvoiceNotOfficial;
