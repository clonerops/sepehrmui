import moment from "moment-jalaali"
import { useGetRentPayment } from "../rent-payment/core/_hooks"
import { useParams } from "react-router-dom"

const RentPrint = () => {
    const { id }:any = useParams()
    const rentDetail = useGetRentPayment(id)

    const RendertextValue = (props: {title: string, value: any}) => {
        return (
            <div className="flex items-center gap-x-2">
                <h4 className="font-bold">{props.title}: </h4>
                <span>{props.value}</span>
            </div>
        )
    }

  return (
    <>
            <h2 className="text-center font-bold text-2xl">رسید پرداخت کرایه</h2>
            <span className="font-bold text-lg">تاریخ : .........</span>
            <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                <div className="grid grid-cols-4">
                    <RendertextValue title="شماره پرداخت" value={`${rentDetail?.data?.data?.patient?.firstName} `} />
                    <RendertextValue title="نام خانوادگی" value={rentDetail?.data?.data?.patient?.lastName} />
                    <RendertextValue title="تاریخ تولد" value={moment(rentDetail?.data?.data?.patient?.birthDate).format('jYYYY/jMM/jDD')} />
                    <RendertextValue title="شماره پرونده" value={rentDetail?.data?.data?.documentCode} />
                </div>
            </div>

    </>
  )
}

export default RentPrint