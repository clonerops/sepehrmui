import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Fab, Tooltip, Typography } from "@mui/material";

import ReusableCard from "../../../../_cloner/components/ReusableCard";
import FuzzySearch from "../../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../../_cloner/components/MuiDataGrid";
import Pagination from "../../../../_cloner/components/Pagination";
import { IOrder } from "../../managment-order/core/_models";
import { useRetrievePurchaserOrdersByMutation } from "../../managment-order/core/_hooks";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import { purchaserOrderListsForBetweenWarehouseColumns } from "./_columns";
import Backdrop from "../../../../_cloner/components/Backdrop";
import { ApprovalRounded } from "@mui/icons-material";

const pageSize = 20;

const TransferBetweenWarehouse = () => {
    const navigate = useNavigate()
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
        // eslint-disable-next-line
    }, []);

    const renderAction = (item: any) => {
        return (
            <Tooltip  title={<Typography variant='h3'>اقدام به نقل و انتقال</Typography>}>
                <Link
                to={ item.row.purchaseOrderStatusId === 4 ? '' : `/dashboard/transferBetweenWarehouse/${item?.row?.id}`}
            >   
                <Fab size="small" color="secondary">
                        <ApprovalRounded />
                </Fab>
                    {/* <ButtonComponent disabled={item.row.purchaseOrderStatusId === 4} onClick={() => {}}>
                        <Typography className="px-2 text-white">
                            اقدام به نقل و انتقال
                        </Typography>
                    </ButtonComponent> */}
                </Link>
            </Tooltip>
        );
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1);
    };

    return (
        <>
            {isLoading && <Backdrop loading={isLoading} />}
            <ReusableCard>
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center mb-4">
                    <div className="w-full lg:w-[50%]">
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
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4">
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
                    </div>
                </div>
                <MuiDataGrid
                    columns={purchaserOrderListsForBetweenWarehouseColumns(
                        renderAction
                    )}
                    rows={results || [{}]}
                    data={orders?.data || [{}]}
                    onDoubleClick={(item: any) => navigate(item.row.purchaseOrderStatusId === 4 ? '' : `/dashboard/transferBetweenWarehouse/${item?.row?.id}`)}
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
