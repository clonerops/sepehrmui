import { useState, useRef } from 'react'
import ReusableCard from '../../../../_cloner/components/ReusableCard'
import FormikInput from '../../../../_cloner/components/FormikInput'
import { Button, Typography } from '@mui/material'
import { Delete, Person, Search, Add } from '@mui/icons-material'
import TransitionsModal from '../../../../_cloner/components/ReusableModal'
import { useParams } from 'react-router-dom'
import { Formik } from 'formik'
import { dropdownProductLading } from '../helpers/dropdowns'
import MuiTable from '../../../../_cloner/components/MuiTable'
import { useCargoById, usePostLadingLicence } from '../core/_hooks'
import FormikMaskInput from '../../../../_cloner/components/FormikMaskInput'
import CardTitleValue from '../../../../_cloner/components/CardTitleValue'
import { ILadingLicence } from '../core/_models'
import { enqueueSnackbar } from 'notistack'
import FormikComboBox from '../../../../_cloner/components/FormikComboBox'
import Backdrop from '../../../../_cloner/components/Backdrop'

interface ILadingList {
    id?: number
    description?: string
    orderDetailId?: {
        value: number,
        label: string,
        productId: string
    } 
    orderDetailName?: string
    ladingAmount?: any
}

const initialValues: ILadingList = {
    id: 0,
    description: "",
    orderDetailId: {
        value: 0,
        label: "",
        productId: ""
    },
    orderDetailName: "",
    ladingAmount: 0
}

const orderOrderColumnMain = [
    { id: 1, header: "نام کالا", accessor: "productName" },
    { id: 2, header: "انبار", accessor: "warehouseName" },
    { id: 3, header: "مقدار", accessor: "proximateAmount", },
    { id: 4, header: "قیمت", accessor: "price" },
]


const LadingLicenceEdit = () => {
    const { id }: any = useParams()
    const { data, isLoading } = useCargoById(id)
    const postLadingLicence = usePostLadingLicence()

    let formikRef: any = useRef()

    const [ladingList, setLadingList] = useState<ILadingList[]>([])

    const [open, setOpen] = useState<boolean>(false)
    const lastCargoList: any = [
        { id: 1, header: "کالا", flex: 1, accessor: "orderDetailName" },
        { id: 2, header: "مقدار بارگیری", flex: 1, accessor: "ladingAmount" },
        {
            id: 3, header: "حذف", flex: 1, accessor: "", render: (params: any) => {
                return <Button onClick={() => handleDeleteProductInList(params)}>
                    <Delete className='!text-red-500' />
                </Button>
            }
        },
    ]

    const handleLadingList = (values: ILadingList) => {
        const newList: any = {
            orderDetailName: data?.data?.order.details.find((i: any) => i.productId === values?.orderDetailId?.productId).productName,
            orderDetailId: values?.orderDetailId?.value,
            ladingAmount: +values.ladingAmount
        }
        setLadingList(prev => [...prev, newList])
    }

    const handleDeleteProductInList = (rowData: any) => {
        const filtered = ladingList.filter((item) => item.orderDetailId !== rowData.orderDetailId.value)
        setLadingList(filtered)
    }

    const onSubmit = async (values: any) => {
        const formData: ILadingLicence | any = {
            cargoAnnounceId: id,
            description: values.description,
            ladingLicenseDetails: ladingList.map((item: any) => ({
                orderDetailId: item?.orderDetailId,
                ladingAmount: item.ladingAmount
            }))
        }
        postLadingLicence.mutate(formData, {
            onSuccess: (res) => {
                if(res.succeeded) {
                    enqueueSnackbar(res.message, {
                        variant: "success",
                        anchorOrigin: { vertical: "top", horizontal: "center" }
                    })
                    setOpen(false)
                } else {
                    enqueueSnackbar(res.data.Message, {
                        variant: "error",
                        anchorOrigin: { vertical: "top", horizontal: "center" }
                    })
                }
            }
        })
    }

    if(isLoading) {
        return <Backdrop loading={isLoading} />
    }

    return (
        <>
            {postLadingLicence.isLoading && <Backdrop loading={postLadingLicence.isLoading} />}
            <div className='grid grid-cols-4 gap-x-4 gap-y-4'>
                <CardTitleValue icon={<Person color="secondary" />} title='شماره سفارش' value={data?.data?.order?.orderCode} />
                <CardTitleValue icon={<Person color="secondary" />} title='نام مشتری' value={data?.data?.order?.customerName} />
                <CardTitleValue icon={<Person color="secondary" />} title='نوع ارسال' value={data?.data?.order?.orderSendTypeDesc} />
                <CardTitleValue icon={<Person color="secondary" />} title='نوع فاکتور' value={data?.data?.order?.invoiceTypeDesc} />
                <CardTitleValue icon={<Person color="secondary" />} title='وضعیت سفارش' value={data?.data?.order?.orderStatusDesc} />
                <CardTitleValue icon={<Person color="secondary" />} title='نام راننده' value={data?.data?.driverName} />
                <CardTitleValue icon={<Person color="secondary" />} title='پلاک خودروبر' value={data?.data?.carPlaque} />
                <CardTitleValue icon={<Person color="secondary" />} title='شماره همراه راننده' value={data?.data?.driverMobile} />
            </div>
            <ReusableCard cardClassName='mt-4'>
                <Typography variant="h2" color="primary" className="pb-4">اقلام سفارش</Typography>
                <MuiTable tooltipTitle={data?.data?.order.description ? <Typography>{data?.data?.order.description}</Typography> : ""} onDoubleClick={() => { }} headClassName="bg-[#272862]" headCellTextColor="!text-white" data={data?.data?.order.details} columns={orderOrderColumnMain} />
                <div className='mt-4'>
                    <Button onClick={() => setOpen(true)} variant='contained' color='primary'>
                        <Typography>ثبت مجوز بارگیری</Typography>
                    </Button>
                </div>
            </ReusableCard>
            <TransitionsModal
                open={open}
                isClose={() => setOpen(false)}
                title="ثبت مجوز بارگیری"
                width="50%"
                description="چنانچه مشکلی بابت ثبت مجوز بارگیری دارید، لطفا با پشتیبانی تماس بگیرید."
            >
                <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={onSubmit}>
                    {({ values }) => {
                        return <form className='mt-8'>
                            <div className='flex items-center justify-center gap-x-4 mb-4'>
                                <FormikComboBox name='orderDetailId' label={"کالای سفارش"} options={dropdownProductLading(data?.data?.order.details)} />
                                <FormikMaskInput thousandsSeparator=',' mask={Number} name='ladingAmount' label={"مقدار بارگیری"} />
                                <Button onClick={() => handleLadingList(values)} className='w-[50%] !bg-fuchsia-700 !text-white'>
                                    <Typography className='py-1'>
                                        <Add />افزودن
                                    </Typography>
                                </Button>
                            </div>
                            <FormikInput multiline minRows={3} name="description" label="توضیحات" />
                            <div className='mt-8 mx-auto'>
                                <MuiTable onDoubleClick={() => { }} headClassName="bg-[#272862] !text-center" headCellTextColor="!text-white" data={ladingList} columns={lastCargoList} />
                            </div>
                            <div className='mt-8'>
                                <Button onClick={() => onSubmit(values)} className='!bg-green-500 !text-white'>
                                    <Typography className='py-1'>ثبت مجوز</Typography>
                                </Button>
                            </div>
                        </form>
                    }}
                </Formik>
            </TransitionsModal>
        </>
    )
}

export default LadingLicenceEdit