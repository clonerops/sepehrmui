import React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

interface IProps {
  open: boolean;
  title: string;
  setState: any;
}

const PositionedSnackbar: React.FC<IProps> = ({ open, title, setState }) => {
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={title}
        autoHideDuration={3000}
        key={"top" + "center"}
        onClose={() => setState(false)}
      />
    </Box>
  );
};

export default PositionedSnackbar;
