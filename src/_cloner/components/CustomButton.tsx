import { Button, Typography } from "@mui/material"
import { FC, memo } from "react";
import { ICustomButtonProps } from "../helpers/_models";


const CustomButton:FC<ICustomButtonProps> = ({title, className, onClick, disabled, color, isLoading, fullWidth, ...rest}) => {

    return (
        <Button className={className} type='submit' onClick={onClick} variant="contained" color={color} disabled={disabled} fullWidth={fullWidth} {...rest}>
            {isLoading ? (
                <Typography variant="h3" className="px-8 py-2">
                    درحال پردازش ...
                </Typography>
            ) : (
                <Typography variant="h3" className="px-8 py-2">
                    {title}
                </Typography>
            )}
        </Button>
    )
}

export default memo(CustomButton)