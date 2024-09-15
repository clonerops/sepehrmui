import { Typography } from "@mui/material";
import { FC } from "react";
import { IActiveTextProps } from "../helpers/_models";

const ActiveText:FC<IActiveTextProps> = ({params, successTitle, dangerTitle}) => {
        return (
            params?.value === true ? (
                <Typography className=" text-green-600 px-4 py-1 rounded-md" variant="h4">
                    {successTitle}
                </Typography>
            ) : (
                <Typography className=" text-red-600 px-4 py-1 rounded-md" variant="h4">
                    {dangerTitle}
                </Typography>
            )
        )
}

export default ActiveText