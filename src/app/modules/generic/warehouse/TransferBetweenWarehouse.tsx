import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Pagination from "../../../../_cloner/components/Pagination";
import { IOrder } from "../../managment-order/core/_models";
import { useRetrievePurchaserOrders } from "../../managment-order/core/_hooks";
import CustomButton from "../../../../_cloner/components/CustomButton";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import { purchaserOrderListsForBetweenWarehouseColumns } from "./_columns";
import TransitionsModal from "../../../../_cloner/components/ReusableModal";
import TransferBetweenWarehouseAction from "./TransferBetweenWarehouseAction";

const pageSize = 20;

const TransferBetweenWarehouse = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [rowSelected, setRowSelected] = useState<any>({})

    let formData = {
        pageNumber: currentPage,
        pageSize: pageSize,
    };

    const { data: orders, isLoading } = useRetrievePurchaserOrders(formData);

    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        setResults(orders?.data);
    }, [orders?.data]);

    const renderAction = (item: any) => {
        return (
            <ButtonComponent onClick={() => handleOpenModal(item)}>
                <Typography className="px-2 text-white">
                    اقدام به نقل و انتقال
                </Typography>
            </ButtonComponent>
        );
    };

    const handleOpenModal = (item: any) => {
        setRowSelected(item.row)
        setIsOpen(true)
    }

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    return (
        <>
            <ReusableCard>
                <Box component="div" className="w-auto md:w-[40%] mb-4">
                    <FuzzySearch
                        keys={[
                            "orderCode",
                            "registerDate",
                            "customerFirstName",
                            "customerLastName",
                            "orderSendTypeDesc",
                            "paymentTypeDesc",
                            "invoiceTypeDesc",
                            "isTemporary",
                            "totalAmount",
                            "exitType",
                        ]}
                        data={orders?.data}
                        threshold={0.5}
                        setResults={setResults}
                    />
                </Box>
                <MuiDataGrid
                    columns={purchaserOrderListsForBetweenWarehouseColumns(
                        renderAction
                    )}
                    rows={results || [{}]}
                    data={orders?.data || [{}]}
                    isLoading={isLoading}
                />
                <Pagination
                    pageCount={+orders?.totalCount / +pageSize || 100}
                    onPageChange={handlePageChange}
                />
            </ReusableCard>

            <TransitionsModal open={isOpen} isClose={() => setIsOpen(false)} title="نقل و انتقال بین انبار">
                <TransferBetweenWarehouseAction rowSelected={rowSelected} />
            </TransitionsModal>
        </>
    );
};

export default TransferBetweenWarehouse;
