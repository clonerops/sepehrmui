import { IconButton, Typography } from "@mui/material"
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid"
import ReusableCard from "../../../../_cloner/components/ReusableCard"
import { useGetTransferRemitancesByMutation } from "../core/_hooks"
import { billlandingColumns, entranceColumns } from "./_columns"
import ButtonComponent from "../../../../_cloner/components/ButtonComponent"
import { CarCrash, DateRange, DateRangeRounded, Edit, HomeMaxRounded, HomeMiniOutlined, NumbersOutlined, Person, PhoneRounded, Place, PriceChange, Search, TypeSpecimen, TypeSpecimenTwoTone, Visibility } from "@mui/icons-material"
import Backdrop from "../../../../_cloner/components/Backdrop"
import { Link } from "react-router-dom"
import { Formik } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { useEffect } from "react"
import CardTitleValue from "../../../../_cloner/components/CardTitleValue"

const EntranceLading = () => {
    const transferList = useGetTransferRemitancesByMutation()
    useEffect(() => {
        const filter = {}
        transferList.mutate(filter)
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



    const renderAction = (params: any) => {
        return <div className="flex gap-x-4">
            <Link to={`/dashboard/billlandingList/${params.row.id}`}>
                <IconButton size="small" color="primary">
                    <Visibility />
                </IconButton>
            </Link>
            <Link to={`/dashboard/billlandingEdit/${params.row.id}`}>
                <IconButton size="small" color="secondary">
                    <Edit />
                </IconButton>
            </Link>
        </div>
    }
    const handleFilter = (values: any) => {
        let formData = {
            id: values.id ? values.id : "",
        };
        transferList.mutate(formData);
    }
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

        </>
    )
}

export default EntranceLading