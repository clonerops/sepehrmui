import { Box, Button, TextField, Typography } from "@mui/material";
import { toAbsoulteUrl } from "../../../_helpers/helpers/AssetsHelper";
import { useTranslation } from "react-i18next";
import MultiLanguages from "../../../_helpers/components/MultiLanguages";
import { useFormik } from "formik";
import { loginValidation } from "./validation/validation";
import { useLogin } from "./core/_hooks";
import Cookies from "js-cookie";
import { useState } from "react";
import PositionedSnackbar from "../../../_helpers/components/Snackbar";
import Backdrop from "../../../_helpers/components/Backdrop";

const Login = () => {
  // Api
  const { mutate, data, isLoading } = useLogin();
  // States
  const [isError, setIsError] = useState<boolean>(false);
  const [snackeOpen, setSnackeOpen] = useState<boolean>(false);

  const { t } = useTranslation();

  const initialValues = {
    userName: "spqcadmin",
    password: "123Pa$$word!",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidation,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        mutate(values, {
          onSuccess: (loginData) => {
            if (loginData.succeeded) {
              localStorage.setItem("auth", JSON.stringify(loginData?.data));
              Cookies.set("token", `${loginData?.data?.jwToken}`);
              window.location.reload();
            } else {
              setIsError(true);
              setSnackeOpen(true);
            }
          },
        });
      } catch (error) {
        setStatus("اطلاعات ورود نادرست می باشد");
        setSubmitting(false);
        setSnackeOpen(false);
      }
    },
  });
  return (
    <>
      {isLoading && <Backdrop loading={isLoading} />}
      <Box component="div" className="relative h-screen w-full">
        <Box component="div" className="hidden md:block">
          <Box
            className="absolute right-0 bottom-0"
            component="img"
            src={toAbsoulteUrl("/media/logos/0002-backwhite.png")}
            width={450}
          />
          <Box
            className="absolute left-0"
            component="img"
            src={toAbsoulteUrl("/media/flag/flagvenir.png")}
            width={300}
          />
        </Box>
        <Box
          component="div"
          className="flex h-screen flex-col justify-center items-center"
        >
          <Box
            component="div"
            className="md:absolute md:top-10 md:right-24 ml-44"
          >
            <MultiLanguages />
          </Box>
          <Box component="div" className="relative flex flex-row">
            <Box
              component="img"
              src={toAbsoulteUrl("/media/logos/saipa-logo.png")}
            />
            <Box
              component="img"
              src={toAbsoulteUrl("/media/logos/vlogo.png")}
              width={100}
            />
          </Box>
          <Typography className="font-poppins_bold text-center text-2xl text-thirty pt-8 pb-4">
            {t("welcome_back")}
          </Typography>
          <Typography className="font-poppins_medium text-md text-gray-500">
            {t("Enter_your_credentials_to_continue")}
          </Typography>
          {isError && (
            <PositionedSnackbar
              open={snackeOpen}
              setState={setSnackeOpen}
              title={data?.response?.data?.Message}
            />
          )}
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center items-center w-full"
          >
            <Box component="div" className="w-[60%] md:w-[40%] mt-8 mb-4">
              <TextField
                fullWidth
                label={t("userName")}
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
                label={t("Password")}
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
            <Typography className="w-[60%] md:w-[40%] cursor-pointer text-indigo-500">
              {t("ForgetPassword")}
            </Typography>
            <Box component="div" className="w-[60%] md:w-[40%] my-4 mb-8">
              <Button
                fullWidth
                type="submit"
                className="normal-case font-poppins_medium bg-indigo-500 text-white rounded-lg py-4"
              >
                {isLoading ? "in process ..." : t("SignIn")}
              </Button>
            </Box>
          </Box>
          <Typography className="cursor-pointer font-poppins_bold text-xs">
            @copyright-2023
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Login;
