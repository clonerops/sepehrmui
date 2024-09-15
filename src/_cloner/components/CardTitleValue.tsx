import { Typography, Card } from "@mui/material"
import { FC } from "react";
import { ICardTitleValueProps } from "../helpers/_models";


const CardTitleValue:FC<ICardTitleValueProps> = ({title, icon, value, className, index}) => {

    return (
        <Card key={index} className={`px-4 py-4 shadow-md !rounded-xl ${className}`}>
            <div key={index} className="flex justify-between items-center space-y-4">
                <Typography variant="body1">{title}</Typography>
                {icon}
            </div>
            <Typography variant="h2">{value}</Typography>
        </Card>
    )
}

export default CardTitleValue