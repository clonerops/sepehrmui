import { IconButton, TextField, Typography } from "@mui/material";
import { toAbsoulteUrl } from "../../../_cloner/helpers/assetsHelper";
import Captcha from "./components/Captcha";
import { Autorenew } from "@mui/icons-material";
import { UseQueryResult } from "@tanstack/react-query";
import { FC } from "react";
import CustomButton from "../../../_cloner/components/CustomButton";
import { useForgetPasswordRequest } from "../user/core/_hooks";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";

interface IProps {
    formik: any;
    loading: boolean
    refetch: () => void 
    captcha: UseQueryResult<any, unknown>
    isOpenChangePassword: boolean
    setIsOpenChangePassword: React.Dispatch<React.SetStateAction<boolean>>
  }

const LoginForm:FC<IProps> = ({ formik, loading, refetch, captcha, isOpenChangePassword, setIsOpenChangePassword }) => {
  const forgetPasswordHandler = useForgetPasswordRequest()

  const renderTextField = (id: string, label: string, type = "text", additionalProps = {}) => (
    
    <TextField
      fullWidth
      id={id}
      label={label}
      type={type}
      color="primary"
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && formik.errors[id]}
      InputProps={{
        className: "rounded-lg focus:border-indigo-600",
      }}
      {...formik.getFieldProps(id)}
      {...additionalProps}
    />
  );

  const handleForgetPasswordRequest = () => {
    if(formik.values.userName === "" || formik.values.userName === null) {
      EnqueueSnackbar("برای ارسال فراموشی کلمه عبور لطفا نام کاربری خود را وارد کنید", "warning")
    } else {
      setIsOpenChangePassword(true)
      forgetPasswordHandler.mutate({userName: formik.values.userName}, {
        onSuccess: (response) => {
          if(response.succeeded) {
            EnqueueSnackbar(response.message, "success")
          } else {
            EnqueueSnackbar(response.data.Message, "error")
          }
        }
      })
    }
  }

  return (
    <form
      className="!w-full flex flex-col justify-center items-center"
      onSubmit={formik.handleSubmit}
    >
      <div className="mb-4 space-y-4 text-center">
        <img
          src={toAbsoulteUrl("/media/mainlogo/logo-no-background.png")}
          alt="background"
          className="mx-auto"
          width={140}
        />
        <Typography
          variant="h2"
          className="font-poppins_bold text-2xl text-thirty pt-8 pb-4"
        >
          {"خوش آمدید"}
        </Typography>
        <Typography className="font-poppins_medium text-md text-gray-500">
          {"نام کاربری و کلمه عبور خود را وارد نمایید"}
        </Typography>
      </div>

      <div className="w-[80%] my-4">{renderTextField("userName", "نام کاربری")}</div>
      <div className="w-[80%] my-4">{renderTextField("password", "کلمه عبور", "password", { autoComplete: "off" })}</div>
      
      <div className="w-[80%] space-y-4">
        <div className="flex gap-4">
          <Captcha captcha={captcha?.data?.cImage} />
          <IconButton onClick={refetch}>
            <Autorenew />
          </IconButton>
        </div>
        <div className="my-4">{renderTextField("captchaCode", "کد امنیتی")}</div>
      </div>
      <div className="mt-4 cursor-pointer" onClick={handleForgetPasswordRequest}>
        <Typography variant="h4" className="text-green-600">رمز عبور خود را فراموش کرده ام!</Typography>
      </div>
      <div className="w-[60%] md:w-[80%] my-4 mb-8">
        <CustomButton
          fullWidth
          disabled={
            !formik.values.captchaCode ||
            !formik.values.password ||
            !formik.values.userName
          }
          color={"secondary"}
          title="ورود به حساب کاربری"
        />
      </div>
    </form>
  );
};

export default LoginForm;
