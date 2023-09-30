import { Button, Typography } from "@mui/material"

type Props = {
    title: string;
    onClick: any
}


const CustomButton = (props: Props) => {
    const { title, onClick } = props
    return (
        <Button onClick={onClick} variant="contained" color="secondary">
            <Typography variant="h3" className="px-8 py-1">
                {title}
            </Typography>
        </Button>
    )
}

export default CustomButton