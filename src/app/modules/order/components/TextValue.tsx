import { Box, Typography } from "@mui/material"
import React from "react";

type Props = {
    title: string;
    value: any;
    insideValue?: string;
    valueClassName?: string;
    titleClassName?: string;
}

const TextValue = (props: Props) => {
    const { title, value, insideValue, valueClassName, titleClassName} = props;
    return (
        <Box component="div" className="flex flex-col md:flex-row justify-center items-center">
            <Typography variant="h3" className={`flex items-center ${titleClassName}`}> {title}:</Typography>
            <Typography variant="h2" className={`px-4 ${valueClassName}`}>{value} {insideValue}</Typography>
        </Box>

    )
}

export default TextValue