import * as React from "react";
import { useEffect, useState } from "react";
import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  SwipeableDrawer,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Outlet } from "react-router-dom";
import MenuItems from "./components/MenuItems";
import AppbarComponent from "./components/Appbar";
import { useMenuItems } from "./core/_hooks";
import { IMenuItem } from "./core/_models";
import { parseMenuItems } from "./helpers/parseMenuItems";
import { toAbsoulteUrl } from "../../../_cloner/helpers/assetsHelper";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      // backgroundColor: theme.palette.primary.main,
      background: `linear-gradient(180deg, #020024, #090979 0%, #000000 100%);`
    }
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper":
    {
      ...closedMixin(theme),
      background: `linear-gradient(180deg, #020024, #090979 0%, #000000 100%);`
    }
  }),
}));

const MasterLayout = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const { data } = useMenuItems();
  const [open, setOpen] = React.useState(false);
  const [menuItemsData, setMenuItemsData] = useState<IMenuItem[]>([]);

  useEffect(() => {
    setMenuItemsData(parseMenuItems(data?.data));
     // eslint-disable-next-line
  }, [data?.data]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppbarComponent
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        isMobile={isMobile}
      />
      {isMobile ? (
        <SwipeableDrawer
          onOpen={handleDrawerOpen}
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          sx={{
            '&.MuiDrawer-root .MuiDrawer-paper': { marginTop: '56px' },
          }}
        >
          <List>
            <MenuItems menuItems={menuItemsData} isOpen={open} />
          </List>
        </SwipeableDrawer>
      ) : (
        <Drawer
          variant="permanent"
          open={open}
          transitionDuration={10}
          className="app_bar !bg-gradient-to-r !from-indigo-500"
        >
          <DrawerHeader>
            <IconButton
              sx={{
                marginRight: 5,
                color: "#FFF",
              }}
              onClick={handleDrawerClose}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <Box className="md:flex md:justify-center md:items-center my-2 hidden transition">
            <img alt="sepehriranian"
              src={toAbsoulteUrl("/media/mainlogo/1.png")}
              width={open ? 60 : 30}
            />
            {/* <img alt="sepehriranian" src={toAbsoulteUrl('/media/logos/folladlogowhite.png')} width={128} height={128} /> */}
          </Box>
          <Divider color="#FFF" />
          <List>
            <MenuItems menuItems={menuItemsData} isOpen={open} />
          </List>
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#eceff3",
          // backgroundImage: `url(${toAbsoulteUrl(
          //   "/media/logos/blob-scene-haikei.svg",
          // )})`,
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MasterLayout;
