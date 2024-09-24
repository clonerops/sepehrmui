import { Formik } from "formik"
import FormikInput from "../../../../_cloner/components/FormikInput"
import CustomButton from "../../../../_cloner/components/CustomButton"
import { useChangePasswordRequest } from "../../user/core/_hooks"
import { IChangePassword } from "../../user/core/_models"
import { EnqueueSnackbar } from "../../../../_cloner/helpers/snackebar"

const initialValues = {
    userName: "",
    newPassword: "",
    verificationCode: ""
}

const ChangePassword = () => {  
    const changePasswordTools = useChangePasswordRequest()


    const onSubmit = (values: IChangePassword) => { 
        changePasswordTools.mutate(values, {
            onSuccess: (response) => {
                if(response.succeeded) {
                    EnqueueSnackbar(response.message, "success")
                } else {
                    EnqueueSnackbar(response.data.Message, "error")
                }
            }
        })
    }

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit, values }) =>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                        <FormikInput name="verificationCode" label="کد تایید پیامک شده" />
                        <FormikInput name="userName" label="نام کاربری" />
                        <FormikInput name="newPassword" label="کلمه عبور جدید" />
                        <div className="w-full">
                            <CustomButton className="w-full !bg-green-500 hover:!bg-green-700" onClick={() => handleSubmit()} title="تغییر کلمه عبور" disabled={values.userName === "" || values.newPassword === "" || values.verificationCode === ""} />
                        </div>
                    </form>
                }
            </Formik>
        </>
    )
}

export default ChangePassword