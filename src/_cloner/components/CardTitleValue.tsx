import { Box, Typography, Card } from "@mui/material"

type Props = {
    title: string,
    className?: string,
    index?: string | number,
    icon: React.ReactNode,
    value: any
}

const CardTitleValue = (props: Props) => {
    const {title, icon, value, className, index} = props;
    return (
        <Card key={index} className={`px-4 py-4 shadow-md !rounded-xl ${className}`}>
            <Box key={index} component="div" className="flex justify-between items-center space-y-4">
                <Typography variant="body1">{title}</Typography>
                {icon}
            </Box>
            <Typography variant="h2">{value}</Typography>
        </Card>
    )
}

export default CardTitleValue