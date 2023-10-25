import { Link } from "react-router-dom";
import { useRetrievesNotSendedOrder } from "./core/_hooks";
import { columns } from "./helpers/notSendedColumn";
import { Box, Button, Card, Typography } from "@mui/material";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import { useEffect, useState } from "react";
import { ICargo } from "./core/_models";
import React from "react";
import ReusableCard from "../../../_cloner/components/ReusableCard";

const Cargo = () => {
    const { data: cargoNotSended } = useRetrievesNotSendedOrder();

    const [results, setResults] = useState<ICargo[]>([]);

    useEffect(() => {
        setResults(cargoNotSended);
    }, [cargoNotSended]);

    const renderAction = (item: any) => {
        return (
            <Link
                to={`/dashboard/cargo/confirm/${item?.row?.id}`}
                state={{ isConfirmed: false }}
            >
                <Button variant="contained" color="secondary">
                    <Typography>اعلام بار</Typography>
                </Button>
            </Link>
        );
    };

    return (
        <ReusableCard>
            <Typography color="secondary" variant="h1" className="pb-2">
                کالا اعلام بار نشده
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
                columns={columns(renderAction)}
                rows={results}
                data={cargoNotSended}
            />
        </ReusableCard>
    );
};

export default Cargo;
