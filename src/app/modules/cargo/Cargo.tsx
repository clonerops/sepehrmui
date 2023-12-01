import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import {Recommend} from '@mui/icons-material';

import { useRetrievesNotSendedOrder } from "./core/_hooks";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import { ICargo } from "./core/_models";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import { cargoColumns } from "./helpers/columns";
import Backdrop from "../../../_cloner/components/Backdrop";

const Cargo = () => {
    const { data: cargoNotSended, isLoading } = useRetrievesNotSendedOrder();

    const [results, setResults] = useState<ICargo[]>([]);

    useEffect(() => {
        setResults(cargoNotSended);
    }, [cargoNotSended]);

    const renderAction = (item: any) => {
        return (
            <Link to={`/dashboard/cargoList/${item?.row?.id}`}>
                <Typography variant="h3">
                    <Recommend color="secondary" />
                </Typography>
            </Link>
        );
    };

    if(isLoading) {
        return <Backdrop loading={isLoading} />
    }

    return (
        <ReusableCard>
            <Box component="div" className="w-auto md:w-[40%] mb-4">
                <FuzzySearch
                    keys={[
                        "orderCode",
                        "registerDate",
                        "customerFirstName",
                        "customerLastName",
                        "fareAmount",
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
