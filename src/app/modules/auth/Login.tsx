import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import Backdrop from "../../../_cloner/components/Backdrop";
import { toAbsoulteUrl } from "../../../_cloner/helpers/AssetsHelper";
import PositionedSnackbar from "../../../_cloner/components/Snackbar";
import Captcha from "./components/Captcha";
import { useGetCaptcha, useLoginUser } from "./core/_hooks";

const Login = () => {
  // Api
  const { mutate, data, isLoading } = useLoginUser();
  const { data: captcha, refetch } = useGetCaptcha()
  // States
  const [isError, setIsError] = useState<boolean>(false);
  const [snackeOpen, setSnackeOpen] = useState<boolean>(false);


  const initialValues = {
    userName: "clonerops",
    password: "aBo217767345@",
    captchaCode: ""
  };



  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const userData = {
        userName: values.userName,
        password: values.password,
        captchaCode: values.captchaCode,
        captchaKey: captcha?.data?.key
      };
      try {
        mutate(userData, {
          onSuccess: (loginData) => {
            if (loginData.succeeded) {
              localStorage.setItem("auth", JSON.stringify(loginData?.data));
              Cookies.set("token", `${loginData?.data?.jwToken}`);
              window.location.reload();
              setSnackeOpen(true)
            } else {
              refetch()
              setSnackeOpen(true)
            }
          }
        });
      } catch (error) {
        setStatus("اطلاعات ورود نادرست می باشد");
        setSubmitting(false);
      }
    },
  }); return (
    <>
      {snackeOpen && (
        <PositionedSnackbar
          open={snackeOpen}
          setState={setSnackeOpen}
          title={
            data?.data?.Message ||
            data?.message 
          }
        />
      )}
      {isLoading && <Backdrop loading={isLoading} />}
      <Box component="div" className="md:grid md:grid-cols-2 h-screen">
        <Box
          component="div"
          className="flex h-screen flex-col justify-center items-center"
        >
          <Box
            component="div"
            className="md:absolute md:top-10 md:right-24 ml-44"
          >
          </Box>
          <Box component="div" className="relative flex flex-row">
            <Box
              component="img"
              src={toAbsoulteUrl("/media/logos/folladlogo.png")}
              width={100}
            />
          </Box>
          <Typography variant="h2" className="font-poppins_bold text-center text-2xl text-thirty pt-8 pb-4">
            {"خوش آمدید"}
          </Typography>
          <Typography className="font-poppins_medium text-md text-gray-500">
            {"نام کاربری و کلمه عبور خود را وارد نمایید"}
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center items-center w-full"
          >
            <Box component="div" className="w-[60%] md:w-[40%] mt-8 mb-4">
              <TextField
                fullWidth
                label={"نام کاربری"}
                id="userName"
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
                InputProps={{
                  className: "rounded-lg focus:border-indigo-600",
                }}
                {...formik.getFieldProps("userName")}
              />
            </Box>
            <Box component="div" className="w-[60%] md:w-[40%] my-4 mb-8">
              <TextField
                fullWidth
                label={"کلمه عبور"}
                type="password"
                id="password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  className: "rounded-lg focus:border-indigo-600",
                }}
                {...formik.getFieldProps("password")}
              />
            </Box>
            <Captcha captcha={captcha?.data?.cImage} refetch={refetch} />
            <Box component="div" className="w-[60%] md:w-[40%] my-4 mb-8">
              <TextField
                fullWidth
                label={"کد امنیتی"}
                type="captchaCode"
                id="captchaCode"
                error={
                  formik.touched.captchaCode && Boolean(formik.errors.captchaCode)
                }
                helperText={formik.touched.captchaCode && formik.errors.captchaCode}
                InputProps={{
                  className: "rounded-lg focus:border-indigo-600",
                }}
                {...formik.getFieldProps("captchaCode")}
              />
            </Box>

            <Typography className="w-[60%] md:w-[40%] cursor-pointer text-indigo-500">
              {"کلمه عبور خود را فراموش کرده ام."}
            </Typography>

            <Box component="div" className="w-[60%] md:w-[40%] my-4 mb-8">
              <Button
                fullWidth
                variant="contained"
                type="submit"
              >
                <Typography variant="h4" className="py-2">
                  {isLoading ? "درحال پردارش ..." : "ورود به حساب کاربری"}
                </Typography>
              </Button>
            </Box>
          </Box>
          <Typography className="cursor-pointer font-poppins_bold text-xs">
            @copyright-2023
          </Typography>
        </Box>
        <Box component="div" className="hidden md:block">
          <Box component="div"
            className="h-full w-full flex flex-col bg-cover"
            style={{
              backgroundImage: `url(${toAbsoulteUrl(
                "/media/logos/bg.png"
              )})`,
            }}
          >
            <Box component="div" className="flex flex-col justify-center items-center">
              {/* <img
                src={`${toAbsoulteUrl(
                  "/media/logos/folladlogo.png"
                )}`}
                // width= {300}
                // height={300}
                alt="Sepehr Logo"
                className="mx-auto"
              /> */}
              {/* <img
                src={`${toAbsoulteUrl(
                  "/media/logos/nabshi.webp"
                )}`}
                width={300}
                // height={300}
                alt="Sepehr Logo"
                className="mx-auto"
              /> */}
            </Box>
            <div className="mt-auto" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
