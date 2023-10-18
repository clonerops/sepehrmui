import { Typography } from "@mui/material";

const ActiveText = (params: any) => {
  return (
    params.params.value === true ? (
        <Typography
            className="border border-green-600 text-green-600 px-4 py-1 rounded-md"
            variant="h4"
        >
            فعال
        </Typography>
    ) : (
        <Typography
            className="border border-red-600 text-red-600 px-4 py-1 rounded-md"
            variant="h4"
        >
            غیرفعال
        </Typography>
    )
  )
}

export default ActiveText