import { Box, Typography } from "@mui/material"
import ReusableCard from "./ReusableCard"

type Props = {
    title: string,
    icon: React.ReactNode,
    value: any
}

const CardTitleValue = (props: Props) => {
    const {title, icon, value} = props;
    return (
        <ReusableCard>
            <Box component="div" className="flex justify-between items-center space-y-4">
                <Typography variant="body1">{title}</Typography>
                {icon}
            </Box>
            <Typography variant="h2">{value}</Typography>
        </ReusableCard>
    )
}

export default CardTitleValue