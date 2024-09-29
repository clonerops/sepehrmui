import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import FuzzySearch from "../../../_cloner/helpers/fuse";
import ReusableCard from "../../../_cloner/components/ReusableCard";

import { useRetrievesNotSendedOrder } from "./_hooks";
import { ICargo } from "./_models";
import { ReadyToCargoColumn } from "../../../_cloner/helpers/columns";
import { useAuth } from "../../../_cloner/helpers/checkUserPermissions";
import AccessDenied from "../../routing/AccessDenied";


const ReadyToCargo = () => {
    const { hasPermission } = useAuth()

    const navigate = useNavigate()
    const readyToCargoOrder = useRetrievesNotSendedOrder();

    const [results, setResults] = useState<ICargo[]>([]);

    useEffect(() => {
        setResults(readyToCargoOrder?.data);
         // eslint-disable-next-line
    }, [readyToCargoOrder?.data]);

    const renderAction = (item: any) => {
        return (
            <Link target="_blank" to={`/dashboard/order_ready_cargo/${item?.row?.id}`}>
                <Button variant="contained" color="secondary">
                    <Typography variant="h5">صدور اعلام بار</Typography>
                </Button>
            </Link>
        );
    };

    if(!hasPermission("CreateCargoAnnouncement"))
        return <AccessDenied />

    return (
        <>
            <ReusableCard>
                <div className="w-auto md:w-[40%] mb-4">
                    <FuzzySearch
                        keys={[ "orderCode", "registerDate", "customerFirstName", "customerLastName", "totalAmount"]}
                        data={readyToCargoOrder?.data}
                        setResults={setResults}
                    />
                </div>
                <MuiDataGrid
                    columns={ReadyToCargoColumn(renderAction)}
                    rows={results}
                    data={readyToCargoOrder?.data}
                    isLoading={readyToCargoOrder.isLoading}
                    onDoubleClick={(item: any) => navigate(`/dashboard/order_ready_cargo/${item?.row?.id}`)}
                />
            </ReusableCard>
        </>
    );
};

export default ReadyToCargo;
