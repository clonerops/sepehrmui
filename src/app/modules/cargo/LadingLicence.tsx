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

interface ILadingList {
    productName: string
    productId: string
    proximate: string
}

const LadingLicence = () => {
    const { id } = useParams()
    const { data, isLoading } = useRetrieveOrder(id)

    let formikRef: any = useRef()

    const [ladingList, setLadingList] = useState<ILadingList[]>([])

    const [open, setOpen] = useState<boolean>(false)
    const lastCargoList: any = [
        { id: 1, header: "کالا", accessor: "productName" },
        { id: 2, header: "مقدار بارگیری", accessor: "proximate" },
        { id: 3, header: "حذف", accessor: "", render: (params: any) => {
            return <Button>
                <Delete className='!text-red-500' />
            </Button>
        } },
    ]

    const handleLadingList = (values:ILadingList) => {
        const newList = {
            productName: data?.data?.details.find((i: any) => i.productId === values.productId).productName,
            productId: values.productId,
            proximate: values.proximate
        }
        setLadingList(prev => [...prev, newList])
    }

    return (
        <>
            <ReusableCard>
                <OrderDetail isLading ladingStateModal={setOpen} />
            </ReusableCard>
            
            <TransitionsModal
                open={open}
                isClose={() => setOpen(false)}
                title="ثبت مجوز بارگیری"
                width="80%"
                description="چنانچه مشکلی بابت ثبت مجوز بارگیری دارید، لطفا با پشتیبانی تماس بگیرید."
            >
                <Formik innerRef={formikRef} initialValues={{
                    productName: "",
                    productId: "",
                    proximate: ""
                }} onSubmit={() => { }}>
                    {({values}) => {
                        return <Form className='mt-8'>
                            <Box component="div" className='flex items-center justify-center gap-x-4 '>
                                <FormikSelect name='productId' label={"کالای سفارش"} options={dropdownProductLading(data?.data?.details)} />
                                <FormikInput name='proximate' label={"مقدار بارگیری"} />
                                <Button onClick={() => handleLadingList(values)} className='w-[50%] !bg-fuchsia-700 !text-white'>
                                    <Typography className='py-1'>افزون به لیست بارگیری ها</Typography>
                                </Button>
                            </Box>
                            <Box component="div" className='mt-8 w-[50%] mx-auto'>
                                <MuiTable onDoubleClick={() => { }} headClassName="bg-[#272862] !text-center"  headCellTextColor="!text-white" data={ladingList} columns={lastCargoList} />
                            </Box>
                        </Form>
                    }}
                </Formik>
            </TransitionsModal>
        </>
    )
}

export default LadingLicence