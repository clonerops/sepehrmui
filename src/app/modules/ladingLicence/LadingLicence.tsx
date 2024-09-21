import { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { AdsClick, Person, Print } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { separateAmountWithCommas } from '../../../_cloner/helpers/seprateAmount'
import { useCargoById } from '../cargoAnnouncment/_hooks'
import { usePostLadingLicence } from './_hooks'
import { ILadingLicence } from './_models'

import ReusableCard from '../../../_cloner/components/ReusableCard'
import MuiTable from '../../../_cloner/components/MuiTable'
import CardTitleValue from '../../../_cloner/components/CardTitleValue'
import Backdrop from '../../../_cloner/components/Backdrop'
import ConfirmDialog from '../../../_cloner/components/ConfirmDialog'
import moment from 'moment-jalaali'
import { useAuth } from '../../../_cloner/helpers/checkUserPermissions'
import AccessDenied from '../../routing/AccessDenied'

const orderOrderColumnMain = [
    { id: 2, header: "کد کالا", accessor: "productCode", render: (params: any) => params?.orderDetail?.product?.productCode },
    { id: 3, header: "نام کالا", accessor: "productName", render: (params: any) => `${params?.orderDetail?.product?.productName} ${params?.orderDetail?.brandName}` },
    { id: 4, header: "مقدار اولیه", accessor: "realAmount", render: (params: any) => `${separateAmountWithCommas(params.realAmount)} ${params?.orderDetail?.product?.productMainUnitDesc}` },
    { id: 5, header: "مقدار بارگیری", accessor: "ladingAmount", render: (params: any) => <Typography variant="h3" className='text-green-500'>{`${separateAmountWithCommas(params.ladingAmount)} ${params?.orderDetail?.product?.productMainUnitDesc}`} </Typography> },
]

const LadingLicence = () => {
    const { hasPermission } = useAuth()

    const { id }: any = useParams()

    const cargoTools = useCargoById(id)
    const postLadingLicence = usePostLadingLicence()

    const [approve, setApprove] = useState<boolean>(false);

    const onSubmit = async () => {
        const formData: ILadingLicence | any = {
            cargoAnnounceId: id,
        }
        postLadingLicence.mutate(formData, {
            onSuccess: (res) => {
                if (res.succeeded) {
                    enqueueSnackbar(res.message, {
                        variant: "success",
                        anchorOrigin: { vertical: "top", horizontal: "center" }
                    })
                    setApprove(false)
                } else {
                    enqueueSnackbar(res.data.Message, {
                        variant: "error",
                        anchorOrigin: { vertical: "top", horizontal: "center" }
                    })
                }
            }
        })
    }

    const isDeliverDateCheck = moment(new Date()).format('jYYYY/jMM/jDD') < cargoTools?.data?.data?.deliveryDate

    if (!hasPermission("CreateLadingPermit"))
        return <AccessDenied />

    return (
        <>
            {cargoTools.isLoading && <Backdrop loading={cargoTools.isLoading} />}
            {postLadingLicence.isLoading && <Backdrop loading={postLadingLicence.isLoading} />}
            <Typography color="primary" variant="h1" className="pb-8">ثبت مجوز بارگیری</Typography>
            <div className='grid grid-cols-4 gap-x-4 gap-y-4'>
                <CardTitleValue icon={<Person color="secondary" />} title='شماره بارنامه' value={cargoTools?.data?.data?.cargoAnnounceNo || "ثبت نشده"} />
                <CardTitleValue icon={<Person color="secondary" />} title='شماره سفارش' value={cargoTools?.data?.data?.order?.orderCode || "ثبت نشده"} />
                <CardTitleValue icon={<Person color="secondary" />} title='نام مشتری' value={cargoTools?.data?.data?.order?.customerName || "ثبت نشده"} />
                <CardTitleValue icon={<Person color="secondary" />} title='نوع ارسال' value={cargoTools?.data?.data?.order?.orderSendTypeDesc || "ثبت نشده"} />
                <CardTitleValue icon={<Person color="secondary" />} title='نوع فاکتور' value={cargoTools?.data?.data?.order?.invoiceTypeDesc || "ثبت نشده"} />
                <CardTitleValue icon={<Person color="secondary" />} title='وضعیت سفارش' value={cargoTools?.data?.data?.order?.orderStatusDesc || "ثبت نشده"} />
                <CardTitleValue icon={<Person color="secondary" />} title='نام راننده' value={cargoTools?.data?.data?.driverName || "ثبت نشده"} />
                <CardTitleValue icon={<Person color="secondary" />} title='پلاک خودروبر' value={cargoTools?.data?.data?.carPlaque || "ثبت نشده"} />
                <CardTitleValue icon={<Person color="secondary" />} title='شماره همراه راننده' value={cargoTools?.data?.data?.driverMobile || "ثبت نشده"} />
                <CardTitleValue icon={<Person color="secondary" />} title='تاریخ تحویل' value={cargoTools?.data?.data?.deliveryDate || "ثبت نشده"} />
                <CardTitleValue icon={<Person color="secondary" />} title='مبلغ کرایه(ریال)' value={separateAmountWithCommas(cargoTools?.data?.data?.fareAmount) || "ثبت نشده"} />
                <CardTitleValue icon={<Person color="secondary" />} title='توضیحات ثبت شده' value={cargoTools?.data?.data?.description || "ثبت نشده"} />
            </div>
            <ReusableCard cardClassName='mt-4'>
                <Typography variant="h2" color="primary" className="pb-4">اقلام اعلام بارشده</Typography>
                <MuiTable tooltipTitle={cargoTools?.data?.data?.order.description ? <Typography>{cargoTools?.data?.data?.order.description}</Typography> : ""} onDoubleClick={() => { }} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={cargoTools?.data?.data?.cargoAnnounceDetails} columns={orderOrderColumnMain} />
                <div className='mt-4 flex gap-x-4'>
                    <Button onClick={() => setApprove(true)} variant='contained' className="!bg-green-500 !text-white hover:!bg-green-800">
                        <Typography className='text-black px-32 py-2 flex flex-row gap-x-4' variant='h2'>
                            <AdsClick className="text-black" />
                            ثبت مجوز بارگیری
                        </Typography>
                    </Button>
                    {postLadingLicence?.data?.data?.cargoAnnounceId &&
                        <Button variant='contained' color='secondary' className="flex gap-x-4">
                            <Link to={`/dashboard/ladingPermit_print/${postLadingLicence?.data?.data?.cargoAnnounceId}/${postLadingLicence?.data?.data?.id}/${moment(postLadingLicence?.data?.data?.created).format('jYYYY/jMM/jDD')}`}>
                                <Print color="primary" />
                            </Link>
                        </Button>
                    }
                </div>
            </ReusableCard>
            <ConfirmDialog
                open={approve}
                hintTitle={`${isDeliverDateCheck ? "هنوز موعد تاریخ تحویل نرسیده آیا از ثبت مجوز مطمئن هستید؟" : "آیا از ثبت مجوز مطمئن هستید؟"}`}
                notConfirmText="لغو"
                confirmText={postLadingLicence.isLoading ? "درحال پردازش ..." : "تایید"}
                onCancel={() => setApprove(false)}
                onConfirm={() => onSubmit()}
            />

        </>
    )
}

export default LadingLicence