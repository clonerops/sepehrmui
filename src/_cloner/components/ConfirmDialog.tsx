import { Button, Dialog, Typography } from "@mui/material";
import { DialogProps } from "@mui/material/Dialog/Dialog";

type Props = Omit<DialogProps, "children"> & {
    onConfirm?: (index?: any) => void;
    onCancel?: () => void;
    hintTitle?: string;
    confirmText?: string;
    notConfirmText?: string;
    isEdit?: boolean
};
const ConfirmDialog = (props: Props) => {
    return (
        <Dialog {...props}>
            <div className={"py-6 px-10 space-y-7"}>
                <Typography className={"leading-9 text-[16px]"}>
                    {props.hintTitle}
                </Typography>
                <div className={"flex items-center gap-x-5"}>
                    <Button
                        className={
                            `${props.isEdit ? "!bg-yellow-500" :"!bg-green-500"} !text-white !text-[14px] !py-2 !px-[30px] `
                        }
                        onClick={() => props.onConfirm && props.onConfirm()}
                    >
                        <Typography>{props.confirmText}</Typography>
                    </Button>
                    <Button
                        sx={{
                            border: "1px solid red",
                        }}
                        className={
                            "!text-red-500 !text-[14px] !py-1 !px-[30px]"
                        }
                        onClick={() => props.onCancel && props.onCancel()}
                    >
                        <Typography>{props.notConfirmText}</Typography>
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

export default ConfirmDialog;
