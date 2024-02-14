import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
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
                <Box className='flex flex-row gap-4'>
                    <Captcha captcha={captcha?.data?.cImage} />
                    <IconButton onClick={() => refetch()}>
                        <Autorenew />
                    </IconButton>
                </Box>

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
            <Box component="div" className="w-[60%] md:w-[80%] my-4 mb-8">
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
            </Box>
        </>
        
        // <Box
        //     component="div"
        //     className="flex h-screen flex-col justify-center items-center"
        // >
        //     <Box
        //         component="div"
        //         className="md:absolute md:top-10 md:right-24 ml-44"
        //     ></Box>
        //     <Box component="div" className="relative flex flex-row">
        //         <Box
        //             component="img"
        //             src={toAbsoulteUrl("/media/mainlogo/2.png")}
        //             width={60}
        //         />
        //     </Box>
        //     <Typography
        //         variant="h2"
        //         className="font-poppins_bold text-center text-2xl text-thirty pt-8 pb-4"
        //     >
        //         {"خوش آمدید"}
        //     </Typography>
        //     <Typography className="font-poppins_medium text-md text-gray-500">
        //         {"نام کاربری و کلمه عبور خود را وارد نمایید"}
        //     </Typography>
        //     <Box
        //         component="form"
        //         onSubmit={formik?.handleSubmit}
        //         className="flex flex-col justify-center items-center w-full"
        //     >
        //         <Box component="div" className="w-[60%] md:w-[40%] mt-8 mb-4">
        //             <TextField
        //                 fullWidth
        //                 label={"نام کاربری"}
        //                 color="primary"
        //                 id="userName"
        //                 error={
        //                     formik.touched.userName &&
        //                     Boolean(formik.errors.userName)
        //                 }
        //                 helperText={
        //                     formik.touched.userName && formik.errors.userName
        //                 }
        //                 InputProps={{
        //                     className: "rounded-lg focus:border-indigo-600",
        //                 }}
        //                 {...formik.getFieldProps("userName")}
        //             />
        //         </Box>
        //         <Box component="div" className="w-[60%] md:w-[40%] my-4 mb-8">
        //             <TextField
        //                 fullWidth
        //                 label={"کلمه عبور"}
        //                 color="primary"
        //                 type="password"
        //                 id="password"
        //                 autoComplete="off"
        //                 error={
        //                     formik.touched.password &&
        //                     Boolean(formik.errors.password)
        //                 }
        //                 helperText={
        //                     formik.touched.password && formik.errors.password
        //                 }
        //                 InputProps={{
        //                     className: "rounded-lg focus:border-indigo-600",
        //                 }}
        //                 {...formik.getFieldProps("password")}
        //             />
        //         </Box>
        //         <Box component="div" className="flex flex-row gap-x-4">
        //             <Captcha captcha={captcha?.data?.cImage} />
        //             <IconButton onClick={() => refetch()}>
        //                 <Autorenew />
        //             </IconButton>
        //         </Box>
        //         <Box component="div" className="w-[60%] md:w-[40%] my-4 mb-8">
        //             <TextField
        //                 fullWidth
        //                 label={"کد امنیتی"}
        //                 color="primary"
        //                 type="captchaCode"
        //                 id="captchaCode"
        //                 error={
        //                     formik.touched.captchaCode &&
        //                     Boolean(formik.errors.captchaCode)
        //                 }
        //                 helperText={
        //                     formik.touched.captchaCode &&
        //                     formik.errors.captchaCode
        //                 }
        //                 InputProps={{
        //                     className: "rounded-lg focus:border-indigo-600",
        //                 }}
        //                 {...formik.getFieldProps("captchaCode")}
        //             />
        //         </Box>

        //         <Typography className="w-[60%] md:w-[40%] cursor-pointer text-indigo-500">
        //             {"کلمه عبور خود را فراموش کرده ام."}
        //         </Typography>

        //         <Box component="div" className="w-[60%] md:w-[40%] my-4 mb-8">
        //             <Button
        //                 fullWidth
        //                 variant="contained"
        //                 type="submit"
        //                 color="secondary"
        //                 disabled={
        //                     !formik.values.captchaCode ||
        //                     !formik.values.password ||
        //                     !formik.values.userName
        //                 }
        //             >
        //                 <Typography variant="h4" className="py-2">
        //                     {loading
        //                         ? "درحال پردارش ..."
        //                         : "ورود به حساب کاربری"}
        //                 </Typography>
        //             </Button>
        //         </Box>
        //     </Box>
        //     <Typography className="cursor-pointer font-poppins_bold text-xs">
        //         @copyright-2023
        //     </Typography>
        // </Box>
    );
};

export default LoginForm;
