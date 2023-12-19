import { Formik } from "formik"
import ReusableCard from "../../../_cloner/components/ReusableCard"
import FormikInput from "../../../_cloner/components/FormikInput"
import { Box, Button, Typography } from "@mui/material"
import CustomButton from "../../../_cloner/components/CustomButton"
import FormikCheckbox from "../../../_cloner/components/FormikCheckbox"
import CheckboxGroup from "../../../_cloner/components/CheckboxGroup"
import { Link } from "react-router-dom"

const initialValues = {
    groupName: "",
    permissions: []
}

const options = [
    {label: "TransAdmsCo", value: "JHHDDHGDHGHGEGEJ"},
    {label: "TransCo", value: "JHHDJKDJKDDHGDHGHGEGEJ"},
    {label: "TransAdms", value: "JHHDDHGDPODIPDHGHGEGEJ"},
    {label: "TransAdms", value: "JHHDDHGDPODIPDHGHGEGEJ"},
    {label: "TransAdms", value: "JHHDDHGDPODIPDHGHGEGEJ"},
]

const GroupForm = () => {

    const onSubmit = (values: any) => {
        console.log(values)
    }

    return (
    <>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => {
                return <>
                <ReusableCard>
                    <Box component="div" className="w-[50%]">
                        <FormikInput name="groupName" label="اسم گروه" />
                    </Box>
                    <Box component="div" className="py-8">
                        <Typography variant="h2" color="primary">دسترسی ها</Typography>
                    </Box>
                    <Box component="div">
                        <CheckboxGroup options={options} label="" name="permissions"  />
                    </Box>
                    <Box component="div" className="flex flex-row justify-end items-center gap-x-4">
                        <Button onClick={() => handleSubmit()} className="!bg-green-500 !text-white">
                            <Typography>ثبت</Typography>
                        </Button>
                        <Link to="/dashboard/roles/groups">
                            <Button variant="outlined" className="!border-2 !border-red-500 !text-red-500">
                                <Typography>انصراف و بازگشت</Typography>
                            </Button>
                        </Link>
                    </Box>
                </ReusableCard>
                </>
            }}
        </Formik>
    </>
  )
}

export default GroupForm