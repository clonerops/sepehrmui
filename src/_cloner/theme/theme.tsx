import { createTheme } from "@mui/material";
const rootElement = document.getElementById("root");

const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: "#d90824",
        },
        secondary: {
            main: "#313866",
        },
    },
    typography: {
        h1: {
            fontFamily: "Yekan_bold",
            fontSize: "24px",
        },
        h2: {
            fontFamily: "Yekan_bold",
            fontSize: "20px",
        },
        h3: {
            fontFamily: "Yekan_bold",
            fontSize: "16px",
        },
        h4: {
            fontFamily: "Yekan_bold",
            fontSize: "14px",
        },
        h5: {
            fontFamily: "Yekan_bold",
            fontSize: "12px",
        },
        h6: {
            fontFamily: "Yekan_bold",
            fontSize: "10px",
        },
        body1: {
            fontFamily: "Yekan_reqular",
            fontSize: "14px",
        },
        body2: {
            fontFamily: "Yekan_reqular",
            fontSize: "12px",
        },
        subtitle1: {
            fontFamily: "Yekan_light",
            fontSize: "10px",
        },
        subtitle2: {
            fontFamily: "Yekan_light",
            fontSize: "8px",
        },
    },
    components: {
        MuiPopover: {
            defaultProps: {
                container: rootElement,
            },
        },
        MuiPopper: {
            defaultProps: {
                container: rootElement,
            },
        },
        MuiModal: {
            defaultProps: {
                container: rootElement,
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#000",
                    color: "white",
                },
            },
        },
    },
});

export default theme;
