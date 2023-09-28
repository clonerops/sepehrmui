import { FC } from "react";
import { styled } from "@mui/material/styles";
import { Box, Toolbar, Typography, IconButton } from "@mui/material";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { toAbsoulteUrl } from "../../../../_cloner/helpers/AssetsHelper";
import ToolbarComponent from "../../../../_cloner/components/Toolbar";

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
            sx={{
                // ...(!open ? { left: "0px" } : { left: "65px" }),
                ...(!open && { left: "0px" }),
            }}
            className={`${
                isMobile && open ? "hidden" : ""
            } bg-white shadow-md app_bar`}
        >
            <Toolbar>
                <IconButton
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: "none", color: "black" }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Box
                    component="div"
                    className="flex justify-between items-center w-full"
                >
                    <Box component="div" className="flex">
                        <Box
                            component="img"
                            src={toAbsoulteUrl("/media/logos/vlogo.png")}
                            width={68}
                            height={38}
                        />
                    </Box>
                    <Box
                        component="div"
                        className={`flex flex-row items-center absolute ${
                            open ? "right-[0px]" : "right-[65px]"
                        }`}
                    >
                        <ToolbarComponent />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppbarComponent;
