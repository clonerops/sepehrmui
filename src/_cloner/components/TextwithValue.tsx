import { Card, Typography } from "@mui/material";
import React from "react";

type Props = {
    title: string
    value: any
}

const TextwithValue = (props: Props) => {
    const { title, value } = props;
    return (
        <Card component="div" className="p-4 flex gap-x-8">
            <Typography variant="h3" color="secondary">
                {title}
            </Typography>
            <Typography variant="h3">{value}</Typography>
        </Card>
    );
};

export default TextwithValue;
