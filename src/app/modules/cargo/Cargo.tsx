import { Link } from "react-router-dom";
import { useRetrievesNotSendedOrder } from "./core/_hooks";
import { Box, Button, Card, Typography } from "@mui/material";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import { useEffect, useState } from "react";
import { ICargo } from "./core/_models";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import { cargoColumns } from "./helpers/columns";
import RecommendIcon from '@mui/icons-material/Recommend';
const Cargo = () => {
    const { data: cargoNotSended } = useRetrievesNotSendedOrder();

    const [results, setResults] = useState<ICargo[]>([]);

    useEffect(() => {
        setResults(cargoNotSended);
    }, [cargoNotSended]);

    const renderAction = (item: any) => {
        return (
            <Link to={`/dashboard/cargo/${item?.row?.id}`}>
                <Typography variant="h3">
                    <RecommendIcon color="secondary" />
                </Typography>
            </Link>
        );
    };

    return (
        <ReusableCard>
            <Typography color="primary" variant="h1" className="pb-2">
                سفارشات اعلام بار نشده
            </Typography>
            <Box component="div" className="w-auto md:w-[40%]">
                <FuzzySearch
                    keys={[
                        "orderCode",
                        "registerDate",
                        "customerFirstName",
                        "customerLastName",
                        "totalAmount",
                        "description",
                    ]}
                    data={cargoNotSended}
                    threshold={0.5}
                    setResults={setResults}
                />
            </Box>
            <MuiDataGrid
                columns={cargoColumns(renderAction)}
                rows={results}
                data={cargoNotSended}
            />
        </ReusableCard>
    );
};

export default Cargo;
