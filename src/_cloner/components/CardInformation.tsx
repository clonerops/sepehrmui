import { FC, useEffect, useState } from "react";
import { counterValue } from "../helpers/counterValue";
import ReusableCard from "./ReusableCard";
import { Typography } from "@mui/material";
import { MonetizationOn } from "@mui/icons-material";
import { separateAmountWithCommas } from "../helpers/SeprateAmount";

interface ICardInformation {
    title: string
    cardClassName: string
    value: any
}


const CardInformation: FC<ICardInformation> = ({ title, value, cardClassName }) => {
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        if(value) counterValue(value, setCounter)
             // eslint-disable-next-line
    }, [value]);
    
    return (
        <ReusableCard cardClassName={cardClassName}>
            <div className="flex justify-between items-center space-y-4">
                <Typography variant="body1" className="text-white">{title}</Typography>
                <MonetizationOn className="!text-white" />
            </div>
            <Typography variant="h2" data-target={isNaN(value) ? 0 : value} className="text-white">
            {separateAmountWithCommas(counter)}
            </Typography>
        </ReusableCard>

    )
}

export default CardInformation