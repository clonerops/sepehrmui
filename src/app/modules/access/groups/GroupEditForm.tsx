import { Formik } from "formik"
import { useEffect, useState } from "react"
import { Box, Button, Typography } from "@mui/material"

import { useGetApplicationRole, usePutApplicationRoles } from "./_hooks"
import { validateAndEnqueueSnackbar } from "../../order/sales-order/functions"
import { useGetPermissions } from "../permissions/_hooks"
import { dropdownPermissions } from "../permissions/_functions"

import ReusableCard from "../../../../_cloner/components/ReusableCard"
import FormikInput from "../../../../_cloner/components/FormikInput"
import CheckboxGroup from "../../../../_cloner/components/CheckboxGroup"
import Backdrop from "../../../../_cloner/components/Backdrop"
import FuzzySearch from "../../../../_cloner/helpers/Fuse"
import { TreeView } from "@mui/x-tree-view"
import FileSystemNavigator from "../../../../_cloner/components/TreeView"

interface Item {
    description: string;
}

type Props = {
    itemData: { id: string, name: string }
}

const initialValues = {
    name: "",
    description: "",
    rolePermissions: []
}

const GroupEditForm = (props: Props) => {
    const { itemData } = props;
    const putApplicationRoles = usePutApplicationRoles();
    const detailApplicationRole = useGetApplicationRole()
    const permissions = useGetPermissions()

    const [results, setResults] = useState<Item[]>([]);

    useEffect(() => {
        setResults(permissions?.data?.data);
    }, [permissions?.data?.data]);


    useEffect(() => {
        detailApplicationRole.mutate(itemData.id)
    }, [itemData.id])

    const onSubmit = (values: any) => {
        const formData = {
            name: values.name, 
            description: values.description,
            id: values.id,
            rolePermissions: values.rolePermissions.map((item: string) => (
                {
                    permissionId: item,
                    roleId: itemData.id
                }
            ))
        }
        putApplicationRoles.mutate(formData, {
            onSuccess: (message: any) => {
                if (message.succeeded) {
                    validateAndEnqueueSnackbar("ویرایش گروه با موفقیت انجام شد", "info")
                } else {
                    validateAndEnqueueSnackbar(message?.data?.Message, "error")
                }
            },
        });
    }

    if (detailApplicationRole?.isLoading) {
        return <Backdrop loading={detailApplicationRole.isLoading} />
    }

    return (
        <>
            <Formik enableReinitialize initialValues={{
                ...initialValues,
                ...detailApplicationRole?.data?.data,
                rolePermissions: detailApplicationRole?.data?.data.rolePermissions.map((item: {permissionId: string}) => item.permissionId)
            }} onSubmit={onSubmit}>
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
                                <CheckboxGroup  options={dropdownPermissions(results)} label="" name="rolePermissions" />
                            </Box>} />
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