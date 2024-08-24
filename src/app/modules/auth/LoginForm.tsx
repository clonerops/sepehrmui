import { Button, IconButton, TextField, Typography } from "@mui/material";
import { toAbsoulteUrl } from "../../../_cloner/helpers/assetsHelper";
import Captcha from "./components/Captcha";
import { Autorenew } from "@mui/icons-material";
import { FormikProps } from "formik";
import { UseQueryResult } from "@tanstack/react-query";
import { FC } from "react";

interface IProps {
    formik: any;
    loading: boolean
    refetch: () => void 
    captcha: UseQueryResult<any, unknown>
}

const LoginForm:FC<IProps> = ({ formik, loading, refetch, captcha }) => {
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

  return (
    <form
      className="!w-full flex flex-col justify-center items-center"
      onSubmit={formik.handleSubmit}
    >
      <div className="mb-4 space-y-4 text-center">
        <img
          src={toAbsoulteUrl("/media/mainlogo/2.png")}
          alt="background"
          className="mx-auto"
          width={60}
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

      <div className="w-[60%] md:w-[80%] my-4 mb-8">
        <Button
          fullWidth
          variant="contained"
          type="submit"
          color="secondary"
          disabled={
            !formik.values.captchaCode ||
            !formik.values.password ||
            !formik.values.userName
          }
        >
          <Typography variant="h4" className="py-2">
            {loading ? "درحال پردارش ..." : "ورود به حساب کاربری"}
          </Typography>
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
