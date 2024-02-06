import { Button, Typography, CircularProgress } from "@mui/material"
import { memo } from "react";

type Props = {
    title: string;
    onClick: any
    disabled?: boolean
    color?: any
    isLoading?: boolean
}

console.log("Button Submit is rendered")

const CustomButton = (props: Props) => {
    const { title, onClick, disabled, color, isLoading } = props
    return (
        <Button onClick={onClick} variant="contained" color={color} disabled={disabled}>
            {isLoading ? (
                <Typography variant="h3" className="px-8 py-1">
                    درحال پردازش ...
                </Typography>
            ) : (
                <Typography variant="h3" className="px-8 py-1">
                    {title}
                </Typography>
            )}
        </Button>
    )
}

export default memo(CustomButton)