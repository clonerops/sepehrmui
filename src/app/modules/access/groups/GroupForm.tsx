import { Formik } from "formik"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Box, Button, Typography } from "@mui/material"

import ReusableCard from "../../../../_cloner/components/ReusableCard"
import FormikInput from "../../../../_cloner/components/FormikInput"
import CheckboxGroup from "../../../../_cloner/components/CheckboxGroup"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"

import { usePostApplicationRoles } from "./_hooks"
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions"
import { useGetPermissions } from "../permissions/_hooks"
import { dropdownPermissions } from "../permissions/_functions"
import FileSystemNavigator from "../../../../_cloner/components/TreeView"

interface Item {
    description: string;
}


const initialValues = {
    name: "",
    description: "",
    rolePermissions: []
}

const GroupForm = () => {
    const postApplicationRoles = usePostApplicationRoles();
    const permissions = useGetPermissions()

    const [results, setResults] = useState<Item[]>([]);

    useEffect(() => {
        setResults(permissions?.data?.data);
    }, [permissions?.data?.data]);


    const onSubmit = (values: any) => {
        const formData = {
            name: values.name, 
            description: values.description,
            rolePermissions: values.rolePermissions.map((item: string) => (
                {
                    permissionId: item
                }
            ))
        }
        postApplicationRoles.mutate(formData, {
            onSuccess: (message: any) => {
                if (message.succeeded) {
                    validateAndEnqueueSnackbar("گروه با موفقیت ایجاد شد", "success")
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
                    <Box component="div" className="flex flex-row gap-x-4">
                        <FormikInput name="name" label="اسم گروه" />
                        <FormikInput name="description" label="توضیحات" />
                    </Box>
                    <Box component="div" className="py-8">
                        <Typography variant="h2" color="primary">لیست مجوزها</Typography>
                    </Box>
                    <Box component="div" className="w-[50%] mb-8">
                        <FuzzySearch<Item>
                                keys={["description"]}
                                data={permissions?.data?.data || []}
                                setResults={setResults}
                                threshold={0.3}
                        />
                    </Box>
                    <FileSystemNavigator content={<Box component="div">
                        <CheckboxGroup  options={dropdownPermissions(results)} label="" name="rolePermissions" boxClassName="grid grid-cols-3 md:grid-cols-4 gap-x-4"/>
                    </Box>} />

                    {/* <Box component="div">
                        <CheckboxGroup options={dropdownPermissions(results)} label="" name="rolePermissions"  />
                    </Box> */}
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