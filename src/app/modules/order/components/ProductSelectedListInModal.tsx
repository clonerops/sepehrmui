import React, { useEffect, useState } from "react";
import { IProducts } from "../../product/core/_models";
import { columns } from "../helpers/productColumns";
import { Box, Container } from "@mui/material";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";

const ProductSelectedListInModal = (props: {
    products: IProducts[];
    productLoading: boolean;
    productError: boolean;
    setSelectedProductOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectProductFromModal: React.Dispatch<
        React.SetStateAction<IProducts | undefined>
    >;
}) => {

    const [results, setResults] = useState<IProducts[]>([])

    useEffect(() => {
        if(props.products)
         setResults(props.products)
    }, [props.products])


    const renderAction = () => {
        return <></>
    }

    const handleRowDoubleClick = (event: any) => {
        const clickedRowNode = event.api.getRowNode(event.rowIndex);
        props.setSelectedProductOpen(false);
        props.setSelectProductFromModal(clickedRowNode.data);
    };


    return (
        <Container>
            <Box component="div" className="w-80 md:w-[40%]">
                <FuzzySearch keys={['productName', 'productIntegratedName', 'approximateWeight']} data={props.products} threshold={0.5} setResults={setResults} />
            </Box>
            <MuiDataGrid columns={columns(renderAction)} rows={results} data={props.products} />
        </Container>
    );
};

export default ProductSelectedListInModal;
