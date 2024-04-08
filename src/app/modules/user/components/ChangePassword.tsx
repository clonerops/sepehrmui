import { Container, Typography, Button, TextField } from "@mui/material";

const ChangePassword = () => {
    return (
        <>
            <Container>
                <Typography variant="h2" color="primary">
                    تغییر کلمه عبور
                </Typography>
                <Container className="my-8">
                    <div className="mt-4">
                        <TextField
                            fullWidth
                            color="primary"
                            id="standard-basic"
                            label={"کد فعالسازی"}
                            variant="outlined"
                        />
                    </div>
                    <div className="mt-4">
                        <TextField
                            fullWidth
                            color="primary"
                            id="standard-basic"
                            label={"کلمه عبور"}
                            variant="outlined"
                        />
                    </div>
                    <div className="mt-4">
                        <TextField
                            fullWidth
                            color="primary"
                            id="standard-basic"
                            label={"تکرار کلمه عبور "}
                            variant="outlined"
                        />
                    </div>
                    <Button color="primary" className="mt-4 text-black font-bold font-boldpx-8 py-2">
                        {"تغییر کلمه عبور"}
                    </Button>
                </Container>
            </Container>
        </>
    );
};

export default ChangePassword;
