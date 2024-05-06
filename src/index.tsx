// eslint-disable-next-line
import React from "react";
import theme from "./_cloner/theme/theme";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mui/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";

import "./_cloner/assets/css/index.css";
import 'react-medium-image-zoom/dist/styles.css'

import { AppRoutes } from "./app/routing/AppRoutes";

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin] || [],
    
} as any);



const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <SnackbarProvider maxSnack={3}>
            <QueryClientProvider client={queryClient}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <StylesProvider jss={jss}>
                            <CacheProvider value={cacheRtl}>
                                <AppRoutes />
                                <ReactQueryDevtools initialIsOpen={false} />
                            </CacheProvider>
                        </StylesProvider>
                    </ThemeProvider>
                </StyledEngineProvider>
            </QueryClientProvider>
        </SnackbarProvider>
    </React.StrictMode>
);
