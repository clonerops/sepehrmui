import { useState } from "react";
import { Avatar, Box, Button, Popover, Typography } from "@mui/material";
import { toAbsoulteUrl } from "../helpers/AssetsHelper";
import Cookies from "js-cookie";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { LockReset } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ToolbarComponent = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
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
      <Button
        onClick={handleClick}
        aria-describedby={id}
        className="text-white"
      >
        <Avatar alt="avatar" src={toAbsoulteUrl("/media/logos/300-1.jpg")} />
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
              onClick={logout}
              component="div"
              className="flex flex-row text-gray-700 cursor-pointer gap-x-4 hover:bg-gray-200 leading-9 p-4"
            >
              <ExitToAppIcon />
              <Typography>خروج</Typography>
            </Box>
            <Box
              onClick={onChangePassword}
              component="div"
              className="flex flex-row text-gray-700 cursor-pointer gap-x-4 hover:bg-gray-200 leading-9 p-4"
            >
              <LockReset />
              <Typography>تغییر کلمه عبور</Typography>
            </Box>
          </Box>
        </Box>
      </Popover>{" "}
    </>
  );
};

export default ToolbarComponent;
