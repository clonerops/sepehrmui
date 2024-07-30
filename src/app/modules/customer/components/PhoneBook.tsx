import { FC } from "react"
import { IPhoneBook } from "../core/_models"
import { Typography } from "@mui/material"
import { Add, Delete } from "@mui/icons-material"
import MuiTable from "../../../../_cloner/components/MuiTable"
import FormikPhoneBookType from "../../../../_cloner/components/FormikPhoneBookType"
import { Formik, FormikHelpers } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { EnqueueSnackbar } from "../../../../_cloner/helpers/snackebar"

interface IProps {
    phoneBooks: IPhoneBook[]
    setPhoneBooks: React.Dispatch<React.SetStateAction<IPhoneBook[]>>
}

const PhoneBook: FC<IProps> = ({ phoneBooks, setPhoneBooks }) => {

    const handleAdd = (values: IPhoneBook, { resetForm }: FormikHelpers<IPhoneBook>) => {
        const findPhoneBook = phoneBooks.find((item: {phoneNumber: string}) => item.phoneNumber === values.phoneNumber)
        if(findPhoneBook) {
            EnqueueSnackbar("شماره تماس قبلا به لیست اضافه شده است", "warning")
        } else{
            setPhoneBooks([...phoneBooks, {
                phoneNumber: values.phoneNumber,
                phoneNumberType: values.phoneNumberType
            }])
            resetForm()
        }
    }

    const handleDelete = (params: any) => {
        const filteredPhoneBook = phoneBooks
            .filter((item: { phoneNumber: string }) => item.phoneNumber !== params.phoneNumber)
        setPhoneBooks(filteredPhoneBook)
    }

    const phoneBookColumn = [
        { id: 1, header: "شماره تماس", accessor: "phoneNumber" },
        { id: 2, header: "نوع شماره تماس", accessor: "phoneNumberType", render: (params: { phoneNumberType: {label: string} }) => <Typography>{params.phoneNumberType.label}</Typography> },
        {
            id: 3, header: "حذف", accessor: "delete", render: (params: any) =>
                <span onClick={() => handleDelete(params)}> <Delete className="text-red-500" /> </span>
        },
    ]

    return (
        <div className="w-full">
            <Formik initialValues={{ phoneNumber: "", phoneNumberType: { label: "تلفن همراه", value: 1 } }} onSubmit={handleAdd}>
                {({ handleSubmit }) => <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 items-center gap-x-4">
                    <FormikInput name="phoneNumber" label="شما  ره تماس" />
                    <FormikPhoneBookType name="phoneNumberType" label="نوع شماره تماس" />
                    <div onClick={() => handleSubmit()}  color="primary" className="flex justify-center items-center lg:!w-[78px] lg:!h-[34px] !bg-cyan-700 lg:!rounded-full w-full cursor-pointer" >
                        <Add className="text-white" />
                    </div>
                </form>}    
            </Formik>

            <div className="w-full mt-2">
                <MuiTable columns={phoneBookColumn} data={phoneBooks} onDoubleClick={() => {}} />
            </div>
        </div>
    )
}

export default PhoneBook