import React from "react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mui/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import theme from "./_cloner/theme/theme";

import "./_cloner/assets/css/index.css"

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <StyledEngineProvider injectFirst>
                <StylesProvider jss={jss}>
                    <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                            <App />
                            <ReactQueryDevtools initialIsOpen={false} />
                        </ThemeProvider>
                    </CacheProvider>
                </StylesProvider>
            </StyledEngineProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
