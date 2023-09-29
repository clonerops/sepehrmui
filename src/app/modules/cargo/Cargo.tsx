import { Link } from "react-router-dom";
import { useRetrievesNotSendedOrder } from "./core/_hooks";
import { columns } from "./helpers/notSendedColumn";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import { useEffect, useState } from "react";
import { ICargo } from "./core/_models";

const Cargo = () => {
    const {
        data: cargoNotSended,
    } = useRetrievesNotSendedOrder();

    const [results, setResults] = useState<ICargo[]>([]);

    useEffect(() => {
        setResults(cargoNotSended);
    }, [cargoNotSended]);


    const renderAction = (item: any) => {
        return (
            <Link to={`/dashboard/cargo/confirm/${item?.row?.id}`} state={{isConfirmed: true}}>
                <Button variant="contained" color="secondary">
                    <Typography>اعلام بار</Typography>
                </Button>
            </Link>
        );
    };

    return (
        <Container>
            <Card className="p-8">
                <Typography color="primary" variant="h1" className="pb-8">محصولات اعلام بار نشده</Typography>
                <Box component="div" className="w-80 md:w-[40%]">
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
                <MuiDataGrid columns={columns(renderAction)} rows={results} data={cargoNotSended} />
            </Card>
        </Container>
    );
};

export default Cargo;
