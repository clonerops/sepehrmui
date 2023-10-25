import { Card, Typography } from "@mui/material";
import React from "react";
import ReusableCard from "./ReusableCard";

type Props = {
    title: string
    value: any
}

const TextwithValue = (props: Props) => {
    const { title, value } = props;
    return (
        <ReusableCard>
            <Typography variant="h3" color="secondary">
                {title}
            </Typography>
            <Typography variant="h3">{value}</Typography>
        </ReusableCard>
    );
};

export default TextwithValue;
