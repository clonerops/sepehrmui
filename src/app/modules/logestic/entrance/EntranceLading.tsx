import { Button, IconButton, Typography } from "@mui/material"
import ReusableCard from "../../../../_cloner/components/ReusableCard"
import { useGetTransferRemitancesByMutation } from "../core/_hooks"
import ButtonComponent from "../../../../_cloner/components/ButtonComponent"
import { CarCrash, DateRange, DateRangeRounded, Delete, Edit, HomeMaxRounded, HomeMiniOutlined, NumbersOutlined, Person, PhoneRounded, Place, PriceChange, Search, TypeSpecimen, TypeSpecimenTwoTone, Visibility } from "@mui/icons-material"
import Backdrop from "../../../../_cloner/components/Backdrop"
import { Link } from "react-router-dom"
import { Formik } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { useEffect, useState } from "react"
import CardTitleValue from "../../../../_cloner/components/CardTitleValue"
import TransitionsModal from "../../../../_cloner/components/ReusableModal"
import MuiTable from "../../../../_cloner/components/MuiTable"

const EntranceLading = () => {
    const transferList = useGetTransferRemitancesByMutation()
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        const filter = {}
        transferList.mutate(filter)
         // eslint-disable-next-line
    }, [])

    const orderAndAmountInfo = [
        { id: 1, title: "شماره حواله", icon: <NumbersOutlined color="secondary" />, value: "" },
        { id: 2, title: "تاریخ حواله", icon: <DateRangeRounded color="secondary" />, value: "" },
        { id: 3, title: "نوع انتقال", icon: <TypeSpecimenTwoTone color="secondary" />, value: "" },
        { id: 4, title: "انبار مبدا", icon: <HomeMaxRounded color="secondary" />, value: "" },
        { id: 5, title: "انبار مقصد", icon: <HomeMiniOutlined color="secondary" />, value: "" },
        { id: 6, title: "نام و نام خانوادگی راننده", icon: <Person color="secondary" />, value: "" },
        { id: 7, title: "شماره همراه راننده", icon: <PhoneRounded color="secondary" />, value: "" },
        { id: 8, title: "شماره پلاک خودرو", icon: <Place color="secondary" />, value: "" },
        { id: 9, title: "نوع خودرو", icon: <TypeSpecimen color="secondary" />, value: "" },
        { id: 10, title: "مبلغ کرایه", icon: <PriceChange color="secondary" />, value: "" },
        { id: 11, title: "تاریخ تحویل", icon: <DateRange color="secondary" />, value: "" },
        { id: 12, title: "باربری", icon: <CarCrash color="secondary" />, value: "" },
    ]

    const entranceLadingList: any = [
        { id: 1, header: "کالا", flex: 1, accessor: "orderDetailName" },
        { id: 2, header: "مقدار بارگیری", flex: 1, accessor: "ladingAmount" },
        {
            id: 3, header: "حذف", flex: 1, accessor: "", render: (params: any) => {
                return <Button onClick={() => {}}>
                    <Delete className='!text-red-500' />
                </Button>
            }
        },
    ]



    // const renderAction = (params: any) => {
    //     return <div className="flex gap-x-4">
    //         <Link to={`/dashboard/billlandingList/${params.row.id}`}>
    //             <IconButton size="small" color="primary">
    //                 <Visibility />
    //             </IconButton>
    //         </Link>
    //         <Link to={`/dashboard/billlandingEdit/${params.row.id}`}>
    //             <IconButton size="small" color="secondary">
    //                 <Edit />
    //             </IconButton>
    //         </Link>
    //     </div>
    // }

    const handleFilter = (values: any) => {
        let formData = {
            id: values.id ? values.id : "",
        };
        transferList.mutate(formData);
    }

    const onSubmit = () => {}


    return (
        <>
            {transferList.isLoading && <Backdrop loading={transferList.isLoading} />}
            <ReusableCard>
                <Formik initialValues={{
                    id: "",
                }} onSubmit={() => { }}>
                    {({ values }) => {
                        return (
                            <form>
                                <div
                                    className="flex gap-4 w-[50%] mb-4"
                                >
                                    <FormikInput
                                        name="id"
                                        label="شماره مجوز ورود"
                                    />
                                    <ButtonComponent onClick={() => handleFilter(values)}>
                                        <Search className="text-white" />
                                        <Typography className="px-2 text-white">جستجو</Typography>
                                    </ButtonComponent>
                                </div>
                            </form>
                        );
                    }}
                </Formik>


            </ReusableCard>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0 my-8">
                {orderAndAmountInfo.map((item: {
                    title: string,
                    icon: React.ReactNode,
                    value: any
                }, index) => {
                    return <CardTitleValue key={index} title={item.title} value={item.value} icon={item.icon} />
                })}
            </div>
            <div className='mt-4'>
                <Button onClick={() => setOpen(true)} variant='contained' color='primary'>
                    <Typography>ثبت مجوز بارگیری</Typography>
                </Button>
            </div>

            <TransitionsModal
                open={open}
                isClose={() => setOpen(false)}
                title="ثبت مجوز بارگیری"
                width="50%"
                description="چنانچه مشکلی بابت ثبت مجوز بارگیری دارید، لطفا با پشتیبانی تماس بگیرید."
            >
                <Formik initialValues={{}} onSubmit={onSubmit}>
                    {({ }) => {
                        return <form className='mt-8'>
                            <div className='my-8 mx-auto'>
                                <MuiTable onDoubleClick={() => { }} headClassName="bg-[#272862] !text-center" headCellTextColor="!text-white" data={[]} columns={entranceLadingList} />
                            </div>
                            <FormikInput multiline minRows={3} name="description" label="توضیحات" />
                            <div className='mt-8'>
                                <Button onClick={() => onSubmit()} className='!bg-green-500 !text-white'>
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

export default EntranceLading