import { Typography } from "@mui/material";

type Props = {
    params: any;
    successTitle: any;
    dangerTitle: any;
}

const ActiveText = (props: Props) => {
    const { params, successTitle, dangerTitle } = props;
    console.log(params)
        return (
            params?.value === true ? (
                <Typography
                    className="border border-green-600 text-green-600 px-4 py-1 rounded-md"
                    variant="h4"
                >
                    {successTitle}
                </Typography>
            ) : (
                <Typography
                    className="border border-red-600 text-red-600 px-4 py-1 rounded-md"
                    variant="h4"
                >
                    {dangerTitle}
                </Typography>
            )
        )
}

export default ActiveText