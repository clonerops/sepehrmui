import { Formik } from "formik"
import { Button, Typography } from "@mui/material"

import FormikInput from "../../../_cloner/components/FormikInput"

import { usePostApplicationRoles } from "./_hooks"
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar"
import Backdrop from "../../../_cloner/components/Backdrop"

interface IProps {
    refetch: any
    setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = {
    name: "",
    description: "",
    rolePermissions: []
}

const GroupForm = (props: IProps) => {
    const postApplicationRoles = usePostApplicationRoles();

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
                    EnqueueSnackbar("گروه با موفقیت ایجاد شد", "success")
                    props.refetch()
                    props.setIsCreateOpen(false)
                } else {
                    EnqueueSnackbar(message?.data?.Message, "error")
                }
            },
        });
    }

    return (
        <>
            {postApplicationRoles.isLoading && <Backdrop loading={postApplicationRoles.isLoading} />}
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit }) => {
                    return <>
                        <div className="flex flex-col gap-4 mt-4">
                            <FormikInput name="name" label="اسم گروه" />
                            <FormikInput minRows={3} multiline name="description" label="توضیحات" />
                            <div className="flex justify-end items-end">
                                <Button onClick={() => handleSubmit()} className="!bg-yellow-500 !text-white w-[200px]">
                                    <Typography>ثبت گروه</Typography>
                                </Button>
                            </div>

                        </div>
                    </>
                }}
            </Formik>
        </>
    )
}

export default GroupForm