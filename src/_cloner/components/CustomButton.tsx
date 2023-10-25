import { Button, Typography } from "@mui/material"

type Props = {
    title: string;
    onClick: any
    disabled?: boolean
    color?: any
}


const CustomButton = (props: Props) => {
    const { title, onClick, disabled, color } = props
    return (
        <Button onClick={onClick} variant="contained" color={color} disabled={disabled}>
            <Typography variant="h3" className="px-8 py-1">
                {title}
            </Typography>
        </Button>
    )
}

export default CustomButton