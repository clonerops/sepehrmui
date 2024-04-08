import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import ReusableCard from "../../../../_cloner/components/ReusableCard";
import { readyToCargoColumns } from "../helpers/columns";
import Backdrop from "../../../../_cloner/components/Backdrop";

import { useRetrievesNotSendedOrder } from "../core/_hooks";
import { ICargo } from "../core/_models";


const ReadyToCargo = () => {
    const { data: cargoNotSended, isLoading } = useRetrievesNotSendedOrder();

    const [results, setResults] = useState<ICargo[]>([]);

    useEffect(() => {
        setResults(cargoNotSended);
         // eslint-disable-next-line
    }, [cargoNotSended]);

    const renderAction = (item: any) => {
        return (
            <Link to={`/dashboard/order_ready_cargo/${item?.row?.id}`}>
                <Button variant="contained" color="secondary">
                    <Typography variant="h5">صدور اعلام بار</Typography>
                </Button>
            </Link>
        );
    };

    // if(isLoading) {
    //     return <Backdrop loading={isLoading} />
    // }

    return (
        <ReusableCard>
            <div className="w-auto md:w-[40%] mb-4">
                <FuzzySearch
                    keys={[ "orderCode", "registerDate", "customerFirstName", "customerLastName", "fareAmount", "description"]}
                    data={cargoNotSended}
                    setResults={setResults}
                />
            </div>
            <MuiDataGrid
                columns={readyToCargoColumns(renderAction)}
                rows={results}
                data={cargoNotSended}
                isLoading={isLoading}
            />
        </ReusableCard>
    );
};

export default ReadyToCargo;
