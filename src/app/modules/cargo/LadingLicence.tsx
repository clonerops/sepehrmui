import { useState, useRef } from 'react'
import ReusableCard from '../../../_cloner/components/ReusableCard'
import FormikInput from '../../../_cloner/components/FormikInput'
import FormikSelect from '../../../_cloner/components/FormikSelect'
import { dropdownCustomer } from '../generic/_functions'
import { useGetCustomers } from '../customer/core/_hooks'
import { Box, Button, Typography } from '@mui/material'
import { Delete, Search } from '@mui/icons-material'
import OrderDetail from '../order/OrderDetail'
import TransitionsModal from '../../../_cloner/components/ReusableModal'
import { useParams } from 'react-router-dom'
import { useRetrieveOrder } from '../order/core/_hooks'
import { Formik, Form } from 'formik'
import { dropdownProductLading } from './helpers/dropdowns'
import MuiTable from '../../../_cloner/components/MuiTable'
import { usePostLadingLicence } from './core/_hooks'
import FormikMaskInput from '../../../_cloner/components/FormikMaskInput'

interface ILadingList {
    description?: string
    orderDetailId?: string
    ladingAmount?: string
}

const initialValues : ILadingList = {
    description: "",
    orderDetailId: "",
    ladingAmount: ""
}

const LadingLicence = () => {
    const { id } = useParams()
    const { data, isLoading } = useRetrieveOrder(id)
    const postLadingLicence = usePostLadingLicence()

    let formikRef: any = useRef()

    const [ladingList, setLadingList] = useState<ILadingList[]>([])

    const [open, setOpen] = useState<boolean>(false)
    const lastCargoList: any = [
        { id: 1, header: "کالا", flex:1, accessor: "productName" },
        { id: 2, header: "مقدار بارگیری", flex:1, accessor: "ladingAmount" },
        { id: 3, header: "حذف", flex:1, accessor: "", render: (params: any) => {
            return <Button>
                <Delete className='!text-red-500' />
            </Button>
        } },
    ]

    const handleLadingList = (values:ILadingList) => {
        const newList = {
            // productName: data?.data?.details.find((i: any) => i.orderDetailId === values.orderDetailId).productName,
            // orderDetailId: values.orderDetailId,
            ladingAmount: values.ladingAmount
        }
        setLadingList(prev => [...prev, newList])
    }

    const onSubmit = async (values: any) => {
        console.log(values)
    }   

    return (
        <>
            <OrderDetail isLading ladingStateModal={setOpen} />            
            <TransitionsModal
                open={open}
                isClose={() => setOpen(false)}
                title="ثبت مجوز بارگیری"
                width="50%"
                description="چنانچه مشکلی بابت ثبت مجوز بارگیری دارید، لطفا با پشتیبانی تماس بگیرید."
            >
                <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={onSubmit}>
                    {({values}) => {
                        return <Form className='mt-8'>
                            <Box component="div" className='flex items-center justify-center gap-x-4 mb-4'>
                                <FormikSelect name='orderDetailId' label={"کالای سفارش"} options={dropdownProductLading(data?.data?.details)} />
                                <FormikMaskInput thousandsSeparator=',' mask={Number} name='ladingAmount' label={"مقدار بارگیری"} />
                                <Button onClick={() => handleLadingList(values)} className='w-[50%] !bg-fuchsia-700 !text-white'>
                                    <Typography className='py-1'>افزون به لیست بارگیری ها</Typography>
                                </Button>
                            </Box>
                            <FormikInput multiline minRows={3} name="description" label="توضیحات" />
                            <Box component="div" className='mt-8 mx-auto'>
                                <MuiTable onDoubleClick={() => { }} headClassName="bg-[#272862] !text-center"  headCellTextColor="!text-white" data={ladingList} columns={lastCargoList} />
                            </Box>
                            <Box component="div" className='mt-8'>
                                <Button onClick={() => onSubmit(values)} className='!bg-green-500 !text-white'>
                                    <Typography className='py-1'>ثبت مجوز</Typography>
                                </Button>
                            </Box>
                        </Form>
                    }}
                </Formik>
            </TransitionsModal>
        </>
    )
}

export default LadingLicence