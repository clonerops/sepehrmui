import { Typography } from "@mui/material";
import ReusableCard from "./ReusableCard";
import React, { FC } from "react";

interface IProps {
    icon: React.ReactNode
    title: string
    value: any,
    iconClassName: string
}

const CardWithIcons:FC<IProps> = ({icon, title, value, iconClassName}) => {
    return (
        <>
            <ReusableCard cardClassName="w-full">
                <div className="flex justify-between items-center">
                    <Typography variant="h4" color="primary">
                        {title}
                    </Typography>
                    <div
                        className={`flex justify-center items-center ${iconClassName} w-[50px] h-[50px] rounded-lg`}
                    >
                        {icon}
                    </div>
                </div>
                <Typography variant="h2">{value}</Typography>
            </ReusableCard>
        </>
    );
};

export default CardWithIcons;
