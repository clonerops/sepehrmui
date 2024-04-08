import { Button, IconButton, TextField, Typography } from "@mui/material";
import { toAbsoulteUrl } from "../../../_cloner/helpers/AssetsHelper";
import Captcha from "./components/Captcha";
import { Autorenew } from "@mui/icons-material";

const LoginForm = (props: any) => {
    const { formik, loading, refetch, captcha } = props;
    return (
        <>
            <div className={"mb-4 space-y-4"}>
                <img
                    src={`${toAbsoulteUrl("/media/mainlogo/2.png")}`}
                    alt="background"
                    className={"mx-auto"}
                    width={60}
                />
                <Typography
                    variant="h2"
                    className="font-poppins_bold text-center text-2xl text-thirty pt-8 pb-4"
                >
                    {"خوش آمدید"}
                </Typography>
                <Typography className="font-poppins_medium text-md text-gray-500">
                    {"نام کاربری و کلمه عبور خود را وارد نمایید"}
                </Typography>
            </div>

            <div className="w-[80%] my-4">
                <TextField
                    fullWidth
                    label={"نام کاربری"}
                    color="primary"
                    id="userName"
                    error={
                        formik.touched.userName &&
                        Boolean(formik.errors.userName)
                    }
                    helperText={
                        formik.touched.userName && formik.errors.userName
                    }
                    InputProps={{
                        className: "rounded-lg focus:border-indigo-600",
                    }}
                    {...formik.getFieldProps("userName")}
                />
            </div>
            <div className="w-[80%] my-4">
                <TextField
                    fullWidth
                    label={"کلمه عبور"}
                    color="primary"
                    type="password"
                    id="password"
                    autoComplete="off"
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                        className: "rounded-lg focus:border-indigo-600",
                    }}
                    {...formik.getFieldProps("password")}
                />
            </div>
            <div className="w-[80%] space-y-4">
                <div className='flex flex-row gap-4'>
                    <Captcha captcha={captcha?.data?.cImage} />
                    <IconButton onClick={() => refetch()}>
                        <Autorenew />
                    </IconButton>
                </div>

                <TextField
                    fullWidth
                    label={"کد امنیتی"}
                    color="primary"
                    type="captchaCode"
                    id="captchaCode"
                    error={
                        formik.touched.captchaCode &&
                        Boolean(formik.errors.captchaCode)
                    }
                    helperText={
                        formik.touched.captchaCode && formik.errors.captchaCode
                    }
                    InputProps={{
                        className: "rounded-lg focus:border-indigo-600",
                    }}
                    {...formik.getFieldProps("captchaCode")}
                />
            </div>
            <div className="w-[60%] md:w-[80%] my-4 mb-8">
                <Button
                    fullWidth
                    onClick={formik.handleSubmit}
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
        </>
        
    );
};

export default LoginForm;
