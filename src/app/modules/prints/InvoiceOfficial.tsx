import { Print } from "@mui/icons-material"
import { toAbsoulteUrl } from "../../../_cloner/helpers/AssetsHelper"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import NumberDisplay from "../../../_cloner/components/NumberWithBorder"

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
    const productsDetail: any = [
        { id: "1", header: "ردیف", accessor: "id" },
        { id: "2", header: "کدکالا", accessor: "radif" },
        { id: "3", header: "شرح کالا یا خدمات", accessor: "productCode" },
        { id: "4", header: "تعداد", accessor: "productName" },
        { id: "5", header: "واحد", accessor: "proximateAmount" },
        { id: "6", header: "مبلغ واحد(ریال)", accessor: "price" },
        { id: "7", header: "مبلغ کل(واحد)", accessor: "allPrice" },
    ]

    const fakeData: any = [
        {
            id: "1", 
            radif: '132', 
            productCode: "2321", 
            productName: "نبشی 18 نیمه سبک", 
            proximateAmount: "12,000", 
            price: '568,787,877', 
            allPrice: "748,757,452", 
        },
        {
            id: "1", 
            radif: '1342', 
            productCode: "2321", 
            productName: "نبشی 18 نیمه سبک", 
            proximateAmount: "12,000", 
            price: '568,787,877', 
            allPrice: "748,757,452", 
        },
        {
            id: "1", 
            radif: '14353', 
            productCode: "2321", 
            productName: "نبشی 18 نیمه سبک", 
            proximateAmount: "12,000", 
            price: '568,787,877', 
            allPrice: "748,757,452", 
        },
        {
            id: "1", 
            radif: '1214', 
            productCode: "2321", 
            productName: "نبشی 18 نیمه سبک", 
            proximateAmount: "12,000", 
            price: '568,787,877', 
            allPrice: "748,757,452", 
        },
        {
            id: "1", 
            radif: '15434', 
            productCode: "2321", 
            productName: "نبشی 18 نیمه سبک", 
            proximateAmount: "12,000", 
            price: '568,787,877', 
            allPrice: "748,757,452", 
        },
        {
            id: "1", 
            radif: '1564', 
            productCode: "2321", 
            productName: "نبشی 18 نیمه سبک", 
            proximateAmount: "12,000", 
            price: '568,787,877', 
            allPrice: "748,757,452", 
        },
    ]


  return (
    <>
        <button className="bg-green-500 px-4 py-2 mb-8 rounded-md" onClick={handlePrint}>
            <span className="pl-2 text-white">
                <Print />
            </span>
            <span className="text-white">پرینت</span>
        </button>
        <Container>

            <div ref={printComponentRef} style={{direction: "rtl", width: "100%"}}>
                    <div className="relative">
                        <header> 
                            <img src={toAbsoulteUrl('/media/mainlogo/headerInvoice1.png')} className="!w-full" />  
                        </header>
                        <strong className="block text-center print:text-[14px]">صورت حساب فروش کالا و خدمات</strong>
                        <main className="flex flex-col space-y-2">
                            {/* Main Customer */}
                            <section className="flex flex-col justify-center items-center">
                                <div className="trapezoid">
                                    <span className="font-bold text-white">مشخصات فروشنده</span>
                                </div>
                                <section className="boxInfo border-2 w-full border-black rounded-md bg-gradient-to-l from-[#ebebeb]">
                                    {/* <div className="grid grid-cols-4 gap-y-2 p-4"> */}
                                    <div className="flex flex-row flex-wrap gap-x-8 gap-y-4 px-4 py-2">
                                        <div>
                                            <RendertextValue title="نام شخص حقیقی/حقوقی" value="ابوالفضل معصومی اسنقی" />
                                        </div>
                                        <RendertextValue title="کداقتصادی" value={<NumberDisplay number={67232163} />} />
                                        <RendertextValue title="شماره ثبت" value={<NumberDisplay number={673} />} />
                                        <RendertextValue title="نشانی کامل" value="استان تهران، خیابان انقلاب" />
                                        <RendertextValue title="شهرستان" value="بهارستان" />
                                        <RendertextValue title="کدپستی" value={<NumberDisplay number={3698571256} />} />
                                        <RendertextValue title="شناسه ملی" value={<NumberDisplay number={6660089985} />} />
                                        <div className="col-span-3">
                                            <RendertextValue title="نشانی کامل" value="استان تهران، خیابان انقلاب" />
                                        </div>
                                        <RendertextValue title="تلفن/نمابر" value="02156766117895" />
                                    </div>
                                </section>
                            </section>
                            {/* Main Purchaser */}
                            <section className="flex flex-col justify-center items-center">
                                <div className="trapezoid">
                                    <span className="font-bold text-white">مشخصات خریدار</span>
                                </div>
                                <section className="boxInfo border-2 w-full border-black rounded-md bg-gradient-to-l from-[#ebebeb]">
                                    <div className="flex flex-row flex-wrap gap-x-8 gap-y-4 px-4 py-2">
                                        <div className="col-span-2">
                                            <RendertextValue title="نام شخص حقیقی/حقوقی" value="ابوالفضل معصومی اسنقی" />
                                        </div>
                                        <RendertextValue title="کداقتصادی" value={<NumberDisplay number={67232163} />} />
                                        <RendertextValue title="شماره ثبت" value={<NumberDisplay number={673} />} />
                                        <RendertextValue title="نشانی کامل" value="استان تهران، خیابان انقلاب" />
                                        <RendertextValue title="شهرستان" value="بهارستان" />
                                        <RendertextValue title="کدپستی" value={<NumberDisplay number={3698571256} />} />
                                        <RendertextValue title="شناسه ملی" value={<NumberDisplay number={6660089985} />} />
                                        <div className="col-span-3">
                                            <RendertextValue title="نشانی کامل" value="استان تهران، خیابان انقلاب" />
                                        </div>
                                        <RendertextValue title="تلفن/نمابر" value="02156766117895" />
                                    </div>
                                </section>
                            </section>
                            {/* Products */}
                            <section className="flex flex-col justify-center items-center">
                            <div className="flex flex-row flex-wrap gap-x-8 gap-y-4 px-4">
                                <div className="trapezoidColor">
                                    <span className="font-bold">مشخصات کالا یا خدمات مورد معامله</span>
                                </div>
                            </div>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead className="bg-[#E2E8F0]" >
                                        <TableRow >
                                        {productsDetail?.map((column: {accessor: string, header: string}) => (
                                            <TableCell className="flex flex-wrap !font-bold !m-0 !py-1 !px-4" key={column?.accessor}>{column?.header}</TableCell>
                                        ))}
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {fakeData.map((row: any, rowIndex: any) => (
                                            <TableRow key={rowIndex} className='cursor-pointer hover:bg-blue-200 transition !h-[10px]'>
                                                {productsDetail?.map((column: any) => (
                                                <TableCell size='small' >
                                                    <Typography>{row[column?.accessor]}</Typography>
                                                </TableCell>
                                            ))}
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </section>
                        </main>
                        <footer> 
                            <img src={toAbsoulteUrl('/media/mainlogo/footerInvoice1.png')} className="!w-full" />  
                        </footer>
                </div>
            </div>
        </Container>
    </>
  )
}

export default InvoiceOfficial