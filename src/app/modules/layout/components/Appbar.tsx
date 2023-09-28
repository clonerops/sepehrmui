import { FC } from "react";
import { styled } from "@mui/material/styles";
import { Box, Toolbar, IconButton } from "@mui/material";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
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
            color="secondary"
            sx={{
                ...(!open && { left: "0px" }),
            }}
            className={`${isMobile && open ? "hidden" : ""
                } bg-white shadow-md app_bar`}
        >
            <Toolbar className="flex justify-between items-center">
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
                    className={`flex flex-row items-center absolute ${open ? "left-[0px]" : "left-[65px]"
                        }`}
                >
                    <ToolbarComponent />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppbarComponent;
