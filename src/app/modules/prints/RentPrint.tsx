import { useGetRentPayment } from "../rent-payment/core/_hooks"
import { useParams } from "react-router-dom"
import { Button, Checkbox, Typography } from "@mui/material"
import { FC, useRef } from "react"
import { useReactToPrint } from "react-to-print"

interface IProps {}

const RentPrint:FC<IProps> = ({}) => {
    const printComponentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
      content: () => printComponentRef.current,
  });
  
    const { id }:any = useParams()
    const rentDetail = useGetRentPayment(id)

    const RendertextValue = (props: {title: string, value: any}) => {
        return (
            <div className="flex items-center gap-x-2">
                <h3 className="font-bold">{props.title}: </h3>
                <span>{props.value}</span>
            </div>
        )
    }

  return (
    <>
        <div ref={printComponentRef} style={{direction: "rtl"}}>
                <h2 className="text-center font-bold text-2xl">رسید پرداخت کرایه</h2>
                <span className="font-bold text-lg">تاریخ : .........</span>
                <div className="border-2 border-b-0 px-4 py-1 border-black">
                    <div className="grid grid-cols-4 print:grid-cols-2 gap-y-4">
                        <RendertextValue title="شماره پرداخت" value={`125300`} />
                        <RendertextValue title="نام و نام خانوادگی راننده" value={`محسن رضایی`} />
                        <RendertextValue title="شماره همراه راننده" value={`09217767345`} />
                        <RendertextValue title="شماره حساب راننده" value={`5859831193401295`} />
                    </div>

                </div>
                <div className="border-2 border-b-0 px-4 py-1 border-black font-bold print:!text-sm">
                    بدینوسیله تایید میگردد مبلغ 128,000, ریال به حروف صد و بیست و هزار ریال توسط شرکت بازرگانی سپهر ایرانیان به راننده ذکرشده پرداخت گردید.
                </div>
                <div className="border-2 px-4 border-black">
                    <div className="grid grid-cols-3">
                        <div className="flex flex-col gap-y-4 border-l-2  border-black p-4">
                            <span className="font-bold">نام و امضا:</span>
                            <span>دریافت کننده:</span>
                        </div>
                        <div className="flex flex-col gap-y-4 border-l-2  border-black p-4">
                            <span className="font-bold">نام و امضا:</span>
                            <span>پرداخت کننده:</span>
                        </div>
                        <div className="flex flex-col gap-y-4 p-4">
                            <span className="font-bold">نام و امضا:</span>
                            <span>تایید کننده:</span>
                        </div>
                    </div>
                </div>
        </div>
        <div className="mt-4">
            <Button onClick={handlePrint} variant="contained" color="secondary">
                <Typography>پرینت رسید</Typography>
            </Button>
        </div>
    </>
  )
}

export default RentPrint