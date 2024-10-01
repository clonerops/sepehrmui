import { AddTask, AdsClick, CarCrash, DateRange, DateRangeRounded, Description, DesignServices, HomeMaxRounded, HomeMiniOutlined, HomeOutlined, NumbersOutlined, Person, PhoneRounded, Place, PriceChange, Print, TypeSpecimen, TypeSpecimenTwoTone } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import moment from "moment-jalaali"
import ConfirmDialog from "../../../_cloner/components/ConfirmDialog"
import ButtonComponent from "../../../_cloner/components/ButtonComponent"
import MuiTable from "../../../_cloner/components/MuiTable"
import CardTitleValue from "../../../_cloner/components/CardTitleValue"
import FileUpload from "../../../_cloner/components/FileUpload"
import Backdrop from "../../../_cloner/components/Backdrop"
import ReusableCard from "../../../_cloner/components/ReusableCard"
import CardWithIcons from "../../../_cloner/components/CardWithIcons"
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar"
import { renderAlert } from "../../../_cloner/helpers/sweetAlert"
import { useGetTransferRemitanceById } from "../transferRemittance/_hooks"
import { convertFilesToBase64 } from "../../../_cloner/helpers/convertToBase64"
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount"
import { usePostEntrancePermits } from "./_hooks"
import { useAuth } from "../../../_cloner/helpers/checkUserPermissions"
import AccessDenied from "../../routing/AccessDenied"

const EntrancePermit = () => {
    const { hasPermission } = useAuth()

    const { id }: any = useParams()
    const detailTools = useGetTransferRemitanceById(id)
    const entranceTools = usePostEntrancePermits()

    const [approve, setApprove] = useState<boolean>(false)
    const [files, setFiles] = useState<File[]>([]);
    const [base64Attachments, setBase64Attachments] = useState<string[]>([])

    useEffect(() => {
        if (files.length > 0) {
            convertFilesToBase64(files, setBase64Attachments);
        }
        // eslint-disable-next-line
    }, [files]);


    const orderAndAmountInfo = [
        { id: 1, title: "شماره حواله", icon: <NumbersOutlined color="secondary" />, value: detailTools?.data?.data?.id || "ثبت نشده" },
        { id: 2, title: "تاریخ حواله", icon: <DateRangeRounded color="secondary" />, value: detailTools?.data?.data?.registerDate || "ثبت نشده" },
        { id: 3, title: "نوع انتقال", icon: <TypeSpecimenTwoTone color="secondary" />, value: detailTools?.data?.data?.transferRemittanceTypeDesc || "ثبت نشده" },
        { id: 4, title: "انبار مبدا", icon: <HomeMaxRounded color="secondary" />, value: detailTools?.data?.data?.originWarehouseName || "ثبت نشده" },
        { id: 5, title: "انبار مقصد", icon: <HomeMiniOutlined color="secondary" />, value: detailTools?.data?.data?.destinationWarehouseName || "ثبت نشده" },
        { id: 6, title: "نام و نام خانوادگی راننده", icon: <Person color="secondary" />, value: detailTools?.data?.data?.driverName || "ثبت نشده" },
        { id: 7, title: "شماره همراه راننده", icon: <PhoneRounded color="secondary" />, value: detailTools?.data?.data?.driverMobile || "ثبت نشده" },
        { id: 8, title: "شماره پلاک خودرو", icon: <Place color="secondary" />, value: detailTools?.data?.data?.plaque || "ثبت نشده" },
        { id: 9, title: "نوع خودرو", icon: <TypeSpecimen color="secondary" />, value: detailTools?.data?.data?.vehicleTypeName || "ثبت نشده" },
        { id: 10, title: "مبلغ کرایه", icon: <PriceChange color="secondary" />, value: detailTools?.data?.data?.fareAmount || "ثبت نشده" },
        { id: 11, title: "تاریخ تحویل", icon: <DateRange color="secondary" />, value: detailTools?.data?.data?.deliverDate || "ثبت نشده" },
        { id: 12, title: "باربری", icon: <CarCrash color="secondary" />, value: detailTools?.data?.data?.shippingName || "ثبت نشده" },
    ]

    const detailTransfer = [
        { id: 1, header: "کد کالا", accessor: "productCode", render: (params: any) => params.product.productCode },
        { id: 2, header: "نام کالا", accessor: "productName" },
        { id: 2, header: "واحد اصلی", accessor: "productMainUnitDesc", render: (params: any) => params.product.productMainUnitDesc },
        { id: 2, header: "واحد فرعی", accessor: "productSubUnitDesc", render: (params: any) => params.product.productSubUnitDesc },
        { id: 3, header: "برند", accessor: "brandName" },
        {
            id: 4, header: "مقدار انتفال", accessor: "transferAmount", render: (params: any) => {
                return <Typography variant="h2" className="text-green-500">{separateAmountWithCommas(params.transferAmount)}</Typography>
            }
        },
    ]

    const handleEntrancePermission = () => {
        let attachments = base64Attachments.map((i) => {
            let convert = {
                fileData: i,
            }
            return convert
        })

        const formData = {
            transferRemittanceId: +id,
            attachments: attachments
        }
        entranceTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.succeeded) {
                    renderAlert(`مجوز ورود با شماره ${response.data.permitCode} با موفقیت ثبت گردید`)
                } else {
                    EnqueueSnackbar(response.data.Message, "error")
                }
            }
        })
        setApprove(false)

    }

    if (!hasPermission("CreateEntrancePermit"))
        return <AccessDenied />
    return (
        <>
            {entranceTools.isLoading && <Backdrop loading={entranceTools.isLoading} />}
            {detailTools.isLoading && <Backdrop loading={detailTools.isLoading} />}
            <Typography color="primary" variant="h1" className="pb-8">ثبت مجوز ورود</Typography>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-4">
                <CardWithIcons
                    title='شماره ورود'
                    icon={<DesignServices className="text-white" />}
                    value={entranceTools?.data?.data?.permitCode || 0}
                    iconClassName='bg-[#3322D8]' />
                <CardWithIcons
                    title='تاریخ ثبت مجوز'
                    icon={<AddTask className="text-white" />}
                    value={moment(new Date(Date.now())).format('jYYYY/jMM/jDD')}
                    iconClassName='bg-[#369BFD]' />
            </div>

            <div className="flex justify-between items-center mb-4">
                <ReusableCard cardClassName="flex flex-col w-full">
                    <Typography variant="h2" color="primary" className="pb-4">
                        افزودن پیوست
                    </Typography>
                    <FileUpload
                        files={files}
                        setFiles={setFiles}
                    />
                </ReusableCard>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0 mb-8">
                {orderAndAmountInfo.map((item: {
                    title: string,
                    icon: React.ReactNode,
                    value: any
                }, index) => {
                    return <CardTitleValue key={index} title={item.title} value={item.value} icon={item.icon} />
                })}
                <div className="lg:col-span-4">
                    <CardTitleValue title={"آدرس محل تخلیه"} value={detailTools?.data?.data?.unloadingPlaceAddress || "ثبت نشده"} icon={<HomeOutlined color="secondary" />} />
                </div>
                <div className="lg:col-span-4">
                    <CardTitleValue title={"توضیحات"} value={detailTools?.data?.data?.description || "ثبت نشده"} icon={<Description color="secondary" />} />
                </div>
            </div>

            <MuiTable data={detailTools?.data?.data?.details} columns={detailTransfer} />
            <div className="flex justify-end items-end my-4 gap-x-4">
                {entranceTools?.data?.data?.id &&
                    <Link target="_blank" to={`/dashboard/entranceAndUnloading_print/${entranceTools?.data?.data?.id}/${entranceTools?.data?.data?.permitCode}/${moment(entranceTools?.data?.data?.created).format('jYYYY/jMM/jDD')}`}>
                        <Button className="flex gap-x-4 py-2" variant="contained" color="secondary">
                            <Typography className="text-black px-32 py-2 flex flex-row gap-x-4" variant="h2">
                                <Print className="text-black" />
                                پرینت مجوز
                            </Typography>
                        </Button>
                    </Link>
                }
                <Button className="!bg-green-500 !text-white hover:!bg-green-800" onClick={() => setApprove(true)}>
                    <Typography className="text-black px-32 py-2 flex flex-row gap-x-4" variant="h2">
                        <AdsClick className="text-black" />
                        ثبت مجوز ورود
                    </Typography>
                </Button>

            </div>

            <ConfirmDialog
                open={approve}
                hintTitle={`آیا از ثبت مجوز ورود شماره حواله ${detailTools?.data?.data?.id} مطمئن هستید؟`}
                notConfirmText="لغو"
                confirmText={detailTools.isLoading ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => handleEntrancePermission()}

            />

        </>
    )
}

export default EntrancePermit