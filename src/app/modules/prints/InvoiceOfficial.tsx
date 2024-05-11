import { Print } from "@mui/icons-material"
import ReusableCard from "../../../_cloner/components/ReusableCard"
import { toAbsoulteUrl } from "../../../_cloner/helpers/AssetsHelper"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { Card } from "@mui/material"

const RendertextValue = (props: { title: string, value: any }) => {
    return (
        <div className="flex items-center gap-x-2">
            <h4 className="print:!text-[10px] font-bold text-gray-600">{props.title}: </h4>
            <span className="font-bold print:!text-[12px]">{props.value}</span>
        </div>
    )
}


const InvoiceOfficial = () => {
    const printComponentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => printComponentRef.current,
    });

  return (
    <>
        <button className="bg-green-500 px-4 py-2 mb-8 rounded-md" onClick={handlePrint}>
            <span className="pl-2 text-white">
                <Print />
            </span>
            <span className="text-white">پرینت</span>
        </button>
        <div ref={printComponentRef} style={{ direction: "rtl", paddingLeft: "8px", paddingRight: "8px", }}>
            {/* <Card className="m-8 px-4 py-4"> */}
            <Card>
                <div className="ml-auto mr-auto pl-[128px] pr-[128px] print:pl-[10px] print:pr-[10px]">
                    <header className="flex justify-between items-center">
                        <div className="flex items-center gap-x-2">
                            <img src={toAbsoulteUrl('/media/logos/follad.png')} width={30} height={30} />
                            <span className="font-bold text-[16px] text-[#272862] print:text-[14px]">شرکت مهفام پولاد ویانا</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-[14px] print:text-[12px]">صورت حساب فروش کالا و خدمات</h3>
                        </div>
                        <div className="flex justify-center items-center gap-x-2">
                            <span className="font-bold text-[14px] print:text-[12px]">تاریخ</span>
                            <span className="border-2 border-black w-[120px] rounded-md px-8 py-1 font-bold">
                                1402/20/12
                            </span>
                        </div>
                    </header>

                    <section className="flex flex-col justify-center items-center">
                        <div className="trapezoid">
                            <span className="font-bold">مشخصات فروشنده</span>
                        </div>
                        <section className="boxInfo border-2 w-full border-black rounded-md bg-gradient-to-l from-[#ebebeb]">
                            <div className="grid grid-cols-4 gap-y-2 p-4">
                                <div className="col-span-2">
                                    <RendertextValue title="نام شخص حقیقی/حقوقی" value="ابوالفضل معصومی اسنقی" />
                                </div>
                                <RendertextValue title="کداقتصادی" value="12402547985478" />
                                <RendertextValue title="شماره ثبت" value="3698" />
                                <RendertextValue title="نشانی کامل" value="استان تهران، خیابان انقلاب" />
                                <RendertextValue title="شهرستان" value="بهارستان" />
                                <RendertextValue title="کدپستی" value="369654778548" />
                                <RendertextValue title="شناسه ملی" value="6660089985" />
                                <div className="col-span-3">
                                    <RendertextValue title="نشانی کامل" value="استان تهران، خیابان انقلاب" />
                                </div>
                                <RendertextValue title="تلفن/نمابر" value="02156766117895" />
                            </div>
                        </section>
                    </section>
                    <section className="flex flex-col justify-center items-center">
                        <div className="trapezoid">
                            <span className="font-bold">مشخصات خریدار</span>
                        </div>
                        <section className="boxInfo border-2 w-full border-black rounded-md bg-gradient-to-l from-[#ebebeb]">
                            <div className="grid grid-cols-4 gap-y-2 p-4">
                                <div className="col-span-2">
                                    <RendertextValue title="نام شخص حقیقی/حقوقی" value="ابوالفضل معصومی اسنقی" />
                                </div>
                                <RendertextValue title="کداقتصادی" value="12402547985478" />
                                <RendertextValue title="شماره ثبت" value="3698" />
                                <RendertextValue title="نشانی کامل" value="استان تهران، خیابان انقلاب" />
                                <RendertextValue title="شهرستان" value="بهارستان" />
                                <RendertextValue title="کدپستی" value="369654778548" />
                                <RendertextValue title="شناسه ملی" value="6660089985" />
                                <div className="col-span-3">
                                    <RendertextValue title="نشانی کامل" value="استان تهران، خیابان انقلاب" />
                                </div>
                                <RendertextValue title="تلفن/نمابر" value="02156766117895" />
                            </div>
                        </section>
                    </section>
                </div>

                {/* <section className="container">
                    <header className="flex justify-between items-center">
                        <div className="flex items-center gap-x-2">
                            <img src={toAbsoulteUrl('/media/logos/follad.png')} width={30} height={30} />
                            <span className="font-bold text-[16px] text-[#272862]">شرکت مهفام پولاد ویانا</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-[14px]">صورت حساب فروش کالا و خدمات</h3>
                        </div>
                        <div className="flex justify-center items-center gap-x-2">
                            <span className="font-bold text-[14px]">تاریخ</span>
                            <span className="border-2 border-black w-[120px] rounded-md px-8 py-1 font-bold">
                                1402/20/12
                            </span>
                        </div>
                    </header>
                    <section className="flex flex-col justify-center items-center">
                        <div className="trapezoid">
                            <span className="font-bold">مشخصات فروشنده</span>
                        </div>
                        <section className="boxInfo border-2 w-full border-black rounded-md bg-gradient-to-l from-[#ebebeb]">
                            <div className="grid grid-cols-4 gap-y-2 p-4">
                                <div className="col-span-2">
                                    <RendertextValue title="نام شخص حقیقی/حقوقی" value="ابوالفضل معصومی اسنقی" />
                                </div>
                                <RendertextValue title="کداقتصادی" value="12402547985478" />
                                <RendertextValue title="شماره ثبت" value="3698" />
                                <RendertextValue title="نشانی کامل" value="استان تهران، خیابان انقلاب" />
                                <RendertextValue title="شهرستان" value="بهارستان" />
                                <RendertextValue title="کدپستی" value="369654778548" />
                                <RendertextValue title="شناسه ملی" value="6660089985" />
                                <div className="col-span-3">
                                    <RendertextValue title="نشانی کامل" value="استان تهران، خیابان انقلاب" />
                                </div>
                                <RendertextValue title="تلفن/نمابر" value="02156766117895" />
                            </div>
                        </section>
                    </section>
                </section>     */}
            </Card>   
        </div>
    </>
  )
}

export default InvoiceOfficial