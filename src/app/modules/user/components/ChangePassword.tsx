import { Container, Typography, Button, TextField, Box } from "@mui/material";
import React from "react";

const ChangePassword = () => {
    return (
        <>
            <Container>
                <Typography variant="h2" color="primary">
                    تغییر کلمه عبور
                </Typography>
                <Container className="my-8">
                    <Box component="div" className="mt-4">
                        <TextField
                            fullWidth
                            id="standard-basic"
                            label={"کد فعالسازی"}
                            variant="outlined"
                        />
                    </Box>
                    <Box component="div" className="mt-4">
                        <TextField
                            fullWidth
                            id="standard-basic"
                            label={"کلمه عبور"}
                            variant="outlined"
                        />
                    </Box>
                    <Box component="div" className="mt-4">
                        <TextField
                            fullWidth
                            id="standard-basic"
                            label={"تکرار کلمه عبور "}
                            variant="outlined"
                        />
                    </Box>
                    <Button color="secondary" className="mt-4 text-black font-bold font-boldpx-8 py-2">
                        {"تغییر کلمه عبور"}
                    </Button>
                </Container>
            </Container>
        </>
    );
};

export default ChangePassword;
