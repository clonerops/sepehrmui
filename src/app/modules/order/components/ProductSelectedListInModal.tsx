import React, { useEffect, useState } from "react";
import { IProducts } from "../../product/core/_models";
import { columns } from "../helpers/productColumns";
import { Box, Container } from "@mui/material";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import MuiSelectionDataGrid from "../../../../_cloner/components/MuiSelectionDataGrid";

const ProductSelectedListInModal = (props: {
    products: IProducts[];
    productLoading: boolean;
    productError: boolean;
    setFieldValue: any;
    setSelectedProductOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectProductFromModal:any
}) => {

    const [results, setResults] = useState<IProducts[]>([])
    const [selectionModel, setSelectionModel] = useState<{row: {productIntegratedName: string}}>({row: {productIntegratedName:""}})

    useEffect(() => {
        if(props.products)
         setResults(props.products)
    }, [props.products])


    const renderAction = () => {
        return <></>
    }

    const handleSelectionChange: any = (newSelectionModel:  {row: {productIntegratedName: string}}) => {
        setSelectionModel(newSelectionModel);
        props.setFieldValue('productIntegratedName', newSelectionModel.row.productIntegratedName)
        props.setSelectedProductOpen(false);
        props.setSelectProductFromModal(newSelectionModel);
      };


    return (
        <Container>
            <Box component="div" className="w-80 md:w-[40%]">
                <FuzzySearch keys={['productName', 'productIntegratedName', 'approximateWeight']} data={props.products} threshold={0.5} setResults={setResults} />
            </Box>
            <MuiSelectionDataGrid onRowDoubleClick={handleSelectionChange} selectionModel={selectionModel} setSelectionModel={setSelectionModel} columns={columns(renderAction)} rows={results} data={props.products} />
        </Container>
    );
};

export default ProductSelectedListInModal;
