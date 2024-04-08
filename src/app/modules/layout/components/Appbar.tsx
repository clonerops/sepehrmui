import { FC } from "react";
import { styled } from "@mui/material/styles";
import { Toolbar, IconButton, Typography } from "@mui/material";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import ToolbarComponent from "../../../../_cloner/components/Toolbar";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";
import { Link } from "react-router-dom";

interface IProps {
    open?: boolean;
    isMobile?: boolean;
    handleDrawerOpen?: () => void;
}

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const AppbarComponent: FC<IProps> = ({ open, isMobile, handleDrawerOpen }) => {
    return (
        <AppBar
            position="fixed"
            open={open}
            // elevation={0.9}
            // color="secondary"
            sx={{
                boxShadow: "3px 4px 39px -14px rgba(0,0,0,0.26)",
                ...(!open && { left: "0px" }),
            }}
            className={`${isMobile && open ? "hidden !w-full" : ""
                } !bg-slate-50 app_bar`}
        >
            <Toolbar className="flex justify-between items-center">
                <div className="flex items-center">
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: "none", color: "white" }),
                        }}
                    >
                        <div className="text-black font-bold">
                            <img className="text-primary" src={toAbsoulteUrl('/media/icons/duotune/general/gen063.svg')} width={24} />
                        </div>
                    </IconButton>
                    <Link to="/dashboard" className="flex items-center">
                        <div className="mx-4 hidden md:block">
                            <img
                                src={toAbsoulteUrl("/media/mainlogo/2.png")}
                                width={30}
                            />
                        </div>
                        <Typography color="primary" variant="h3" className="">
                            بازرگانی سپهر ایرانیان
                        </Typography>
                    </Link>
                </div>
                <div className={`flex flex-row items-center absolute ${open ? "left-[0px]" : "left-[0px]"}`}>
                    <ToolbarComponent />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default AppbarComponent;
