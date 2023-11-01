import { Card, Divider, Typography } from "@mui/material";

type Props = {
    children: React.ReactNode;
    cardClassName?: string;
    title?: string
};

const ReusableCard = (props: Props) => {
    const { cardClassName, title, children } = props;
    return (
        <Card className={`px-4 py-4 shadow-md !rounded-xl ${cardClassName}`}>
            {/* <Typography variant="h2" color="primary">
                {title}
            </Typography>
            <Divider /> */}
            {children}
        </Card>
    );
};

export default ReusableCard;
