import { enqueueSnackbar } from "notistack";

export const EnqueueSnackbar = (message: string, type: "warning" | "error" | "success" | "info") => {
    enqueueSnackbar(message, {
        variant: type,
        anchorOrigin: { vertical: "top", horizontal: "center" }
    });
};