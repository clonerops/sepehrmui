import { toAbsoulteUrl } from "../../../_cloner/helpers/assetsHelper";
import LoginForm from "./LoginForm";
import { enqueueSnackbar } from "notistack";
import Cookies from "js-cookie";
import { useGetCaptcha, useLoginUser } from "./core/_hooks";
import { useFormik } from "formik";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Backdrop from "../../../_cloner/components/Backdrop";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import { useState } from "react";
import ChangePassword from "./components/ChangePassword";
import { useForgetPasswordRequest } from "../user/core/_hooks";

const initialValues = {
  // userName: "clonerops",
  // password: "aBo217767345@",
  userName: "",
  password: "",
  captchaCode: ""
};

const Login = () => {
  const { mutate, isLoading } = useLoginUser();
  const { data: captcha, refetch } = useGetCaptcha()
  const forgetPasswordHandler = useForgetPasswordRequest()

  const navigate = useNavigate()

  const [isOpenChangePassword, setIsOpenChangePassword] = useState<boolean>(false)

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
              enqueueSnackbar(loginData.message, {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "center" }
              })
              localStorage.setItem("auth", JSON.stringify(loginData?.data));
              Cookies.set("token", `${loginData?.data?.accessToken}`);
              navigate('/dashboard')
              window.location.reload();
            } else {
              refetch()
              enqueueSnackbar(loginData.data.Message, {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "center" }
              })
            }
          }
        });
      } catch (error) {
        setStatus("اطلاعات ورود نادرست می باشد");
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {isLoading && <Backdrop loading={isLoading} />}
      {forgetPasswordHandler.isLoading && <Backdrop loading={forgetPasswordHandler.isLoading} />}
      <div className="h-screen  lg:block hidden "
        style={{
          backgroundImage: `url(${toAbsoulteUrl("/media/logos/login-bg.png")})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "left top ",
        }}
      >
        <div className={"md:w-[70%] xl:w-[50%] mr-auto h-full flex items-center justify-center"}>
          <Card className="flex justify-center items-center flex-col border-[1px] box-shadow shadow-sm rounded-[10px] shadow-[#4E68C2] w-[80%] shrink-0 md:max-w-[500px] min-w-[500px] py-8 h-fit">
            <LoginForm formik={formik} loading={isLoading} refetch={refetch} captcha={captcha} isOpenChangePassword={isOpenChangePassword} setIsOpenChangePassword={setIsOpenChangePassword} forgetPasswordHandler={forgetPasswordHandler} />
          </Card>
        </div>
      </div>

      <div
        className={"lg:hidden h-screen"}
        style={{
          backgroundImage: `url(${toAbsoulteUrl("/media/logos/mobile-login-bg.png")})`,
          backgroundRepeat: "repeat-y",
          backgroundSize: "cover",
          backgroundPosition: "center center ",
        }}
      >
        <div className={"w-full h-full mr-auto flex items-center justify-center"}>
          <div className="bg-white flex justify-center items-center flex-col border-[1px] box-shadow shadow-sm rounded-[10px] hadow-[#4E68C2] w-[80%] shrink-0  py-8 h-fit">
            <LoginForm formik={formik} loading={isLoading} refetch={refetch} captcha={captcha} isOpenChangePassword={isOpenChangePassword} setIsOpenChangePassword={setIsOpenChangePassword} forgetPasswordHandler={forgetPasswordHandler} />
          </div>
        </div>
      </div>

      <TransitionsModal width="30%" title="تغییر کلمه عبور" open={isOpenChangePassword} isClose={() => setIsOpenChangePassword(false)}>
        <ChangePassword setIsOpenChangePassword={setIsOpenChangePassword} />
      </TransitionsModal>

    </>
  );
};

export default Login;
