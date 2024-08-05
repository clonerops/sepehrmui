import { toAbsoulteUrl } from "../../../_cloner/helpers/assetsHelper";
import LoginForm from "./LoginForm";
import { enqueueSnackbar } from "notistack";
import Cookies from "js-cookie";
import { useGetCaptcha, useLoginUser } from "./core/_hooks";
import { useFormik } from "formik";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import { Card } from "@mui/material";

const initialValues = {
  userName: "",
  // password: "aBo217767345@",
  password: "",
  captchaCode: ""
};

const Login = () => {
  const { mutate, isLoading } = useLoginUser();
  const { data: captcha, refetch } = useGetCaptcha()

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
                anchorOrigin: {vertical: "top", horizontal: "center"}
              })
              localStorage.setItem("auth", JSON.stringify(loginData?.data));
              Cookies.set("token", `${loginData?.data?.accessToken}`);
              window.location.reload();
            } else {
              refetch()
              enqueueSnackbar(loginData.data.Message, {
                variant: "error",
                anchorOrigin: {vertical: "top", horizontal: "center"}
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
      <div
        className="h-screen  lg:block hidden "
        style={{
          backgroundImage: `url(${toAbsoulteUrl("/media/logos/login-bg.png")})`,
          // backgroundImage: `url(${toAbsoulteUrl("/1.jpg")})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "left top ",
        }}
      >
        <div
          className={
            "md:w-[70%] xl:w-[50%] mr-auto h-full flex items-center justify-center"
          }
        >
          <Card
            className="flex justify-center items-center flex-col border-[1px] box-shadow shadow-sm rounded-[10px] shadow-[#4E68C2] w-[80%] shrink-0 md:max-w-[500px] min-w-[500px] py-8 h-fit "
          >
            <LoginForm formik={formik} loading={isLoading} refetch={refetch} captcha={captcha} />
          </Card>
        </div>
      </div>

      <div
        className={"lg:hidden h-screen"}
        style={{
          backgroundImage: `url(${toAbsoulteUrl(
            "/media/logos/mobile-login-bg.png"
          )})`,
          backgroundRepeat: "repeat-y",
          backgroundSize: "cover",
          backgroundPosition: "center center ",
        }}
      >
        <div
          className={"w-full h-full mr-auto flex items-center justify-center"}
        >
          <div
            className="bg-white flex justify-center items-center flex-col border-[1px] box-shadow shadow-sm rounded-[10px] hadow-[#4E68C2] w-[80%] shrink-0  py-8 h-fit"
          >
            <LoginForm formik={formik} loading={isLoading} refetch={refetch} captcha={captcha} />
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;
