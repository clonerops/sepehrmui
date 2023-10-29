import { useState } from "react";
import { Avatar, Box, Button, Popover, TextField, Typography, Modal } from "@mui/material";
import { toAbsoulteUrl } from "../helpers/AssetsHelper";
import Cookies from "js-cookie";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
    LockReset,
    VerifiedUser,
    NotificationAddOutlined,
    Accessibility,
    Directions,
    Assessment,
    Announcement,
    Notifications
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import React from "react";
import ProductPriceLanding from "../../app/modules/landing/ProductPriceLanding";
import TransitionsModal from "./ReusableModal";

const ToolbarComponent = () => {
    const navigate = useNavigate();
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
    const onCreateUser = () => {
        navigate("dashboard/user/create");
    };

    const toolbarIcons = [
        { id: 1, component: <Assessment /> },
        { id: 2, component: <Announcement /> },
        { id: 3, component: <Notifications /> },
    ]

    return (
        <>
            <Box component="div" className="flex justify-between items-center">
                <Box component="div" className="flex items-center">
                    {/* {toolbarIcons.map((item) =>
                        <Box component="div" className="text-[#2E4374] hover:text-[#fcc615] hover:bg-[#fcf4d6] hover:rounded-full hover:p-2 transition cursor-pointer px-2 hidden md:block">
                            {item.component}
                        </Box>
                    )} */}
                    <Box onClick={() => setIsPriceOpen(true)} component="div" className="text-[#2E4374] hover:text-[#fcc615] hover:bg-[#fcf4d6] hover:rounded-full hover:p-2 transition cursor-pointer px-2 hidden md:block">
                        <Assessment />
                    </Box>
                    <Box component="div" className="text-[#2E4374] hover:text-[#fcc615] hover:bg-[#fcf4d6] hover:rounded-full hover:p-2 transition cursor-pointer px-2 hidden md:block">
                        <Announcement />
                    </Box>
                    <Box component="div" className="text-[#2E4374] hover:text-[#fcc615] hover:bg-[#fcf4d6] hover:rounded-full hover:p-2 transition cursor-pointer px-2 hidden md:block">
                        <Notifications />
                    </Box>
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
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Box
                                    onClick={onCreateUser}
                                    component="div"
                                    className="flex flex-row text-gray-700 cursor-pointer gap-x-4 hover:bg-gray-200 leading-9 p-4"
                                >
                                    <VerifiedUser />
                                    <Typography>ایجاد کاربر جدید</Typography>
                                </Box>
                                <Box
                                    onClick={onChangePassword}
                                    component="div"
                                    className="flex flex-row text-gray-700 cursor-pointer gap-x-4 hover:bg-gray-200 leading-9 p-4"
                                >
                                    <LockReset />
                                    <Typography>تغییر کلمه عبور</Typography>
                                </Box>
                                <Box
                                    onClick={logout}
                                    component="div"
                                    className="flex flex-row text-gray-700 cursor-pointer gap-x-4 hover:bg-gray-200 leading-9 p-4"
                                >
                                    <ExitToAppIcon />
                                    <Typography>خروج</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Popover>{" "}
                </Box>
            </Box>

            <TransitionsModal width="60%" title="قیمت محصولات" open={isPriceOpen} isClose={() => setIsPriceOpen(false)}>
                <ProductPriceLanding />
            </TransitionsModal>
        </>
    );
};

export default ToolbarComponent;
