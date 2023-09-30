import { Box, Typography } from "@mui/material"

type Props = {
    title: string;
    value: any;
    insideValue?: string;
    valueClassName?: string
}

const TextValue = (props: Props) => {
    const { title, value, insideValue, valueClassName} = props;
    return (
        <Box component="div" className="flex flex-col md:flex-row justify-center items-center">
            <Typography variant="h2" className="flex items-center text-gray-400"> {title}:</Typography>
            <Typography variant="h1" className={`px-4 ${valueClassName}`}>{value} {insideValue}</Typography>
        </Box>

    )
}

export default TextValue