import { Card } from "@mui/material";

type Props = {
    children: React.ReactNode;
    cardClassName?: string;
    index?: string | number
};

const ReusableCard = (props: Props) => {
    const { cardClassName, index, children } = props;
    return (
        <Card key={index} className={`px-4 py-4 shadow-md !rounded-xl ${cardClassName}`} style={{flex: 1}}>
            {children}
        </Card>
    );
};

export default ReusableCard;
