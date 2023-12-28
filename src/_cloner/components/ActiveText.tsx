import { Typography } from "@mui/material";

type Props = {
    params: any;
    successTitle: any;
    dangerTitle: any;
}

const ActiveText = (props: Props) => {
    const { params, successTitle, dangerTitle } = props;
        return (
            params?.value === true ? (
                <Typography
                    className=" text-green-600 px-4 py-1 rounded-md"
                    variant="h4"
                >
                    {successTitle}
                </Typography>
            ) : (
                <Typography
                    className=" text-red-600 px-4 py-1 rounded-md"
                    variant="h4"
                >
                    {dangerTitle}
                </Typography>
            )
        )
}

export default ActiveText