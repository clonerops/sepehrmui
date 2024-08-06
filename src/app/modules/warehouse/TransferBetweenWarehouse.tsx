import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useRetrievePurchaserOrdersByMutation } from "../managment-order/core/_hooks";
import { IOrder } from "../managment-order/core/_models";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import ReusableCard from "../../../_cloner/components/ReusableCard";
import FuzzySearch from "../../../_cloner/helpers/fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import { TransferBetweenWarehouseColumn } from "../../../_cloner/helpers/columns";
import Pagination from "../../../_cloner/components/Pagination";


const pageSize = 20;

const TransferBetweenWarehouse = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    let formData = {
        pageNumber: currentPage,
        pageSize: pageSize,
        IsNotTransferedToWarehouse: true
    };

    const { mutate, data: orders, isLoading } = useRetrievePurchaserOrdersByMutation();

    const renderOrders = (isNotTransferedToWarehouse=true) => {
        let formData = {
            pageNumber: currentPage,
            pageSize: pageSize,
            IsNotTransferedToWarehouse: !isNotTransferedToWarehouse ? null : true ,
            PurchaseOrderStatusId: isNotTransferedToWarehouse ? null : 4
        }

        mutate(formData,{
            onSuccess: (response) => {
                setResults(response?.data);
            }
        })
    }

    const [results, setResults] = useState<IOrder[]>([]);

    useEffect(() => {
        mutate(formData, {
            onSuccess: (response) => {
                setResults(response?.data);
            }
        })
        // refetch()
    }, []);

    const renderAction = (item: any) => {
        return (
            <Link
            to={ item.row.purchaseOrderStatusId === 4 ? '' : `/dashboard/transferBetweenWarehouse/${item?.row?.id}`}
        >

            <ButtonComponent disabled={item.row.purchaseOrderStatusId === 4} onClick={() => {}}>
                <Typography className="px-2 text-white">
                    اقدام به نقل و انتقال
                </Typography>
            </ButtonComponent>
            </Link>
        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    return (
        <>
            <ReusableCard>
                <Box component="div" className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center mb-4">
                    <Box className="w-full lg:w-[50%]">
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
                            setResults={setResults}
                        />
                    </Box>
                    <Box className="flex flex-col lg:flex-row gap-4">
                        <Button onClick={() => renderOrders(true)
                        //  {
                        //     setIsNotTransferedToWarehouse(false)
                        //     renderOrders()
                        // }
                        } variant="contained" className={"!bg-pink-800"}>
                            <Typography>سفارشات آماده انتقال</Typography>
                        </Button>
                        <Button onClick={() => renderOrders(false)
                                
                        // {
                        //     setIsNotTransferedToWarehouse(true)
                        //     renderOrders()
                        // }
                        } variant="contained" className={"!bg-sky-800" }>
                            <Typography>سفارشات انتقال داده شده</Typography>
                        </Button>
                    </Box>
                </Box>
                <MuiDataGrid
                    columns={TransferBetweenWarehouseColumn(
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
        </>
    );
};

export default TransferBetweenWarehouse;
