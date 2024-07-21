import { useState } from "react";
import { Avatar, Button, Popover, Typography } from "@mui/material";
import { toAbsoulteUrl } from "../helpers/AssetsHelper";
import Cookies from "js-cookie";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
    LockReset,
    Assessment,
    Announcement,
    Settings,
    Person
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import ProductPriceLanding from "../../app/modules/landing/ProductPriceLanding";
import TransitionsModal from "./ReusableModal";
import { useUserInfo } from "../../app/modules/user/core/_hooks";

const ToolbarComponent = () => {
    const navigate = useNavigate();
    
    const {data: userInfo} = useUserInfo()
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [isPriceOpen, setIsPriceOpen] = useState<boolean>(false)
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openLanguages = Boolean(anchorEl);
    const id = openLanguages ? "" : undefined;

    const logout = () => {
        Cookies.remove("token");
        window.location.reload();
    };

    const onChangePassword = () => {
        navigate("dashboard/change-pass");
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    {/* {toolbarIcons.map((item) =>
                        <div className="text-[#2E4374] hover:text-[#fcc615] hover:bg-[#fcf4d6] hover:rounded-full hover:p-2 transition cursor-pointer px-2 hidden md:block">
                            {item.component}
                        </div>
                    )} */}
                    <div onClick={() => setIsPriceOpen(true)}  className="text-[#2E4374] hover:text-[#fcc615] hover:bg-[#fcf4d6] hover:rounded-full hover:p-2 transition cursor-pointer px-2 hidden md:block">
                        <Assessment />
                    </div>
                    <div className="text-[#2E4374] hover:text-[#fcc615] hover:bg-[#fcf4d6] hover:rounded-full hover:p-2 transition cursor-pointer px-2 hidden md:block">
                        <Announcement />
                    </div>
                    <div className="text-[#2E4374] hover:text-[#fcc615] hover:bg-[#fcf4d6] hover:rounded-full hover:p-2 transition cursor-pointer px-2 hidden md:block">
                        <Settings />
                    </div>
                    <div className="border border-dashed px-4 py-1 border-black hidden md:block"> 
                        <Typography className="text-black font-bold">{userInfo?.data?.userName}</Typography>
                    </div>
                    <Button
                        onClick={handleClick}
                        aria-describedby={id}
                        color="secondary"
                    >
                        <Avatar
                            alt="avatar"
                            src={toAbsoulteUrl("/media/logos/300-1.jpg")}
                        />
                    </Button>
                    <Popover
                        id={id}
                        open={openLanguages}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <div
                                    className="flex flex-row text-gray-700 cursor-pointer gap-x-4 hover:bg-gray-200 leading-9 p-4"
                                >
                                    <Person />
                                    <Typography>کاربر: {userInfo?.data?.userName}</Typography>
                                </div>
                                <div
                                    onClick={onChangePassword}
                                    className="flex flex-row text-gray-700 cursor-pointer gap-x-4 hover:bg-gray-200 leading-9 p-4"
                                >
                                    <LockReset />
                                    <Typography>تغییر کلمه عبور</Typography>
                                </div>
                                <div
                                    onClick={logout}
                                    className="flex flex-row text-gray-700 cursor-pointer gap-x-4 hover:bg-gray-200 leading-9 p-4"
                                >
                                    <ExitToAppIcon />
                                    <Typography>خروج</Typography>
                                </div>
                            </div>
                        </div>
                    </Popover>{" "}
                </div>
            </div>

            <TransitionsModal  width="50%" title="قیمت محصولات" open={isPriceOpen} isClose={() => setIsPriceOpen(false)}>
                <ProductPriceLanding />
            </TransitionsModal>
        </>
    );
};

export default ToolbarComponent;
