import { Formik } from "formik"
import ReusableCard from "../../../../_cloner/components/ReusableCard"
import FormikInput from "../../../../_cloner/components/FormikInput"
import { Box, Button, Typography } from "@mui/material"
import CheckboxGroup from "../../../../_cloner/components/CheckboxGroup"
import { Link } from "react-router-dom"
import { usePostApplicationRoles } from "./_hooks"
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions"
import { useGetPermissions } from "../permissions/_hooks"
import { dropdownPermissions } from "../permissions/_functions"

const initialValues = {
    name: "",
    description: "",
    permissions: []
}

const GroupEditForm = () => {
    const postApplicationRoles = usePostApplicationRoles();
    const permissions = useGetPermissions()


    const onSubmit = (values: any) => {
        postApplicationRoles.mutate(values, {
            onSuccess: (message: any) => {
                if (message.succeeded) {
                    validateAndEnqueueSnackbar("Group is successfully created", "success")
                } else {
                    validateAndEnqueueSnackbar(message?.data?.Message, "error")
                }
            },
        });
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
                        <Typography variant="h2" color="primary">لیست مجوزها</Typography>
                        {/* <Typography variant="body1" color="primary">انتخاب دسترسی ها برای این گروه</Typography> */}
                    </Box>
                    <Box component="div">
                        <CheckboxGroup options={dropdownPermissions(permissions?.data?.data)} label="" name="permissions"  />
                    </Box>
                    <Box component="div" className="flex flex-row justify-end items-center gap-x-4">
                        <Button onClick={() => handleSubmit()} className="!bg-yellow-500 !text-white">
                            <Typography>ویرایش گروه</Typography>
                        </Button>
                    </Box>
                </ReusableCard>
                </>
            }}
        </Formik>
    </>
  )
}

export default GroupEditForm