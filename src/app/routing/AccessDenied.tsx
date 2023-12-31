import { Link } from "react-router-dom";
import { toAbsoulteUrl } from "../../_cloner/helpers/AssetsHelper";
import { Box, Typography } from "@mui/material";
import Cookies from "js-cookie";

const handleLogout = () => {
  Cookies.remove("token");
  window.location.reload();
}

const AccessDenied = () => {
  return (
    <div className={"flex flex-col items-center justify-center space-y-4"}>
      <Typography variant="h2">دسترسی غیر مجاز</Typography>
      <h3>شما دسترسی های لازم برای انجام عملیات روی صفحه مورد نظر را ندارید! لطفا با پشتیبانی تماس بگیرید</h3>
      <img
        src={toAbsoulteUrl("/media/images/access-denied.jpg")}
        alt={"access-denied-img"}
        className={"w-[400px]"}
      />

      <Box component='div' className="flex flex-row gap-x-8">
        <Box component="div">
          <Link to={"/dashboard"}>
            <button
              type={"button"}
              className={
                "rounded-[12px] bg-purple-900 !text-white leading-9 !px-5 !py-1 mt-5"
              }
            >
              برگشت به صفحه اصلی
            </button>
          </Link>
        </Box>
        <Box component="div">
            <button
              type={"button"}
              onClick={() => handleLogout()}
              className={
                "rounded-[12px] bg-indigo-900 !text-white leading-9 !px-5 !py-1 mt-5"
              }
            >
              خروج از برنامه
            </button>
        </Box>
      </Box>
    </div>
  );
};

export default AccessDenied;
